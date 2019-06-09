(() => {
    
		const about = document.querySelector('#aboutUser');
		
    const saveAbout = document.querySelector('#saveAbout');


	saveAbout.addEventListener('click', () => {

		console.log(about.value);
			let user = JSON.stringify({ about: about.value });

			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/userProfile', true);
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.addEventListener('load', () => {
				let userFromServer = JSON.parse(xhr.response);
				window.location.reload();
			});
			xhr.send(user);
	});
})();	
