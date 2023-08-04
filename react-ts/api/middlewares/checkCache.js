import { NextFunction, Request, Response } from 'express';

export function cachingMiddleware(req, res, next) {
   const cacheKey = o;

   if (req.session.upmind) {
      cacheKey = JSON.stringify(req.session.upmind);
   }

   cache.get(cacheKey, (error, cachedResponse) => {
      if (!error) {
         res.send(cachedResponse);
      } else {
         next();
      }
   });
}
