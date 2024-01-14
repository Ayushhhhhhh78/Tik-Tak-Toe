let box = document.getElementsByClassName('in-box');
let notify = document.getElementById('notify');
const scrO = document.querySelectorAll('.play-num')[0];
const scrX = document.querySelectorAll('.play-num')[1];

//score data *start*
let scoreO = localStorage.getItem('O') || 0;
let scoreX = localStorage.getItem('X') || 0;

scrO.textContent = scoreO;
scrX.textContent = scoreX;
//score data *end*
let turn = 'O';
let win;
Array.from(box).forEach((e,n) => {
    e.addEventListener('click', function(){
        notify.textContent = "......";
        if(e.innerHTML == ""){
            if(turn == "O"){
                e.innerHTML = "O";
                turn = 'X';
                document.getElementsByClassName('player-point')[0].style.color = "rgb(0,255,0)";
                document.getElementsByClassName('player-point')[1].style.color = "grey";
            }else if(turn == 'X'){
                e.innerHTML = "X";
                turn = 'O';
                document.getElementsByClassName('player-point')[1].style.color = "rgb(0,255,0)";
                document.getElementsByClassName('player-point')[0].style.color = "grey";
            }
        }

        if(turn == 'X'){
            win = 'O'
        }else if(turn == 'O'){
            win = 'X'
        }

        if(chkwin()){
            // notify.textContent = `Player(${win}) Won! , press restart to rematch..`;
            setTimeout(()=>alert(`Player(${win}) Won! , press restart to rematch..`),300);

            if(win === 'X'){
                scoreX++;
                localStorage.setItem('X', scoreX);
            }else if(win === 'O'){
                scoreO++;
                localStorage.setItem('O', scoreO);
            }

            setTimeout(()=>location.reload(),301);
        }
        
        scrO.textContent = scoreO;
        scrX.textContent = scoreX;

    })
})

/*winning condition*/
const chkwin = () => {
    const winCon = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]
    for(let i=0; i<winCon.length; i++){
        let [p1,p2,p3] = winCon[i];

        if(box[p1].textContent !== "" &&
           box[p1].textContent === box[p2].textContent &&
           box[p2].textContent === box[p3].textContent){
            turn = 3;
            
            Array.from(box).forEach((e,n)=>{
                e.style.cssText = "background-color:rgba(50, 43, 46, 0.11)";
            })

            box[p1].style.cssText = "background-color:rgba(0,255,0,0.1) !important";
            box[p2].style.cssText = "background-color:rgba(0,255,0,0.1) !important";
            box[p3].style.cssText = "background-color:rgba(0,255,0,0.1) !important";
            return true;
           }
    }
    return false;
}
/*winning condition end*/


//buttons functions
let btn = document.getElementsByClassName('btn');

//restart button
btn[1].addEventListener('click', function(){
    location.reload();
})
//restart button end

//clear data *start*
btn[0].addEventListener('click', () => {
    localStorage.removeItem('X');
    localStorage.removeItem('O');
    location.reload();
})
//clear data *end*
//buttons functions end

//score modification

//score modification end