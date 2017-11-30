import User from '../models/user';
import mongoose from 'mongoose';
import Transaction from 'mongoose-transactions';

/**
 * Gets User details
 * @param req
 * @param res
 * @returns void
 */
export function getDetails(req, res) {
    const username = req.params.userId;
    console.log("Inside getDetails");

    User.findOne({ username }, function (userError, foundUser) {
        if (userError) return res.status(410).json({ result: 'failed', result: 'Requested user data is not present in the server' });
        if(foundUser) {
            const dateDiff = (new Date() - foundUser.createDateTime)/(1000*60*60*24);
            // console.log("dateDiff = " + dateDiff);
            // console.log("foundUser = " + JSON.stringify(foundUser));
            // console.log("foundUser = " + JSON.stringify(foundUser.activity));
            // console.log("foundUser = " + JSON.stringify(foundUser.activity.login));
            var loginHis = foundUser.activity.login;
            console.log(loginHis);

            const userData = {
                "username": foundUser.username,
                "fullname": foundUser.fullname,
                "activity": {
                    "login": foundUser.activity.login
                },
                "userSince": Math.round(dateDiff)
            }
            return res.status(200).json({ status: 'success', result: userData });
        }
        else {
            return res.status(409).json({ status:"failed", result: "Could not find the username in the database" });
        }
    });
}


/**
 * Gets the day activity
 * @param req
 * @param res
 * @returns void
 */
 export function getUserDetails(req, res) {
    const username = req.body.userId;
    console.log("Inside getUserDetails");

    User.findOne({ username }, function (userError, foundUser) {
        if (userError) return res.status(410).json({ result: 'failed', result: 'Requested user data is not present in the server' });
        if(foundUser) {
            const dateDiff = (new Date() - foundUser.createDateTime)/(1000*60*60*24);
            const userActivity = 
            {
              "domain": [
                1,
                24
              ],
              "user": {
                "tags": [
                    {
                      "value": "12",
                      "label": "ASP"
                    },
                    {
                      "value": "5",
                      "label": "HTML"
                    },
                    {
                      "value": 20,
                      "label": "Java"
                    },
                    {
                      "value": 4,
                      "label": "Javascript"
                    },
                    {
                      "value": 12,
                      "label": "SQL"
                    }
                  ]
              },
                 
              "social": {
                 "tags": [
                        {
                          "value": "25",
                          "label": "ASP"
                        },
                        {
                          "value": "50",
                          "label": "HTML"
                        },
                        {
                          "value": 20,
                          "label": "Java"
                        },
                        {
                          "value": 50,
                          "label": "Javascript"
                        },
                        {
                          "value": 47,
                          "label": "SQL"
                        }
                    ]
                },
              "heat": {
                "2017-11-30": 2,
                "2017-11-01": 1,
                "2017-11-05": 12,
                "2017-11-15": 1,
                "2017-11-20": 1,
                "2017-11-27": 19,
                "2017-10-26": 3,
                "2017-10-25": 2,
                "2017-10-24": 6,
                "2017-10-19": 3,
                "2017-11-12": 1,
                "2017-11-18": 24
              },
              "daily": {
                "2017-11-30": {
                  "Java": 8
                },
                "2017-11-01": {
                  "Javascript": 30,
                  "Java": 15,
                  "HTML": 17
                },
                "2017-11-05": {
                  "Javascript": 20,
                  "Java": 18
                },
                "2017-11-20": {
                  "ASP": 14
                },
                "2017-11-26": {
                  "HTML": 11
                },
                "2017-11-25": {
                  "ASP": 10
                },
                "2017-11-19": {
                  "ASP": 15,
                  "Java": 3
                },
                "2017-11-12": {
                  "Java": 14
                },
                "2017-11-18": {
                  "HTML": 7
                },
                "2017-10-24": {
                  "ASP": 2
                },
                "2017-10-25": {
                  "Javascript": 13
                },
                "2017-10-26": {
                  "SQL": 12,
                  "Java": 14
                }
              },
              "years": [
                2017
              ]
            };


            const userData = {
                "username": foundUser.username,
                "fullname": foundUser.fullname,
                "activity": userActivity,
                "userSince": Math.round(dateDiff)
            }
            return res.status(200).json({ status: 'success', result: userData });
        }
        else {
            return res.status(409).json({ status:"failed", result: "Could not find the username in the database" });
        }
    });
}

