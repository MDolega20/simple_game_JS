
let plansza = document.getElementById("plansza");

let wspolrzedne = {
    x:1,
    y:1
}
let gameEnd = false;
let lastWsp = [];
let granice = {
    x: 30,
    y: 30
}
let ketCodes = {
    up: 38,
    down: 40,
    left: 37,
    rigth: 39
}
let znaczniki = {
    punkty: [

    ],
    przeszkody: [

    ],
    punktyZdobyte: [],
    sciany: [

    ],
    teleporty: [
        {
            start: {
                x: Math.floor((Math.random() * granice.x) + 1),
                y: Math.floor((Math.random() * granice.x) + 1),
                value: "in"
            },
            end: {
                x: Math.floor((Math.random() * granice.x) + 1),
                y: Math.floor((Math.random() * granice.x) + 1),
                value: "out"
            }
        }
    ],
    walls: [
        // {
        //     x: 10,
        //     y: 10
        // }
    ],
    monster: [
        // {
        //     x: 12,
        //     y: 15
        // }
    ]
}
for(let random = 0;random <= granice.x; random++){

    let x = {
        x: Math.floor((Math.random() * granice.x) + 1),
        y: Math.floor((Math.random() * granice.y) + 1),
        value: Math.floor((Math.random() * 10) + 1)
    }
    if(znaczniki.punkty.indexOf(x) == -1){
        znaczniki.punkty.push(x);
    }else{
        random++;
    }
}
for(let random = 0;random <= granice.x /3; random++){

    let x = {
        x: Math.floor((Math.random() * granice.x) + 1),
        y: Math.floor((Math.random() * granice.y) + 1),
        value: Math.floor((Math.random() * 50) + 1)
    }
    if(znaczniki.monster.indexOf(x) == -1){
        znaczniki.monster.push(x);
    }else{
        random++;
    }
}
for(let random = 0;random <= granice.x * 4; random++){

    let x = {
        x: Math.floor((Math.random() * granice.x) + 1),
        y: Math.floor((Math.random() * granice.y) + 1),
        value: Math.floor((Math.random() * 50) + 1)
    }
    if(znaczniki.przeszkody.indexOf(x) == -1){
        znaczniki.przeszkody.push(x);
    }else{
        random++;
    }
}
for(let random = 0;random <= granice.x / 10; random++){

    let x = {
        start: {
            x: Math.floor((Math.random() * granice.x) + 1),
            y: Math.floor((Math.random() * granice.x) + 1),
            value: "in"
        },
        end: {
            x: Math.floor((Math.random() * granice.x) + 1),
            y: Math.floor((Math.random() * granice.x) + 1),
            value: "out"
        }
    }
    if(znaczniki.teleporty.indexOf(x) == -1){
        znaczniki.teleporty.push(x);
    }else{
        random++;
    }
}
let playerStats = {
    points: 0,
    hp: 100
}

render();

