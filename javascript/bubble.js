/*____________________________________________

A library dealing with bubbles

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var counter = 0;

    var bub = window.bub = function(selector){
        counter++;
        return new bub.fn.init(selector);
    };

    bub.fn = bub.prototype = {
        init:function(selector){
            this.parent_div = document.getElementById(selector);
            this.index = counter;
            var new_div = document.createElement("div");
            var new_id = "holder#" + this.index;
            new_div.setAttribute("id",new_id);
            new_div.setAttribute("class","holder");
            this.holder = new_div;
            this.parent_div.appendChild(new_div);
        },
        draw:function(x,y,rx,ry,paper_x,paper_y){
            this.x = x;
            this.y = y;
            this.rx = rx;
            this.ry = ry;
            this.paper = Raphael(this.holder,paper_x,paper_y);
            this.ellipse = this.paper.ellipse(x,y,rx,ry);
            return this;
        },
        animate_shape:function(x_bound,y_bound,ms){
            var x,y,xupordown;
            xupordown = 1;
            x = this.x;
            y = this.y;
            if(x === x_bound){
                xupordown = 0;
            }
        },
        animate_lr:function(left_bound,right_bound){}


    };

    bub.fn.init.prototype = bub.fn;
})(window || this);
