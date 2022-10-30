#!/usr/bin/python3
""" Starts a Flash Web Application """
from flask import Flask, render_template
# from flask_cors import CORS
from models import storage
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.state import State
from uuid import uuid4
from os import getenv

#: app (Flask instance): Stores reference to Flask instance obj
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing on specified resources
# CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/2-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template(
        '2-hbnb.html',
        states=st_ct,
        amenities=amenities,
        places=places,
        cache_id=str(uuid4())
    )


if __name__ == '__main__':
    """ Main Function """
    host = getenv('HBNB_API_HOST') or '0.0.0.0'
    port = getenv('HBNB_API_PORT') or '5000'
    app.run(host=host, port=port)
