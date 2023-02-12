const express = require("express");
const Router = express.Router();
const {
  createBook,
  getAllBook,
  getOneBook,
  updateBook,
  deleteBook
} = require("../controllers/book");
const accessRole = require("../middleware/roleauth");

/**
 * @swagger
 * components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *           - name
 *           - price
 *        properties:
 *          id:
 *             type: string
 *             description: The Auto-generated id of the book
 *          name:
 *             type: string
 *             description: The Book's name
 *          price:
 *             type: string
 *             description: The Book's price
 *        example:
 *           id: ueichei742902,
 *           name: Harry Potter
 *           price: 500
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Returns the list of all the books
 *     security:
 *        BearerAuth:
 *            type: http
 *            scheme: bearer
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

Router.route("/").post(accessRole("admin"),createBook).get(getAllBook);
Router.route("/:id").get(getOneBook).delete(accessRole("admin"),deleteBook).patch(accessRole("admin"),updateBook)   

module.exports = Router;