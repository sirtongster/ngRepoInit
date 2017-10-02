let socket = io.connect('http://localhost:7777', {'forceNew': true});

socket.on('messages', (data) => {
	console.log(data);
});

function render(data){
	let html;
	html = `<div>
				<strong>${data.author}</strong>:
				<em>${data.text}</em>
			</div>`;
	
	document.getElementById('messages').innerHTML = html;
}