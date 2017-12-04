import Note from '../models/note';
const request = require('request');
const rp = require('request-promise');
var express = require('express')
var session = require('express-session')
var authVar = require('./auth.controller')
/**
 * Returns top notes and their metadata
 * @param req
 * @param res
 * @returns void
 */
export function getTopNotes(req, res) {
  // Only top 10 notes are being returned by elastic search server - need to rectify that
  const filter = req.body.filter;
  const page = req.params.pageId;
  const notesPerPage = 99;
  const start = (page - 1) * notesPerPage;
  const end = page * notesPerPage;

  if (page <= 0)
    return res.status(400).send();

  if (req.session.topNotes) {
    console.log('Start = ' + start + ' end = ' + end);
    return res.status(200).json({ status: 'success', result: req.session.topNotes.slice(start, end) });
  }

  var query_str = {};

  if (!filter) {
    query_str = {
      'from': 0,
      'size': 99,
      'query': {
        'match_all': {},
      },
    };
  }
  else {
    query_str = {
      'from': 0,
      'size': 99,
      'query': {
        'bool': {
          'should': [],
        },
      },
    };
    const keys = Object.keys(filter);

    keys.forEach(function (key) {
      if (key === 'tags') {
        filter[key].forEach(function (tag) {
          query_str.query.bool.should.push({
            'constant_score': {
              'filter': {
                'term': {
                  'tags': tag,
                },
              },
            },
          });
        });
      }
      if (key === 'isPrivate') {
        query_str.query.bool.should.push({
          'constant_score': {
            'filter': {
              'term': {
                'isPrivate': filter[key],
              },
            },
          },
        });
      }
      if (key === 'content') {
        query_str.query.bool.should.push({
          'constant_score': {
            'filter': {
              'multi_match': {
                'query': filter[key],
                'fields': ['title^1.5', 'content'],
                'operator': 'or',
              },
            },
          },
        });
      }
    });
  }

  const options = {
    'method': 'GET',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/_search',
    'json': true,
    'body': query_str,
  };

  rp(options)
    .then(function (response) {
      req.session.topNotes = response.hits.hits;
      console.log(response.hits.hits.length);
      return res.status(200).json({ status: 'success', result: response.hits.hits });
    })
    .catch(function (err) {
      console.log('error = ' + err);
      return res.status(404).json({ status: 'failed', result: err });
    });
}

/**
 * Add new note
 * @param req
 * @param res
 * @returns void
 */
export function addNote(req, res) {
  console.log('Inside addNote');
  if (!req.body.title || !req.body.content) {
    res.status(403).end();
  }

  var new_doc = req.body;
  new_doc.createDateTime = new Date();
  new_doc.author_id = {};
  new_doc.author_id.username = new_doc.owner.username;
  new_doc.author_id.fullname = new_doc.owner.fullname;
  delete new_doc.owner;

  var options = {
    'method': 'POST',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/',
    'json': true,
    'body': new_doc,
  };

  rp(options)
    .then(function (response) {
      new_doc._id = response._id;
      res.status(200).json({ status: 'success', result: new_doc });
    })
    .catch(function (err) {
      console.log('error = ' + err);
    });
}

/**
 * Get note content to each notes
 * @param req
 * @param res
 * @returns void
 */
export function getNoteContent(req, res) {
  var options = {
    'method': 'GET',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.params.noteId,
    'json': true,
    'body': null,
  };

  console.log('Sent get request to ' + options.uri);
  rp(options)
    .then(function (response) {
      // console.log(response._source);
      return res.status(200).json({ status: 'success', result: response._source });
    })
    .catch(function (err) {
      res.status(404).json({ status: 'error', result: err });
    });
}

/**
 * Updates notes
 * @param req
 * @param res
 * @returns void
 */
export function updateNote(req, res) {
  console.log('Inside updateNote');
  const updateNote = req.body;

  const query_str = {
    'doc': updateNote,
  };

  const options = {
    'method': 'POST',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.params.noteId + '/_update',
    'json': true,
    'body': query_str,
  };

  rp(options)
    .then(function (response) {
      res.status(200).json({ status: 'success', result: { '_id': response._id } });
    })
    .catch(function (err) {
      console.log('error = ' + err);
      res.status(404).json({ status: 'failed', result: err });
    });
}

/**
 * Deletes notes
 * @param req
 * @param res
 * @returns void
 */
export function deleteNote(req, res) {
  console.log('Inside deleteNote');
  const noteId = req.params.noteId;

  const options = {
    'method': 'DELETE',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.params.noteId,
    'json': true,
    'body': null,
  };

  rp(options)
    .then(function (response) {
      res.status(200).json({ status: 'success', result: {} });
    })
    .catch(function (err) {
      console.log('error = ' + err);
      res.status(404).json({ status: 'failed', result: err });
    });
}