function render(){
    console.log("reset planszy");
    plansza.innerHTML = "";
    let generatedPlansza = document.createElement("div");

    let html = {
        player: "<span id='player'>🤑</span>",
        normal: "<span>_</span>",
        point: "<span class='point'>💰</span>",
        przeszkoda: "<span class='warring'>🔥</span>",
        teleport: "<span class='teleport'>👾</span>",
        wall: "<span class='teleport'>❌</span>",
        monster: "<span class='teleport'>🌈</span>"
    }

    for(let height = 1; height <= granice.y; height++){
        let row = document.createElement("p");
        for(let width = 1; width <= granice.x; width++){
            let player = false;
            let punkt = null;
            let punktIndex = null;
            let playerOnPunct = false;
            let punctIndex = 0;
            let przeszkoda = null;
            let teleport = null;
            let wall = null;
            let monster = null;

            if(wspolrzedne.y == height){
                if(wspolrzedne.x == width){
                    player = true;
                }
            }

            for(punctIndex = 0; punctIndex <= znaczniki.punkty.length - 1; punctIndex++){
                if(znaczniki.punkty[punctIndex].x == width && znaczniki.punkty[punctIndex].y == height){
                    punkt = znaczniki.punkty[punctIndex];
                    punktIndex = punctIndex;
                } 
            }
            for(przeszIndex = 0; przeszIndex <= znaczniki.przeszkody.length - 1; przeszIndex++){
                if(znaczniki.przeszkody[przeszIndex].x == width && znaczniki.przeszkody[przeszIndex].y == height){
                    przeszkoda = znaczniki.przeszkody[przeszIndex];
                } 
            }
            for(wallIndex = 0; wallIndex <= znaczniki.walls.length - 1; wallIndex++){
                if(znaczniki.walls[wallIndex].x == width && znaczniki.walls[wallIndex].y == height){
                    wall = znaczniki.walls[wallIndex];
                } 
            }
            for(monsterIndess = 0; monsterIndess <= znaczniki.monster.length - 1; monsterIndess++){
                if(znaczniki.monster[monsterIndess].x == width && znaczniki.monster[monsterIndess].y == height){
                    monster = znaczniki.monster[monsterIndess];
                } 
            }
            for(teleportIndex = 0; teleportIndex <= znaczniki.teleporty.length - 1; teleportIndex++){
                if(znaczniki.teleporty[teleportIndex].start.x == width && znaczniki.teleporty[teleportIndex].start.y == height){
                    teleport = znaczniki.teleporty[teleportIndex];
                } 
                if(znaczniki.teleporty[teleportIndex].end.x == width && znaczniki.teleporty[teleportIndex].end.y == height){
                    teleport = znaczniki.teleporty[teleportIndex];
                } 
            }
            if(monster !== null){
                if(monster.x == wspolrzedne.x && monster.y == wspolrzedne.y){
                    znaczniki.monster.splice(monsterIndess, 1);
                    playerStats.hp -= (monster.value);
                }
            }
            if(punkt !== null){
                if(punkt.x == wspolrzedne.x && punkt.y == wspolrzedne.y){
                    playerOnPunct = true;
                    znaczniki.punkty.splice(punktIndex, 1);
                    playerStats.points += (punkt.value);
                }
            }
            if(teleport !== null){
                if(teleport.start.x == wspolrzedne.x && teleport.start.y == wspolrzedne.y){
                    wspolrzedne = {
                        x: teleport.end.x,
                        y: teleport.end.y - 1
                    }
                }else if(teleport.end.x == wspolrzedne.x && teleport.end.y == wspolrzedne.y){
                    wspolrzedne = {
                        x: teleport.start.x,
                        y: teleport.start.y - 1
                    }
                }
            }
            // if(wall !== null){
            //     // console.log(wall);
            //     console.log(wspolrzedne);
            //     console.log(lastWsp);
            //     if(wall.x == wspolrzedne.x && wall.y == wspolrzedne.y){
            //         wspolrzedne = {
            //             x: wall.x - 1,
            //             y: wall.y - 1
            //         }
            //     }
            // }
            // let monsterCrash = null;
            // znaczniki.monster.forEach(element => {
            //     znaczniki.monster.forEach(element2 => {
            //         if(element.x == element2.x && element.y == element2.y){
            //             monsterCrash = element;
            //             console.log(monsterCrash);
            //         }
            //     });
            // });
            // if(monsterCrash !== null){
            //         for(let random = 0; random <= (Math.random() * 10); random++ ){
            //                 let x = {
            //                     x: element.x,
            //                     y: element.y,
            //                     value: Math.floor((Math.random() * 70) + 1)
            //                 }
            //                 znaczniki.monster.push(x);
            //             } 
            // }
            if(przeszkoda !== null){
                if(przeszkoda.x == wspolrzedne.x && przeszkoda.y == wspolrzedne.y){
                    playerStats.hp -= (przeszkoda.value);
                }
            }
            if(player == false && punkt == null && przeszkoda == null && teleport == null && wall == null && monster == null){
                row.innerHTML += html.normal; 
            }else if(player == true  || playerOnPunct == true){
                row.innerHTML += html.player; 
            }else if(przeszkoda !== null){
                row.innerHTML += html.przeszkoda; 
            }else if(teleport !== null){
                row.innerHTML += html.teleport; 
            }else if(wall !== null){
                row.innerHTML += html.wall; 
            }else if(monster !== null){
                row.innerHTML += html.monster;
            }else  if(punkt !== null){
                row.innerHTML += html.point;
            }
        } 
        generatedPlansza.appendChild(row);   
    }
    plansza.appendChild(generatedPlansza);

    let staty = document.createElement("div");
    let hp = document.createElement("p");
    hp.innerHTML = "HP: " + playerStats.hp;
    let points = document.createElement("p");
    points.innerHTML = "Points: " + playerStats.points;
    staty.appendChild(hp);
    staty.appendChild(points);

    plansza.appendChild(staty);
}

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField (e) {
    var keyCode = e.keyCode;
    console.log(keyCode);

    if(keyCode == ketCodes.left){
        console.log("lewo");
        if(wspolrzedne.x == 0){
            wspolrzedne.x = granice.x;
        }
        wspolrzedne.x = wspolrzedne.x - 1;
    }
    if(keyCode == ketCodes.rigth){
        console.log("prawo");
        if(wspolrzedne.x == granice.x){
            wspolrzedne.x = 0;
        }
        wspolrzedne.x = wspolrzedne.x + 1;
    }
    if(keyCode == ketCodes.up){
        console.log("góra");
        if(wspolrzedne.y == 0){
            wspolrzedne.y = granice.y;
        }
        wspolrzedne.y = wspolrzedne.y - 1;
    }
    if(keyCode == ketCodes.down){
        console.log("dół");
        if(wspolrzedne.y == granice.y){
            wspolrzedne.y = 0;
        }
        wspolrzedne.y = wspolrzedne.y + 1;
    }
    lastWsp.push(wspolrzedne); //dont work
    console.log(znaczniki.punkty);

    monsterMove();

    if(gameEnd == false){
        render();
    }else{
        plansza.innerHTML = "";
        let wyniki = document.createElement("h1");
        wyniki.innerHTML = "Zdobyłeś " + playerStats.points + " punktów";
        document.getElementById("title").innerHTML = "";
        plansza.appendChild(wyniki);
    }

    if(playerStats.hp <= 0){
        let alert = document.createElement("h1");
        let alert2 = document.createElement("div");
        alert.innerHTML = "Game Over";
        alert2.innerHTML = "<a onClick='reset();'>Zagraj jeszcze raz</a>";
        document.getElementById("alert").innerHTML = "";
        document.getElementById("alert").appendChild(alert);
        document.getElementById("alert").appendChild(alert2);
        gameEnd = true;
    };
}

function monsterMove(){
    znaczniki.monster.forEach(element => {
        if(Math.random()  > 0.2){
            if(Math.random()  > 0.2){
                if(Math.random()  > 0.5){
                    element.x = (Math.random()  > 0.5 ? element.x + 1 : element.x - 1);
                }else{
                    element.y = (Math.random()  > 0.5 ? element.y + 1 : element.y - 1);
                }
            }
        }else{
            element.x = (element.x > wspolrzedne.x ? element.x - 1 : element.x + 1);
            element.y = (element.y > wspolrzedne.y ? element.y - 1 : element.y + 1);
        }
               
    });
}

function reset(){
    location.reload();
}