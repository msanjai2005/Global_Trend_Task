import express from 'express';
import { isAuth, Login, Logout, Register} from '../controllers/auth.controller.js';
import { VerifyToken } from '../middleware/VerifyToken.middleware.js';

const router = express.Router();

router.get('/is-auth',VerifyToken,isAuth);

router.post('/register',Register);
router.post('/login',Login);
router.post('/logout',VerifyToken,Logout);


export default router;