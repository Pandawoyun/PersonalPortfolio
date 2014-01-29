
window.onload = function () {


    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();


    var W = window.innerWidth;
    var H = window.innerHeight;

    $('#CP').hover(function() {
        console.log( "triggered");
        $.ajax({
            url: 'http://www.bobzhuop.com/ControlPanel/ControlPanel.html',
            type: 'GET',
            dataType: 'html',
        })
        .done(function( data ) {
            console.log( "wotun:" + data );
            $('#CP').html( data );
            $.getScript( 'http://www.bobzhuop/ControlPanel/ControlPanel.js' );
        })
        .fail(function() {
            console.log("error");
        });
        
    }, function() {
        $('#CP').html( "Control Panel");
    });

    window.maxSpeed = 5;
    window.bombPower = 100;


    window.defaultSize = {W : W, H: H};

    window.paper = Raphael( "container",W,H );

    //whirl

    window.whirls = [];
    window.whirlin = [];
    window.whirlout = [];
    window.maxWhirl = 3;


    whirl.createRanWhirl( 1 );
    whirl.createRanWhirl( -1 );
    setInterval( whirl.handleWhirls, 1000 );

//bubbleset
    window.bubbleSet = [bub(50,50,20,40,1000,1)];

//handling needle
    window.Needle = needle( W - 100, H - 100 );

    var moveNeedle = function(){
        if( window.introMode !== true ){
            window.Needle.remove();
            window.Needle = needle( Math.random() * W, Math.random() * H );
        }
    }

    setInterval( moveNeedle, 5000 );
//finish needle
//bombs
        $("#container").mousedown(function(event) {
            console.log( "down");
            if( event.which === 1 ){
                window.bomb = bombs( event );
            }
        })
        .mouseup(function(event) {
            if( event.which === 1 ){
                window.bomb.explode( event );

            }
        });

//current
    var currentIndex = Math.floor( Math.random() * 5 );
    var triggerCurrent = function( radius ){
        $.each( bubbleSet, function(index, bub) {
            bub.a = vector( radius, 0.05 );
        });

    };
    var haveRest = function( ){
        $.each( bubbleSet, function(index, bub) {
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
        if( window.introMode !== true ){
            currentIndex = Math.floor( Math.random() * 5 );
            getCurrent();
        }
    }

        getCurrent();
        setInterval( changeCurrent , 5000 );
//finish






}