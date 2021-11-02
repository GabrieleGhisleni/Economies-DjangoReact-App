from records.models import Category

def run(): 
    defaultCategory = ['Auto', 'Sport','Alimentari','Ristorante','Svago','Viaggi']
    for cat in defaultCategory:
        c, check = Category.objects.get_or_create(category_name=cat)
        c.save()