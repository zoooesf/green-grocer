<?php

// GET LIST OF PRODUCTS BY DEPARTMENT

$department_id = $_POST["department_id"];
$department_id = addslashes($department_id);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsByDepartment($department_id);

header("Content-Type: application/json");

echo $data;

?>
