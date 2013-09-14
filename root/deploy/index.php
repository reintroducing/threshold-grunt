<? $devServer = "dev.reintroducing.com"; ?>
<!DOCTYPE html>
<!--[if IE 8 ]><html lang="en" class="ie ie8"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="ie ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
    <head>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">

        <title></title>

        <link rel="shortcut icon" href="favicon.ico">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <? if ($_SERVER["SERVER_NAME"] == $devServer || $_SERVER["SERVER_NAME"] == "localhost") : ?>
        <link rel="stylesheet" href="css/main.css">
        <? else : ?>
        <link rel="stylesheet" href="css/main.min.css">
        <? endif; ?>

        <!--[if lt IE 9]><script src="js/libs/html5shiv/html5shiv.js"></script><![endif]-->
    </head>

    <body>

        <? if ($_SERVER["SERVER_NAME"] == $devServer || $_SERVER["SERVER_NAME"] == "localhost") : ?>
        <script src="js/libs/jquery/jquery-2.0.3.min.js"></script>
        <script src="js/main.js"></script>
        <? else : ?>
        <script src="js/main.min.js"></script>
        <? endif; ?>
    </body>
</html>