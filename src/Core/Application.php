<?php
namespace Core;

class Application
{
  protected $slim;

  public function __construct() {
    $this->slim = new \Slim\Slim();
  }

  public function setupRoutes() {
    $this->slim->get('/hello/:name', function($name) {
      echo "Hello " . $name . ".";
    });
  }

  public function run() {
    $this->slim->run();
  }
}
