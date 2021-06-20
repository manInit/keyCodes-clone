const keyElem = document.getElementById('e.key'),
  locElem = document.getElementById('e.location'),
  whichElem = document.getElementById('e.which'),
  codeElem = document.getElementById('e.code'),
  mainElem = document.getElementsByClassName('main__key')[0],
  alertContainer = document.getElementsByClassName('alerts__container')[0];

const spaceDescription = '(Space character)';

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
  let text = card.querySelector('.card__content p').innerText;
  if (text === spaceDescription) text = ' ';

  navigator.clipboard.writeText(text)
  .then(showCopyAlert)
  .catch(err => {
      console.log('Something went wrong', err.message);
  });
}

function writeKeyOnCards(code, key, location, which) {
  codeElem.innerText = code;
  
  if (code === 'Space') keyElem.innerText = spaceDescription;
  else keyElem.innerText = key;
  
  locElem.innerText = location;
  whichElem.innerText = which;
  mainElem.innerText = which;
}

//theme = 'dark'|'light'
function switchTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

document.body.addEventListener('keydown', e => {
  e.preventDefault();
  showMainContent();
}, {
  once: true
});

document.body.addEventListener('keydown', e => {
  e.preventDefault();
  writeKeyOnCards(e.code, e.key, e.location, e.which);
});

document.getElementsByClassName('cards')[0].addEventListener('click', clickOnCardsHandler);

document.addEventListener('DOMContentLoaded', e => {
  const themeSwitcher = document.getElementById('switcherThemeCheck');
  let theme = localStorage.getItem('theme') ?? 'light';
  themeSwitcher.checked = theme === 'dark';
  
  document.documentElement.setAttribute('data-theme', theme);

  themeSwitcher.addEventListener('change', e => {
    switchTheme(e.currentTarget.checked ? 'dark' : 'light');
  })
});