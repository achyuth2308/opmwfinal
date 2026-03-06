<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

<<<<<<< HEAD
    'allowed_origins' => ['https://opmwfinal-lake.vercel.app/', 'https://opmwfinal-six.vercel.app', 'http://localhost:5173','https://opmwfinal-six.vercel.app/'],
=======
    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://opmwfinal-six.vercel.app', 'https://opmwfinal.vercel.app', 'https://opmwfinal-lake.vercel.app'],
>>>>>>> 8872680b471379db5cabb4e6af1ef407cc202b6d

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
