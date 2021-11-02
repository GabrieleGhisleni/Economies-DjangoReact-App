from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import MyUser
from records.models import Members
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_member(sender, instance, created, **kwargs):
    if created:
        print('saving member')
        Members.objects.create(user=instance, member_name=instance.username)
        post_save.connect(create_member, sender=User)

