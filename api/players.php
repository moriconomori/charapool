<?php

require_once('../config/database.php');

$pdo = getPdo();

$stmt = $pdo->prepare('SELECT DISTINCT player FROM charpool ORDER BY player ASC');
$stmt->execute();

foreach ($stmt as $row) {
    $players[] = $row['player'];
}

$json = json_encode($players, JSON_UNESCAPED_UNICODE);

header("Content-Type: application/json; charset=utf-8");

echo $json;
