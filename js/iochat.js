'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Console log to tell if iogames.fun is loading for you
  console.log('Loading IOGames.fun chat...');

  function chatMessage(type, options) {
    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = options.name + ":";
    
    const message = document.createElement("div");
    message.classList.add("message");

    // Initial IOGames Bot variables
    if(type == "system") {
      name.classList.add("system");
      message.innerHTML = options.message;
    }
    else {
      name.style.color = options.color;
      message.textContent = options.message;
    }
      
    let entry = document.createElement("div");
    entry.classList.add("entry");        // add the "entry" class
    entry.appendChild(name);             // append the 'name' element
    entry.appendChild(message);          // append the 'message' element

    const messages = document.getElementById("messages");
    messages.insertBefore(entry, messages.firstChild);
    
    // Amount of messages
    while (messages.querySelectorAll(".entry").length > 1000) {
      const entries = messages.querySelectorAll(".entry");
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        messages.removeChild(lastEntry);
      } else {
        break; // in case no entries found, break out of the loop
      }
    }
  }
      
  let lastTime = null;

  // Websocket server
  const client = new Client("wss://iogames.fun/server", "@global", function(msg) {
    lastTime = new Date();      
    chatMessage("user", msg);
  });

  // IOGames.fun bot welcoming introduction
  const welcomeInterval = setInterval(function() {
    const now = new Date();
    if(lastTime !== null) {
      if(now - lastTime > 1000) {
        clearInterval(welcomeInterval);
        chatMessage("system", {
          name : "tkrclient.fun",
          message : 'Thank you for using TKRClient! On the left side you can see an alternative chat if this one is being spammed or is uncomfortable. </a>'
        });
      }
    }
  }, 200);
	
  // Send message function
  function sendMessage() {
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const colorPicker = document.getElementById("colorpicker");

	if (!client || !messageInput.value) {
      return false; // Either client not initialized or empty message
	}

	const message = {
      name: nameInput.value,
      color: getComputedStyle(colorPicker).color,
      message: messageInput.value
	};

    client.send("message", message);
    messageInput.value = ""; // Clear message input
    messageInput.focus(); // Keep focus for next message
    return true; // Indicate message was sent
  }
	
  // Press enter to send message
  const messageInput = document.getElementById("message");
    messageInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      sendMessage(); // Send the message
    }
  });
  
  // Color randomizer for the color palette icon and name
  const colorpicker = document.getElementById("colorpicker");
  
  colorpicker.addEventListener("click", function(e) {
      client.chat.color("#" + Math.random().toString(16).slice(2, 8));
      e.preventDefault();
  });

  // Initial Guest____ name with randomized numbers on the end
  // + randomized color when new to site
  if(Cookies.get("name") === undefined || !Cookies.get("name").length) {
    client.chat.name("Guest" + Math.floor(Math.random() * 10000));
  }
  else {
    client.chat.name(Cookies.get("name"));
  }      
  if(Cookies.get("color") === undefined) {
    client.chat.color("#" + Math.random().toString(16).slice(2, 8));
  }
  else {
    client.chat.color(Cookies.get("color"));
  }
  const nameInput = document.getElementById("name");
  
  nameInput.addEventListener("change", function() {
      Cookies.set("name", this.value, { expires: 3650 });
  });
});
