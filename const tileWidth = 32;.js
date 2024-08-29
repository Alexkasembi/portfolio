const tileWidth = 32;
const tileHeight = 32;
const dungeonWidth = 21;
const dungeonHeight = 11;
const dungeon = document.getElementById('game');

let pickaxeCount = 30;
let crystalCounter = 0;

function generateGrid() {
    for (let i = 0; i < dungeonHeight; i++) {
        for (let j = 0; j < dungeonWidth; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.width = ${tileWidth}px;
            tile.style.height = ${tileHeight}px;

            const random = Math.random();
            let tileType;
            if (random < 0.8) {
                tileType = 'crystal';
            } else if (random < 0.9) {
                tileType = 'crystal';
            } else {
                tileType = 'empty';
            }
            
            tile.classList.add(tileType);
            dungeon.appendChild(tile);
        }
    }

    // Place the character in the middle of the dungeon
    const middleDungeon = Math.floor((dungeonHeight * dungeonWidth) / 2);
    const characterTile = dungeon.children[middleDungeon];
    const character = document.createElement('div');
    character.id = 'character';
    characterTile.appendChild(character);
}

function findCrystal() {
    crystalCounter++;
    document.getElementById("crystalCounter").textContent = crystalCounter.toString();
    // Manage pickaxe and tile
}

function moveCharacter(dx, dy) {
    const character = document.getElementById('character');
    const characterTile = character.parentElement;

    const x = Array.from(characterTile.parentElement.children).indexOf(characterTile);
    const y = Array.from(characterTile.children).indexOf(character);

    const newXPos = x + dx;
    const newYPos = y + dy;

    if (newXPos >= 0 && newXPos < dungeonWidth && newYPos >= 0 && newYPos < dungeonHeight) {
        const newTile = dungeon.children[newYPos * dungeonWidth + newXPos];
        if (!newTile.classList.contains('rock')) {
            characterTile.removeChild(character);
            newTile.appendChild(character);

            if (newTile.classList.contains('crystal')) {
                findCrystal();
            } else if (newTile.classList.contains('rock')) {
                pickaxeCount--;
                document.getElementById('life').style.width = ${(pickaxeCount / 30) * 100}%;
                document.getElementById('life').setAttribute('data', pickaxeCount.toString());
                newTile.classList.remove('rock');
                newTile.classList.add('empty');
            }
        }
    }

    if (pickaxeCount <= 0) {
        // End of the game, display the score and offer to restart
        alert('You have run out of pickaxe. Your score is: ' + crystalCounter);
        location.reload(); // Reload the page to restart
    }
}

generateGrid();

document.getElementById('up').addEventListener('click', () => {
    moveCharacter(0, -1);
});

document.getElementById('down').addEventListener('click', () => {
    moveCharacter(0, 1);
});

document.getElementById('left').addEventListener('click', () => {
    moveCharacter(-1, 0);
});

document.getElementById('right').addEventListener('click', () => {
    moveCharacter(1, 0);
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveCharacter(0, -1);
            break;
        case 'ArrowDown':
            moveCharacter(0, 1);
            break;
        case 'ArrowLeft':
            moveCharacter(-1, 0);
            break;
        case 'ArrowRight':
            moveCharacter(1, 0);
            break;
    }
});