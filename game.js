document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const width = 8;
    const candies = [];
    const candyColors = [
        'candy-1', 'candy-2', 'candy-3', 
        'candy-4', 'candy-5', 'candy-6'
    ];
    
    let selectedCandy = null;
    let selectedCandyId = null;
    
    // Crear la cuadrícula
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const candy = document.createElement('div');
            const randomColor = Math.floor(Math.random() * candyColors.length);
            candy.classList.add('candy', candyColors[randomColor]);
            candy.setAttribute('data-id', i);
            candy.setAttribute('draggable', 'false'); // Para la versión táctil
            candy.addEventListener('touchstart', selectCandy);
            candy.addEventListener('touchend', dropCandy);
            grid.appendChild(candy);
            candies.push(candy);
        }
    }

    // Seleccionar caramelos
    function selectCandy(event) {
        selectedCandy = event.target;
        selectedCandyId = parseInt(selectedCandy.getAttribute('data-id'));
    }

    // Soltar caramelos
    function dropCandy(event) {
        const targetCandy = event.target;
        const targetCandyId = parseInt(targetCandy.getAttribute('data-id'));
        const validMoves = [
            selectedCandyId - 1, selectedCandyId + 1, 
            selectedCandyId - width, selectedCandyId + width
        ];

        if (validMoves.includes(targetCandyId)) {
            swapCandies(selectedCandy, targetCandy);
            checkForMatches();
        }
    }

    // Intercambiar caramelos
    function swapCandies(candyOne, candyTwo) {
        const classOne = candyOne.className;
        const classTwo = candyTwo.className;
        
        candyOne.className = classTwo;
        candyTwo.className = classOne;
    }

    // Detectar coincidencias (básico para filas de 3)
    function checkForMatches() {
        // Filas
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = candies[i].className;
            const isBlank = decidedColor === '';

            if (rowOfThree.every(index => candies[index].className === decidedColor && !isBlank)) {
                rowOfThree.forEach(index => {
                    candies[index].className = '';
                });
            }
        }

        // Columnas
        for (let i = 0; i < 48; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = candies[i].className;
            const isBlank = decidedColor === '';

            if (columnOfThree.every(index => candies[index].className === decidedColor && !isBlank)) {
                columnOfThree.forEach(index => {
                    candies[index].className = '';
                });
            }
        }

        // Rellenar con nuevos caramelos
        setTimeout(() => {
            refillBoard();
        }, 100);
    }

    // Rellenar tablero después de eliminar coincidencias
    function refillBoard() {
        for (let i = 0; i < 64; i++) {
            if (candies[i].className === '') {
                const randomColor = Math.floor(Math.random() * candyColors.length);
                candies[i].classList.add(candyColors[randomColor]);
            }
        }
    }

    createBoard();
});
