import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';
const router = new Router();

// Get top notes
router.route('/getNotes/:pageId').post(NoteController.getTopNotes);

// Add notes
router.route('/new').post(NoteController.addNote);

// Get a note's content
router.route('/:noteId').get(NoteController.getNoteContent);

// Update note
router.route('/:noteId/update').post(NoteController.updateNote);

// Delete note
router.route('/:noteId/delete').post(NoteController.deleteNote);

// Click fav
router.route('/fav').post(NoteController.clickFav);

// Click upvote
router.route('/upvote').post(NoteController.clickUpvote);

// Click downvote
router.route('/downvote').post(NoteController.clickDownvote);

// Add tag
router.route('/tag/add').post(NoteController.addTag);

// Remove tag
router.route('/tag/remove').post(NoteController.removeTag);

export default router;
