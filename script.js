function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
    return inputArray
}

document.addEventListener('DOMContentLoaded', () => {
    const cardData = [
        { id: 1, content: "UN", number: 1 },
        { id: 2, content: "DEUX", number: 2 },
        { id: 3, content: "TROIS", number: 3 },
        { id: 4, content: "QUATRE", number: 4 },
        { id: 5, content: "CINQ", number: 5 },
        { id: 6, content: "SIX", number: 6 },
        { id: 7, content: "SEPT", number: 7 },
        { id: 8, content: "HUIT", number: 8 },
        { id: 9, content: "NEUF", number: 9 },
        { id: 10, content: "DIX", number: 10 },
        { id: 11, content: "ONZE", number: 11 },
        { id: 12, content: "DOUZE", number: 12 },
        { id: 13, content: "TREIZE", number: 13 },
        { id: 14, content: "QUATORZE", number: 14 },
        { id: 15, content: "QUINZE", number: 15 },

    ];

    const gameBoard = document.getElementById('gameBoard');
    shuffleArray(cardData.map((e, i) => {
        return [{ content: e.content, id: e.id }, { id: e.id, content: e.number }];
    })
        .flat())
        .forEach((e, i) => {
            const card = document.createElement('div');
            card.classList.add('card', 'flipped');
            card.dataset.cardId = e.id;
            card.innerHTML = `
            <div class="card-inner">
                <div class="front-face">${e.content}</div>
                <div class="back-face"></div>
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
