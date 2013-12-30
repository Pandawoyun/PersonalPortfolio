
window.onload = function () {

    var W = window.innerWidth;
    var H = window.innerHeight;

    window.defaultSize = {W : W, H: H};

    window.paper = Raphael( 0,0,W,H );

    window.bubbleSet = [bub(50,50,20,40,1000,1)];

    window.needle = needle( 80, 100 );


    $(window).mousedown(function(event) {
        if( event.which === 1 ){

            window.bomb = bombs( event );
        }
    })
    .mouseup(function(event) {
        if( event.which === 1 ){
            window.bomb.explode( event );

        }
    });


    var currentIndex = 0;

    var triggerCurrent = function( radius ){
        $.each( bubbleSet, function(index, bub) {
            bub.a = vector( radius, 0.0025 );

            bub.resist = -0.002;
            bub.move();


        });

    };
    var haveRest = function( ){
        $.each( bubbleSet, function(index, bub) {
            bub.a = 0;

            bub.resist = -0.002;
            bub.move();
        });

    };

    var getCurrent = function(){

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
                $('#current').html("<p>no current</p>");

                haveRest();
                break;
            case 3:
                //left
                $('#current').html("<p>going left</p>");

                triggerCurrent( Math.PI );
                break;
            case 4:
                //right
                $('#current').html("<p>going right</p>");

                triggerCurrent( Math.PI * 2 );
                break;
            case 5:
                $('#current').html("<p>no current</p>");

                haveRest();
                break;


        }

        if( currentIndex === 5 ){
            currentIndex = 0;
        }
        else{
            currentIndex++;
        }


    }
        getCurrent();
        setInterval( getCurrent, 10000 );




}