# seed.py
# ff

from app import app
from models import db, Car
from dotenv import dotenv_values

# db.init_app(app)

with app.app_context():

    print('Deleting existing cars...')
    Car.query.delete()

    print('Creating car objects...')
    Mercedes = Car(
        name='Mercedies Benz',
        model='S550 LWB',
        image='/images/WhatsApp-Image-2021-10-28-at-7.41.51-PM.jpeg' 
    )
    Toyota = Car(
        name='Toyota Corolla',
        model='Altis [2008-2011]',
        image='/images/grackle.jpeg'
    )
    starling = Car(
        name='Common Starling',
        model='Sturnus Vulgaris',
        image='/images/starling.jpeg'
    )
    dove = Car(
        name='Mourning Dove',
        model='Zenaida Macroura',
        image='/images/dove.jpeg'
    )

    print('Adding Car objects to transaction...')
    db.session.add_all([Mercedes, Toyota, starling, dove])
    print('Committing transaction...')
    db.session.commit()
    print('Complete.')
