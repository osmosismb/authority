<?php
namespace Tests;

use Data\AuthStore;

class AuthStoreTest extends \PHPUnit_Framework_TestCase
{
  protected $store;

  public function setUp()
  {  
    $this->store =
      new AuthStore('127.0.0.1', 'osm_auth', 'root', '', 'users_test');
    $conn = $this->store->getConnection();
    $conn->exec('DROP TABLE IF EXISTS `users_test`');

    $create = 'CREATE TABLE IF NOT EXISTS `users_test`';
    $cols = array(
      "`id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY",
      "`username` varchar(50) NOT NULL",
      "`password` CHAR(128) NOT NULL",
      "`email` CHAR(128) NOT NULL",
      "`token` varchar(255) NOT NULL",
      "`date_created` datetime NOT NULL",
      "`date_modified` datetime DEFAULT NULL",
      "`date_logged_in` datetime DEFAULT NULL",
      "`reputation_positive` int(10) unsigned NOT NULL DEFAULT '0'",
      "`reputation_negative` int(10) unsigned NOT NULL DEFAULT '0'",
    );

    $create .= '(' . implode(',', $cols) . ');';
    $conn->exec($create);

    parent::setUp();
  }

  public function testRegisterSuccess()
  {
    $this->store->register('test', 'test', 'test@test.com');

    $this->assertEquals(
      $this->store->checkUserExists('test'), true);
  }

  public function tearDown()
  {
    $conn = $this->store->getConnection();
    $conn->exec('DROP TABLE IF EXISTS `users_test`');
    parent::tearDown();
  }
}
