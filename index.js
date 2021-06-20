const keyElem = document.getElementById('e.key'),
  locElem = document.getElementById('e.location'),
  whichElem = document.getElementById('e.which'),
  codeElem = document.getElementById('e.code'),
  mainElem = document.getElementsByClassName('main__key')[0],
  alertContainer = document.getElementsByClassName('alerts__container')[0];


function showCopyAlert() {
  const alertElem = document.createElement('div');
  alertElem.textContent = 'Text was copied';
  alertElem.classList.add('alert');
  alertContainer.appendChild(alertElem);
  
  const transition = [{
    opacity: 0, 
    transform: 'translate(400px, 0)'
  },{
    opacity: 1, 
    transform: 'translate(0, 0)'
  }];

  const animate = alertElem.animate(transition, {
      duration: 700,
      easing: 'ease-out'
    });
  
  setTimeout(() => {
    animate.reverse();
    animate.onfinish = () => {
        alertElem.remove();
    };
  }, 1000);
};


function showMainContent() {
  document.getElementById('startScreen').remove();
  document.getElementsByClassName('container')[0].style.display = 'flex';
}

function clickOnCardsHandler(e) {
  if (!e.target.closest('.card') || e.target.tagName === 'A') return;
  e.preventDefault();  

  const card = e.target.closest('.card');
  const text = card.querySelector('.card__content p').innerText;

  navigator.clipboard.writeText(text)
  .then(showCopyAlert)
  .catch(err => {
      console.log('Something went wrong', err.message);
  });
}

function writeKeyOnCards(code, key, location, which) {
  codeElem.innerText = code;
  
  if (code === 'Space') keyElem.innerText = '(Space character)';
  else keyElem.innerText = key;
  
  locElem.innerText = location;
  whichElem.innerText = which;
  mainElem.innerText = which;
}



document.body.addEventListener('keydown', e => {
  e.preventDefault();
  showMainContent();
}, {
  once: true
});

document.getElementsByClassName('cards')[0].addEventListener('click', clickOnCardsHandler);

document.body.addEventListener('keydown', e => {
  e.preventDefault();
  writeKeyOnCards(e.code, e.key, e.location, e.which);
});