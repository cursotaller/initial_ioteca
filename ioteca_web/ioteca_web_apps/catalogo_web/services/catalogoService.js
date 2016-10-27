app

    .factory("catalogoService", function($resource, configCatalogo) {
    var url = configCatalogo.catalogoUrl;
    return {

        Categoria: $resource(url + "categorias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },

        }),
        Autor: $resource(url + "autors/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "query": { method: 'GET', isArray: false }

        }),


    };
});
