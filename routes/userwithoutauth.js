const express = require("express");
const Router = express.Router();
const {login} = require('../controllers/user')

/**
  * @swagger
  * tags:
  *   name: Login
  *   description: User Login
  */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Returns Token
 *     security:
 *        BearerAuth:
 *            type: http
 *            scheme: bearer
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


Router.route('/login').post(login)

module.exports = Router;