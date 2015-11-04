<?php

require_once 'vendor/autoload.php';

$app = new \OsmosisAuthority\Application();

$app->setupRoutes();
$app->run();
