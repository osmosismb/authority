<?php
namespace Core;

use Data\AuthStore;

class Application
{
  protected $app;

  protected $session;

  protected $authStore;

  public function __construct()
  {
    $this->app = new \Slim\Slim();

    $this->session =
      new Slim_Middleware_SessionRedis(array(
        'session.expires' => 3600,
        'session.id' => $_COOKIE['session_cookie'],
        'session.name' => 'session_cookie'
      ));

    $this->app->add($this->session);
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

      if (!isset($body['username'] || !isset($body['password']))) {
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
          'message' => $ex->getMessage();
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

      if (!isset($body['username']) ||
          !isset($body['password']) ||
          !isset($body['email'])) {
        throw new \ErrorException('Missing fields for user registration.');
      }

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
          'message' => $ex->getMessage();
        )));
      }

      $response->status(200);
      $response->body(json_encode(array(
        'success' => true
      )));
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
}
