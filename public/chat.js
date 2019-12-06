
var express = require('express'); //передаємо змінній експрес підключення модуля
var app = express(); // створення програми
var server = require('http').createServer(app) // підключення модуля http і створення сервера для застосунку 
var io = require('socket.io').listen(server); // підключаємо socket.io  і передаємо сервер який потрібно відслудковувати

server.listen(3000);                     // порт який відслідковує сервер
app.get('/',function(request,respons){  // при заході на говну сторінкку
    respons.sendFile(__dirname+'/index.html') // відправляємо файл
});

users=[];                      //масив користувачів
connections=[];                //    масив з'єднань    

io.sockets.on('connection', function (socket) { //якщо ми зайшли на сайт (функція приймає сокет підключення)
    console.log("Вдалe з'єднання");              // в конслолі виведеться повідолмення
    connections.push(socket);                     // додаємо об'єкт сокет в  масив

    socket.on('disconnect', function(data){      //якщо відключились
        connections.splice(connections.indexOf(socket),1); //видаляємо елемент з масив
        console.log("Відключились"); // виводимо інформацію
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess,name: data.name, className: data.className});// викликаємо подію add mess
    });
});

