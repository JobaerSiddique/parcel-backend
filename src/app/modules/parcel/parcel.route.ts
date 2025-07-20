import express from 'express'
import validationZod from '../../middleware/validateRequest';

import { ParcelController } from './parcel.controller';
import { createParcelSchema } from './parcel.zod';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/create-parcel',Auth(USER_ROLE.customer),validationZod(createParcelSchema),ParcelController.createParcel)
router.get('/',Auth(USER_ROLE.admin),ParcelController.getAllParcel)
router.get('/customer-parcel',Auth(USER_ROLE.customer),ParcelController.getUserParcel)
router.get('/tracking',Auth(USER_ROLE.customer,USER_ROLE.admin,USER_ROLE.deliveryAgent),ParcelController.trackingParcel)
router.patch('/update-parcel/:parcelId',Auth(USER_ROLE.admin,USER_ROLE.deliveryAgent),ParcelController.updateParcelStatus)
router.delete('/delete/:id',Auth(USER_ROLE.customer),ParcelController.deleteParcel)

export const ParcelRoute = router;