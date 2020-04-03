<?php

if ( $_SERVER["REQUEST_URI"] == "/") {
    readfile("home.html");

} else if ( $_SERVER["REQUEST_URI"] == "/cd-alert.js" ) {
    readfile("alert.js" );  

}else if ( $_SERVER["REQUEST_URI"] == "/Fire-Works.css" ) {
    header("Content-Type: text/css");
    readfile("Fire-Works.css" );  



} else {
     var_dump( $_SERVER["REQUEST_URI"] );
    echo("I don't know what you want from me..");







}


//var_dump($_SERVER);
//exit();




// Show all information, defaults to INFO_ALL


?>