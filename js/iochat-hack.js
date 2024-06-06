(function() {

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

       / / FONT REMASTER




(function() {
    'use strict';

    // Define the CSS to change the font
    const customFontCSS = `
        #messages {
	          font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif;
        }


    `;

    // Create a new <style> element
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(customFontCSS));

    // Append the <style> element to the document's <head>
    document.head.appendChild(styleElement);
})();


    
    // BLOCK USERS FEATURE

(function() {
    'use strict';

    // Load blocked users from localStorage
    let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];

    // Create the container for the blocked users list
    const blockedUsersList = document.createElement('div');
    blockedUsersList.style.position = 'fixed';
    blockedUsersList.style.left = '400px';
    blockedUsersList.style.top = '40%';
    blockedUsersList.style.transform = 'translateY(-50%)';
    blockedUsersList.style.backgroundColor = 'rgba(51, 51, 51, 0.9)';
    blockedUsersList.style.color = '#fff';
    blockedUsersList.style.padding = '5px';
    blockedUsersList.style.border = '1px solid #444';
    blockedUsersList.style.borderRadius = '5px';
    blockedUsersList.style.fontWeight = '200';  // Thin font
    blockedUsersList.style.fontSize = '12px';
    blockedUsersList.style.maxWidth = '200px';
    blockedUsersList.style.overflowWrap = 'break-word';
    blockedUsersList.style.opacity = '0.9'; // 90% opacity
    document.body.appendChild(blockedUsersList);

    // Create the input box for blocking users
    const blockInput = document.createElement('input');
    blockInput.type = 'text';
    blockInput.placeholder = 'Block user';
    blockInput.style.position = 'fixed';
    blockInput.style.left = '400px';
    blockInput.style.top = '50%';
    blockInput.style.transform = 'translateY(-50%)';
    blockInput.style.backgroundColor = '#333';
    blockInput.style.color = '#fff';
    blockInput.style.padding = '5px';
    blockInput.style.border = '1px solid #444';
    blockInput.style.borderRadius = '5px';
    document.body.appendChild(blockInput);

    // Create the input box for unblocking users
    const unblockInput = document.createElement('input');
    unblockInput.type = 'text';
    unblockInput.placeholder = 'Unblock user';
    unblockInput.style.position = 'fixed';
    unblockInput.style.left = '400px';
    unblockInput.style.top = '55%';
    unblockInput.style.transform = 'translateY(-50%)';
    unblockInput.style.backgroundColor = '#333';
    unblockInput.style.color = '#fff';
    unblockInput.style.padding = '5px';
    unblockInput.style.border = '1px solid #444';
    unblockInput.style.borderRadius = '5px';
    document.body.appendChild(unblockInput);

    // Create the button to unblock all users
    const unblockAllButton = document.createElement('button');
    unblockAllButton.textContent = 'Unblock All';
    unblockAllButton.style.position = 'fixed';
    unblockAllButton.style.left = '400px';
    unblockAllButton.style.top = '60%';
    unblockAllButton.style.transform = 'translateY(-50%)';
    unblockAllButton.style.backgroundColor = '#333';
    unblockAllButton.style.color = '#fff';
    unblockAllButton.style.padding = '5px';
    unblockAllButton.style.border = '1px solid #444';
    unblockAllButton.style.borderRadius = '5px';
    unblockAllButton.style.cursor = 'pointer';
    document.body.appendChild(unblockAllButton);

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
    blockInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const username = blockInput.value.trim();
            if (username) {
                blockUser(username);
                blockInput.value = '';
            }
        }
    });

    // Event listener for unblocking users
    unblockInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const username = unblockInput.value.trim();
            if (username) {
                unblockUser(username);
                unblockInput.value = '';
            }
        }
    });

    // Event listener for unblocking all users
    unblockAllButton.addEventListener('click', unblockAllUsers);

    // Observe the messages container for new messages
    const observer = new MutationObserver(() => filterMessages());
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        observer.observe(messagesContainer, { childList: true, subtree: true });
    }

    // Initial call to display the blocked users and filter messages
    updateBlockedUsersList();
    filterMessages();
})();

(function() {
    'use strict';

    // Add the color picker to the page
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.id = 'usernameColorPicker';
    colorPicker.style.position = 'fixed';
    colorPicker.style.top = '120px';
    colorPicker.style.left = '20px';
    colorPicker.style.zIndex = '1000';
    colorPicker.style.padding = '5px';
    colorPicker.style.border = 'none';
    colorPicker.style.borderRadius = '5px';
    colorPicker.style.backgroundColor = '#333';
    colorPicker.style.color = '#fff';
    document.body.appendChild(colorPicker);

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

  })();
