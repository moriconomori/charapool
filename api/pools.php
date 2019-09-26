<?php
require_once('.env');

$dsn  = DB_DRIVER . ':';
$dsn .= 'dbname=' . DB_NAME . ';';
$dsn .= 'host=' . DB_HOST . ';';
$dsn .= 'charset=' . DB_CHARSET . ';';

try {
    $pdo = new PDO($dsn, DB_USERNAME, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    exit($e->getMessage());
}

$stmt = $pdo->prepare('SELECT player, hero FROM charpool');
$stmt->execute();

foreach ($stmt as $row) {
    $pools[$row['player']][] = $row['hero'];
}

$json = json_encode($pools, JSON_UNESCAPED_UNICODE);

header("Content-Type: application/json; charset=utf-8");

echo $json;
