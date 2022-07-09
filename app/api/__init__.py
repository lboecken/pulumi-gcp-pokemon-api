from flask import Flask


def create_app():
    app = Flask(__name__)

    from api.routes.pokemon import pokemon_blueprint
    app.register_blueprint(pokemon_blueprint)

    return app