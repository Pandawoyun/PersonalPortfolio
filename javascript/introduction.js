/*____________________________________________

A library dealing with introduction

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var introduction = window.introduction = function( ){
        return new introduction.fn.init( );
    };

    introduction.fn = introduction.prototype = {
        init:function( ){

            var surface = "<div id='introduction'><canvas id='introCanvas' width=" + window.innerWidth  + " height=" + window.innerHeight + "></canvas></div>";
            $('body').prepend( surface ); 

            this.canvas = document.getElementById( 'introCanvas' );
            this.context = this.canvas.getContext('2d');
			this.currentbr = this.canvas.width;
			this.currentnr = this.canvas.width;
			var 
				bubx = 50,
				buby = 50,
				bubr = 70,
				needx = this.canvas.width - 100,
				needy = this.canvas.height - 100,
				needr = 11;
			this.ms = 2000;
			var times = this.ms / 1000 * 100;
			this.speedb = (this.currentbr - bubr)/times;
			this.speedn = (this.currentnr - needr)/times;

            window.introMode = true;
            this.introAni(bubx,buby,bubr,needx,needy,needr);
        },
        introAni:function(bx,by,br,nx,ny,nr){


        	var ani = $.proxy(function(){
	        	this.currentbr -= this.speedb;
	        	this.currentnr -= this.speedn;

	        	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	        	this.introDraw(bx, by, this.currentbr, nx, ny, this.currentnr);
	        	console.log( this.currentnr + " " + nr );
	        	if( this.currentbr <= br || this.currentnr <= nr ){
	        		this.currentbr = this.canvas.width;
	        		this.currentnr = this.canvas.width;
	        		clearInterval(request);
        		}
        	}, this);
            
        	var request = setInterval(ani, 1000/100);

            return this;
        },
        introDraw:function( bx,by,br,nx,ny,nr ){

			this.context.beginPath();
			this.context.fillStyle='red';
			this.context.arc(bx,by,br,0,2*Math.PI);
			this.context.arc(nx,ny,nr,0,2*Math.PI);
			this.context.fill();

			this.context.globalCompositeOperation='source-out';
			this.context.globalAlpha = 0.8;
			this.context.fillStyle='black';
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        }
    }

    introduction.fn.init.prototype = introduction.fn;
})(window || this);