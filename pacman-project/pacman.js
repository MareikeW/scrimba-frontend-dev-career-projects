const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');

const width = 28; // 28 Kästen pro Zeile
let squares = []; // dort werden alle Kästchen gespeichert
let score = 0; // startpunktzahl bei 0

//28 * 28 = 784
// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// Erstelle Spielfeld
// Es werden 784 Kästchen/divs erstellt und ins .grid gemacht
// Jedes div wird auch dem Array squares (s.o) hinzugefügt.
function createGridBoard() {

    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        //fügt jedem Index im Square-Array die korrekte Klasse hinzu
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    }
}

createGridBoard();

// Startposition von Pacman
let pacmanCurrentIndex = 494;

squares[pacmanCurrentIndex].classList.add('pacman');

function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman');
    switch (e.keyCode) {
        // Bewegung nach links
        case 37: 
            if (
                // wenn die nächste Position kein Geist oder eine Wand ist, dann einen Schritt nach links
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
            )
                pacmanCurrentIndex -= 1;
            //Pacmans shortcut von linker Seite zur rechten Seite
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391;
            }
            break;
        // Bewegung nach oben
        case 38:
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
            )
                pacmanCurrentIndex -= width;
            break;
        // Bewegung nach rechts
        case 39:
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
            )
                pacmanCurrentIndex += 1

            //Pacmans shortcut von rechter Seite zur linken Seite
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364;
            }
            break;
        // Bewegung nach unten
        case 40:
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
            )
                pacmanCurrentIndex += width
            break;
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotOrPowerPelletEaten();
}

document.addEventListener('keydown', movePacman);

// Wenn Pacman einen Pacdot isst, erhöht sich seine Punktzahl um 1
// Bei einer Power-Pellet um 10 Punkte
function pacDotOrPowerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
    } else if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        score += 10;
        //bei den vier Geistern frieren ein
        ghosts.forEach(ghost => ghost.isScared = true)
        // Geister können sich nach 10 Sekunden wieder bewegen
        setTimeout(unScareGhosts, 10000)
    }
    scoreDisplay.innerHTML = score;
}

// nach 10 Sekunden sind die Geister wieder normal
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// Klasse als Geistervorlage
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

// Geister in einem Array
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// Gheist ins Spielfeld setzen
ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
})

// bewege Geister
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    // mögliche Richtungen
    const directions = [-1, +1, -width, +width]
    // Wählt zufällig eine Richtung aus
    // Math.random() gibt Kommazahl aus & Math.floor rundet sie auf ganze Zahl ab (Int)
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        // Wenn das nächste Kästchen keine wall oder einen anderen Gheist enthält
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            //lass Geist verschwinden
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            //In welche Richtung soll Geist sich bewegen
            ghost.currentIndex += direction
            //Geist taucht wieder auf
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //wenn die Geister gerade scared sind
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //wenn ein Geist gerade scared ist UND Pacman auf demselben Feld ist
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //Lösche Classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            //Wenn Pacman einen Geist berührt, kommt dieser wieder zurück an den Anfang
            ghost.currentIndex = ghost.startIndex
            //Erhöhe Punktzahl um 100 Punkte
            score += 100
            //Füge die Classnames wieder hinzu ghost.className und 'ghost'
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver();
        checkForWin();
    }, ghost.speed)
}

//Check, ob Game Over
function checkForGameOver() {
    // Wenn das Kästchen, auf dem Pacman steht einen Geist ABER KEINEN scared Geist
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
        // jeder Geist soll aufhören sich zu bewegen

        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //lösche eventListener von movePacman-Funktion
        document.removeEventListener('keyup', movePacman)
        // Zeigt GAME OVER an
        scoreDisplay.innerHTML = 'GAME OVER'
    }
}

// Check, ob Gewonnen
function checkForWin() {
    if (score === 274) {
        //Halte jeden Geist an
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //lösche eventListener von movePacman-Funktion
        document.removeEventListener('keyup', control)
        //Zeigt GEWONNEN an
        scoreDisplay.innerHTML = 'GEWONNEN!'
    }
}