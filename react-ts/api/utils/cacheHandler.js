function getUserCacheKey(req) {
   const userId = req.user ? req.user.id : 'guest';
   return `user:${userId}:route:${req.originalUrl}`;
}
