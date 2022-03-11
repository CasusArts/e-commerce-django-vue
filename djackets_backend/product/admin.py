import random

from django.conf import settings
from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Product, Category


admin.site.site_header = 'Djacket Shop'
admin.site.site_title = 'Djacket Admin'
admin.site.index_title = 'Djacket Admin'


class ProductAdmin(admin.ModelAdmin):
    readonly_fields = [..., "product_image"]
    slug_value = f'{("title",)}-{str(random.randint(100_000, 999_999))}'

    prepopulated_fields = {'slug', slug_value}

    def product_image(self, obj):
        return mark_safe(
            f'<img src="{obj.product.url}" style="max-width: 150px; max-height: 200px" />')


admin.site.register(Product)
admin.site.register(Category)
