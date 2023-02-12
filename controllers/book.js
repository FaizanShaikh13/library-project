const GM = require("../utils/genericMethod");
const { Book } = require("../models");

const createBook = async (req, res) => {
  return GM.insertDb(req, res, Book);
};

const getAllBook = async (req, res) => {
  const query = {
    attributes: ["id", "name", "price"],
  };
  return GM.getall(req, res, Book, query);
};

const getOneBook = async (req, res) => {
  const query = {
    attributes: ["id", "name", "price"],
  };
  return GM.getone(req, res, Book, query);
};

const updateBook = async (req,res)=>{
    return GM.update(req,res,Book)
}

const deleteBook = async (req,res)=>{
    return GM.delete(req,res,Book)
}
module.exports = {
  createBook,
  getAllBook,
  getOneBook,
  updateBook,
  deleteBook
};
