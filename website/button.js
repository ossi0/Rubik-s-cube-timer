function sub() {
	$.post('/upload',{number: (Math.floor(Math.random() * 1000))}, sent, 'json');
}
		
function sent(data) {
	alert(data);
}