(() => {
	const freelancer = document.querySelector('[name=findTheFreelancer]').value;
	const findFreelancer = document.querySelector('#findFreelancer');

	const name = document.querySelector('.task-head').textContent;
	const about = document.querySelector('.task-text').textContent;
	
	findFreelancer.addEventListener('click', () => {

		console.log(freelancer);

  	let messageToTheServer = JSON.stringify({ freelancer });

  	const xhr = new XMLHttpRequest();
  	xhr.open('GET', '/freelancers', true);
  	xhr.setRequestHeader("Content-Type", "application/json");

  	xhr.addEventListener('load', () => {
    	let reqFromServer = JSON.parse(xhr.response);
			
			if (reqFromServer.name) {
				name = reqFromServer.name;
				about = reqFromServer.about;
			}
  	});
  
		xhr.send(messageToTheServer);
	});
})();  
  