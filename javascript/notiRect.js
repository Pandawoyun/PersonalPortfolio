/*____________________________________________

A library dealing with needle

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var notiRect = window.notiRect = function( x, y, width ){
        return new notiRect.fn.init( x, y, width );
    };

    notiRect.fn = notiRect.prototype = {
        init:function( x, y, width ){
            
            this.notiRect = window.paper.rect(x-width/2, y-width/2, width, width);
            this.notiRect.attr({'opacity':'1'});
            var rectob = this;
            this.notiRect.animate({'transform':"r360s0.01"}, 2000, 'backOut', function(){
                rectob.notiRect.remove();
            });
        }
    };

    notiRect.fn.init.prototype = notiRect.fn;
})(window || this);