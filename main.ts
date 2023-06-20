document.addEventListener('DOMContentLoaded', () => {
    let bird = document.querySelector('.bird') as HTMLElement;
    let game = document.querySelector('.game');
    let ground = document.querySelector('.ground');


    // moving the bird to the centre of the sky


    let birdleft = 30;  //must be in vw
    let birdbottom= 30;   //must be in vh
    let gravity= .5;
    let isgameover=false;

    function startgame() {
        birdbottom -= gravity;
        bird.style.bottom = birdbottom + 'vh';
        bird.style.left = birdleft + 'vw';
        // console.log('working');

    }
    //let timeid=setInterval(startgame(),20);  error was, i gave brackets 
    // Argument of type 'number' is not assignable to parameter of type 'TimerHandler'.t

    let gametimeid = setInterval(startgame, 40);
    // clearInterval(timeid)

    let jump = () => {
        if (birdbottom < 50) birdbottom += 4;
        bird.style.bottom = birdbottom + 'vh'
    }
    document.addEventListener('keyup', control);

    function control(e) {
        if (e.keyCode === 32) {
            jump()
            // console.log(e.keycode);

        }
    };

    let generateobs = () => {
        let obstacleleft = 88;
        let randomheight = Math.random() * 20;
        let obstaclebottom = randomheight;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obs');
        if (game) game.appendChild(obstacle);
        obstacle.style.left = obstacleleft + 'vw';   
        obstacle.style.bottom = obstaclebottom + 'vh'
        function moveobstacle() {   
            obstacleleft -= 0.5;
            obstacle.style.left = obstacleleft + 'vw';
            // if (obstacleleft === 1) {   
            //     clearInterval(timeid)
            // }
            // if(obstacleleft>40 && obstacleleft<40 && birdleft===40 || birdbottom===0){
            //     gameOver()
            // }

            if (
                obstacleleft > birdleft -10 &&
                obstacleleft < birdleft + 10 &&
                birdbottom < obstaclebottom + 10
            ) {
                console.log('gameover');
                console.log(location.href)
                setInterval(gameOver,2000);
                if(confirm("gameover")){
                    location.reload()      
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
    }  
    generateobs();    
    
    function gameOver(){
        clearInterval(gametimeid);
        isgameover=true;
        document.removeEventListener('keyup',control);
        // clearInterval(generateobs);
    }
})

  