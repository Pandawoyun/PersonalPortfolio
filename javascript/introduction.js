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
            var intro = this;
            var surface = "<div id='introduction'><div id='stageOneDiv'><canvas id='introCanvas' width=" + window.innerWidth  + " height=" + window.innerHeight + "></canvas></div></div>";
            $('body').prepend( surface ); 
            var skip = "<button type='button' id='skipIntro'>Skip Introduction</button>";
            var skipToStage2 = "<button type='button' id='skip2s2'>Skip to stage two</button>";


            $('#introduction').prepend( skipToStage2 );
            $('#introduction').prepend( skip );
    		$('#introduction button#skipIntro').click(function(event) {
                intro.skip();
    		});
            $('#introduction button#skip2s2').click(function(event) {
                intro.clearStage('One');
                intro.stageTwo();
                this.skippedTo = 2;
            });

            this.canvas = document.getElementById( 'introCanvas' );
            this.context = this.canvas.getContext('2d');
			this.currentbr = this.canvas.width;
			this.currentnr = this.canvas.width;
	
			this.bubx = 50,
			this.buby = 50,
			this.bubr = 70,
			this.needx = this.canvas.width - 100,
			this.needy = this.canvas.height - 100,
			this.needr = 11;
			
            this.ms = 2000;
			var times = this.ms / 1000 * 100;
			this.speedb = (this.currentbr - this.bubr)/times;
			this.speedn = (this.currentnr - this.needr)/times;
            window.introStage = 1;
            this.skippedTo = 0;
            this.introAni(this.bubx, this.buby, this.bubr, this.needx, this.needy, this.needr);
        },
        skip:function( ){
            $('#introduction').remove();
            window.init.initComplete();
            
            notiRect(window.needStart['x'], window.needStart['y'], 400);
        },

        introAni:function(bx,by,br,nx,ny,nr){

        	var ani = $.proxy(function(){
	        	this.currentbr -= this.speedb;
	        	this.currentnr -= this.speedn;

	        	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	        	this.introDraw(bx, by, this.currentbr, nx, ny, this.currentnr);
	        	if( this.currentbr <= br || this.currentnr <= nr ){
	        		this.currentbr = this.canvas.width;
	        		this.currentnr = this.canvas.width;
	        		clearInterval(request);

                    //start popping dialog
                    if(this.skippedTo <= window.introStage){
                        this.stageOne();
                    }                    
        		}
        	}, this);
            
        	var request = setInterval(ani, 1000/100);

            return this;
        },
        clearStage:function(stageNum){
            $('#introduction #stage' + stageNum + 'Div').remove();
        },
        
        showOKbutton:function(paras){
            var okButton = "<button type='button' class='okButton'>Ok</button>";
            paras['parent'].prepend( okButton );
            var okWidth = 50;
            var okHeight = 30;
            $('#introduction button.okButton').css({
                'position' : 'absolute',
                'left': paras['x'],
                'top': paras['y'],
                'width': okWidth,
                'height': okHeight,
                'pointer-events': 'all'
            }).click(paras['callback']);
        },
        
        stageOne:function(){
            var intro = this;
            var needDwidth = intro.canvas.width * 2 / 10;
            var needDheight = intro.canvas.height * 2 / 10;
            var needleParas = {
                'x':intro.needx - intro.needr - needDwidth - 30,
                'y':intro.needy - needDheight,
                'width': needDwidth,
                'height': needDheight,
                'id':"needleDialog",
                'string':"this is the needle, Note that it will randomly teleport over the screen",
                'parentDiv': $('#introduction #stageOneDiv')
            };

            var purposeParas = {
                'x':intro.canvas.width * 4 / 10,
                'y':intro.canvas.height * 4 / 10,
                'width':intro.canvas.width * 2 / 10,
                'height':intro.canvas.height * 2 / 10,
                'id':"purposeDialog",
                'string':"Your goal is to get the bubble to the needle",
                'parentDiv': $('#introduction #stageOneDiv')

            };
            var bubbleParas = {
                'x':intro.bubx + intro.bubr + 30,
                'y':intro.buby,
                'width':intro.canvas.width * 1 / 10,
                'height':intro.canvas.height * 1 / 10,
                'id':"bubbleDialog",
                'string':"this is the bubble",
                'parentDiv': $('#introduction #stageOneDiv')
            };


            var showOKbutton = function(){
                var stageOneDone = "<button type='button' id='stageOneDone'>Ok</button>";
                $('#stageOneDiv').prepend( stageOneDone );
                var okWidth = 50;
                var okHeight = 30;
                $('#introduction button#stageOneDone').css({
                    'position' : 'absolute',
                    'top': intro.canvas.height * 6 / 10,
                    'left': intro.canvas.width * 6 / 10 - okWidth,
                    'width': okWidth,
                    'height': okHeight
                }).click(function(event) {
                    intro.clearStage('One');
                    intro.stageTwo();
                });
            };
            var proceedToPurpose = function(){
                dialog(purposeParas, showOKbutton);
            };
            var proceedToNeedle = function(){
                dialog(needleParas, proceedToPurpose);
            };

            dialog(bubbleParas, proceedToNeedle);
        },
        stageTwo:function(){
            window.introStage = 2;
            window.Needle.remove();
            var intro = this;
            var stageTwoDiv = "<div id='stageTwoDiv' width=" + window.innerWidth  + " height=" + window.innerHeight + "></div>";
            $('#introduction').prepend( stageTwoDiv ); 
            $('#introduction').css('pointer-events', 'none');
            $('#introduction button#skipIntro').css('pointer-events', 'all');

            var shockWaveParas = {
                'x':intro.canvas.width * 4 / 10,
                'y':intro.canvas.height * 3 / 10,
                'width':intro.canvas.width * 2 / 10,
                'height':intro.canvas.height * 4 / 10,
                'id':"shockWaveDialog",
                'string':"You can left click to create shock waves to push the bubble, Note: hold and release can create stronger shock waves, Now try left clicking beside the bubble",
                'parentDiv': $('#introduction #stageTwoDiv')
            };
            
            var okCallback = function(event){
                intro.clearStage('Two');
                window.init.shockWave();
                $("#container").mouseup(function(event) {
                    if( event.which === 1 ){

                        setTimeout(function(){
                            console.log("two done!");
                            intro.stageThree();
                        }, 3000);
                    }
                });

            };
            
            var okButtonParas = {
                'parent' : $('#introduction #stageTwoDiv'),
                    'x'  : intro.canvas.width * 6 / 10 - 30,
                    'y'  : intro.canvas.height * 7 / 10 ,
             'callback'  : okCallback
            };
            dialog(shockWaveParas, this.showOKbutton, okButtonParas);
            
        },
        stageThree:function(){
            window.introStage = 3;

            var intro = this;
            var stageThreeDiv = "<div id='stageThreeDiv' width=" + window.innerWidth  + " height=" + window.innerHeight + "></div>";
            $('#introduction').prepend( stageThreeDiv );
            

            var currentParas = {
                'x':100,
                'y':10,
                'width':200,
                'height':200,
                'id':"currentDialog",
                'string':"This is the indicator for current, eg. GOING DOWN means there will be a downward acceleration on the bubble",
                'parentDiv': $('#introduction #stageThreeDiv')
            };

            var controlParas = {
                'x':intro.canvas.width - 400,
                'y':intro.canvas.height - 100,
                'width':200,
                'height':200,
                'id':"controlDialog",
                'string':"Hover the cursor on this to pop out the control panel",
                'parentDiv': $('#introduction #stageThreeDiv')
            };

            var whirlParas = {
                'x':intro.canvas.width * 4 / 10,
                'y':intro.canvas.height * 3 / 10,
                'width':intro.canvas.width * 2 / 10,
                'height':intro.canvas.height * 4 / 10,
                'id':"whirlDialog",
                'string':"There will be whirlPool randomly happening over the map, try going into one of them and see the magic, Now game start!",
                'parentDiv': $('#introduction #stageThreeDiv')

            };
            
            var okCallback = function(event){
                intro.clearStage('Three');
                intro.skip();
            };
            
            var okButtonParas = {
                'parent' : $('#introduction #stageThreeDiv'),
                    'x': intro.canvas.width * 6 / 10 - 50,
                    'y': intro.canvas.height * 7 / 10,
             'callback'  : okCallback
            };

            var proceedTowhirl = function(){
                window.init.whirlPool();
                dialog(whirlParas, intro.showOKbutton, okButtonParas);
            };
            var proceedToControl = function(){
                dialog(controlParas, proceedTowhirl);
            };

            window.init.current();
            dialog(currentParas, proceedToControl);
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