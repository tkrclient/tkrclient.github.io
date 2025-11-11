# tkrclient.github.io
Website for TKRClient - built for iogames.fun website

TKRClient is a more fully-featured chatting front end:

it has color picking names, click to copy names, reduce spamming from unicodes, disable text wrapping to also reduce spam, and it has AN EXTRA BACKUP CHAT!

did you guys know tkr client let's you block any person!!!!!1!! 🔥💯💯💯🥵🥵🥵🥵🥵 🥶

https://tkrclient.github.io OR http://funchat.mooo.com

## How to add features?
you could just hijack any of the ```js/iochat/modules/*.js``` scripts to add your script i dont mind.

### OR

add your function name in this existing file: ```tkrclient.github.io/js/iochat/iochat-modules.js```

put your script containing your code in a new file here: ```tkrclient.github.io/js/iochat/modules/SCRIPT-NAME.js```

finally, put the file name in index.html: ```tkrclient.github.io/index.html```

for example, here is ```tkrclient.github.io/js/iochat/iochat-modules.js```:
```
'use strict';

document.addEventListener('DOMContentLoaded', function() {

    higherCharLimit();
    colorPicker();
    unicodeRemoval();
    keybindings();
    userBlocking();
    colorWheel();
    backgrounds();
    gifAutoload();
    // Added function name for script below
    SCRIPT-NAME();

});
```

and here is ```tkrclient.github.io/js/iochat/modules/SCRIPT-NAME.js```:
```
'use strict';

function SCRIPT-NAME() {

  /* Your code here */

};
```

and here is ```tkrclient.github.io/index.html``` (only need to see the "Website features" section):
```
<!-- testing -->
<!DOCTYPE html>
  <html lang="en">
  <!-- Header -->
  <head>
    <!-- Website features ------>
	<script src="js/iochat/modules/higher-char-limit.js"></script>
	<script src="js/iochat/modules/colorpicker.js"></script>
	<script src="js/iochat/modules/unicode-removal.js"></script>
	<script src="js/iochat/modules/keybindings.js"></script>
	<script src="js/iochat/modules/user-blocking.js"></script>
	<script src="js/iochat/modules/colorwheel.js"></script>
	<script src="js/iochat/modules/backgrounds.js"></script>
	<script src="js/iochat/modules/gif-autoload.js"></script>
    <!-- Newly added script below --> 
    <script src="js/iochat/modules/SCRIPT-NAME.js"></script>
    <script src="js/iochat/iochat-modules.js"></script>
    <!-- End ------------------->
```

## backend code of chat server:
https://github.com/tkrclient/iogames-chat

## backend code of drawing/whiteboard server:
https://github.com/tkrclient/iogames-draw
