import csv
import json
import random
import requests
from time import gmtime, strftime

with open('/Users/tinutomson/MyLife/ASU/Sem3/AWCSE591/Project/StudyGenie/server/csvFiles/AllCols.csv') as csvDataFile:
    csvReader = csv.reader(csvDataFile)
    id = 0
    for row in csvReader:
    	data = {}
    	data['author_id'] = row[1]
    	data['type'] = row[2]
    	data['title'] = row[3]
    	data['content'] = row[4]
    	data['createDateTime'] = {"$date" : strftime("%Y-%m-%d %H:%M:%S", gmtime())}
    	data['meta'] =  {
    						"downvotes" : [],
    						"upvotes" : [],
    						"fav" : [],
    						"tags" : []
    					}
        es_data = json.dumps(data)
        r= requests.post("http://localhost:9200/studygenie/notes/%d" %(id) , data= es_data, headers={'content-type': 'application/json'})
        id=id+1