<?php
namespace Tests;

use Core\Config;

class ConfigTest extends \PHPUnit_Framework_TestCase
{
  public function testInitializeDefault()
  {
    $config = new Config();

    $this->assertEquals($config->getEnv(), 'dev');
  }

  public function testInitializeParameter()
  {
    $param = 'test';
    $config = new Config('test');

    $this->assertEquals($config->getEnv(), 'test');
  }

  public function testGetKey()
  {
    $config = new Config();

    $value = $config->get('auth_store');

    $this->assertNotNull($value);
  }

  /**
  * @expectedException ErrorException
  */
  public function testConfigException()
  {
    $config = new Config('this_doesnt_exist');
  }

  /**
  * @expectedException ErrorException
  */
  public function testKeyException()
  {
    $config = new Config();

    $value = $config->get('this_doesnt_exist');
  }
}
