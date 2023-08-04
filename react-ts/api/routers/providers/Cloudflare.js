import express from 'express';
import axios from 'axios';

import { checkSession } from '../../middlewares/checkSession';
import { checkWebsite } from '../../middlewares/checkWebsite';

const router = express.Router();

/**
 * Route: POST /admin/websites/cache/clear
 * Description: Clear the cache for a website using the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Middleware: checkWebsite - Ensures the website exists and the user has access to it.
 * Returns: JSON response with the result of the cache clearing process or an error message.
 */
router.post(
   '/admin/websites/cache/clear',
   [checkSession, checkWebsite],
   async (req, res) => {
      try {
         const details = await axios.post(
            `${process.env.CF_API_ENDPOINT}${process.env.CF_IDENTIFIER}/purge_cache`,
            {
               headers: {
                  'X-Auth-Email': `${process.env.CF_AUTH_EMAIL}`,
                  'X-Auth-Key': `${process.env.CF_AUTH_KEY}`,
                  hosts: ['google.com', 'changeme.com']
               }
            }
         );

         res.json(details.data);
      } catch (error) {
         res.status(500).json({ error: 'Failed to clear website cache' });
      }
   }
);

export default router;
