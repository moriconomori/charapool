<?php

require_once('../config/database.php');

$pdo = getPdo();

$stmt = $pdo->prepare('SELECT player, hero FROM charpool');
$stmt->execute();

foreach ($stmt as $row) {
    $pools[$row['player']][] = $row['hero'];
}

$json = json_encode($pools, JSON_UNESCAPED_UNICODE);

header("Content-Type: application/json; charset=utf-8");

echo $json;
