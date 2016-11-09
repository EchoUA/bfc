<!DOCTYPE html>
<html lang="en" ng-app="BfcApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title ng-bind="'BFC | ' + $state.current.data.pageTitle"></title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link id="ng_load_plugins_before" />

    <!-- Styles -->
    <link href="/app/build/css/main.min.css" rel="stylesheet">

    <!-- Scripts -->

</head>
<body>

<!-- TOASTER DIRECTIVE -->
<toaster-container></toaster-container>

<!-- BEGIN HEADER -->
<header ng-include="'/app/src/views/layouts/header.html'" ng-controller="HeaderController"> </header>
<!-- END HEADER -->

<!-- BEGIN CONTENT -->
<div class="clearfix"> </div>
<div ng-include="'/app/src/views/layouts/content.html'" ></div>
<!-- END CONTENT -->

<!-- BEGIN FOOTER -->
<div ng-include="'/app/src/views/layouts/footer.html'" ng-controller="FooterController"> </div>
<!-- END FOOTER -->


<!-- Scripts -->
<script src="/app/build/js/main.js"></script>

<script>
    BfcApp.constant("CSRF_TOKEN", '{!! csrf_token() !!}');
</script>

</body>
</html>
