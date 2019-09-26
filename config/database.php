<?php

require_once('.env');

function getPdo()
{
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

    return $pdo;
}
