/*____________________________________________

A library dealing with dialog

Coded by Bob Zhu

_____________________________________________
*/
(function(window,undefined){
    var dialog = window.dialog = function(paras, callback, callbackparas){
        return new dialog.fn.init(paras, callback, callbackparas);
    };

    dialog.fn = dialog.prototype = {
        init:function(paras, callback, callbackparas){
            var x = paras['x'];
            var y = paras['y'];
            var width = paras['width'];
            var height = paras['height'];
            var id = paras['id'];
            var string = paras['string'];
            var parentDiv = paras['parentDiv'];
            
            this.callback = callback;
            this.callbackparas = callbackparas;
            var dialog = "<div id=" + id + " class='dialog' ></div>";
            var dialogObj = this;

            parentDiv.prepend( dialog );
            $('div#' + id ).css({
                top: y,
                left: x,
                width: width,
                height: height
            }).fadeIn('1000', function() {
                dialogObj.saySomething( id, string );
            });
            
        },
        saySomething:function( divID, line ){
			var lineArr = line.split("");
			this.sayIt( divID, lineArr, 0 );

        },
        sayIt:function( divID, LA, curLI ){
        	var dialog = this;
        	var span = "<span>" + LA[curLI] + "</span>";
        	$('div#' + divID ).append( span );
        	$('div#' + divID + ' span:hidden').fadeIn(20, function() {
        		if( (curLI + 1) !== LA.length ){
        			dialog.sayIt( divID, LA, curLI + 1 );
        		}
                else{
                    dialog.doCallback();
                }
        	});
        },
        doCallback:function(){
            if(this.callback !== undefined){
                this.callback(this.callbackparas);
            }
        }


    }

    dialog.fn.init.prototype = dialog.fn;
})(window || this);