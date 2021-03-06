import logging

from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ioteca_service_apps.catalogo.models.autor import Autor
from ioteca_service_apps.catalogo.models.libro import Libro

from ioteca_service_apps.utils.security import log_params
from ioteca_service_apps.utils.permissions import ModelPermission
from ioteca_service_apps.utils.pagination import ModelPagination


from rest_framework import permissions
from django.utils.translation import ugettext as _  # , ungettext

log = logging.getLogger(__name__)


class MiPermission(permissions.BasePermission):
    """
    Ejemplo de permiso para microrecursos @list_route o @detail_route
    """

    def has_permission(self, request, view):
        perms = ('catalogo.list_autor',)  # cambie aqui el permiso
        if request.user.has_perms(perms):
            return True
        else:
            log.info(
                _('Permission denied. You don\'t have permission to %s.'
                  ) % (perms),
                extra=log_params(request)
            )
            return False


class AutorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Autor
        fields = '__all__'

from rest_framework import pagination


class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 10000


class AutorViewSet(ModelPagination, viewsets.ModelViewSet):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    permission_classes = [ModelPermission, ]
    #permission_replace_by_model = 'cat.autor2'
    #pagination_class = LargeResultsSetPagination

    def get_queryset(self):

        search = self.request.query_params.get('query', None)
        if search:
            print ('search=', search)
            self.queryset = Autor.objects.filter(nombre__icontains=search)
        return self.queryset

    """
    def get_queryset(self):
        queryset = Autor.objects.all()
        return queryset
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', '')
        all = self.request.query_params.get('all', None)
        # if all == 'true':
        #    self.pagination_class = None
        #    return Autor.objects.all()
        if query is not None:
            queryall = (Q(nombre__icontains=query),
                        Q(direccion__icontains=query))
            queryset = self.get_queryset().filter(reduce(OR, queryall))
            results = self.paginate_queryset(queryset)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)
        else:
            data = self.get_queryset()
            results = self.paginate_queryset(data)
            if results is not None:
                serializer = self.get_serializer(results, many=True)
                return self.get_paginated_response(serializer.data)
    """

    @list_route(url_path='export', methods=['get'],
                permission_classes=[MiPermission])
    def reporte_autores(self, request, *args, **kwargs):
        lista = []
        pre_query = self.get_queryset().values()
        for x in pre_query:
            lista.append([x['nombre'], x['direccion']])
        print(lista)
        #data = Autor.objects.pdf(lista, 'mi primer reporte')
        data = self.get_queryset().filter()
        # return Response({'detail':str('Exportado a PDF')})
        # return Response(data)
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)

    @detail_route(url_path='libros')
    def autor_libros(self, request, pk=None):
        autor = self.get_queryset().get(pk=pk)
        libros = Libro.objects.filter(autors=pk).values()
        libros_count = Libro.objects.filter(autors=pk).count()
        results = {
            'autor': autor.nombre,
            'cantidad': libros_count,
            'libros': libros
        }
        return Response({'detail': results})
