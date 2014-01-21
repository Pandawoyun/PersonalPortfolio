/*____________________________________________

A library dealing with bubbles

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var counter = 0;

    var bub = window.bub = function(selector,x,y,rx,ry,paper_x,paper_y,ms){
        counter++;
        return new bub.fn.init(selector,x,y,rx,ry,paper_x,paper_y,ms);
    };

    bub.fn = bub.prototype = {
        init:function(x,y,rx,ry,ms,mass){
            this.index = counter;
            this.cx = x;
            this.cy = y;
            this.mass = mass;
            this.speed = 0;
            this.a = 0;
            this.resist = -0.01;
            this.ellipse = window.paper.ellipse(x,y,rx,ry);
            this.rx = rx;
            this.ry = ry;

           	var
            	upBound,
           		lowBound;

            if( rx > ry ){
            	upBound = rx;
            	lowBound = ry;
            }
            else{
            	upBound = ry;
            	lowBound = rx;
            }

            var attrs = [{ rx: upBound, ry: lowBound },{ rx: lowBound, ry: upBound }],
        		xup = 0;

        	if( rx === upBound ){
        		xup = 1;
        	}
            var ellipse = this.ellipse;
        	this.shapeAni = setInterval( function(){ 
        		ellipse.animate( attrs[ xup ], ms );
        		
        		if( xup === 0 ){
        			xup = 1;
        		}
        		else{
        			xup = 0;
        		}
        	
        	}, ms );

            this.move();
        },
        move:function( ){
            

            var f = $.proxy(
                function(){
                    var PI = Math.PI;

                    if( this.a !== 0 ){
                        if( this.speed === 0 ){
                            this.speed = vector( this.a.radius, this.a.mag );
                        }
                        else{

                            this.speed.plus( this.a );
                        }
                    }


                    // console.log( "speed: " + this.speed.mag );
                    // console.log( "a: " + this.a.mag );
                    // console.log( "resist: " + this.resist );
                    if( this.speed.mag >= ( 0 - this.resist ) ){
                       this.speed.plus( this.resist );
                    }

                    if( this.speed.mag > window.maxSpeed ){
                        this.speed.mag = window.maxSpeed;
                        this.speed.mx = this.speed.mag * Math.cos( this.speed.radius );
                        this.speed.my = this.speed.mag * Math.sin( this.speed.radius );   

                    }
                    if( this.speed === 0 ){
                        this.cx = this.cx;
                        this.cy = this.cy;
                    }
                    else{
                        this.cx = this.cx + this.speed.mx;
                        this.cy = this.cy + this.speed.my;
                    }

                    var nextStep = { cx: this.cx , cy: this.cy };
                    this.ellipse.animate( nextStep );

                    // console.log( "here ");
                    //handling the wall
                    var W = window.innerWidth,
                        H = window.innerHeight;

                    // if( W !== window.defaultSize.W || H !== window.defaultSize.H ){
                    //     window.defaultSize = {W: W, H: H};
                    //     // TODO: NEED TO DEAL WITH RESIZING THE WINDOW AND UPDATE THE PAPER
                    // }

                    if( this.cx < 0 && this.speed.mx < 0 ){
                        this.speed.radius = Math.abs( this.speed.radius - PI );
                        if( this.speed.my < 0){
                            this.speed.radius = 2 * PI - this.speed.radius;
                        }

                    }
                    else if( this.cx > W && this.speed.mx > 0 ){
                        this.speed.radius = Math.abs( this.speed.radius - PI );
                        if( this.speed.my < 0){
                            this.speed.radius = 2 * PI - this.speed.radius;
                        }

                    }
                    else if( this.cy < 0 && this.speed.my < 0 ){
                        this.speed.radius = 2 * PI - this.speed.radius;

                    }
                    else if( this.cy > H && this.speed.my > 0 ){
                        this.speed.radius = 2 * PI - this.speed.radius;

                    }

                    this.speed.mx = this.speed.mag * Math.cos( this.speed.radius );
                    this.speed.my = this.speed.mag * Math.sin( this.speed.radius );   
//Needle
                    var Needle = {
                        x: window.Needle.pos.x - this.ellipse.attr( "cx" ),
                        y: window.Needle.pos.y - this.ellipse.attr( "cy" )
                    };
                    var I = Math.pow( Needle.x, 2 )/ Math.pow( this.ellipse.attr( "rx" ), 2 ) + Math.pow( Needle.y, 2 )/Math.pow( this.ellipse.attr( "ry" ), 2 );

                    if( I <= 1 ){
                        //blast
                        this.blast( "shit" );
                        clearInterval( movement );
                        clearInterval( this.shapeAni );
                    }
// whirlpool

                    
                    
                    var bub = this;
                    $.each( window.whirls, function(index, whirl) {
                        var dx = bub.cx - whirl.x,
                            dy = bub.cy - whirl.y,
                            D = Math.sqrt( Math.pow( dx, 2 ) + Math.pow( dy, 2 )),
                            Range = 3 * whirl.r;


                        if( D < Range ){

                            var radius =  Math.acos( Math.abs( dx )/D );

                            if( dx < 0 && dy > 0 ){
                                radius = 2 * Math.PI - radius;
                            }
                            else if( dx > 0 && dy > 0 ){
                                radius = Math.PI + radius;
                            }
                            else if( dx > 0 && dy < 0 ){
                                radius = Math.PI - radius;
                            }

                            if( whirl.into === -1 ){
                                radius += Math.PI;
                            }

                            var para = ( Range - D ) / Range,
                                finalF = whirl.f * para / bub.mass,
                                Wv = vector( radius, finalF );


                            bub.speed = Wv.plus( bub.speed );

                            if( D < whirl.r / 3 && whirl.into === 1 ){
                                var jumpTo = window.whirlout[ Math.floor( Math.random() * window.whirlout.length )];
                                bub.teleport( window.whirls[ jumpTo ].x, window.whirls[ jumpTo ].y );
                                return false;
                            }
                        }
                    });
                }, this);

            var movement = setInterval(f,10);


        },
        blast:function( fileName ){
            var after = { rx: this.ellipse.attr( "rx" ) * 2, ry: this.ellipse.attr( "ry" ) * 2 }
            this.ellipse.animate( after, 100, "<" );
            var remove = $.proxy( function(){
                this.ellipse.remove();
            }, this );
            setTimeout( remove , 100 );

        },
        teleport:function( x, y ){
            this.cx = x;
            this.cy = y;
            console.log( this.cx , this.cy );
        }
        





    };

    function toAngel( radius ){
        return radius * 180 / Math.PI;
    }

    bub.fn.init.prototype = bub.fn;
})(window || this);
