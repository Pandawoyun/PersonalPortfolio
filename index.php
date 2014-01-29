
<?php
// if ($_COOKIE['iwashere'] != "yes") { 
//   setcookie("iwashere", "yes", time()+315360000);  
  //first time
  $first = True;

//}
?>
<html>
<head>
	<script type="text/javascript" src="javascript/jq.js"></script>
	<script type="text/javascript" src="javascript/raphael.js"></script>
	<script type="text/javascript" src="javascript/bubble.js"></script>
	<script type="text/javascript" src="javascript/vector.js"></script>
	<script type="text/javascript" src="javascript/bombs.js"></script>
	<script type="text/javascript" src="javascript/needle.js"></script>
	<script type="text/javascript" src="javascript/whirlPool.js"></script>
	<script type="text/javascript" src="javascript/main.js"></script>
	<script type="text/javascript" src="javascript/introduction.js"></script>
	<link rel="stylesheet" type="text/css" href="main.css">




</head>
<body>
<div id="container">
 <div id="current">  </div>
 <div id="CP">Control Panel</div>
</div>

<script type="text/javascript">

</script>

<?php
	if( $first  ){
		
		echo "<script type='text/javascript'>introduction();</script>";
	}
?>
</body>


</html>