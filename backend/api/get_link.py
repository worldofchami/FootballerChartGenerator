from googlesearch import search   

def getFBRefLink(playerName):
    # empty array of links
    links = []
    
    #creates array using search() function that generates Google search for the fbref link to the player's page
    for link in search(playerName + " fbref page"):
        #appends the links array with each link found
        links.append(link)
        
    #Generally the correct result is the first one
    return links[0]
