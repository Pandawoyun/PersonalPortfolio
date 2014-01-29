/*____________________________________________

A library dealing with whirl

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var counter = 0,    
        minWhirl = 2,
        minout = 1,
        minin = 1,
        currentWhirl = 0,
        currentWhirlIndex = -1,
        table = [],
        regionNum = Math.floor( window.innerWidth / 200 ),
        regionSize = window.innerWidth / regionNum;

    for (var i = 0; i < regionNum; i++) {
        table.push( 0 );
    };


    var whirl = window.whirl = function( into, x, y, r, number ){
        counter++;
        return new whirl.fn.init( into, x, y, r, number );
    };

    whirl.fn = whirl.prototype = {
        init:function( into, x, y, r, number ){

            this.index = counter;
            this.x = x;
            this.y = y;
            this.r = r;
            this.into = into;
            this.number = number;
            this.f = this.r/200;
            this.dots = [];

            var canvas = "<div id=whirl" + this.index + "><canvas id=w" + this.index + " width=" + 2 * r  + " height=" + 2 * r + "></canvas></div>";
            $('#container').prepend( canvas );

            $('#whirl' + this.index).css({
                top: y - this.r,
                left: x  - this.r,
                position: 'absolute'
            });

            this.canvas = document.getElementById( 'w' + this.index );
            this.context = this.canvas.getContext('2d');

            this.context.lineWidth = 3;
            var speed = 1;
            function Dot(){
                    this.x = (function(){
                    
                            var rand = 1 - 2 * Math.random();
                            
                            var re = r * rand ;
                            //console.log( rand + " " + r );

                            if( re === 0 ){
                                re += 0.1;
                            }
                            return re;
                        })();
                        //console.log( "woyun: " + this.x );

                    this.y = r * ( 1 - 2 * Math.random() );
                    this.distance = Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
                    this.xs = speed * Math.abs( this.x ) / this.distance * ( 0 - ( this.x / Math.abs( this.x ) ) );
                    this.ys = speed * Math.abs( this.y ) / this.distance * ( 0 - ( this.y / Math.abs( this.y ) ) );
                    this.curPx = 0;
                    this.curPy = 0;
            }


            var getWhirl = $.proxy(

                function( dotA ){
                    if( window.introMode !== true ){
                        var whirl = this;
                        whirl.context.clearRect(0, 0, whirl.canvas.width, whirl.canvas.height);
                        this.context.translate( this.r, this.r );
                        this.context.rotate( 3 * Math.PI / 180 );
                        this.context.translate( -this.r, -this.r );
                        $.each( dotA, function(index, dot) {
                                 /* iterate through array or object */
                            if( whirl.into === 1 ){
                                dot.x = dot.x + dot.xs;
                                dot.y = dot.y + dot.ys;
                                if( ( dot.xs < 0 && dot.x < 0 ) || ( dot.xs > 0 && dot.x > 0) ){
                                    dotA.splice( index, 1, new Dot() );
                                }
                                

                                whirl.context.beginPath();
                                whirl.context.moveTo( dot.x + whirl.r, dot.y + whirl.r );
                                whirl.context.lineTo( dot.x + whirl.r + dot.xs*3 , dot.y + whirl.r + dot.ys * 3  );
                                whirl.context.stroke();
                            }else{
                                dot.curPx -= dot.xs;
                                dot.curPy -= dot.ys;

                                if( ( dot.xs < 0 && dot.curPx > dot.x ) || ( dot.xs > 0 && dot.curPx < dot.x ) ){
                                    dotA.splice( index, 1, new Dot() );
                                }

                                whirl.context.beginPath();
                                whirl.context.moveTo( dot.curPx + whirl.r, dot.curPy + whirl.r );
                                whirl.context.lineTo( dot.curPx + whirl.r - dot.xs * 3 , dot.curPy + whirl.r - dot.ys * 3 );
                                whirl.context.stroke();

                            }
                        });
                    }


                    //console.log( dot.ys + " " + dot.y);
                window.requestAnimFrame(function(){
                    getWhirl( dotA );
                });
            } , this );
            var dArray = [];
            for (var i = 0; i < 10; i++) {
                dArray.push( new Dot() );
            };
            getWhirl( dArray );


        },
        disappear:function(){
            $('#whirl' + this.index).remove();
        }
    };

    whirl.createRanWhirl = function( into ){
        currentWhirlIndex++;
        currentWhirl++;

        if( into === 1 ){
            //console.log( "pushing in: " + currentWhirlIndex );
            window.whirlin.push( currentWhirlIndex );
        }
        else{
            //console.log( "pushing out: " + currentWhirlIndex );
            window.whirlout.push( currentWhirlIndex );
        }

        var r = 50 + Math.random() * 30;// 50 - 80
        var whichRegion = Math.floor( Math.random() * table.length );

        while( table[ whichRegion ] === 1 ){
            whichRegion = Math.floor( Math.random() * table.length );
        }

        table[ whichRegion ] = 1;

        var x = whichRegion * regionSize + r + Math.random() * ( regionSize - 2 * r - 40 );
        var y = r + Math.random() * ( window.innerHeight - 2 * r - 40 );
        var number = 8 + Math.floor( Math.random() * 3 );
        var newWhirl = whirl( into, x, y, r, number );
        newWhirl.region = whichRegion;

        window.whirls.push( newWhirl );
    };

    whirl.handleWhirls = function(){
        var AorD = Math.floor( Math.random() * 2 ),
            toDelete = -1;

        if( AorD === 1 && currentWhirl >= window.maxWhirl ){
            AorD = 0;
        }
        else if( AorD === 0 && ( window.whirlin.length <= minin && window.whirlout.length <= minout ) ){
            AorD = 1;
        }

        //which one should be ded or added
        if( AorD === 0 ){
            //set toDelete
            if( window.whirlin.length <= minin ){
                toDelete = window.whirlout[ Math.floor( Math.random() * window.whirlout.length ) ];
                //console.log( "minin: " + toDelete );
            }
            else if( window.whirlout.length <= minout ){
                toDelete = window.whirlin[ Math.floor( Math.random() * window.whirlin.length ) ];
                //console.log( "minout: " + toDelete );

            }
            else{
                toDelete = Math.floor( window.whirls.length * Math.random() );
                // console.log( "else: " + window.whirls.length + " " + toDelete );
            }
            table[ window.whirls[toDelete].region ] = 0;
            //update whirlout and whirlin
            for (var i = 0; i < window.whirlout.length; i++) {
                if( window.whirlout[i] === toDelete ){
                    window.whirlout.splice( i , 1 );
                    i--;
                }
                else if( window.whirlout[i] > toDelete ){
                    window.whirlout[i] -= 1;
                }
            };
            for (var i = 0; i < window.whirlin.length; i++) {
                if( window.whirlin[i] === toDelete ){
                    window.whirlin.splice( i , 1 );
                    i--;
                }
                else if( window.whirlin[i] > toDelete ){
                    window.whirlin[i] -= 1;
                }
            };

            window.whirls[ toDelete ].disappear();

            window.whirls.splice( toDelete, 1 );

            currentWhirlIndex--;
            currentWhirl--;



        }else{
            //AorD === 1
            var ioro = Math.floor( Math.random() * 2 ),
                into;

            if( window.whirlin.length <= minin ){
                ioro = 1;
            }
            else if( window.whirlout.length <= minout ){
                ioro = 0;
            }

            if( ioro === 1 ){
                into = 1;
            }
            else{
                into = -1;
            }

            whirl.createRanWhirl( into );
        }
    };

    whirl.fn.init.prototype = whirl.fn;
})(window || this);