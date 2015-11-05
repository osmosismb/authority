<?php
namespace Core;

class Application
{
  protected $slim;

  public function __construct() {
    $this->slim = new \Slim\Slim();
  }

  public function setupRoutes() {
    $slim = $this->slim;

    $slim->get('/', function() use ($slim) {
      $slim->render('home.php');
    });

    $slim->get('/api/users/', function() {
      echo 'api/users';
    });

    $slim->get('/api/users/:hash', function($hash) {
      echo 'api/users/hash';
    });
  }

  public function run() {
    $this->slim->run();
  }
}
