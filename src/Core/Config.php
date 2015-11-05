<?php
namespace Core;

class Config
{
  protected $environment;

  protected $settings;

  public function __construct($env = NULL)
  {
    if (isset($env)) {
      $this->environment = $env;
      $this->initialize();
      return;
    }

    if (isset($_SERVER['APPLICATION_ENV'])) {
      $this->environment = $_SERVER['APPLICATION_ENV'];
      $this->initialize();
      return;
    }

    $this->environment = 'dev';
    $this->initialize();
  }

  public function get($key)
  {
    if (array_key_exists($key, $this->settings)) {
      return $this->settings[$key];
    }

    throw new Exception('Key not found in the configuration settings array.');
  }

  public function getEnv()
  {
    return $this->environment;
  }

  protected function initialize()
  {
    $configFile = parse_ini_file('/etc/osm/conf.ini', true);
    $this->settings = $configFile[$this->environment];
  }
}