/**
 * Updates favorite list
 * @param req
 * @param res
 * @returns void
 */
export function clickFav(req, res) {
  console.log('Inside clickFav');
  const noteId = req.body.noteId;
  const username = authVar.username   //'user12@gmail.com';
  updateList('fav', username, req, res);
}

/**
 * Updates upvotes list
 * @param req
 * @param res
 * @returns void
 */
export function clickUpvote(req, res) {
  console.log('Inside clickUpvote');
  const noteId = req.body.noteId;
  const username = authVar.username   //'user20@gmail.com';
  updateList('upvotes', username, req, res);
}

/**
 * Updates downvotes list
 * @param req
 * @param res
 * @returns void
 */
export function clickDownvote(req, res) {
  console.log('Inside clickDownvote');
  const noteId = req.body.noteId;
  const username = authVar.username   //'user20@gmail.com';
  updateList('downvotes', username, req, res);
}

/**
 * Add tag
 * @param req
 * @param res
 * @returns void
 */
export function addTag(req, res) {
  console.log('Inside addTag');
  const noteId = req.body.noteId;
  const tag = req.body.tag;
  const username = authVar.username   //'user20@gmail.com';
  updateList('tagsAdd', tag, req, res);
}

/**
 * Remove tag
 * @param req
 * @param res
 * @returns void
 */
export function removeTag(req, res) {
  console.log('Inside removeTag');
  const noteId = req.body.noteId;
  const tag = req.body.tag;
  const username = authVar.username   //'user20@gmail.com';
  updateList('tagsRemove', tag, req, res);
}


/**
 * Common utility function to update fav, upvotes and downvotes list
 * @param req
 * @param res
 * @returns void
 */
function updateList(listType, username, req, res) {
  const getReqOptions = {
    'method': 'GET',
    'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.body.noteId,
    'json': true,
    'body': null,
  };

  return rp(getReqOptions)
    .then(function (getReqResponse) {
      const noteInfo = getReqResponse._source;
      console.log(listType);
      let index = -1;

      if (listType === 'fav')
        index = noteInfo.meta.fav.indexOf(username);
      if (listType === 'upvotes')
        index = noteInfo.meta.upvotes.indexOf(username);
      if (listType === 'downvotes') {
        index = noteInfo.meta.downvotes.indexOf(username);
      }
      if (listType === 'tagsAdd') {
        index = noteInfo.meta.tags.indexOf(username);
        if (index >= 0)
          return res.status(200).send({ status: 'success', result: 'Tag already exists' });
        else
          listType = 'tags';
      }
      if (listType === 'tagsRemove') {
        index = noteInfo.meta.tags.indexOf(username);
        if (index == -1)
          return res.status(200).send({ status: 'success', result: "Tag doesn't exist" });
        else
          listType = 'tags';
      }
      console.log("Outside Current username = " + username)
      // If already present in the list, send error
      if (index > -1) {
        console.log("Current username = " + username)
        res.status(500).send();
        // // Delete user from list
        // const fav_body = {
        //   'script': {
        //     'lang': 'painless',
        //     'inline': 'ctx._source.meta.' + listType + '.remove(' + index + ')',
        //   },
        // };

        // const options = {
        //   'method': 'POST',
        //   'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.body.noteId + '/_update',
        //   'json': true,
        //   'body': fav_body,
        // };

        // return rp(options)
        //   .then(function (removeResponse) {
        //     res.status(200).json({ status: 'success', result: 'Action successful' });
        //   })
        //   .catch(function (removeError) {
        //     res.status(404).json({ status: 'error', result: removeError });
        //   });
      }
      else {
        // Add user to list
        const fav_body = {
          'script': {
            'inline': 'ctx._source.meta.' + listType + '.add(params.user)',
            'params': { 'user': username },
          },
        };

        const options = {
          'method': 'POST',
          'uri': 'https://search-adaptiveweb-nmy2msxq5iur6djqwumxvxdscy.us-east-1.es.amazonaws.com/studygenie/notes/' + req.body.noteId + '/_update',
          'json': true,
          'body': fav_body,
        };

        return rp(options)
          .then(function (favResponse) {
            res.status(200).json({ status: 'success', result: 'Action successful' });
          })
          .catch(function (favError) {
            res.status(404).json({ status: 'err', result: favError });
          });
      }
    })
    .catch(function (error) {
      res.status(404).json({ status: 'error', result: error });
    });
}
