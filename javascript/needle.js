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
        	this.need = window.paper.circle( x,y,1);
        	this.pos = { x: x, y: y };    
        },
        remove:function( ){
        	this.need.remove();
            this.pos = {};
        }
    };

    needle.fn.init.prototype = needle.fn;
})(window || this);