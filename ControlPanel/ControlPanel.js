
$("input#maxSpeed")
.val(window.maxSpeed)
.change(function(event) {
	/* Act on the event */
	window.maxSpeed = $(this).val();
});

$("input#maxWhirlpools")
.val(window.maxWhirl)
.change(function(event) {
	/* Act on the event */
	if( $(this).val() > window.regionNum ){
		var $whirlInput = $("input#maxWhirlpools");
		$('div#whirlWarn').css('display', 'block').fadeOut('10000', function() {
		});
	}else{
		window.maxWhirl = $(this).val();
	}
});


$("input#bombPower")
.val(window.bombPower)
.change(function(event) {
	/* Act on the event */
	window.bombPower = $(this).val();
});
