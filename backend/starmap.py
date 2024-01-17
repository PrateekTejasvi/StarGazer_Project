from datetime import datetime
from geopy import Nominatim,geocoders
from pytz import timezone, utc
import firebaseImage

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from matplotlib.patches import Circle

from skyfield.api import Star, load, wgs84
from skyfield.data import hipparcos, mpc, stellarium
from skyfield.projections import build_stereographic_projection
from skyfield.constants import GM_SUN_Pitjeva_2005_km3_s2 as GM_SUN


def load_data():
    eph = load('de421.bsp')

    with load.open(hipparcos.URL) as f:
        stars = hipparcos.load_dataframe(f)

    url = ('https://raw.githubusercontent.com/Stellarium/stellarium/master'
           '/skycultures/modern_st/constellationship.fab')

    with load.open(url) as f:
        constellations = stellarium.parse_constellations(f)
        
    return eph, stars, constellations
        
eph, stars, constellations = load_data()


def collect_celestial_data(location, when):
    locator = Nominatim(user_agent='this')
    location = locator.geocode(location)
    lat, long = location.latitude, location.longitude
    print(lat,long)
    
    dt = datetime.strptime(when, '%Y-%m-%d %H:%M')
    

   # timezone_str = tz.tzNameAt(lat, long)
  
    local = timezone('Asia/Kolkata')
    utc_dt = local.localize(dt, is_dst=None).astimezone(utc)

    t = load.timescale().from_datetime(utc_dt)
    observer = wgs84.latlon(latitude_degrees=lat, longitude_degrees=long).at(t)

    sun = eph['sun']
    earth = eph['earth']
    
    edges = [edge for name, edges in constellations for edge in edges]
    edges_star1 = [star1 for star1, star2 in edges]
    edges_star2 = [star2 for star1, star2 in edges]

    
    position = observer.from_altaz(alt_degrees=90, az_degrees=0)
    ra, dec, distance = observer.radec()
    center_object = Star(ra=ra, dec=dec)

    center = earth.at(t).observe(center_object)
    projection = build_stereographic_projection(center)

    star_positions = earth.at(t).observe(Star.from_dataframe(stars))
    stars['x'], stars['y'] = projection(star_positions)
    
    return stars, edges_star1, edges_star2
    
    
location = 'Bangalore, KA'
when = '2024-01-02 00:00'#ensure to take this as user input
stars, edges_star1, edges_star2 = collect_celestial_data(location, when)




def create_star_chart(location, when, chart_size, max_star_size):
    stars, edges_star1, edges_star2 = collect_celestial_data(location, when)
    limiting_magnitude = 10
    bright_stars = (stars.magnitude <= limiting_magnitude)
    magnitude = stars['magnitude'][bright_stars]
    marker_size = max_star_size * 10 ** (magnitude / -2.5)
    
    xy1 = stars[['x', 'y']].loc[edges_star1].values
    xy2 = stars[['x', 'y']].loc[edges_star2].values
    lines_xy = np.rollaxis(np.array([xy1, xy2]), 1)
    
    fig, ax = plt.subplots(figsize=(chart_size, chart_size),facecolor='#041A40')
    
    ax.add_collection(LineCollection(lines_xy, colors='#ffff', linewidths=0.15))
    
    ax.scatter(stars['x'][bright_stars], stars['y'][bright_stars],
               s=marker_size, color='white', marker='.', linewidths=0,
               zorder=2)

 
    ax.set_aspect('equal')
    ax.set_xlim(-1, 1)
    ax.set_ylim(-1, 1)
    plt.axis('off')
    when_datetime = datetime.strptime(when, '%Y-%m-%d %H:%M')
    plt.title(f"Observation Location: {location}, Time: {when_datetime.strftime('%Y-%m-%d %H:%M')}", loc='right',color = 'white', fontsize=10)
    filename = f"{location}.png"
    plt.savefig(filename, format='png', dpi=1200)
    firebaseImage.UploadImage(filename,'StarMap')
    
    plt.show()
    plt.close()
    
    

location = 'Bangalore'#ensure to take this as user input
when = '2024-01-02 23:23'#ensure to take this as user input
chart_size=12
max_star_size=200
#create_star_chart(location, when, chart_size, max_star_size)