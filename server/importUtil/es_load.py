import csv
import json
import random
import requests
from time import gmtime, strftime

with open('../csvFiles/FullData.csv') as csvDataFile:
    csvReader = csv.reader(csvDataFile)
    id = 0
    for row in csvReader:
        data = {}
        if (row[0]=='NULL'):
            continue
        data['n_id'] = row[0]
        if (row[1]=='NULL'):
            continue

        data['owner'] = {}
        data['owner']['username'] = "user" + row[1] + "@gmail.com"
        data['owner']['fullname'] = "user" + row[1]

        data['type'] = row[2]
        # if row[2] == 1:
        #    data['type'] = "TRUE"
        # else:
        #    data['type'] = "FALSE"

        if (row[3]=='NULL' or row[3] == ''):
            continue
        data['title'] = row[3]
        if (row[4]=='NULL' or row[4] == ''):
            continue
        data['content'] = """""" + row[4]
    
        data['createDateTime'] = {"$date" : strftime("%Y-%m-%d %H:%M:%S", gmtime())}

        data['meta'] =  {
                            "downvotes" : [],
                            "upvotes" : [],
                            "fav" : [],
                            "tags" : []
                        }
        data['meta']['tags'] = [row[5]]
        try:
            es_data = json.dumps(data)
        except:
            continue
        r= requests.post("https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/%d" %(id) , data= es_data, headers={'content-type': 'application/json'})
        id=id+1