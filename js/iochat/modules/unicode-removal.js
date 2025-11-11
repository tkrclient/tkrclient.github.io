'use strict';

function unicodeRemoval() {

  // Function (for some reason only loads after few seconds)
    function removeUnicodeFromElements() {
      console.log('Removing Unicode from elements...');
      // Get all the ".message" elements nested under the ".entry" class and "#messages" parent
      const messageElements = document.querySelectorAll('#messages .entry .message');
      messageElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
      // Get all the ".name" elements nested under the ".entry" class and "#messages" parent
      const nameElements = document.querySelectorAll('#messages .entry .name');
      nameElements.forEach(element => {
        // use /[^\u0000-\u007F]/g for ALL unicode characters (including emojies)!
        element.textContent = element.textContent.replace(/[^\u0000-\u007F\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F500}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      });
    }
    // Run the function to remove Unicode characters after a 3-second delay
    function toggleFunction(checkbox) {
      var func = document.getElementById("removeUnicodeFromElements");
      if (checkbox.checked) {
        func.disabled = false; // Enable the function
        // Start observing the "#messages" element for changes after a 3-second delay
        observer.observe(document.getElementById('messages'), { childList: true });
      } else {
        func.disabled = true; // Disable the function
        observer.observe(document.getElementById('messages'), { childList: false });
      }
    }
    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          console.log('New elements added, running Unicode removal...');
          removeUnicodeFromElements();
        }
      });
    });
  
};
