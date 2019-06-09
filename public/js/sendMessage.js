const message = document.querySelector('[name=message]');
const user1 = document.querySelector('.cont-dialog header').textContent;
const ul = document.querySelector('#dialog');

const sendAMessage = document.querySelector('#sendAMessage');

function getCurrentTime(date) {
  let year = String(date.getFullYear());
  let month = (date.getMonth() + 1) <= 9 
    ? '0' + String(date.getMonth() + 1) 
    : String(date.getMonth() + 1);

  let day = (date.getDate() + 1) <= 9
    ? '0' + String(date.getDate() + 1)
    : String(date.getDate() + 1);

  let hour = date.getHours() <= 9
    ? '0' + String(date.getHours())
    : String(date.getHours());
  
  let minute = date.getMinutes() <= 9
    ? '0' + String(date.getMinutes())
    : String(date.getMinutes());
    
  let currentTime = `${hour}:${minute} - ${day}:${month}:${year}`;
  return currentTime;
}

sendAMessage.addEventListener('click', () => { 

  let date = new Date();

  const dialog = {
    message: message.value,
    user1: user1,
    currentTime: getCurrentTime(date)
  };

  let messageToTheServer = JSON.stringify(dialog);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/messages/:id`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.addEventListener('load', () => {
    let reqFromServer = JSON.parse(xhr.response);
    if (reqFromServer.message === dialog.message) {
      let li = document.createElement('li');

      let divMessage = document.createElement('div');
      divMessage.classList.add('message');
      divMessage.textContent = dialog.message;

      let divTime = document.createElement('div');
      divTime.classList.add('time');
      divTime.textContent = dialog.currentTime;

      li.appendChild(divMessage);
      li.appendChild(divTime);

      li.style.background = '#eee';

      ul.appendChild(li);
      dialog.message = '';
      message.value = '';
      
    } else {
      console.log('Не удалось отправить сообщение!');
    }
  });
  
	xhr.send(messageToTheServer);
});