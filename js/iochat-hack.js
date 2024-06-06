(function() {

    /*---- Testing ----*/
    
    /*---- Higher char limits ----*/
    // Higher character limit for chat box
    const messageInput = document.getElementById('message'); {
      messageInput.setAttribute('maxlength', '1000'); // 400 character limit
    }
    // Higher character limit for name box
    const nameInput = document.getElementById('name'); {
      nameInput.setAttribute('maxlength', '1000'); // 400 character limit
    } 

    /*---- Name color changes ----*/
    /* var namecolor = document.getElementById('colorpicker');
    // Function (for some reason only loads after few seconds)
    function func() {
      namecolor.style.removeProperty('all');
      // namecolor.style.color = 'rgb(255, 0, 0)'; // CHANGE COLOR HERE! <---------------------------
    }
    setTimeout(func, 3000); */


    /*---- Click colors and names ----*/
    // Function (for some reason only loads after few seconds)
    /* function mess() {
      // Get the elements whose color and text you want to copy
      const sourceElements = document.querySelectorAll('#messages .entry .name');
      // Get the elements where you want to copy the color and text
      const targetColorElement = document.getElementById('colorpicker');
      const targetTextElement = document.getElementById('name');
      addClickListeners(sourceElements, targetColorElement, targetTextElement);
      // Set up a mutation observer to watch for new elements
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            const newSourceElements = document.querySelectorAll('#messages .entry .name');
            addClickListeners(newSourceElements, targetColorElement, targetTextElement);
          }
        });
      });
      // Start observing the #messages element for changes
      observer.observe(document.getElementById('messages'), { childList: true });
      function addClickListeners(elements, targetColorElement, targetTextElement) {
        elements.forEach(element => {
          element.addEventListener('click', () => {
            // Get the computed color of the source element
            const computedColor = window.getComputedStyle(element).color;
            // Convert the color to an RGB object
            const rgbColor = convertColorToRGB(computedColor);
            // Apply the color to the target element
            targetColorElement.style.color = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;

            // Copy the text content of the clicked element, removing the last character
            const innerText = element.textContent;
            if (innerText.length > 1) {
              targetTextElement.value = innerText.slice(0, -1);
            } else {
              targetTextElement.value = innerText;
            }
          });
        });
      }
      function convertColorToRGB(colorString) {
        // Remove the "rgb(" and ")" from the string
        const colorValues = colorString.slice(4, -1).split(', ');
        return {
          red: parseInt(colorValues[0]),
          green: parseInt(colorValues[1]),
          blue: parseInt(colorValues[2])
        };
      }
    }
    setTimeout(mess, 6000); */


    /*---- Removing Unicode ----*/
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

      
    /* Keybindings for [ ] and \ to change colors */
    // Listen for the 'keypress' event on the document
    document.addEventListener('keypress', function(event) {
      // Check if the pressed key is the 'Enter' key
      function red() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(255, 0, 0)'; // red
      }
      function green() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 255, 0)'; // green
      }
      function blue() {
        namecolor.style.removeProperty('all');
        namecolor.style.color = 'rgb(0, 0, 255)'; // blue
      }
      if (event.key === '[') { // [
        // Call the function you want to activate
        red();
      }
      if (event.key === ']') { // ]
        // Call the function you want to activate
        green();
      }
      if (event.key === '\\') { // \
        // Call the function you want to activate
        blue();
      }
    });

    /*---- Next user blocking script ----*/
    
    'use strict';

    // Load blocked users from localStorage
    let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];

    // Create the container for the blocked users list
    const blockedUsersList = document.createElement('div');
    blockedUsersList.document.querySelctorAll(".blockedUsersListClass");
    // Create the input box for blocking users
    const blockInput = document.createElement('input');
    blockedUsersList.document.querySelectorAll.(".blockInputClass");
    // Create the input box for unblocking users
    const unblockInput = document.createElement('input');
    unblockInput.document.querySelectorAll(".unblockInputClass");
    // Create the button to unblock all users
    const unblockAllButton = document.createElement('button');
    unblockAllButton.document.querySelectorAll(".unblockAllButtonClass");

    // Function to update the blocked users list display
    function updateBlockedUsersList() {
        blockedUsersList.textContent = 'Blocked Users:\n' + blockedUsers.join('\n');
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }

    // Function to block a user
    function blockUser(username) {
        if (!blockedUsers.includes(username)) {
            blockedUsers.push(username);
            updateBlockedUsersList();
            filterMessages();
        }
    }

    // Function to unblock a user
    function unblockUser(username) {
        blockedUsers = blockedUsers.filter(user => user !== username);
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock all users
    function unblockAllUsers() {
        blockedUsers = [];
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to filter messages from blocked users
    function filterMessages() {
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            const messageEntries = messagesContainer.querySelectorAll('.entry');
            messageEntries.forEach(entry => {
                const usernameElement = entry.querySelector('.name');
                if (usernameElement && blockedUsers.includes(usernameElement.textContent.replace(':', '').trim())) {
                    entry.style.display = 'none';
                } else {
                    entry.style.display = '';
                }
            });
        }
    }

    // Event listener for blocking users
    if (blockInput) {
        blockInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = blockInput.value.trim();
                if (username) {
                    blockUser(username);
                    blockInput.value = '';
                }
            }
        });
    }

    // Event listener for unblocking users
    if (unblockInput) {
        unblockInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = unblockInput.value.trim();
                if (username) {
                    unblockUser(username);
                    unblockInput.value = '';
                }
            }
        });
    }

    // Event listener for unblocking all users
    unblockAllButton.addEventListener('click', unblockAllUsers);

    // Observe the messages container for new messages
    const observer2 = new MutationObserver(() => filterMessages());
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        observer2.observe(messagesContainer, { childList: true, subtree: true });
    }

    // Initial call to display the blocked users and filter messages
    updateBlockedUsersList();
    filterMessages();

    'use strict';

    // Add the color picker to the page
    const colorPicker = document.createElement('input');
    colorPicker.document.querySelectorAll(".colorPickerClass");

    // Function to update the username color
    function updateUsernameColor(event) {
        const nameColor = document.getElementById('colorpicker');
        nameColor.style.removeProperty('all');
        nameColor.style.color = event.target.value;
    }

    // Add event listener to the color picker
    colorPicker.addEventListener('input', updateUsernameColor);

    // Optionally, set an initial color
    colorPicker.value = '#ff0000'; // Red
    updateUsernameColor({target: {value: colorPicker.value}});
})();
