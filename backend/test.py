from geopy.geocoders import Nominatim
from pprint import pprint

# Instantiate a new Nominatim client
app = Nominatim(user_agent="tutorial")

# Get location raw data from the user
your_loc = input("Enter your location: ")
location = app.geocode(your_loc).raw

# Print raw data
pprint(location)
