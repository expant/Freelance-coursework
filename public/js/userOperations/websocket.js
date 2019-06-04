(() => {
	const submit = document.querySelector('#ws');
	const ws = new WebSocket('ws://localhost:3000');

  function setStatus(val) {
    return console.log(val);	  
  }
    
  function printMessage(val) {
    return console.log(val)
  }
		
	submit.addEventListener('click', () => {
		ws.send('АААААААААА');
	});

  ws.onopen = setStatus('ONLINE');
  ws.onclose = setStatus('OFFLINE');
    
  ws.onmessage = response => printMessage(response.data);
})();

