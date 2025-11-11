'use strict';

document.addEventListener('DOMContentLoaded', function() {

    /*----------------------------------*/
    /*---- Minor Tweaks to the Chat ----*/
    /*----------------------------------*/
    
    /*---- Higher char limits ----*/
    // Higher character limit for chat box
    const messageInput = document.getElementById('message'); {
      messageInput.setAttribute('maxlength', '1000'); // 400 character limit
    }
    // Higher character limit for name box
    const nameInput = document.getElementById('name'); {
      nameInput.setAttribute('maxlength', '1000'); // 400 character limit
    } 
});
