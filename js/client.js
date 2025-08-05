'use strict';

var Client = function(server, room, onMessage)
{
    this.send = function(type, msg)
    {
        msg.type = type;
        socket.send(JSON.stringify(msg));
    };

    this.chat =
    {
        name : function(name)
        {
            Cookies.set("name", name, { expires : 3650 });
            document.getElementById("name").value = name;
        },

        color : function(color)
        {
            Cookies.set("color", color, { expires : 3650 });
            document.getElementById("colorpicker").style.color = color;
        }
    };

    let socket = null;

    function connect()
    {
        if(socket !== null)
        {
            socket.onopen = function(){};
            socket.onclose = function(){};
            socket.onerror = function(){};
            socket.onmessage = function(){};

            socket = null;
        }

        socket = new WebSocket(server + "/?room=" + room);

        socket.onopen = function()
        {
            console.log("WebSocket Connected");
        };

        socket.onclose = function(event)
        {
            console.log("WebSocket Closed");
            setTimeout(connect, 3000);
        };

        socket.onerror = function(error)
        {
            console.log("WebSocket Error");
            setTimeout(connect, 3000);
        };

        socket.onmessage = function(event)
        {
            try
            {
                onMessage(JSON.parse(event.data));
            }
            catch(e)
            {
                console.error(e.stack);
            }
        };
    }

    connect();
};
