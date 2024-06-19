## Guide on self-hosting your own "iogames.fun" chat
You can choose either, buying a VPS, or setting it up at home. 

If setting it up at home, you can choose whether or not you want to publicly show your home 
ip address.

## Self-hosting at a public server
Once you get a VPS, you will need to install npm in your Linux package manager

`$ npm install socket.io express`

`$ git clone https://github.com/script14/script14.github.io`

`$ mkdir CHAT`

`$ cp script14.github.io/js/index.html CHAT    //This will be your client-side websocket` <br>
`$ cp script14.github.io/js/index.js CHAT    //This will be your server-side websocket`

`$ cd CHAT`

`$ npm init`

Now to run the chat-server: `$ node index.js`

I recommend using a reverse proxy manager, but it is not absolutely necessary unless you are also
running other services on your vps.

If not wanting to do a reverse proxy manager
Connect your domain name, from your domain name provider, to your public server VPS ip address via
"A".

## Self-hosting at Home
### Hide Home IP Address
Now setting up to NOT publicly show your ip address, you WILL need a VPS anyway for. 
But, the VPS is only for proxying over to (although it doesn't matter that much in this case,
because this chat server is lightweight), so you can have a very powerful homelab,
and also depublicly list your home ip address.

I recommend something that proxies the connection from your homelab, to the VPS, 
for example: https://github.com/ekzhang/bore

Then after setting up bore, you can continue the guide on "self-hosting at a public server"

### NOT Hide Home IP Address
Many Home ISPs are not going to be as extensive and permissive on what ports you can open. It is
recommended to do proxying.

You can follow the guide on "self-hosting at a public server", but you will need to port 
forward ports 443 and 80.
