import { AnyZodObject } from 'zod';


import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const validationZod = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  });
};

export default validationZod;