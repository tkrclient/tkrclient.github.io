'use strict';

window.onload = function() {
    var msg = document.getElementById("msg2"); // Message input field
    var nme = document.getElementById("nme2"); // Username input field
    var log = document.getElementById("log2"); // Log container for messages
    var pick = document.getElementById("colorpicker2"); // Username's Colorpicker
    var message = document.getElementById("message2");
    var conn = new WebSocket("wss://" + "chat.bzmb.eu" + "/chatroom1");

    // A map to store usernames and their assigned colors
    var userColors = {};
    var userNames = {};

    // Function to generate a random color
    function getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).padStart(6, "0");
    }

	// Random digit
	function getRandomDigit() {
	    return Math.floor(Math.random() * 9999) + 1;
	}

    // Function to set background-color and text color
    function setColor(element, color) {
        element.style.backgroundColor = color;
        element.style.color = "#FFFFFF"; // Default text color (white)
    }

	// Function to set username
	function setName(element, string) {
		nme.value = string;
	}

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie by name
    function getCookie(name) {
        const cookies = document.cookie.split(";"); // Split cookies into an array
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim(); // Trim whitespace
            if (cookie.startsWith(name + "=")) {
                return cookie.substring((name + "=").length); // Return the value of the cookie
            }
        }
        return null; // Return null if the cookie is not found
    }

    // Check if a username is stored in cookies
    var userName = getCookie("nme");
    if (!userName) {
        // Generate a random color if no cookie exists
		var userName = "Guest" + getRandomDigit();
        setCookie("nme", userName); // Store the username in a cookie
    }

    // Apply the stored or newly generated name
    setName(nme, userName);

    // Add event listener to change the username
    nme.addEventListener('input', function() {
		var newName = this.value;
        setCookie("nme", newName); // Update the cookie with the new username
        setName(nme, newName); // Apply the new username
        //console.log(`New Name: ${newName}`);
    });

    // Check if a color is stored in cookies
    var userColor = getCookie("color");
    if (!userColor) {
        // Generate a random color if no cookie exists
        var userColor = getRandomColor();
        setCookie("color", userColor); // Store the color in a cookie
    }

    // Apply the stored or newly generated color
    setColor(pick, userColor);

    // Add click event listener to change the color
    pick.onclick = function() {
        const newColor = getRandomColor(); // Generate a new random color
        setCookie("color", newColor, 365); // Update the cookie with the new color
        setColor(pick, newColor); // Apply the new color
        //console.log(`New Color: ${newColor}`);
    };

	// Function to append messages to the log
    function appendLog(item) {
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    }

	// Handle the form submission for sending messages
    message.onsubmit = function() {
        if (!conn) {
            return false;
        }
        if (!msg.value) {
            return false;
        }

	// Send username and message as JSON to the server
	const fullMessage = {
	username: nme.value,
	color: getComputedStyle(pick).backgroundColor,
	text: msg.value,
	};

	//console.log("Sending message:", JSON.stringify(fullMessage));
	conn.send(JSON.stringify(fullMessage));

	    // Clear the message input field
        msg.value = "";
        return false;
    };

	// Check if the browser supports WebSocket
    if (window["WebSocket"]) {
		function establishConnection() {
		    // Establish a WebSocket connection to the server

			// Event handler when open
			conn.onopen = function(evt) {
				console.log("%c Connection established to chat", "color: lightgreen");
			};
		    // Event handler for when the WebSocket connection is closed
	        conn.onclose = function(evt) {
				console.log("%c Connection closed, reconnecting...", "color: red");
				setTimeout(reconnect, 2000); // Reconnect after a delay
	        };
			// Event handler for when a message is received from the server
			conn.onmessage = function(evt) {
			    try {
				// Log raw data for debugging
				// console.log("Raw data received:", evt.data);

				// Parse the incoming JSON string into a JavaScript object
				const data = JSON.parse(evt.data);

				// Handle both single message and array of messages
				const messages = Array.isArray(data) ? data : [data];
				
				// Log parsed data for debugging
				// console.log("Parsed data:", data);

				// Ensure `data` has both `username` and `text`
				/* if (!data.username || !data.text) {
					console.error("Parsed data is missing username or text:", data);
					return;
				} */

				messages.forEach(data => {
					// Display username and message
					const item = document.createElement("div");
					item.id = 'box';
	
					// Create a span for the username with bold styling
					const nameDiv = document.createElement("div");
					nameDiv.textContent = data.username + ": ";
					nameDiv.style.color = data.color; // Make the color received from server
	
					// Create a div for the message text (on a new line)
					const messageDiv = document.createElement("div");
					messageDiv.textContent = data.text;
	
					// Append elements to display the message in the chat log
					item.appendChild(nameDiv); // Add username span
					item.appendChild(messageDiv); // Add message div
	
					// Append the constructed item to the chat log
					appendLog(item);
				});

			    } catch(error) {
			        console.error("Error processing WebSocket message:", error);
			    }
			};

			// Append log function implementation (ensure this exists)
			function appendLog(item) {
			    if (!log) {
			        console.error("Chat log container not found!");
			        return;
			    }
			    log.prepend(item);
			}
		}

	    // Function to reconnect
	    function reconnect() {
	        console.log('Reconnecting...');
	        establishConnection(); // Attempt to reconnect
	        reconnectDelay = 2000; // Increase delay for next attempt
	    }

	    // Establish the initial connection
	    establishConnection();
    } else {
		// If WebSockets are not supported by the browser, display an error message
        var item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>"; // Bold error message
        appendLog(item); // Append the error message to the log
    }
};
