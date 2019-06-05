const toRespond = document.querySelector('[name=toRespond]');

toRespond.addEventListener('click', () => {

  const employerName = document.querySelectorAll('.name');
  const taskId = document.querySelectorAll('#task_id');

  console.log(employerName);
  console.log(taskId);
  console.log(typeof taskId);

    /*let request = JSON.stringify({ 
      employerName: employerName,
      taskId: taskId 
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/market`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener('load', () => {
      let reqFromServer = JSON.parse(xhr.response);
      if (reqFromServer === 'Заявка принята') {
        console.log(reqFromServer);
      } else {
        console.log('Что то пошло не так');
      }
      

    });
		xhr.send(request);*/
		
});