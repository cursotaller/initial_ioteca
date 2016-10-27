var catalogoUrl = 'http://localhost:9000/api/catalogo/';


var config = {

    catalogoUrl: catalogoUrl,


};

app

    .value('configCatalogo', config);


app.constant('ROUTERS2', {
    "xxx": {
        "url": "/xxx",
        "templateUrl": "templates/xxx.html"
    },
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
    },

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
    },

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

});


app.constant('ROUTERS', [{
        "state": "catalogo.catalogo",
        "url": "/catalogo",
        "items": [{
                "state": "catalogo.catalogo.categorias",
                "url": "/categorias",
                "section": "Catálogo",
                "page": "Categorías",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/index.html",
            }, {
                "state": "catalogo.catalogo.categoriasNew",
                "url": "/categorias/new",
                "section": "Catálogo",
                "page": "Categorías",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/form.html",
            }, {
                "state": "catalogo.catalogo.categoriasEdit",
                "url": "/categorias/:id/edit",
                "section": "Catálogo",
                "page": "Categorías",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/categorias/form.html",
            },

            {
                "state": "catalogo.catalogo.autores",
                "url": "/autores",
                "section": "Catálogo",
                "page": "Autores",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/index.html",
            }, {
                "state": "catalogo.catalogo.autoresNew",
                "url": "/autores/new",
                "section": "Catálogo",
                "page": "Autores",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/form.html",
            }, {
                "state": "catalogo.catalogo.autoresEdit",
                "url": "/autores/:id/edit",
                "section": "Catálogo",
                "page": "Autores",
                "templateUrl": "ioteca_web_apps/catalogo_web/views/autores/form.html",
            }
        ]
    }

]);
