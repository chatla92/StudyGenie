import { Router } from 'express';
import * as CSController from '../controllers/cheatsheet.controller';
const router = new Router();

// Get all cheatsheets
router.route('/').get(CSController.getCSList);

// Create new cheatsheet
// router.route('/new').post(CSController.newCS);

// // Get single cheat sheet's content
// router.route('/:csId').get(CSController.getCSDetail);

// // Edit cheatsheet
// router.route('/:csId/update').post(CSController.updateCS);

// // Delete cheetsheet
// router.route('/cs/:csId/delete').post(CSController.deleteCS);

export default router;
