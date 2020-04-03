var lastplay ="O";

function  the_best_maths(x) {
    var p = document.querySelector("p");
    //p.innerText ="2+2=5";
    p.innerText=x;
    return;
}    


function boxClick(x){
    //console.log(x);
    //console.log(x.innerText);

    if(lastplay=="O"){
        x.innerText="X";
        lastplay="X";

    } else if (lastplay=="X"){
        x.innerText="O";
        lastplay="O";

    }
    
    console.log ( "And the Winner is " + check_for_winner() + " !!" );
    return;
}


var test = "";

function check_for_winner(){
    //console.log("i'm reading yuo..");
    var e1 = document.getElementById('1');
    var e2 = document.getElementById('2');
    var e3 = document.getElementById('3');
    var e4 = document.getElementById('4');
    var e5 = document.getElementById('5');
    var e6 = document.getElementById('6');
    var e7 = document.getElementById('7');
    var e8 = document.getElementById('8');
    var e9 = document.getElementById('9');

    var myArrayOfSolutions = [  [e1,e2,e3],
                                [e4,e5,e6],
                                [e7,e8,e9],
                                [e1,e4,e7],
                                [e2,e5,e8],
                                [e3,e6,e9],
                                [e1,e5,e9],
                                [e3,e5,e7]   ];

    test = myArrayOfSolutions;

    for (var i = 0; i < 8; i++) {        

        if (myArrayOfSolutions[i][0].innerText != ""){
            if (myArrayOfSolutions[i][1].innerText != ""){
                if (myArrayOfSolutions[i][2].innerText != ""){

                    if (myArrayOfSolutions[i][0].innerText == myArrayOfSolutions[i][1].innerText) {

                        if (myArrayOfSolutions[i][1].innerText == myArrayOfSolutions[i][2].innerText){
                            CD.domTools.alert("you win!!");

                            document.getElementsByClassName('pyro')[0].style.display="unset";
                            return myArrayOfSolutions[i][1].innerText;
                        }

                    }

                }
            }            
        }



    }
    return "no one :(";
}