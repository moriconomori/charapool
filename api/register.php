<?php

require_once('../config/database.php');

$pdo = getPdo();

$playerName = $_POST['playerName'];
$heros = $_POST['hero'];

$sql = "INSERT INTO charpool (player, hero) VALUES";
$sql .= implode(",", array_fill(0, count($heros), "(?, ?)"));

$values = array();

for ($i = 0; $i < count($heros); $i++) {
    $values[] = $playerName;
    $values[] = $heros[$i];
}

$stmt = $pdo->prepare($sql);
$stmt->execute($values);

header('Location: ../');
exit;
