'use strict';

function autoGifLoad() {

    setTimeout(function() {
      const messages = document.querySelectorAll('.message');

      function convertGifUrlToImage(message) {
        const text = message.textContent.trim();
        const regex = /https?:\/\/\S+\.(gif)/i;
        const match = text.match(regex);

        if (match) {
          const img = document.createElement('img');
          img.src = match[0];
          img.style.maxWidth = '200px'; // Set the max-width to 100%
          message.innerHTML = '';
          message.appendChild(img);
        }
      }

      messages.forEach(convertGifUrlToImage);
    }, 3000);

};
