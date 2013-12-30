/*____________________________________________

A library dealing with bombs

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var bombs = window.bombs = function( event ){
        return new bombs.fn.init( event );
    };

    bombs.fn = bombs.prototype = {
        init:function( event ){
            this.I0 = 40;
            this.level = 1;

            // this.circle = window.paper.circle( event.pageX, event.pageY, 5 );
            // var y = $.proxy( function(){
            //     $(window).mousemove(function(event) {
            //             /* Act on the event */
            //             alert( "removed ");

            //             this.circle.remove();
            //             this.circle = window.paper.circle( event.pageX, event.pageY, 5 );
            //         });
            //     }, this);


            var f = $.proxy( function(){


                // y();

                this.level += 0.2;             
            }, this);
            this.lvlUp = setInterval(f, 100);

            
        },
        explode:function( event ){
            clearInterval(this.lvlUp);

            var I0 = this.I0 * this.level;
            
            this.range = window.paper.circle( event.pageX, event.pageY, 1 );
            var r = {r: I0};

            this.range.animate( r, 300, "<" );
            var remove = $.proxy( function(){
                this.range.remove();
            }, this );
            setTimeout( remove , 300 );

            var curPos = { x: event.pageX, y: event.pageY };
            $.each( window.bubbleSet, function(index, bub) {
                var dx = bub.cx - curPos.x,
                    dy = bub.cy - curPos.y,
                    d = Math.sqrt( Math.pow( dx, 2 ) + Math.pow( dy, 2 ) );
                
                var radius =  Math.acos( Math.abs( dx )/d );

                if( dx < 0 && dy > 0 ){
                    radius = Math.PI - radius;
                }
                else if( dx < 0 && dy < 0 ){
                    radius = Math.PI + radius;
                }
                else if( dx > 0 && dy < 0 ){
                    radius = 2 * Math.PI - radius;
                }
                var v2 = vector( radius, I0 /d /bub.mass );

                    
                //update speed


                bub.speed = v2.plus( bub.speed );
                bub.resist = -0.002;
                bub.move();



            });


        }
    };

    bombs.fn.init.prototype = bombs.fn;
})(window || this);