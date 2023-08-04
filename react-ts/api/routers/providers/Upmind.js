const express = require('express');
const axios = require('axios');

const { checkSession } = require('../../middlewares/checkSession.js');

const router = express.Router();

/**
 * Route: GET /admin/payment_details
 * Description: Fetch payment details for the authenticated user from the Upmind API.
 * Middleware: checkSession - Ensures the user is authenticated and has an active session.
 * Returns: JSON response with payment details or an empty object if not authenticated.
 */
router.get('/admin/payment_details', checkSession, async (req, res) => {
   try {
      let details = await axios.get(
         'https://api.upmind.io/api/clients/' +
            req.session.upmind.client_id +
            '/payment_details',
         {
            headers: {
               Authorization: 'Bearer ' + req.session.upmind.jwt,
               Origin: 'https://podpress.local.dev'
            }
         }
      );

      res.json(details.data);
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment details' });
   }
});

module.exports = router;
