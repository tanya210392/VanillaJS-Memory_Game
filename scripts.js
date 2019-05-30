var array, i, tmp, current, length;

for (array = [], i = 0; i < 99; ++i) {
    array[i] = i+1;
}

length = array.length;

if (length) {
    while (--length) {
        current = Math.floor(Math.random() * (length + 1));
        tmp = array[current];
        array[current] = array[length];
        array[length] = tmp;
    }
}

var copy = array.slice();
var concatArray = array.concat(copy);

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var finalArray;

function newBoard(){
    var newArray = concatArray.slice(0, 8);
    finalArray = newArray.concat(newArray);
    finalArray.sort(compareRandom);

    tiles_flipped = 0;
    var output = '';
    for (var i = 0; i < finalArray.length; i++) {
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+finalArray[i]+'\')"></div>';
    }
    document.getElementById('game').innerHTML = output;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML === "" && memory_values.length < 2) {
        tile.style.background = 'green';
        tile.style.transform = 'rotateX(180deg);';
        tile.innerHTML = val;
        if (memory_values.length === 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length === 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] === memory_values[1]) {
                tiles_flipped += 2;
                memory_values = [];
                memory_tile_ids = [];
                if (tiles_flipped === finalArray.length) {
                    alert("Congratulations! You win! Press 'Ok' to start game again");
                    document.getElementById('game').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = '#fff';
                    tile_1.innerHTML = "";
                    tile_2.style.background = '#fff';
                    tile_2.innerHTML = "";
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

function compareRandom() {
    return Math.random() - 0.5;
}

newBoard();
