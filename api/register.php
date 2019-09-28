<?php

require_once('../config/database.php');

$pdo = getPdo();

$playerName = $_POST['playerName'];
$heros = $_POST['heros'];

$values = array();

$heroNum = 0;
foreach ($heros as $item) {
    if ($item['hasHero'] === "true") {
        $values[] = $playerName;
        $values[] = $item['name'];
        $values[] = $item['specialty'];
        $heroNum++;
    }
}

$sql = "INSERT INTO charpool (player, hero, specialty) VALUES";
$sql .= implode(",", array_fill(0, $heroNum, "(?, ?, ?)"));

$stmt = $pdo->prepare($sql);
$stmt->execute($values);

header('Location: ../');

exit;
