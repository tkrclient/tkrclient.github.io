document.addEventListener('DOMContentLoaded', function() {

  const toggleButtonChat = document.getElementById('toggleButtonChat');
  const chat = document.getElementById('chat');
  console.log("sidebar");
  const toggleButtonSidebar = document.getElementById('toggleButtonSidebar');
  const sidebars = document.getElementById('sidebars');
  console.log("sidebar again");
  const toggleButtonSidebarDesktop = document.getElementById('toggleButtonSidebarDesktop');
  const toggleButtonFullscreen = document.getElementById('toggleButtonFullscreen');
  console.log("toggleButtonFullscreen");
  const secondChatButton = document.getElementById('secondChatButton');
  const secondChatServer = document.getElementById('secondChatServer');
  console.log("secondChatServer");
  const firstDrawButton = document.getElementById('firstDrawButton');
  const firstDrawServer = document.getElementById('firstDrawServer');
  console.log("firstDrawServer");
  const secondChatButtonMobile = document.getElementById('secondChatButtonMobile');
  console.log("secondChatServerMobile");

  toggleButtonChat.addEventListener('click', () => {
    console.log("button clicked");
    chat.classList.toggle('active');
  });
  console.log("side");
  toggleButtonSidebar.addEventListener('click', () => {
    console.log("button clicked");
    sidebars.classList.toggle('active');
  });
  console.log("side");
  toggleButtonSidebarDesktop.addEventListener('click', () => {
    console.log("button clicked");
    sidebars.classList.toggle('active');
  });
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  toggleButtonFullscreen.addEventListener('click', toggleFullscreen);
  // Second chat button
  secondChatButton.addEventListener('click', () => {
    console.log("button clicked");
    secondChatServer.classList.toggle('hide');
  });
  // First draw button
  firstDrawButton.addEventListener('click', () => {
    console.log("draw button clicked");
    firstDrawServer.classList.toggle('hide');
  });
  // Second chat button mobile
  secondChatButtonMobile.addEventListener('click', () => {
    console.log("button clicked");
    secondChatServer.classList.toggle('hide');
  });

  //Console log to tell if iogames.fun is loading for you
  console.log('Loading IOGames.fun chat...');
  function chatMessage(type, options) {

    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = options.name + ":";
    
    const message = document.createElement("div");
    message.classList.add("message");

    /*-- I believe this is for the initial IOGames Bot (which has a bright green name) --*/
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
    
    /*-- IOGames AMOUNT OF MESSAGES! --*/
    //const messages = document.getElementById("messages");
    
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

  /*-- IOGames Chat server (which uses wss websockets, which reminds me of socket.io) --*/
  const client = new Client("wss://iogames.fun/server", "@global", function(msg) {
    lastTime = new Date();      
    chatMessage("user", msg);
  });

  /*-- IOGames.fun Bot welcoming introduction --*/
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

  /*-- See message color? --*/
  function say() {
      const nameInput = document.getElementById("name");
      const messageInput = document.getElementById("message");
      const colorPicker = document.getElementById("colorpicker");
  
      if (nameInput.value.length && messageInput.value.length) {
          client.send("message", {
              name: nameInput.value,
              color: getComputedStyle(colorPicker).color,
              message: messageInput.value
          });
          messageInput.value = "";
      }
  }


  /*-- Color randomizer for the color palette icon AND name --*/
  const colorpicker = document.getElementById("colorpicker");
  
  colorpicker.addEventListener("click", function(e) {
      client.chat.color("#" + Math.random().toString(16).slice(2, 8));
      e.preventDefault();
  });


  /*-- Initial Guest____ name with randomized numbers on the end PLUS randomized color when new to site --*/
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
  const messageInput = document.getElementById("message");
  
  messageInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
          say();
      }
  });


  const checkboxes = document.querySelectorAll(".checkbox");
  
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
      this.classList.toggle("checked");
    });
  });

  document.querySelectorAll(".layer").forEach(layer => {
    layer.addEventListener("click", function(e) {
      e.preventDefault();
  
      // Fade out effect, "fast" ~ 200ms
      let opacity = 1;
      const fadeDuration = 200; // ms
      const intervalTime = 20;  // ms
      const fadeStep = intervalTime / fadeDuration;
  
      const fadeOutInterval = setInterval(() => {
        opacity -= fadeStep;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fadeOutInterval);
          this.style.display = "none";
  
          // Remove all iframe elements inside elements with class "layer"
          document.querySelectorAll(".layer iframe").forEach(iframe => iframe.remove());
        }
        this.style.opacity = opacity;
      }, intervalTime);
  
    });
  });


  /*-- I assume this is for the information on the navbar --*/
  document.querySelectorAll("[data-favorite]").forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
  
      const gameId = parseInt(this.getAttribute("data-favorite"));
      let favorites = Cookies.getJSON("favorites");
  
      if (this.classList.contains("icon-toggle-active")) {
        if (favorites !== undefined) {
          const index = favorites.indexOf(gameId);
          if (index !== -1) {
            favorites.splice(index, 1);
            Cookies.set("favorites", favorites, { expires: 3650 });
          }
        }
      } else {
        if (favorites === undefined) {
          favorites = [gameId];
        } else {
          favorites.push(gameId);
        }
        Cookies.set("favorites", favorites, { expires: 3650 });
      }
  
      // this.parentNode.find(".icon-toggle").toggleClass("hide") replacement:
      const iconToggles = this.parentNode.querySelectorAll(".icon-toggle");
      iconToggles.forEach(iconToggle => {
        iconToggle.classList.toggle("hide");
      });
    });
  });
});
