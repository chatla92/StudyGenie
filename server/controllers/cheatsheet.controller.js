import CS from '../models/cheatSheet';

/**
 * Returns top notes and their metadata
 * @param req
 * @param res
 * @returns void
 */
export function getCSList(req, res) {
	                    const csList = [];
	                    const user = 'user10@gmail.com';
	                    console.log('Inside getCSList');

	                    CS.findOne({}, function (err, foundCS) {
		                    if (err) res.status(500).send();
		                    console.log(foundCS);
		                    if (foundCS) {
			                    console.log('result = ' + foundCS);
			                    return res.status(200).json({ status: 'success', result: foundCS });
		}
		                    else {
			                    console.log('No results');
			                    return res.status(200).send();
		}
	});
}

// /**
//  * Returns top notes and their metadata
//  * @param req
//  * @param res
//  * @returns void
//  */
// export function newCS(req, res) {
// 	const user = "user10@gmail.com";	// req.session.username
// 	console.log("Inside newCS");
// 	const body = req.body;
// 	var newCS = new CS({"title": body.title});
// 	newCS.add("_id": new ObjectId());

// 	CS.insert(newCS,function(err, foundCS) {
// 		if(err) res.status(500).send();
// 		console.log(foundCS);
// 		if(foundCS) {
// 			console.log("result = " + foundCS);
// 			return res.status(200).json({status:"success", result: foundCS});
// 		}
// 		else {
// 			console.log("No results");
// 			return res.status(200).send();
// 		}
// 	})
// }
