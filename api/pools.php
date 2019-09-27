<?php

require_once('../config/database.php');

$pdo = getPdo();

$playerName = $_GET['player'];

if ($playerName) {
    $stmt = $pdo->prepare('SELECT player, hero FROM charpool WHERE player = :player');
    $stmt->bindValue('player', $playerName);
} else {
    $stmt = $pdo->prepare('SELECT player, hero FROM charpool');
}

$stmt->execute();

$rows = $stmt->fetchAll();

foreach ($rows as $row) {
    $data[$row['player']][] = $row['hero'];
}

foreach ($data as $player => $heros) {
    $pool['player'] = $player;
    $pool['heros'] = $heros;
    $pools[] = $pool;
}

$json = json_encode($pools, JSON_UNESCAPED_UNICODE);

header("Content-Type: application/json; charset=utf-8");

echo $json;
