import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Authenticate user
router.route('/').post(AuthController.authUser);

// Add user
// router.route('/addUser').post(AuthController.addUser);

export default router;
