import get_link as gl
import pandas_scraping as ps
import radar_from_arrs as ra
import sys

name = sys.argv[1]

def generate(player_name):
    url = gl.getFBRefLink(player_name)
    arrs = ps.player(url)
    ra.radar(arrs[0], arrs[1], arrs[2], 'plot-' + player_name + '.png')

generate(name)