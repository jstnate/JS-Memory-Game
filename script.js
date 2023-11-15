function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
    return inputArray
}

document.addEventListener('DOMContentLoaded', () => {
    const cardData = [
        { id: 1, content: "Good Bye", imageUrl: "<img src='assets/bye.svg'>" },
        { id: 2, content: "Hello", imageUrl: "<img src='assets/hello.svg'>" },
        { id: 3, content: "I Love You", imageUrl: "<img src='assets/loveYou.svg'>" },
        { id: 4, content: "No", imageUrl: "<img src='assets/no.svg'>" },
        { id: 5, content: "Please", imageUrl: "<img src='assets/please.svg'>" },
        { id: 6, content: "Sorry", imageUrl: "<img src='assets/sorry.svg'>" },
        { id: 7, content: "Thank you", imageUrl: "<img src='assets/thankYou.svg'>" },
        { id: 8, content: "Yes", imageUrl: "<img src='assets/yes.svg'>" },
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
                <div class="back-face"><img src="assets/3026570.svg" style="width: 80%; height: 80%; object-fit: contain;"/></div>
            </div>`;
            gameBoard.appendChild(card);
        })

    const cards = document.querySelectorAll('.card');
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;

    function flipCard() {
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
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.cardId === secondCard.dataset.cardId;

        isMatch ? disableCards() : unflipCards();
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
});    
