/*____________________________________________

A library dealing with vectors

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var vector = window.vector = function( radius, mag ){
        return new vector.fn.init( radius, mag );
    };

    vector.fn = vector.prototype = {
        init:function( radius, mag ){
            this.radius = radius;
            this.mag = mag;
            this.mx = mag * Math.cos( this.radius );
            this.my = mag * Math.sin( this.radius );

        },
        plus:function( vec ){
            if( typeof vec === 'number' ){
                this.mag += vec;
                this.mx = this.mag * Math.cos( this.radius );
                this.my = this.mag * Math.sin( this.radius );            
            }
            else{

                this.mx = this.mx + vec.mx;
                this.my = this.my + vec.my;

                this.mag = Math.sqrt( Math.pow( ( this.mx ), 2 ) + Math.pow( ( this.my ), 2 ) );

                this.radius = Math.atan( Math.abs( this.my ) / Math.abs( this.mx ) );
                if( this.mx < 0 && this.my > 0 ){
                    this.radius = Math.PI - this.radius;
                }
                else if( this.mx < 0 && this.my < 0 ){
                    this.radius = Math.PI + this.radius;
                }
                else if( this.mx > 0 && this.my < 0 ){
                    this.radius = 2 * Math.PI - this.radius;
                }

            }
            return this;
        }

    };

    vector.fn.init.prototype = vector.fn;
})(window || this);