from django.db import models
from django.conf import settings



class Records(models.Model):
    record_name = models.CharField(max_length=100)
    price = models.FloatField(null=True)
    created_at = models.DateField(auto_now_add=True)
    made_by = models.ForeignKey('Members', on_delete=models.CASCADE)
    category_associated = models.ManyToManyField('Category', through='Categorized')

class Category(models.Model):
    category_name = models.CharField(max_length=100)
    # records_associated = models.ManyToManyField('Records', through='Categorized',related_name='record_assigned')

class Categorized(models.Model):
    record = models.ForeignKey(Records, on_delete = models.CASCADE, related_name='id_record')
    categories = models.ForeignKey(Category, on_delete = models.CASCADE, related_name='id_category')
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)


class Members(models.Model):
    member_name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    


# user 1 ->> ... Members 1 ->> ... Records



