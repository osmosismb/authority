<?php
namespace Data;

class AuthStore
{
  protected $connection;
  protected $userTable;

  public function __construct($host, $db, $user, $pass, $table = 'users')
  {
    if (!isset($user) || !is_string($user)) {
      throw new \ErrorException('Invalid user for AuthStore connection.');
    }

    if (!isset($pass) || !is_string($pass)) {
      throw new \ErrorException('Invalid password for AuthStore connection.');
    }

    $conn = $this->generateConnectionString($host, $db);
    $this->connection = new \PDO($conn, $user, $pass);
    $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

    $this->userTable = $table;
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

  public function login($user, $pass)
  {
    $query = "SELECT username, password, salt, token FROM users
      WHERE username = :user
      LIMIT 1";

    $params = array(
      ':user' => $user
    );

    $cmd = $this->connection->prepare($query);
    $cmd->execute($params);

    $result = $cmd->fetch(\PDO::FETCH_OBJ);
    if (!$result) {
      throw new \ErrorException('User not found.');
    }

    $pass = hash('sha512', $pass . $result['salt']);

    if ($result['password'] != $pass) {
      throw new \ErrorException('Incorrect username or password.');
    }

    return $result['token'];
  }

  public function register($user, $pass, $email)
  {
    if (!isset($user) ||
        !isset($pass) ||
        !isset($email)) {
      throw new \ErrorException('Missing fields for user registration.');
    }

    if ($this->checkUserExists($user)) {
      throw new \ErrorException('User already exists.');
    }

    $query = 'SELECT username FROM ' . $this->userTable . ' WHERE username = :user';
    $params = array(
      ':user' => $user
    );

    $cmd = $this->connection->prepare($query);
    $cmd->execute($params);

    $result = $cmd->fetch(\PDO::FETCH_OBJ);
    if ($result) {
      throw new \ErrorException('User already exists.');
    }

    $pass = password_hash($pass, PASSWORD_BCRYPT);
    $token = uniqid();

    $query = 'INSERT INTO ' . $this->userTable .
      ' (username, password, email, token, date_created, reputation_positive, reputation_negative)' .
      'VALUES (:user, :pass, :email, :token, :date, 0, 0)';
    $params = array(
      ':user' => $user,
      ':pass' => $pass,
      ':email' => $email,
      ':token' => $token,
      ':date' => date("Y-m-d H:i:s")
    );

    $cmd = $this->connection->prepare($query);
    $cmd->execute($params);
  }

  public function checkUserExists($user)
  {
    $query = 'SELECT username FROM ' . $this->userTable .
      ' WHERE username = :user';
    $params = array(
      ':user' => $user
    );

    $cmd = $this->connection->prepare($query);
    $cmd->execute($params);

    $result = $cmd->fetch(\PDO::FETCH_OBJ);
    if ($result) {
      return true;
    }

    return false;
  }

  public function getConnection()
  {
    return $this->connection;
  }
}
