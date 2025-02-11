/**
* Made by: Dani Technology (Full Stack Engineer)
* Created on: December 8, 2024
* Contact developer:
* - WhatsApp: +62 838-3499-4479 or +62 823-2066-7363
* - Email: dani.technology.id@gmail.com
* - GitHub: https://github.com/dani-techno
*/

document.getElementById('web2zipForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const urlInput = document.getElementById('url').value;
  const statusDiv = document.getElementById('status');
  const downloadDiv = document.getElementById('downloadLink');
  const zipLink = document.getElementById('zipLink');

  statusDiv.textContent = '';
  downloadDiv.classList.add('hidden');

  statusDiv.textContent = 'Processing... Please wait.';

  try {
    const response = await fetch('/api/web2zip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: urlInput }),
    });

    const result = await response.json();

    if (response.ok) {
      statusDiv.textContent = 'ZIP file created successfully!';
      zipLink.href = result.zipPath;
      downloadDiv.classList.remove('hidden');
    } else {
      throw new Error(result.error || 'Failed to process the URL.');
    }
  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
  }
});