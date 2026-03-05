<?php
try {
    $dsn = "mysql:host=mysql-1621230b-opmw-db.j.aivencloud.com;port=24243;dbname=defaultdb";
    $user = "avnadmin";
    $pass = env('DB_PASSWORD');
    $caPath = __DIR__ . '/ca.pem';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_SSL_CA => $caPath,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "SSL Connection with CA Certificate: SUCCESS\n";
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    echo "Users in DB: " . $stmt->fetchColumn() . "\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
