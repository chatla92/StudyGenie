### DEMO
https://youtu.be/pwXGxLL78HY

### SETUP
1. Install mongoDB and run. Use this [mongoDB documentation link](https://docs.mongodb.com/manual/installation/) for reference

2. Install nodejs and npm package. Use this [Nodejs documentation link](https://nodejs.org/en/download/) for reference

3. Run the following two scripts importAuth.js and importUser.js present in server/importutil folder. The following are the commands

   * *```  node <path_to_Studygenie>/server/importUtil/importUser.js```*

   *  *```  node <path_to_Studygenie>/server/importUtil/importAuth.js```*

   **Note: You have to manually exit after running each of the above commands by entering 'ctrl+C' when the script displays 'done' on the terminal**

4. Install elastic search in your local computer. Use this [Elasticsearch documentation link](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

5. Run ```curl -XPUT 'http://localhost:9200/studygenie'``` from terminal of a linux machine. If you are using a remote elastic search server, use the corresponding url for elasticsearch

6. Run the following python script to load data into elasticsearch
python /path/to/Studygenie/server/importUtil/es_load.py. The above command loads our collected data on to the elasticsearch server.

7. Initial Database setup for notes data and user accounts is done. Now on to the server setup.

8. Go to the source code folder and run ```npm install && npm start```

9. The server starts on port 8000. Access the application using 'http://localhost:8000/'

### USAGE
1. On the login page use the following credentials
  * usename: ```user22@gmail.com```
  * password: ```pass22```

2. As the previous search history of this user is more inclned to "Java", you would have more of java notes compared to others.

3. To see how other functionalities work, please view the following youtube video https://youtu.be/u9yXoSEe8jU
