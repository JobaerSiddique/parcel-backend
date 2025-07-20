// import jwt, { JwtPayload } from 'jsonwebtoken';
// import httpStatus from "http-status";

// import config from '../../config';
// import { TUserRole } from '../modules/user/user.interface';
// import catchAsync from '../utils/catchAsync';



// const Auth = (...requiredRoles: TUserRole[])=>{
//     return catchAsync(async(req,res,next)=>{
//         let token: string | undefined;
        
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user Token' });
//   }
//   // check vaild token 
//     jwt.verify(token,config.accessToken as string ,function (err,decoded){
//         if(err){
//             return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user not Verify' });
//         }
  
//         const role = (decoded as JwtPayload).role;
        
//         if(  requiredRoles && !requiredRoles.includes(role) ){
//             return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'You have no access to this route ' });
//         }
       
//         req.user = decoded as JwtPayload
//         console.log('auth',req.user);
//         next()
       
//     })

//     })
// }


// export default Auth;
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../../config';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';

const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'You are not authorized'
      });
    }

    // Verify token
    jwt.verify(token, config.accessToken as string, (err, decoded) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const payload = decoded as JwtPayload;
      const role = payload.role;

      // Check if user role is allowed
      if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'You are not authorized to access this route'
        });
      }

      // Attach user to request
      req.user = payload;
      next();
    });
  });
};

export default Auth;