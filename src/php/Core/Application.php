<?php
namespace Core;

use Data\AuthStore;

class Application
{
  protected $app;

  protected $config;

  protected $authStore;

  public function __construct()
  {
    $this->app = new \Slim\Slim();
    $this->initialize(new Config());
  }

  public function setupRoutes()
  {
    $app = $this->app;
    $session = $this->session;

    $app->get('/', function() use ($app) {
      $app->render('home.php');
    });

    $app->post('/login', function() use ($app, $session) {
      $request = Slim::getInstance()->request();
      $body = json_decode($request->getBody());

      if (!isset($body['username']) || !isset($body['password'])) {
        throw new \ErrorException('Username or password not set.');
      }

      $response = $app->response();
      $response['Content-Type'] = 'application/json';

      try {
        $token = $authStore->login($body['username'], $body['password']);
        $_SESSION['user_token'] = $token;
      } catch (\Exception $ex) {
        $response->status(500);
        $response->body(json_encode(array(
          'success' => false,
          'message' => $ex->getMessage()
        )));

        return;
      }

      $response->status(200);
      $response->body(json_encode(array(
        'success' => true
      )));
    });

    $app->post('/register', function() {
      $request = Slim::getInstance()->request();
      $body = json_decode($request->getBody());

      $response = $app->response();
      $response['Content-Type'] = 'application/json';

      try {
        $token = $authStore->register(
          $body['username'],
          $body['password'],
          $body['email']
        );

        $_SESSION['token'];
      } catch (\Exception $ex) {
        $response->status(500);
        $response->body(json_encode(array(
          'success' => false,
          'message' => $ex->getMessage()
        )));
      }

      $response->status(200);
      $response->body(json_encode(array(
        'success' => true
      )));
    });

    $app->get('/auth', function() {
      // check session for user

      // return auth token if successful
    });

    $app->get('/api/users/', function() {
      echo 'api/users';
    });

    $app->get('/api/users/:token', function($token) {
      echo 'api/users/token';
    });
  }

  public function run()
  {
    $this->app->run();
  }

  private function initialize($config)
  {
    $authStore = new AuthStore(
      $config->get('db_host'),
      $config->get('db_name'),
      $config->get('db_user'),
      $config->get('db_pass')
    );

    $cache = new \Predis\Client($config->get('cache_host'),
      array(
        'prefix' => $this->app->environment['SERVER_NAME']
      )
    );

    $this->app->add(new \Slim\Middleware\RedisCache($cache,
      array(
        'timeout' => 28800
      )
    ));
  }
}
