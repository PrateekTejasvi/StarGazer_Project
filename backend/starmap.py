from bokeh.plotting import figure, show
from bokeh.models import ColumnDataSource, TapTool
from skyfield.api import load


# Load star data
stars = load('hip_main.dat')

# Get star positions
astrometric = stars.at(ts.now())
ra_values = [angle.hours for angle in astrometric.ra]
dec_values = [angle.degrees for angle in astrometric.dec]

source = ColumnDataSource(data=dict(ra=ra_values, dec=dec_values))

# Create Bokeh plot
p = figure(title='Interactive Sky Map', tools='tap,pan,wheel_zoom,reset')
p.circle(x='ra', y='dec', size=5, color='white', source=source)

# Add constellation lines, labels, etc.

show(p)

