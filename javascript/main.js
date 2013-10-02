window.onload = function () {
    bub("holder_outer").draw(50,50,30,20,100,100);
/*
    //define the namespace that ill be using throughout
    (function(Personal,$,undefined){
        function Bubble(size_x,size_y){
            this.size_x = size_x;
            this.size_y= size_y;

        }
    }).(window.Personal = window.Personal || {}, jQuery);

    //create 10 divs in holder_outer
    var paper,elememt,holder_number;
    var divs = new Array();
    for (var i = 0; i < 10; i++) {
        divs[i] = "<div class='holders' id='holder#" + (i+1) + "'></div>";
        $("#holder_outer").append(divs[i]);

        holder_number = "holder#" + (i+1);
            paper = Raphael(holder_number, 300, 300);
            element = paper.ellipse(100,100,30,20);
    };

    //implement animation for every one of them

    var x = 30;
    var y = 20;
    var xup_or_down = 1;
    setInterval(function(){
        //bubble movement part
        //////////////////////////////////
        //change direction?
        if(x == 30 && y == 20){
            xup_or_down = 1;
        }
        else if(x == 20 && y == 30){
            xup_or_down = 0
        }
        //what's the direction
        if(xup_or_down == 0){
            x++;
            y--;
        }
        else{
            x--;
            y++;
        }
        element.animate({rx: x, ry: y},45);
        ////////////////////////////////////////
        
    }, 45);
}

function bubble(){

}

function bubbleMove(){

*/
}