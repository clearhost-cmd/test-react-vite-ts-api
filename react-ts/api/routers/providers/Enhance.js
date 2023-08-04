import express from 'express';
import axios from 'axios';

import { checkSession } from '../../middlewares/checkSession';
import { checkWebsite } from '../../middlewares/checkWebsite';

const router = express.Router();

/**
 * Route: POST /admin/websites/cache/clear
 * Description: Clear the cache for a website using the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Returns: JSON response with the result of the cache clearing process or an error message.
 */
router.get('/admin/websites', [checkSession], async (req, res) => {
   try {
      const details = await axios.get(
         `${process.env.ENHANCE_API_ENDPOINT}/${req.session.upmind.org_id}/websites`,
         {
            headers: {
               'CF-Access-Id': `${process.env.CF_ACCESS_ID}`,
               'CF-Access-Client-Secret': `${process.env.CF_ACCESS_SECRET}`,
               Authorization: `Bearer ${process.env.ENHANCE_SECRET}`,
               orgId: `${process.env.ENHANCE_ID}`
            }
         }
      );

      res.json(details.data);
   } catch (error) {
      res.status(500).json({ error: 'Failed to clear website cache' });
   }
});

/**
 * Route: POST /admin/websites/cache/clear
 * Description: Clear the cache for a website using the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Returns: JSON response with the result of the cache clearing process or an error message.
 */
router.get(
   '/admin/applications/{website_id}',
   [checkSession, checkWebsite],
   async (req, res) => {
      try {
         const details = await axios.get(
            `${process.env.ENHANCE_API_ENDPOINT}/${req.session.upmind.org_id}
            /websites/{website_id}/apps`,
            {
               headers: {
                  'CF-Access-Id': `${process.env.CF_ACCESS_ID}`,
                  'CF-Access-Client-Secret': `${process.env.CF_ACCESS_SECRET}`,
                  Authorization: `Bearer ${process.env.ENHANCE_SECRET}`,
                  orgId: `${process.env.ENHANCE_ID}`
               }
            }
         );

         res.json(details.data);
      } catch (error) {
         res.status(500).json({ error: 'Failed to clear website cache' });
      }
   }
);

/**
 * Route: POST /admin/websites/cache/clear
 * Description: Clear the cache for a website using the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Returns: JSON response with the result of the cache clearing process or an error message.
 */
router.get(
   '/admin/sso/default/{website_id}/{app_id}',
   [checkSession, checkWebsite],
   async (req, res) => {
      try {
         const details = await axios.get(
            `${process.env.ENHANCE_API_ENDPOINT}/${req.session.upmind.org_id}
            /websites/{website_id}/apps/{app_id}/wordpress/users/default`,
            {
               headers: {
                  'CF-Access-Id': `${process.env.CF_ACCESS_ID}`,
                  'CF-Access-Client-Secret': `${process.env.CF_ACCESS_SECRET}`,
                  Authorization: `Bearer ${process.env.ENHANCE_SECRET}`,
                  orgId: `${process.env.ENHANCE_ID}`
               }
            }
         );

         res.json(details.data);
      } catch (error) {
         res.status(500).json({ error: 'Failed to clear website cache' });
      }
   }
);

/**
 * Route: POST /admin/websites/cache/clear
 * Description: Clear the cache for a website using the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Returns: JSON response with the result of the cache clearing process or an error message.
 */
router.get(
   '/admin/sso/{website_id}/{app_id}/{user_id}',
   [checkSession, checkWebsite],
   async (req, res) => {
      try {
         const details = await axios.get(
            `${process.env.ENHANCE_API_ENDPOINT}/${req.session.upmind.org_id}
            /websites/{website_id}/apps/{app_id}/wordpress/users/{user_id)}`,
            {
               headers: {
                  'CF-Access-Id': `${process.env.CF_ACCESS_ID}`,
                  'CF-Access-Client-Secret': `${process.env.CF_ACCESS_SECRET}`,
                  Authorization: `Bearer ${process.env.ENHANCE_SECRET}`,
                  orgId: `${process.env.ENHANCE_ID}`
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
