from records.models import UserCategory

def run(): 
    defaultCategory = ['Auto', 'Sport','Alimentari','Ristorante','Svago','Viaggi']
    for cat in defaultCategory:
        c, check = UserCategory.objects.get_or_create(category_name=cat)
        c.save()