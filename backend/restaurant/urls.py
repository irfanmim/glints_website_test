from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('restaurant', views.RestaurantView)
router.register('collection', views.CollectionView)

urlpatterns = [
    path('', include(router.urls)),
    path('restaurantOption', views.RestaurantOptionView.as_view()),
    path('restaurantByName', views.RestaurantByNameView.as_view()),
    path('restaurantByDate', views.RestaurantByDateView.as_view()),
]