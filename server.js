const http = require('http').createServer();
const io = require('socket.io')(http);
http.listen(process.env.PORT || 3000, function() {
  console.log('basladsim user');
})

let count = 0;
let activeColor = '#f1f1f1';



io.on('connection', socket => {
    console.log('new user');
    count++;
    io.emit('newUser',count);
    socket.emit('changeColor',activeColor);

    socket.on("changeColor",color =>{
        activeColor = color;
        console.log('renk degisti bilgisi');
        socket.broadcast.emit("changeColor",activeColor);

    });
    socket.on('disconnect',() =>{
        count--;
        io.emit('disUser',count);
        
        console.log("disconnect kullanici");
    });
});
