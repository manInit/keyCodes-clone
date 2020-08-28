const key = document.getElementById('e.key'),
      loc = document.getElementById('e.location'),
      which = document.getElementById('e.which'),
      code = document.getElementById('e.code'),
      main = document.getElementsByClassName('main__key')[0],
      alertBlock = document.getElementsByClassName('alerts__container')[0];


function copyAlert() {
    const alertElem = document.createElement('div');
    alertElem.textContent = 'Text was copied';
    alertElem.classList.add('alert');
    alertBlock.appendChild(alertElem);
    
    const animate = alertElem.animate(
        [
            {opacity: 0, transform: 'translate(400px, 0)'},
            {opacity: 1, transform: 'translate(0, 0)'},
        ],
        {
            duration: 700,
            easing: 'ease-out'
        }
    );
    
    setTimeout(() => {
        animate.reverse();
        animate.onfinish = () => {
            alertElem.remove();
        };
    }, 1000);
};

document.body.addEventListener('keydown', e => {
    e.preventDefault();
    document.getElementById('start').remove();
    document.getElementsByClassName('container')[0].style.display = 'flex';
}, {once: true});

document.getElementsByClassName('cards__container')[0].addEventListener('click', e => {
    
    if (!e.target.closest('.card') || e.target.tagName === 'A') return;
    e.preventDefault();

    const card = e.target.closest('.card');
    const text = card.querySelector('.card__content p').innerText;

    navigator.clipboard.writeText(text)
    .then(copyAlert)
    .catch(err => {
        console.log('Something went wrong', err);
    });
});

document.body.addEventListener('keydown', e => {
    e.preventDefault();
    
    code.innerText = e.code;
    
    if (e.code === 'Space') key.innerText = '(Space character)';
    else key.innerText = e.key
    
    loc.innerText = e.location;
    which.innerText = e.which;
    main.innerText = e.which;
    
});