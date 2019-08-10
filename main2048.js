var board =new Array();
var score = 0;
var hasConfilicted =new Array();

$(document).ready(function(){
    newgame();
});
function newgame(){
    //初始化棋盘格

    
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    
}
function init(){
    for(var i = 0; i<4 ;i++)
      for(var j= 0; j<4; j++){
          var gridCell = $('#grid-cell-'+i+"-"+j);
          gridCell.css('top',getPosTop( i ,j));
          gridCell.css('left',getPosLeft( i ,j));
      }
      for(var i = 0 ; i<4 ; i++){
        board[i] = new Array();
        hasConfilicted[i] = new Array();
        for(var j = 0; j<4; j++){
            board[i][j] = 0;
            hasConfilicted[i][j] = false;
        
        }
    }
    updateBoardView();

    score = 0;
}





function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
      for(var j=0;j<4;j++){
          $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' )
          var theNumberCell = $('#number-cell-'+i+'-'+j);
 
          if(board[i][j] == 0){
              theNumberCell.css('width','0px');
              theNumberCell.css('height','0px');
              theNumberCell.css('top',getPosTop(i,j)+ 50 ) ;
              theNumberCell.css('left',getPosTop(i,j)+ 50 );



          }
          else{
              theNumberCell.css('width','100px');
              theNumberCell.css('height','100px');
              theNumberCell.css('top',getPosTop(i,j));
              theNumberCell.css('left',getPosLeft(i,j));
              theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j] ) );
              theNumberCell.css('color',getNumberColor(board[i][j]));
              theNumberCell.text(board[i][j]);
          }
             hasConfilicted[i][j] =false;
      }
}

function generateOneNumber(){

    if( nospace(board) )
      return false;
       //随机一个位置
      var randx = parseInt(Math.floor(Math.random()*4));
      var randy = parseInt(Math.floor(Math.random()*4));

      var times =0;
      while(times<50){
          if(board[randx][randy]==0)
          break;
           randx = parseInt(Math.floor(Math.random()*4));
           randy = parseInt(Math.floor(Math.random()*4));

           times++;

      }
        if(times ==50){
            for(var i=0;i<4;i++)
             for(var j=0;j<4;j++){
                 if(board[i][j] ==0)
                 randx =i ;
                 randy =j;
             }
               
        }


       //随机一个数字
         var randNumber = Math.random()<0.5 ? 2 : 4;

       //在随机位置显示随机数字
         board[randx][randy] = randNumber;
         showNumberWithAnimation(randx,randy,randNumber);
       


}
$(document).keydown(function(event){

    switch(event.keyCode){
        case 37:
            //向左移动
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38:
            //向上移动
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39:
            //向右移动
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40:
            //向下移动
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
          default:
              break;  

    }
});
function isgameover(){
    if( nospace(board) && nomove(board)){

        gameover();
    }
function gameover(){
    alert('gameover!');
}






}
function moveLeft(){

    if(!canMoveLeft(board))
    return false;

    //可以向左移动
    for(var i =0 ; i <4 ; i++)
     for(var j = 1 ; j <4 ; j++){
         if(board[i][j] !=0){

            for(var k =0 ;k<j; k++){
                if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ){
                    //这个位置是空的，而且他们之间也没有障碍物
                    showMoveAnimation(i,j,i,k);
                    board[i][k] = board[i][j];
                    board[i][j] =0;
                    continue;
                }
                else if(board[i][k] == board[i][j] &&noBlockHorizontal(i,k,j,board)&&!hasConfilicted[i][k]){
                    //这个位置跟要移动的位置的数字一样，可以移动，而且他们之间没有障碍物
                    //移动后相加形成新的数字
                    showMoveAnimation(i,j,i,k);
                    board[i][k] += board[i][j];
                    board[i][j] =0;
                    score+= board[i][k];
                    updateScore(score);

                    hasConfilicted[i][k] =true;
                    continue;
                }

            }
         }
     }

   setTimeout(" updateBoardView()",200);
    return true;
}
function moveRight(){
    if(!canMoveRight(board))
    return false;

    for(var i = 0; i< 4 ;i++)
     for(var j =2 ;j>=0 ;j--){
         if(board[i][j] !=0){
             for(var k =3 ; k>j;k--){
                 if(board[i][k] ==0 && noBlockHorizontal(i,j,k,board)){
                     showMoveAnimation(i,j,i,k);
                     board[i][k] = board[i][j];
                     board[i][j] = 0;
                     continue;

                     
                 }
                 else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,j,k,board) &&!hasConfilicted[i][k]) {
                     showMoveAnimation(i,j,i,k);
                     board[i][k] += board[i][j];
                     board[i][j] = 0;
                     score+= board[i][k];
                     updateScore(score);
                     hasConfilicted[i][k] =true;
                     continue;

                 }
             }
         } 
     }
     setTimeout(" updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board))
    return false;

    for(var i=1;i<4; i++)
      for(var j =0;j<4;j++)
       if(board[i][j] !=0){
           for(var k =0 ;k<i; k++){
               if(board[k][j] ==0 && noBlockVertical(j,k,i,board)){
                   showMoveAnimation(i,j,k,j);
                   board[k][j] =board[i][j];
                   board[i][j] =0 ;
                   continue;
               }
               else if(board[k][j] ==board[i][j] && noBlockVertical(j,k,i,board) && !hasConfilicted[k][j]){
                   showMoveAnimation(i,j,k,j);
                   board[k][j] += board[i][j];
                   board[i][j] =0;
                   score+= board[k][j];
                   updateScore(score);
                   hasConfilicted[k][j] = true;
                   continue;
               }
           }
       }
       setTimeout(" updateBoardView()",200);
       return true;

    }
    function moveDown(){

        if(!canMoveDown(board))
          return false;


          for(var i=2;i>=0;i--)
          for(var j=0;j<4;j++)
            if(board[i][j]!=0){
                for(var k=3 ;k>i; k--){

                    if(board[k][j] ==0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] =0;
                        continue;

                    }
                    else if(board[k][j] ==board[i][j] && noBlockVertical(j,i,k,board)&& !hasConfilicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] =board[i][j];
                        board[i][j] =0;
                        score+= board[k][j];
                        updateScore(score);
                        hasConfilicted[k][j] = true;
                        continue;
                    }
                }
            
            }
            setTimeout(" updateBoardView()",200);
       return true;
    }
