/*____________________________________________

A library dealing with needle

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var init = window.init = function(){
        return new init.fn.init();
    };

    init.fn = init.prototype = {
        init:function(){
            window.requestAnimFrame = (function(callback) {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();

            this.W = window.innerWidth;
            this.H = window.innerHeight;

            window.maxSpeed = 5;
            window.bombPower = 100;
            window.defaultSize = {W : window.innerWidth, H: window.innerHeight};
            window.paper = Raphael( "container",this.W, this.H );
            this.initMap = {
                'bubble' : 0,
                'needle' : 0,
                'controlPanel' : 0,
                'shockWave' : 0,
                'current' : 0,
                'whirlPool' : 0,
                'needleMove' : 0
            };

        },
        introduction:function(){
            var init = this;
            init.bubble();
            init.needle();
            init.controlPanel();
            introduction();
        },
        initComplete:function(){
            var init = this;
            init.shockWave();
            init.bubble();
            init.needle();
            init.controlPanel();
            init.current();
            init.whirlPool();
            init.needleMove();
        },
        shockWave:function(){
            if(!this.initMap['shockWave']){
                $("#container").mousedown(function(event) {
                    if( event.which === 1 ){
                        window.bomb = bombs( event );
                    }
                })
                .mouseup(function(event) {
                    if( event.which === 1 ){
                        window.bomb.explode( event );

                    }
                });
                this.initMap['shockWave'] = 1;
            }
        },
        whirlPool:function(){
            if(!this.initMap['whirlPool']){
                window.whirls = [];
                window.whirlin = [];
                window.whirlout = [];
                window.maxWhirl = 3;

                whirl.createRanWhirl( 1 );
                whirl.createRanWhirl( -1 );
                setInterval( whirl.handleWhirls, 1000 );
                this.initMap['whirlPool'] = 1;
            }
        },
        needle:function(){
            if(!this.initMap['needle']){

                var init = this;
                window.needStart = {
                    'x': init.W - 100,
                    'y': init.H - 100
                }
                window.Needle = needle( window.needStart['x'], window.needStart['y'] );
                this.initMap['needle'] = 1;
            }
        },
        needleMove: function(){
            if(!this.initMap['needleMove']){
                window.Needle.move();
                this.initMap['needleMove'] = 1;
            }
        },
        controlPanel:function(){
            if(!this.initMap['needleMove']){

                $('#CP').hover(function() {
                    console.log( "triggered");
                    $.ajax({
                        url: 'http://www.bobzhuop.com/ControlPanel/ControlPanel.html',
                        type: 'GET',
                        dataType: 'html',
                    })
                    .done(function( data ) {
                        $('#CP').html( data );
                        $.getScript( 'http://www.bobzhuop/ControlPanel/ControlPanel.js' );
                    })
                    .fail(function() {
                        console.log("error");
                    });
                    
                }, function() {
                    $('#CP').html( "Control Panel");
                });
                this.initMap['controlPanel'] = 1;
            }
        },
        bubble:function(){
            //bubbleset
            if(!this.initMap['bubble']){
                window.bubbleSet = [bub(50,50,20,40,1000,1)];
                this.initMap['bubble'] = 1;
            }
        },
        current:function(){
            if(!this.initMap['current']){

                var currentIndex = Math.floor( Math.random() * 5 );
                var triggerCurrent = function( radius ){
                    $.each( window.bubbleSet, function(index, bub) {
                        bub.a = vector( radius, 0.05 );
                    });

                };
                var haveRest = function( ){
                    $.each( window.bubbleSet, function(index, bub) {
                        bub.a = 0;
                    });

                };

                var getCurrent = function( ){
                    switch( currentIndex ){

                        case 0:
                            //up
                            $('#current').html("<p>going up</p>");
                            triggerCurrent( Math.PI * 3 / 2 );
                            break;
                        case 1:
                            //down
                            $('#current').html("<p>going down</p>");

                            triggerCurrent( Math.PI / 2 );
                            break;
                        case 2:
                            //left
                            $('#current').html("<p>going left</p>");

                            triggerCurrent( Math.PI );
                            break;
                        case 3:
                            //right
                            $('#current').html("<p>going right</p>");

                            triggerCurrent( Math.PI * 2 );
                            break;
                        case 4:
                            $('#current').html("<p>no current</p>");

                            haveRest();
                            break;
                    }

                }

                var changeCurrent = function(){
                    currentIndex = Math.floor( Math.random() * 5 );
                    getCurrent();
                }

                getCurrent();
                setInterval( changeCurrent , 5000 );
                this.initMap['current'] = 1;
            }
        }
    };

    init.fn.init.prototype = init.fn;
})(window || this);