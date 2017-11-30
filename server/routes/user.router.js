import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get User details
router.route('/:userId').get(UserController.getDetails);

// Add user
router.route('/').post(UserController.getUserDetails);

// Logout
// router.route('/logout').post(UserController.logout);

export default router;
