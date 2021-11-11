from django.db import models
from django.conf import settings


class Records(models.Model):
    price = models.FloatField(null=True)
    record_name = models.CharField(max_length=100)
    created_at = models.DateField()
    shared = models.BooleanField(default=False, null=True, blank=True)
    made_by = models.ForeignKey('Members', on_delete=models.CASCADE)
    description = models.CharField(max_length=1000, null=True, blank=True)
    category_associated = models.ForeignKey('UserCategory', on_delete=models.CASCADE, null=True, blank=True)
    sub_category_associated = models.ForeignKey('SubCategory', on_delete=models.CASCADE, null=True, blank=True)

class UserCategory(models.Model):
    category_name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class SubCategory(models.Model):
    sub_category_name = models.CharField(max_length=100)
    primary_category = models.ForeignKey('UserCategory', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Members(models.Model):
    member_name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    


# user 1 ->> ... Members 1 ->> ... Records



