
const board   = document.querySelector('.board')
const paddle1 = document.querySelector('.paddle.one')
const paddle2 = document.querySelector('.paddle.two')
const score1  = document.querySelector('.player.one')
const score2  = document.querySelector('.player.two')
const ball    = document.querySelector('.ball')



function controlsFor(paddle,keys){
  let halbesPaddle = paddle.offsetHeight / 2
  document.addEventListener('keydown',(e)=>{
    let limit = board.offsetHeight;
    let pos   = paddle.offsetTop;
    switch (e.key){
      case keys[0]: pos -= 10; break;
      case keys[1]: pos += 10; break;
    }
    pos = Math.max( halbesPaddle, Math.min( limit - halbesPaddle, pos) );
    paddle.style.top = pos + 'px';
  })
}
controlsFor(paddle1,['a','s'])
controlsFor(paddle2,['k','l'])

function start(){
    setTimeout( ()=> {ball.vx =3;  ball.vy = 0},1000);
   
    document.querySelector('.newgame').style.display = 'none';
    document.querySelector('.again').style.display = 'none';
    document.querySelector('.winner').style.display = 'none';
    paddle1.style.top = 312 + 'px';
    paddle2.style.top = 312 + 'px';
    
}


function newRound(dir){
  ball.vx = dir;
  ball.vy = 0;
  ball.style.left = (board.offsetWidth/2) + 'px';
  ball.style.top  = (board.offsetHeight/2) + 'px';
  document.querySelector('.newgame').style.display = 'inline-block';
  document
  
}

function checkCollision(paddle,ball){
  let halbesPaddle = paddle.offsetHeight / 2
  let posX  = paddle.offsetLeft;
  let posY  = paddle.offsetTop;
  let ballX = ball.offsetLeft;
  let ballY = ball.offsetTop;
  let diffX = posX - ballX;
  let diffY = posY - ballY;
  
  if ( Math.abs(diffX) < 10 && Math.abs(diffY) < halbesPaddle ){
     ball.vx = -ball.vx*1.1
    if ( diffY >  5 ){ ball.vy += -Math.abs(diffY/10); }
    if ( diffY < -5 ){ ball.vy +=  Math.abs(diffY/10); }
  }
  
  if (ballY < 0){
    ball.vy =  Math.abs(ball.vy) }
  if (ballY > board.offsetHeight){
    ball.vy = -Math.abs(ball.vy) }
    
  if (ballX < 0){
    score2.innerText = parseInt(score2.innerText) + 1
    newRound(0)
 
  }
  if (ballX > board.offsetWidth){
    score1.innerText = parseInt(score1.innerText) + 1
    newRound(0)
   
  }

  if(Number(score1.innerText)>=3 && (Number(score1.innerText)-Number(score2.innerText))>=2){
      var element= 'Winner Player 1  => '+ '  ' +score1.innerText + '  '+':' + '  ' + score2.innerText
      document.querySelector('.winner').innerText = element;
      document.querySelector('.winner').style.display = 'inline';
      document.querySelector('.again').style.display =  'inline';
      score1.innerText=score2.innerText=0
      document.querySelector('.newgame').style.display = 'none';
      var firstscore = document.createElement('LI');
      var textscore = document.createTextNode(element) ;
   
      firstscore.appendChild(textscore);
       document.querySelector('.scoreList').appendChild(firstscore);
    
  }

  if(Number(score2.innerText)>=3 && (Number(score2.innerText)-Number(score1.innerText))>=2){
       var element= 'Winner Player 2  => '+ '  ' +score1.innerText + '  '+':' + '  ' + score2.innerText ;
      document.querySelector('.winner').innerText = element;
      document.querySelector('.winner').style.display = 'inline';
      document.querySelector('.again').style.display =  'inline';
      score1.innerText=score2.innerText=0
      document.querySelector('.newgame').style.display = 'none';   
      var firstscore = document.createElement('LI');
      var textscore = document.createTextNode(element) ;
   
      firstscore.appendChild(textscore);
       document.querySelector('.scoreList').appendChild(firstscore);  
}
}

var timer = setInterval(t=>{
  checkCollision(paddle1,ball);
  checkCollision(paddle2,ball);
  
  let posX = ball.offsetLeft;
  let posY = ball.offsetTop;
  posX += ball.vx
  posY += ball.vy
  ball.style.left = posX + 'px';
  ball.style.top  = posY + 'px';
},10)


