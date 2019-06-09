const toRespond = document.querySelector('[name=toRespond]');
const result = document.querySelector('#result');

toRespond.addEventListener('click', () => {

  const employerName = document.querySelector('#empName').textContent;

  console.log(employerName);

  let request = JSON.stringify({ 
    employerName: employerName
  });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/market/:id`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.addEventListener('load', () => {
    let reqFromServer = JSON.parse(xhr.response);
    if (reqFromServer === 'Заявка принята') {
      console.log(reqFromServer);
      result.textContent = reqFromServer;
      setTimeout(() => {
        result.textContent = '';
      }, 5000);
    } else if (reqFromServer === 'Вы не можете откликнуться сами на себя!') {
      result.textContent = reqFromServer;
      setTimeout(() => {
        result.textContent = '';
      }, 5000);
    }
  });
  
	xhr.send(request);
});