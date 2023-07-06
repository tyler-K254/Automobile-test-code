import os

from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Car

from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)



@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

api = Api(app)

class Cars(Resource):

    def get(self):
        cars = [car.to_dict() for car in Car.query.all()]
        return make_response(jsonify(cars), 200)

    def post(self):

        data = request.get_json()

        new_car = Car(
            name=data['name'],
            model=data['model'],
            image=data['image'],
        )

        db.session.add(new_car)
        db.session.commit()

        return make_response(new_car.to_dict(), 201)

api.add_resource(Cars, '/cars')

class CarByID(Resource):
    
    def get(self, id):
        car = Car.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(car), 200)

    def patch(self, id):

        data = request.get_json()

        car = Car.query.filter_by(id=id).first()

        for attr in data:
            setattr(car, attr, data[attr])

        db.session.add(car)
        db.session.commit()

        return make_response(car.to_dict(), 200)

    def delete(self, id):

        car = Car.query.filter_by(id=id).first()
        db.session.delete(car)
        db.session.commit()

        return make_response('', 204)

api.add_resource(CarByID, '/cars/<int:id>')
