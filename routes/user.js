const express = require("express");
const Router = express.Router();
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const accessRole = require("../middleware/roleauth");

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *           - name
 *           - email
 *           - password
 *           - role
 *        properties:
 *          id:
 *             type: string
 *             description: The Auto-generated id of the user
 *          name:
 *             type: string
 *             description: The user's name
 *          email:
 *             type: string
 *             description: The user's email
 *          password:
 *             type: string
 *             description: The user's password
 *          role:
 *             type: string
 *             description: The user's role
 *        example:
 *           id: ueichei742902,
 *           name: John Doe
 *           email: john@mail.com
 *           password: 1234
 *           role: admin
 */

/**
 * components:
 * securitySchemes:
 *   bearerAuth:            
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT    
 * security:
 * - bearerAuth: []  
 */

/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The user managing API
  */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Returns the list of all the users
 *     security:
 *        BearerAuth:
 *            type: http
 *            scheme: bearer
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

 /**  
 * @swagger
 * /api/user:
 *   post:
 *     summary: Creates a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Some Error   
 */




Router.route("/").post(accessRole("admin"),createUser).get(accessRole("admin"), getAllUsers);
Router.route("/:id").get(accessRole("admin"),getUser).delete(accessRole("admin"),deleteUser).patch(accessRole("admin"),updateUser);

module.exports = Router;
