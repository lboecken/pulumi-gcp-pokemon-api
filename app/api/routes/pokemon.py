from flask_restx import Api, Resource
from flask import Blueprint

from api.db.conn_management import get_curs

pokemon_blueprint = Blueprint('pokemon', __name__)
api = Api(pokemon_blueprint)


@api.route('/')
class AllPokemon(Resource):
    def get(self):
        with get_curs() as cursor:
            cursor.execute('SELECT * FROM pokemon')
            columns = cursor.description
            records = [
                {columns[index][0]: column for index, column in enumerate(value)}
                for value in cursor.fetchall()
                ]
            return records


@api.route('/<string:name>')
class PokemonByName(Resource):
    def get(self, name):
        with get_curs() as cursor: 
            cursor.execute('SELECT * FROM pokemon WHERE name=%s', (name,))
            record = cursor.fetchall()
            if len(record) == 0:
                return 'no pokemon found'
            return record


@api.route('/<int:id>')
class PokemonByID(Resource):
    def get(self, id):
        with get_curs() as cursor:
            cursor.execute('SELECT * FROM pokemon WHERE id=%s', (id,))
            record = cursor.fetchall()
            if len(record) == 0:
                return 'no pokemon found'
            return record