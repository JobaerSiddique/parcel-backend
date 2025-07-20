import express from 'express'
import { AuthController } from './auth.controller';
import validationZod from '../../middleware/validateRequest';
import { AuthZod } from './auth.zod';

const router = express.Router();

router.post('/login',validationZod(AuthZod.createLogin),AuthController.login)


export const AuthRoute = router;