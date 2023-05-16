import pandas as pd
import requests

def player(url):
    #Ran into issues with CloudFlare so I decided not to use the header
    header = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    
    #create request for html content of page via url
    r = requests.get(url, headers=header) #if this doesn't work, try r = requests.get(url, headers=header)
     
    #read html content and create a dataFrame object from it
    df = pd.read_html(r.text) #if encoding issues arise, try adding this after r.text : .encode('utf-8').decode('ascii', 'ignore'))
    
    #empty arrays for values and stat names
    vals, stats = [], []
    
    #scans first dataFrame and populates vals array with player stat percentiles
    for sp in df[0]['Percentile']:
        if sp > 0:
            vals.append(sp)
    
    #scans first dataFrame and populates stats array with player stat names e.g. Goals
    for name in df[0]['Statistic']:
        if str(name) != "nan":
            stats.append(name)
            
    #this is totally changeable, since the project is mostly for attackers I picked the most relevant statistics
    idx = [0, 1, 2, 4, 6, 8, 10, 11, 12, 13]
    
    #temporary arrays to protect original ones
    ns, nv = [], []

    for i in range(len(vals)):
        #if the stat is one of the stats requested in array idx
        if i in idx:
            ns.append(stats[i])
            nv.append(vals[i])
    
    #returns values and stat names arrays, as well as a string containing player name derived from url
    return nv, ns, url[-1*url[::-1].index("/"):].replace("-", " ")
