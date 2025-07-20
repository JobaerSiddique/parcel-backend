import express from 'express'
import validationZod from '../../middleware/validateRequest';
import { UserValidation } from './user.zod';
import { UserController } from './user.controller';
import Auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post("/create-user",validationZod(UserValidation.createUserZodSchema),UserController.createUser)
router.post("/create-agent",Auth(USER_ROLE.admin),validationZod(UserValidation.createUserZodSchema),UserController.createAgent)



export const UserRoute = router;