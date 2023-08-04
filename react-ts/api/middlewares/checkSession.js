import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to check if the user has an active session.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export function checkSession(req, res, next) {
   if (req.session.upmind) {
      next();
      return;
   }

   res.sendStatus(403);
}
