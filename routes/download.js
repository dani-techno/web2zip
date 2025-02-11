/**
* Made by: Dani Technology (Full Stack Engineer)
* Created on: December 8, 2024
* Contact developer:
* - WhatsApp: +62 838-3499-4479 or +62 823-2066-7363
* - Email: dani.technology.id@gmail.com
* - GitHub: https://github.com/dani-techno
*/

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const router = express.Router();
const DOWNLOAD_DIR = path.join(__dirname, '../tmp');

const downloadFile = async (url, outputPath) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const downloadAssets = async (baseUrl, folderPath) => {
  try {
    const response = await axios.get(baseUrl);
    const $ = cheerio.load(response.data);

    const htmlFilePath = path.join(folderPath, 'index.html');
    await fs.writeFile(htmlFilePath, response.data);

    const filePromises = [];
    $('link[rel="stylesheet"]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        const fileUrl = new URL(href, baseUrl).href;
        const fileName = path.basename(fileUrl);
        const filePath = path.join(folderPath, fileName);
        filePromises.push(downloadFile(fileUrl, filePath));
      }
    });

    $('script[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        const fileUrl = new URL(src, baseUrl).href;
        const fileName = path.basename(fileUrl);
        const filePath = path.join(folderPath, fileName);
        filePromises.push(downloadFile(fileUrl, filePath));
      }
    });

    await Promise.all(filePromises);
  } catch (err) {
    console.error(`Error downloading assets from ${baseUrl}:`, err.message);
    throw new Error('Failed to download assets.');
  }
};

const createZip = async (folderPath) => {
  return new Promise((resolve, reject) => {
    const zipPath = `${folderPath}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.on('error', (err) => reject(err));
    archive.on('close', () => resolve(zipPath));

    archive.finalize();
  });
};

router.all('/web2zip', async (req, res) => {
  const { url } = { ...req.query, ...req.body };
  if (!url) return res.status(400).send({ error: 'Base URL is required' });

  let folderPath = '';
  try {
  	const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
    const matches = url.match(regex);
    const hostName = matches && matches[1] ? matches[1] : 'default';

    const pathName = hostName; 
    
    folderPath = path.join(DOWNLOAD_DIR, pathName);
    await fs.ensureDir(folderPath);

    await downloadAssets(url, folderPath);
   
    const zipPath = await createZip(folderPath);

    res.json({
      message: 'ZIP file created successfully!',
      zipPath: `/api/download/${path.basename(zipPath)}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  } finally {
    if (folderPath && fs.existsSync(folderPath)) {
      await fs.remove(folderPath);
    }
  }
});

router.get('/download/:zipName', (req, res) => {
  const zipName = req.params.zipName;
  const zipPath = path.join(DOWNLOAD_DIR, zipName);

  if (!fs.existsSync(zipPath)) return res.status(404).send({ error: 'File not found' });

  res.download(zipPath, zipName, (err) => {
    if (err) {
      console.error('Error downloading zip file:', err);
    }
  });
});

module.exports = router;