'use strict';

document.addEventListener('DOMContentLoaded', function() {


    /*------------------*/
    /*- Background js --*/
    /*------------------*/
        
    // Remove the background first variable
    const elementToRemove = document.querySelectorAll('#video-background');
    
    // Pick which background variables
    const videoUrls = {
      b1: 'https://cdn.pixabay.com/video/2024/05/29/214405_large.mp4',
      b2: 'https://cdn.pixabay.com/video/2024/06/08/215762_large.mp4',
      b3: 'https://cdn.pixabay.com/video/2024/03/01/202587-918431513_large.mp4',
      b4: 'https://cdn.pixabay.com/video/2021/04/15/71122-537102350_large.mp4',
      b5: 'https://cdn.pixabay.com/video/2021/10/10/91562-629172467_large.mp4',
      b6: 'https://cdn.pixabay.com/video/2019/10/09/27669-365224683_large.mp4'
    };
    
    // Remove background
    const rem = document.querySelector('.rem');
    
    // Function to remove existing video-background elements
    function removeVideoBackground() {
      const existingVideos = document.querySelectorAll('#video-background');
      existingVideos.forEach(video => {
        video.remove();
      });
    }
    
    // Function to create a new video-background element
    function createVideoBackground(videoUrl) {
      var video = document.createElement('video');
      video.id = 'video-background';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.style.opacity = 0.6;
      var source = document.createElement('source');
      source.src = videoUrl;
      source.type = 'video/mp4';
      video.appendChild(source);
      document.body.insertBefore(video, document.body.firstChild);
    }
    
    // Event listener function for background changes
    function changeBackground(event) {
      const videoKey = event.target.classList[0];
      const videoUrl = videoUrls[videoKey];
    
      if (videoUrl) {
        removeVideoBackground();
        createVideoBackground(videoUrl);
        localStorage.setItem('lastBackground', videoKey); // Store the last clicked background
      }
    }
    
    // Add event listeners to background elements
    const backgroundElements = document.querySelectorAll('.b1, .b2, .b3, .b4, .b5, .b6');
    backgroundElements.forEach(element => {
      element.addEventListener('click', changeBackground);
    });
    
    // noBackground variable
    const noBackground = removeVideoBackground();
    
    // Remove background click
    function remchange() {
      removeVideoBackground();
      localStorage.removeItem('lastBackground'); // Remove the stored last background
      localStorage.setItem('noBackground', noBackground); // Store the last "no background" option
    }
    
    rem.addEventListener('click', remchange);
    
    // Load the last clicked background on page load
    window.addEventListener('load', () => {
      const lastBackground = localStorage.getItem('lastBackground');
      const noBackground = localStorage.getItem('noBackground');
      if (lastBackground && videoUrls[lastBackground]) {
        createVideoBackground(videoUrls[lastBackground]);
      } else if (noBackground) {
        removeVideoBackground();
      } else {
        // If no last background is stored, load background 5
        createVideoBackground(videoUrls['b5']);
      }
    });

  
});
