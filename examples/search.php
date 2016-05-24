<?php

define('DATAFILE','cities.json');

if(!isset($_GET['q']) or empty($_GET['q']))
	die( json_encode(array('ok'=>0, 'errmsg'=>'specify q parameter') ) );

$data = json_decode( file_get_contents(DATAFILE), true);

function searchInit($text)	//search initial text in titles
{
	$reg = "/^".$_GET['q']."/i";	//initial case insensitive searching
	return (bool)@preg_match($reg, $text['title']);
}
$fdata = array_filter($data, 'searchInit');	//filter data
$fdata = array_values($fdata);	//reset $fdata indexs

$JSON = json_encode($fdata,true);

sleep(2);
//simulate connection latency for localhost tests
@header("Content-type: application/json; charset=utf-8");

if(isset($_GET['callback']) and !empty($_GET['callback']))	//support for JSONP request
	echo $_GET['callback']."($JSON)";
else
	echo $JSON;	//AJAX request

?>
