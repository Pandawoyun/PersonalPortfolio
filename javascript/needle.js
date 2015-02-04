/*____________________________________________

A library dealing with needle

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var needle = window.needle = function( x,y ){
        return new needle.fn.init( x,y );
    };

    needle.fn = needle.prototype = {
        init:function( x,y ){
        	this.need = window.paper.circle(x,y,1);
        	this.pos = { x: x, y: y };
            this.need.attr("stroke", "#f00");
        },
        remove:function( ){
        	this.need.remove();
            window.init.initMap['needle'] = 0;
            this.pos = {};
        },
        move:function(){
            var moveNeedle = function(){
                window.Needle.remove();
                var nextpos = {
                    'x':Math.random() * init.W, 
                    'y':Math.random() * init.H
                };
                window.Needle = needle( nextpos['x'], nextpos['y'] );
                notiRect(nextpos['x'], nextpos['y'], 400);
            }

            setInterval( moveNeedle, 5000 );
        }
    };

    needle.fn.init.prototype = needle.fn;
})(window || this);