'use strict';

function colorWheel() {

    /* cookie color catcher below */

    // Function to generate a random color
    function getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).padStart(6, "0");
    }

    var pick = document.getElementById("usernameColorPicker"); // Username's Colorpicker

    // Function to set background-color and text color
    function setColor(element, color) {
        //element.style.backgroundColor = color;
        //element.value="#e66465";
        element.value = color;
        //element.style.color = "#FFFFFF"; // Default text color (white)
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

    // Check if a color is stored in cookies
    var userColor = getCookie("color");
    if (!userColor) {
        // Generate a random color if no cookie exists
        var userColor = getRandomColor();
        setCookie("color", userColor); // Store the color in a cookie
    }

    // Apply the stored or newly generated color
    setColor(pick, userColor);

    /* username colorpicker */

    // Add the color picker to the page
    const colorPicker = document.querySelectorAll('.colorPickerClass');
    
    // Function to update the username color
    function updateUsernameColor(event) {
        const nameColor = document.getElementById('colorpicker');
        nameColor.style.removeProperty('all');
        nameColor.style.color = event.target.value;
    }
    
    // Add event listener to the color picker
    colorPicker.forEach(picker => {
        picker.addEventListener('input', updateUsernameColor);
        picker.value = userColor;
        picker.addEventListener('input', () => {
            const newColor = picker.value; // Get the newly picked color
            
            // Update the color value of all color pickers with the same class
            colorPicker.forEach(p => p.value = newColor);

            var userColor = pick.value;
            //var userColor = nameColor.value;
            setCookie("color", userColor); // Store the color in a cookie
        });
    });

    // Optionally, set an initial color
    /* colorPicker.value = '#ff0000'; // Red
    updateUsernameColor({target: {value: colorPicker.value}}); */

};
