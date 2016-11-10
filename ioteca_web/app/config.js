var baseUrl = 'http://localhost:9000/';
var loginUrl = 'http://localhost:9001/auth_web/';

var config = {
    baseUrl: baseUrl,
    loginUrl: loginUrl,
};

app.value('config', config);

app
    .config(function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push('authInterceptorService');
    })

.run(function($rootScope, $state, $stateParams, $window, authService) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    /*******************************agregado**************************/
    //console.log("run");

    authService.fillAuthData();
    if (authService.authentication.isAuth === false) {
        $window.location = loginUrl;
    }
    /******************************************************************/

})


.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
})

.config(function($mdDateLocaleProvider, $provide) {

    $mdDateLocaleProvider.shortDays = [
        'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'
    ];
    
    // Can change week display to start on Domingo.
    $mdDateLocaleProvider.firstDayOfWeek = 0;

    // Example uses moment.js to parse and format dates.
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        if (angular.isDate(date)) {
            var m = moment(date);
            return m.isValid() ? m.format('DD/MM/YYYY') : '';
        }
        return '';
    };

})

.config(
    function($mdIconProvider, $$mdSvgRegistry) {
        // Add default icons from angular material para versiones no estables mayores a v1.0.9
        // la version v1.0.9 no necesita hacer esto
        $mdIconProvider
            .icon('md-close', $$mdSvgRegistry.mdClose)
            .icon('md-menu', $$mdSvgRegistry.mdMenu)
            .icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
    }
);



app.constant('ROUTERS_T', [{
    "estado.nombre.1": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    }

}, {
    "estado.nombre.2": {
        "url": "/url2",
        "data": {
            "section": "Menu name2",
            "page": "Menu item name2"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model2/index.html"
    }

}]);


app.constant('ROUTERS', [{
    "estado.nombre": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    },

}, {
    "catalogo": {
        "url": "/catalogo",
        "views": {
            "": {
                "templateUrl": "app/views/layout.html"
            },
            "aside": {
                "templateUrl": "app/views/aside.html"
            },
            "content": {
                "templateUrl": "app/views/content.html"
            }
        }
    },
    "catalogo.catalogo": {
        "url": "/catalogo",
        "template": "<div ui-view ></div>"
    }
}, {
    "catalogo.catalogo.categorias": {
        "url": "/categorias",
        "data": {
            "section": "Catálogo",
            "page": "Categorías"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/index.html"
    },
    "catalogo.catalogo.categoriasNew": {
        "url": "/categorias/new",
        "data": {
            "section": "Catálogo",
            "page": "Categorías"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/form.html"
    },
    "catalogo.catalogo.categoriasEdit": {
        "url": "/categorias/:id/edit",
        "data": {
            "section": "Catálogo",
            "page": "Categorías"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/form.html"
    }
}, {
    "catalogo.catalogo.autores": {
        "url": "/autores",
        "data": {
            "section": "Catálogo",
            "page": "Autores"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/index.html"
    },
    "catalogo.catalogo.autoresNew": {
        "url": "/autores/new",
        "data": {
            "section": "Catálogo",
            "page": "Autores"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/form.html"
    },
    "catalogo.catalogo.autoresEdit": {
        "url": "/autores/:id/edit",
        "data": {
            "section": "Catálogo",
            "page": "Autores"
        },
        "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/form.html"
    }

}]);
