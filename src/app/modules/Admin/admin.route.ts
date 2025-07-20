import express from "express"
import Auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { AdminController } from "./admin.controller";

const router = express.Router()

router.put('/assign/:id',Auth(USER_ROLE.admin),AdminController.assignAgentInParcel)
router.get('/allUser',Auth(USER_ROLE.admin),AdminController.getAllUser)
router.get('/report',Auth(USER_ROLE.admin),AdminController.getParcelReport)


export const AdminRoute = router;