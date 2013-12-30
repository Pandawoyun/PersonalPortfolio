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
        	this.needle = window.paper.circle( x,y,1);
        	this.pos = { x: x, y: y };    
        },
        remove:function( ){
        	this.needle.remove();
        }
    };

    needle.fn.init.prototype = needle.fn;
})(window || this);