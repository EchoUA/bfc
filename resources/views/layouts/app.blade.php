<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>BFC</title>

    <!-- Styles -->
    <link href="/app/bower_components/materialize/dist/css/materialize.min.css" rel="stylesheet">

    {{--<link href="/css/app.css" rel="stylesheet">--}}
    <link rel="stylesheet" href="app/build/css/main.min.css">
    <link rel="stylesheet" href="/css/main.css">
    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>
<div class="navbar-wrapper">
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

            <!-- Branding Image -->
                <a class="navbar-brand center" href="{{ url('/') }}">
                    <img src="/images/bfc-logo.png" alt="BFC">
                </a>

            </div>
        </div>
    </nav>
</div>

@yield('content')

<!-- Scripts -->
<script src="/app/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/app/bower_components/materialize/dist/js/materialize.min.js"></script>

</body>
</html>
