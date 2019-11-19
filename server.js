const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(80);

let count = 0;
let activeColor = '#f1f1f1';
console.log('basladsim user');


io.on('connection', socket => {
    console.log('new user');
    count++;
    io.emit('newUser',count);
    socket.emit('changeColor',activeColor);

    socket.on("changeColor",color =>{
        activeColor = color;
        socket.broadcast.emit("changeColor",activeColor);

    })
    socket.on('disconnect',() =>{
        count--;
        io.emit('disUser',count);
        console.log("disconnect kullanici");
    })
});
