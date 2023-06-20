document.addEventListener('DOMContentLoaded', function () {
    var bird = document.querySelector('.bird');
    var game = document.querySelector('.game');
    var ground = document.querySelector('.ground');
    // moving the bird to the centre of the sky
    var birdleft = 30; //must be in vw
    var birdbottom = 30; //must be in vh
    var gravity = .5;
    var isgameover = false;
    function startgame() {
        birdbottom -= gravity;
        bird.style.bottom = birdbottom + 'vh';
        bird.style.left = birdleft + 'vw';
        // console.log('working');
    }
    //let timeid=setInterval(startgame(),20);  error was, i gave brackets 
    // Argument of type 'number' is not assignable to parameter of type 'TimerHandler'.t
    var gametimeid = setInterval(startgame, 40);
    // clearInterval(timeid)
    var jump = function () {
        if (birdbottom < 50)
            birdbottom += 4;
        bird.style.bottom = birdbottom + 'vh';
    };
    document.addEventListener('keyup', control);
    function control(e) {
        if (e.keyCode === 32) {
            jump();
            // console.log(e.keycode);
        }
    }
    ;
    var generateobs = function () {
        var obstacleleft = 88;
        var randomheight = Math.random() * 20;
        var obstaclebottom = randomheight;
        var obstacle = document.createElement('div');
        obstacle.classList.add('obs');
        if (game)
            game.appendChild(obstacle);
        obstacle.style.left = obstacleleft + 'vw';
        obstacle.style.bottom = obstaclebottom + 'vh';
        function moveobstacle() {
            obstacleleft -= 0.5;
            obstacle.style.left = obstacleleft + 'vw';
            // if (obstacleleft === 1) {   
            //     clearInterval(timeid)
            // }
            // if(obstacleleft>40 && obstacleleft<40 && birdleft===40 || birdbottom===0){
            //     gameOver()
            // }
            if (obstacleleft > birdleft - 10 &&
                obstacleleft < birdleft + 10 &&
                birdbottom < obstaclebottom + 10) {
                console.log('gameover');
                console.log(location.href);
                setInterval(gameOver, 2000);
                if (confirm("gameover")) {
                    location.reload();
                    // alert("gameover")   
                }
            }
            // Check if the obstacle has passed the bird
            if (obstacleleft === 1) {
                obstacle.remove();
            }
        }
        setInterval(moveobstacle, 40);
        setTimeout(generateobs, 3000);
    };
    generateobs();
    function gameOver() {
        clearInterval(gametimeid);
        isgameover = true;
        document.removeEventListener('keyup', control);
        // clearInterval(generateobs);
    }
});
