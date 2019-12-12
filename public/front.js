var min = 1;
var max = 6;
var random = Math.floor(Math.random()*(max-min)) + min;
var alertClass;
switch(random){
    case 1:
        alertClass = 'secondary';
        break;
    case 2: 
        alertClass = 'danger';
        break;
    case 3:
        alertClass = 'success';
        break;
    case 3:
        alertClass = 'warning';
        break;
    case 4:
        alertClass = 'warning';
        break;
    case 5:
        alertClass = 'info';
        break;
    case 6:
        alertClass = 'light';
        break;
};
$(function(){
    var socket=io.connect(); //коли заходимо на сторінку з'єднання
    var $form = $("#messForm");
    var $name = $("#name");
    var $textarea = $("#massage");
    var $all_massage = $("#all_mess");

    $form.submit(function(event){
        event.preventDefault(); // при натисканні на кнопку сторінка не буде перезагружатися
        socket.emit('send mess',{mess: $textarea.val(),name: $name.val(), className: alertClass});// створюємо подію
        $textarea.val(''); // очищуємо текстове поле
    });

    socket.on('add mess', function(data){
     $all_massage.append("<div class ='alert alert-" + data.className + "'><b>"  +data.name+"</b>: " + data.mess + "</div>");
    });
});