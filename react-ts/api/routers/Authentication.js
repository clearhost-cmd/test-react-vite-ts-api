const { body, validationResult } = require('express-validator');
const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * Route: GET /api/session
 * Description: Check if the user's session is active.
 * Returns: 200 status with { ok: true, redirect: "/member" } if the session is active,
 * otherwise, returns 200 status with { ok: false }.
 */
router.get('/session', async (req, res) => {
   if (req.session.upmind) {
      return res.status(200).json({ ok: true, redirect: '/members' });
   }

   return res.status(200).json({ ok: false });
});

/**
 * Route: POST /api/login
 * Description: Authenticate user credentials and create a session.
 * Returns: 200 status with { ok: true, redirect: "/member" } on successful login,
 * otherwise, returns 400 status with { error: "failed to authenticate" }.
 */
router.post(
   '/login',
   [
      body('username').notEmpty().withMessage('Username is required'),
      body('password').notEmpty().withMessage('Password is required')
   ],
   async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      try {
         const result = await axios.post(
            'https://api.upmind.io/oauth/access_token',
            {
               username,
               password,
               grant_type: 'password'
            },
            {
               headers: { Origin: 'https://podpress.local.dev' }
            }
         );

         req.session.upmind = {
            jwt: result.data.access_token,
            refresh: result.data.refresh_token,
            client_id: result.data.actor_id
         };

         /*
          * Need to add a way of returning a customer's websites for checkWebsite middleware
          */

         return res.status(200).json({ ok: true, redirect: '/member' });
      } catch (e) {
         return res
            .status(400)
            .json({ error: 'failed to authenticate ' + e.message });
      }
   }
);

router.post(
   '/register',
   [
      // Add validation rules for email, password, firstname, and lastname fields in req.body
      body('email').isEmail().withMessage('Invalid email'),
      body('password').notEmpty().withMessage('Password is required'),
      body('firstname').notEmpty().withMessage('Firstname is required'),
      body('lastname').notEmpty().withMessage('Lastname is required')
   ],
   async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstname, lastname } = req.body;

      try {
         const result = await axios.post(
            'https://api.upmind.io/api/clients/register',
            {
               email,
               password,
               firstname,
               lastname
            },
            {
               headers: { Origin: 'https://podpress.local.dev' }
            }
         );

         return res.status(200).json({ ok: true });
      } catch (e) {
         return res
            .status(400)
            .json({ error: 'failed to register ' + e.message });
      }
   }
);

router.post(
   '/forgotten',
   [
      // Add validation rules for email
      body('email').isEmail().withMessage('Invalid email')
   ],
   async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      try {
         const result = await axios.post(
            'https://api.upmind.io/api/clients/password_reset',
            {
               email
            },
            {
               headers: { Origin: 'https://podpress.local.dev' }
            }
         );

         return res.status(200).json({ ok: true });
      } catch (e) {
         return res
            .status(400)
            .json({ error: 'failed to retrieve ' + e.message });
      }
   }
);

module.exports = router;
