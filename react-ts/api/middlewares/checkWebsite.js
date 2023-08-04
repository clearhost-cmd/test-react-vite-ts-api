import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to check if the user owns a specific site.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export function checkWebsite(req, res, next) {
   // Assuming req.session.upmind.websites is an array of websites owned by the user
   const ownedWebsites = req.session.upmind.websites;

   // Assuming req.website is the website
   const requestedWebsite = req.website;

   // Check if the requestedWebsite is present in the ownedWebsites array
   if (ownedWebsites.includes(requestedWebsite)) {
      next();
   } else {
      res.sendStatus(403);
   }
}
