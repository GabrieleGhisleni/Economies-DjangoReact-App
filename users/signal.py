# from django.db.models.signals import post_save
# from django.dispatch import receiver

# from records.models import Members
# from records.models import UserCategory
# from django.contrib.auth.models import User

# @receiver(post_save, sender=User)
# def create_member(sender, instance, created, **kwargs):
#     print('inside SIGNAL')
#     if created:
#         print('inside CREATED')
#         print(sender, instance, created)
#         defaultCategory = ['Auto', 'Sport','Alimentari','Ristorante','Svago','Viaggi']
#         try:
#             Members.objects.create(user=instance, member_name='Comune')
#             Members.objects.create(user=instance, member_name=instance.username)
#             for cat in defaultCategory: 
#                 UserCategory.objects.create(category_name=cat, user=instance)
#         except:
#             Members(user=instance, member_name='Comune').save()
#             Members(user=instance, member_name=instance.username).save()
#             for cat in defaultCategory: 
#                 UserCategory(category_name=cat, user=instance).save()
#         post_save.connect(create_member, sender=User)


