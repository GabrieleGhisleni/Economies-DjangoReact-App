from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import MyUser
from records.models import Members
from records.models import UserCategory
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_member(sender, instance, created, **kwargs):
    if created:
        print('Receiving Signal')
        defaultCategory = ['Auto', 'Sport','Alimentari','Ristorante','Svago','Viaggi']
        Members.objects.create(user=instance, member_name=instance.username)
        for cat in defaultCategory: UserCategory.objects.create(category_name=cat, user=instance)
        post_save.connect(create_member, sender=User)

