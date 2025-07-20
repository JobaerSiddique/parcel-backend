import express from 'express'
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { ParcelRoute } from '../modules/parcel/parcel.route';

import { AdminRoute } from '../modules/Admin/admin.route';

const router = express.Router();


const moduleRoutes =[
    {
        path:"/user",
        route:UserRoute
    },
    {
        path:"/auth",
        route:AuthRoute
    },
    {
        path:"/parcel",
        route:ParcelRoute
    },
    {
        path:"/admin",
        route:AdminRoute
    }
]


moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;