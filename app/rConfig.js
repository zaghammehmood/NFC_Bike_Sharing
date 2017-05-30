require.config({
    urlArgs: '',
    waitSeconds: 0,
    paths: {
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
        'angular': '/bower_components/angular/angular',

        'angular-ui-router': '/bower_components/angular-ui-router/release/angular-ui-router.min',

        'angular-google-maps': '/bower_components/angular-google-maps/dist/angular-google-maps.min',

        'angular-bootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

        'chartjs': '/bower_components/cha',

        'lodash': '/bower_components/lodash/dist/lodash.min',

        // app js file includes
        'appConfig': 'app.config',

        'elastic-rest': './rest/elastic'
    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']}
    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
});