from django.urls import path, include

from .views import LatestProductsList, CategoryDetail, ProductDetail, search_view

urlpatterns = [
    path('latest-products/', LatestProductsList.as_view()),
    path('products/search/', search_view),
    path('products/<slug:category_slug>/<slug:product_slug>/',
         ProductDetail.as_view()),
    path('products/<slug:category_slug>/', CategoryDetail.as_view()),
]
