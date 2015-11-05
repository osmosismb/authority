<?php

require_once 'vendor/autoload.php';

$app = new \Core\Application();

$app->setupRoutes();
$app->run();
