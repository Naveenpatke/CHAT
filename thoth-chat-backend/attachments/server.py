<html>
<head>
<title>Chat Room</title>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.min.js"></script>
</head>
<body>


<input type="text" id="myMessage">

<button id="sendbutton">Send</button>

<input type="file" id="attachment">

</body>
<script type="text/javascript">
var sender_id = prompt("please enter your id")
var conversation_id = prompt("please enter conversation id")

<!--var xhttp = new XMLHttpRequest();-->
<!--xhttp.open("GET", "http://localhost:5000/conversation/2", false);-->
<!--xhttp.send();-->
<!--console.log(xhttp.responseText)-->

var socket = io.connect('http://127.0.0.1:5000');

console.log(conversation_id)
socket.emit('join',JSON.stringify({"room_id":conversation_id}))

socket.on('connect', function() {
    console.log('User has connected!');
});

socket.on('chat',function(data) {
    console.log(JSON.stringify(data))
})

socket.on('join',function(data) {
    console.log(JSON.stringify(data))
})

var control = document.getElementById("attachment")

control.addEventListener("change", function(event) {

    var files = control.files
    var reader = new FileReader()
    reader.onload = function(e) {
        var contents = e.target.result
        console.log("File contents: " + contents)

        socket.emit('upload_attachments',{
        name:files[0].name,
        type:files[0].type,
        size:files[0].size,
        contents:contents,
        sender_id:sender_id,
        conversation_id:conversation_id

        })
    }

    reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
    }

    console.log(files[0])
    reader.readAsArrayBuffer(files[0])
})

<!--socket.on('message', function(data) {-->
<!--    console.log(JSON.stringify(data));-->
<!--});-->

document.querySelector("#sendbutton").onclick = () => {
    socket.emit('chat',JSON.stringify({"sender_id":sender_id,"content":document.querySelector("#myMessage").value,"conversation_id":conversation_id}))
};

<!--document.querySelector("#con1").onclick = () => {-->
<!--     socket.emit('leave')-->
<!--     socket.emit('join',JSON.stringify({"room_id":1}))-->
<!--};-->

<!--document.querySelector("#con2").onclick = () => {-->
<!--     socket.emit('leave')-->
<!--     socket.emit('join',JSON.stringify({"room_id":2}))-->
<!--};-->

<!--document.querySelector("#con3").onclick = () => {-->
<!--     socket.emit('leave')-->
<!--     socket.emit('join',JSON.stringify({"room_id":3}))-->
<!--};-->
</script>
</html>
