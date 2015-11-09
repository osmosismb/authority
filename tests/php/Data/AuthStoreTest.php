<?php
namespace Tests;

use Data\AuthStore;

class AuthStoreTest extends \PHPUnit_Framework_TestCase
{
  public function testConnectionString()
  {
    $conn = AuthStore::generateConnectionString('test', 'test');

    $this->assertEquals($conn, 'mysql:host=test;dbname=test;charset=utf8');
  }

  /**
  * @expectedException PDOException
  */
  public function testConnectionFail()
  {
    $auth = new AuthStore('localhost', 'doesnt_exist', 'root', 'root');
  }

  /**
  * @expectedException ErrorException
  */
  public function testConnectUserException()
  {
    $auth = new AuthStore('localhost', 'osm_auth', NULL, 'root');
  }

  /**
  * @expectedException ErrorException
  */
  public function testConnectPassException()
  {
    $auth = new AuthStore('localhost', 'osm_auth', 'root', NULL);
  }

  /**
  * @expectedException ErrorException
  */
  public function testConnectionStringHostException()
  {
    $conn = AuthStore::generateConnectionString(NULL, 'test');
  }

  /**
  * @expectedException ErrorException
  */
  public function testConnectionStringDbException()
  {
    $conn = AuthStore::generateConnectionString('test', NULL);
  }

  /**
  * @expectedException ErrorException
  */
  public function testConnectionStringCharsetException()
  {
    $conn = AuthStore::generateConnectionString('test', 'test', NULL);
  }
}
