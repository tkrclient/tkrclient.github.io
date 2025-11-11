# tkrclient.github.io
Website for TKRClient - built for iogames.fun website

TKRClient is a more fully-featured chatting front end:

it has color picking names, click to copy names, reduce spamming from unicodes, disable text wrapping to also reduce spam, and it has AN EXTRA BACKUP CHAT!

did you guys know tkr client let's you block any person!!!!!1!! 🔥💯💯💯🥵🥵🥵🥵🥵 🥶

https://tkrclient.github.io OR http://funchat.mooo.com

### How to add features?
add your function name in this file: ```tkrclient.github.io/js/iochat/iochat-modules.js```

add the script containing your code here: ```tkrclient.github.io/js/iochat/modules/SCRIPT-NAME.js```

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

### backend code of chat server:
https://github.com/tkrclient/iogames-chat

### backend code of drawing/whiteboard server:
https://github.com/tkrclient/iogames-draw
