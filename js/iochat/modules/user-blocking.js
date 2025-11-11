'use strict';

function userBlocking() {

    // Load blocked users from localStorage
    let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || ["a bot", "Guest8389"];

    // Create the container for the blocked users list
    const blockedUsersList = document.querySelectorAll('.blockedUsersListClass');
    // Create the input box for blocking users
    const blockInput = document.querySelectorAll('.blockInputClass');
    // Create the input box for unblocking users
    const unblockInput = document.querySelectorAll('.unblockInputClass');
    // Create the button to unblock all users
    const unblockAllButton = document.querySelectorAll('.unblockAllButtonClass');

    // Function to update the blocked users list display
    function updateBlockedUsersList() {
        blockedUsersList.forEach(element => {
            element.textContent = 'Blocked Users:\n' + blockedUsers.join('\n');
        });
        localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }

    // Function to block a user
    function blockUser(username) {
        if (username.includes('*')) {
            const pattern = '^' + username.replace(/\*/g, '.*') + '$';
            if (!blockedUsers.some(user => user === pattern)) {
                blockedUsers.push(pattern);
                console.log(`Users matching pattern '${pattern}' have been blocked`);
            }
        } else {
            if (!blockedUsers.includes(username)) {
                blockedUsers.push(username);
                console.log(`User '${username}' has been blocked`);
            }
        }
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock a user
    function unblockUser(username) {
        if (username.includes('*')) {
            const pattern = '^' + username.replace(/\*/g, '.*') + '$';
            blockedUsers = blockedUsers.filter(user => user !== pattern);
            console.log(`Users matching pattern '${pattern}' have been unblocked`);
        } else {
            blockedUsers = blockedUsers.filter(user => user !== username);
            console.log(`User '${username}' has been unblocked`);
        }
        updateBlockedUsersList();
        filterMessages();
    }

    // Function to unblock all users
    function unblockAllUsers() {
        blockedUsers = ["a bot", "Guest8389"];
        updateBlockedUsersList("a bot", "Guest8389");
        filterMessages();
    }

    // Function to filter messages from blocked users
    function filterMessages() {
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            const messageEntries = messagesContainer.querySelectorAll('.entry');
            messageEntries.forEach(entry => {
                const usernameElement = entry.querySelector('.name');
                if (usernameElement) {
                    const username = usernameElement.textContent.replace(':', '').trim();
                    // Check if the username should be hidden
                    const isBlocked = blockedUsers.some(blockedUser => {
                        if (blockedUser.startsWith('^') && blockedUser.endsWith('$')) {
                            return new RegExp(blockedUser).test(username);
                        } else {
                            return blockedUser === username;
                        }
                    });
                    if (isBlocked) {
                        entry.remove();
                    }
                }
            });
        }
    }

    // Initialize with default blocked users and filter existing messages
    updateBlockedUsersList();
    filterMessages();

    // Event listener typing input for blocking users
    blockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    blockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener typing input for unblocking users
    unblockInput.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const username = input.value.trim();
                if (username) {
                    unblockUser(username);
                    input.value = '';
                }
            }
        });
    });

    // Event listener button for unblocking all users
    unblockAllButton.forEach(button => {
        button.addEventListener('click', unblockAllUsers);
    });

    // Observe the messages container for new messages
    const observer2 = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('entry')) {
                        const usernameElement = node.querySelector('.name');
                        if (usernameElement) {
                            const username = usernameElement.textContent.replace(':', '').trim();
                            // Check if the username should be hidden
                            const isBlocked = blockedUsers.some(blockedUser => {
                                if (blockedUser.startsWith('^') && blockedUser.endsWith('$')) {
                                    return new RegExp(blockedUser).test(username);
                                } else {
                                    return blockedUser === username;
                                }
                            });
                            if (isBlocked) {
                                node.remove();
                            }
                        }
                    }
                });
            }
        });
        // After processing all mutations, run filterMessages to catch any missed entries
        // filterMessages();
    });

    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        observer2.observe(messagesContainer, { childList: true, subtree: true });
    }

});
