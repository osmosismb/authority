<?php
namespace Data;

class AuthStore
{
  protected $connection;

  public function __construct($host, $db, $user, $pass)
  {
    if (!isset($user) || !is_string($user)) {
      throw new \ErrorException('Invalid user for AuthStore connection.');
    }

    if (!isset($pass) || !is_string($pass)) {
      throw new \ErrorException('Invalid password for AuthStore connection.');
    }

    $conn = $this->generateConnectionString($host, $db);
    $this->connection = new \PDO($conn, $user, $pass);
  }

  public static function generateConnectionString($host, $db, $charset = 'utf8')
  {
    if (!isset($host) || !is_string($host)) {
      throw new \ErrorException('Invalid host value for connection string.');
    }

    if (!isset($db) || !is_string($db)) {
      throw new \ErrorException('Invalid db value for connection string.');
    }

    if (!isset($charset) || !is_string($charset)) {
      throw new \ErrorException('Invalid charset value for connection string.');
    }

    return 'mysql:host=' . $host . ';dbname=' . $db . ';charset=' . $charset;
  }
}
