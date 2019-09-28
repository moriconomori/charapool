<?php

require_once('../config/database.php');

$pdo = getPdo();

$playerName = $_GET['player'];

if ($playerName) {
    $stmt = $pdo->prepare('SELECT player, hero, specialty FROM charpool WHERE player = :player');
    $stmt->bindValue('player', $playerName);
} else {
    $stmt = $pdo->prepare('SELECT player, hero, specialty FROM charpool');
}

$stmt->execute();

$rows = $stmt->fetchAll();

foreach ($rows as $row) {
    $hero['name'] = $row['hero'];
    $hero['specialty'] = $row['specialty'];
    $data[$row['player']][] = $hero;
}

foreach ($data as $player => $heros) {
    $pool['player'] = $player;
    $pool['heros'] = $heros;
    $pools[] = $pool;
}

$json = json_encode($pools, JSON_UNESCAPED_UNICODE);

header("Content-Type: application/json; charset=utf-8");

echo $json;
