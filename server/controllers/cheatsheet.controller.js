import CheatSheet from '../models/cheatSheet';
import mongoose from 'mongoose';
import Transaction from 'mongoose-transactions';
const rp = require('request-promise');
const Schema = mongoose.Schema;

/**
 * Returns top notes and their metadata
 * @param req
 * @param res
 * @returns void
 */
export function getCSList(req, res) {
    const csList = [];
    const username = "user10@gmail.com";	// req.session.username
	const fullname = "user10";	// req.session.fullname
    console.log('Inside getCSList');

    CheatSheet.find({}, function (err, foundCS) {
        if (err) res.status(500).send();
        // console.log(foundCS);
        if (foundCS) {
            // console.log(JSON.stringify(foundCS));
            return res.status(200).json({ status: 'success', result: foundCS });
		}
        else {
            console.log('No results');
            return res.status(200).send();
		}
	});
}

/**
 * Add CheatSheet
 * @param req
 * @param res
 * @returns void
 */
export function newCS(req, res) {
	const username = "user10@gmail.com";	// req.session.username
	const fullname = "user10";	// req.session.fullname
	
	console.log("Inside newCS");
	// const newCS = req.body;
	const cs_id = mongoose.Types.ObjectId();
	var newCS = new CheatSheet(req.body);
	newCS.owner = {
		"username": username,
		"fullname": fullname
	};

	const title = req.body.title;
	CheatSheet.findOne({title}, function(err, foundCS) {
		// console.log("res = " + JSON.stringify(foundCS));
		if(err) res.status(500).send(status:"failed", result:"Failed to find the title in cheatSheets collection");
		if(foundCS) {
			res.status(409).json({
				status:"failed",
				result:"A cheetsheet with this title already exists"
			});
		}
	})

	const transaction = new Transaction();
    transaction.insert('CheatSheet', newCS);

    transaction.run().then((records) => {
      const result = { title: records[0].title, notes: records[0].notes };
      return res.status(200).json({ status: 'success', result });
    }).catch(() => {
      transaction.rollback();
      return res.status(530).json({ err: 'Site is Frozen', result:{} });
    });
}

/**
 * Get notes of a given cheatsheet ID
 * @param req
 * @param res
 * @returns void
 */
export function getCSDetail(req, res) {
	const username = "user10@gmail.com";	// req.session.username
	const fullname = "user10";	// req.session.fullname
	
	console.log("Inside getCSDetail");
	const cs_id = req.body.id;
	console.log("cs_id = " + cs_id);

	CheatSheet.findOne({_id:cs_id}, function(err, foundCS) {
		if(err) return res.status(500).json({status:"failed", result:err});
		if(foundCS) {
			const noteList = foundCS.notes;
			var noteIds = [];
			for(let i=0; i < noteList.length; i++) {
				noteIds.push(noteList[i].noteId);
			}

			const reqBody = {
				"query": {
				    "terms": {
				      "_id": noteIds
				    }
				}
			};
			console.log("reqBody = " + JSON.stringify(reqBody));

			const options = {
			    'method': 'GET',
			    'uri': 'http://localhost:9200/studygenie/notes/_search',
			    'json': true,
			    'body': reqBody,
			};

			rp(options)
			.then(function (response) {
				const result = response.hits.hits;
				console.log(result.length);
				return res.status(200).json({ status: 'success', result });
			})
			.catch(function (err) {
				console.log('error = ' + err);
				return res.status(500).json({ status: 'failed', result: "Failed to get note details" });
			});
		}
		else {
			return res.status(404).json({status:"failed", result:"Could not find the requested cheatsheet in the database"})
		}
	})
}

/**
 * Update cheatsheet
 * @param req
 * @param res
 * @returns void
 */
export function updateCS(req, res) {
	const username = "user10@gmail.com";	// req.session.username
	const fullname = "user10";	// req.session.fullname
	
	console.log("Inside updateCS");
	const cs_id = req.body.id;
	const newCS = req.body.newCS;

	CheatSheet.findById(cs_id, function(err, foundCS) {
		if(err) res.status(500).json({status:"failed", result:err});
		if(foundCS) {
		    const transaction = new Transaction();
		    transaction.update('CheatSheet', foundCS._id, newCS);
		    
		    transaction.run().then((records) => {
				const result = { id: records[0].id, notes: records[0].notes };
				return res.status(200).json({ status: 'success', result });
		    }).catch(() => {
				transaction.rollback();
				return res.status(530).json({ err: 'Site is Frozen', result:{} });
		    });
		}
		else {
			res.status(500).json({status:"failed", result:"Could not find the requested cheatsheet in the database"})
		}
	})
	
}

/**
 * Update cheatsheet
 * @param req
 * @param res
 * @returns void
 */
export function deleteCS(req, res) {
	const username = "user10@gmail.com";	// req.session.username
	const fullname = "user10";	// req.session.fullname
	
	console.log("Inside deleteCS");
	const cs_id = req.body.id;

	CheatSheet.findById(cs_id, function(err, foundCS) {
		if(err) res.status(500).json({status:"failed", result:err});
		if(foundCS) {
		    const transaction = new Transaction();
		    transaction.remove('CheatSheet', foundCS._id);

		    transaction.run().then((records) => {
				const result = { id: records[0].id };
				return res.status(200).json({ status: 'success', result });
		    }).catch(() => {
				transaction.rollback();
				return res.status(530).json({ err: 'Site is Frozen', result:{} });
		    });
		}
		else {
			res.status(500).json({status:"failed", result:"Could not find the requested cheatsheet in the database"})
		}
	})
	
}