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
            this.speed = 0 ;
            this.a = 0;
            this.resist = -0.002;
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

                    this.speed.plus( this.resist );

                    if( this.speed.mag > 3 ){
                        this.speed.mag = 3;
                        this.speed.mx = this.speed.mag * Math.cos( this.speed.radius );
                        this.speed.my = this.speed.mag * Math.sin( this.speed.radius );   

                    }

                    this.cx = this.cx + this.speed.mx;
                    this.cy = this.cy + this.speed.my;
                    var nextStep = { cx: this.cx , cy: this.cy };
                    this.ellipse.animate( nextStep );

                    //handling resistence
                    if( this.speed.mag <= 0 ){
                        this.resist = 0;
                        clearInterval( movement );
                    }

                    //handling the wall
                    var W = window.innerWidth,
                        H = window.innerHeight;

                    if( W !== window.defaultSize.W || H !== window.defaultSize.H ){
                        window.defaultSize = {W: W, H: H};
                        // TODO: NEED TO DEAL WITH RESIZING THE WINDOW AND UPDATE THE PAPER
                    }

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

                    var needle = {
                        x: window.needle.pos.x - this.ellipse.attr( "cx" ),
                        y: window.needle.pos.y - this.ellipse.attr( "cy" )
                    };
                    var I = Math.pow( needle.x, 2 )/ Math.pow( this.ellipse.attr( "rx" ), 2 ) + Math.pow( needle.y, 2 )/Math.pow( this.ellipse.attr( "ry" ), 2 );

                    if( I <= 1 ){
                        //blast
                        this.blast( "shit" );
                        clearInterval( movement );
                        clearInterval( this.shapeAni );
                    }

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
        





    };

    function toAngel( radius ){
        return radius * 180 / Math.PI;
    }

    bub.fn.init.prototype = bub.fn;
})(window || this);
