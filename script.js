function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
    return inputArray
}

const cardData = [
    { id: 1, content: "Good Bye", imageUrl: "<img src='assets/bye.svg'>", url: 'assets/bye.svg' },
    { id: 2, content: "Hello", imageUrl: "<img src='assets/hello.svg'>", url: 'assets/hello.svg' },
    { id: 3, content: "I Love You", imageUrl: "<img src='assets/loveYou.svg'>", url: 'assets/loveYou.svg' },
    { id: 4, content: "No", imageUrl: "<img src='assets/no.svg'>", url: 'assets/no.svg' },
    { id: 5, content: "Please", imageUrl: "<img src='assets/please.svg'>", url: 'assets/please.svg' },
    { id: 6, content: "Sorry", imageUrl: "<img src='assets/sorry.svg'>", url: 'assets/sorry.svg' },
    { id: 7, content: "Thank you", imageUrl: "<img src='assets/thankYou.svg'>", url: 'assets/thankYou.svg' },
    { id: 8, content: "Yes", imageUrl: "<img src='assets/yes.svg'>", url: 'assets/yes.svg' },
];


const gameBoard = document.getElementById('gameBoard');
shuffleArray(cardData.map((e, i) => {
    return [{ content: e.content, id: e.id }, { id: e.id, content: e.imageUrl }];
})
    .flat())
    .forEach((e, i) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flipped');
        card.dataset.cardId = e.id;
        card.innerHTML = `
        <div class="card-inner">
            <div class="front-face">${e.content}</div>
            <div class="back-face"><img src="assets/question-mark.png" style="width: 100%; height: 100%; object-fit: contain;"/></div>
        </div>`;
        gameBoard.appendChild(card);
    })

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(e) {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.remove('flipped');

    if (!hasFlippedCard) {
        // Premier clic
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Deuxième clic
    secondCard = this;
    const isMatch = checkForMatch();
    if (isMatch) {
        const cardEl = e.target.closest('.card')
        console.log(cardEl.querySelector('img'))
        const img = document.createElement('img')
        img.src = cardData.find(card => card.id === +cardEl.dataset.cardId).url
        const txt = document.createElement('span')
        txt.textContent = cardData.find(card => card.id === +cardEl.dataset.cardId).content
        const card = document.createElement('div')
        card.appendChild(img)
        card.appendChild(txt)
        card.classList.add('carde')
        inner.appendChild(card)
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.cardId === secondCard.dataset.cardId;

    isMatch ? disableCards() : unflipCards();
    return isMatch
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.add('flipped');
        secondCard.classList.add('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));

const drawer = document.querySelector('main .drawer')
const inner = document.querySelector('main .drawer .inner')
let isOpen = false
document.querySelector('main .drawer .truc').addEventListener('click', (e) => {
    if (drawer.classList.contains('paused')) drawer.classList.remove('paused')
    isOpen = !isOpen
    isOpen ? drawer.classList.remove('reverse') : drawer.classList.add('reverse')

    const el = drawer
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
})