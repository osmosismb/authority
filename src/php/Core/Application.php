<?php
namespace Core;

class Application
{
  protected $slim;

  public function __construct() {
    $this->slim = new \Slim\Slim();
  }

  public function setupRoutes() {
    $this->slim->get('/', function($name) {
      $this->slim->render('Templates/index.php');
    });

    $this->slim->get('/api/users/', function() {

    });

    $this->slim->get('/api/users/:hash', function($hash) {

    });
  }

  public function run() {
    $this->slim->run();
  }
}
