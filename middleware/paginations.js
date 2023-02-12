const paginationMiddleware = (req, res, next) => {
  const {limit ,page} = req.query;

  if (!(limit && page)) {
    req.query.pagination = {
      page: undefined,
      limit: undefined,
    };
    return next();
  }

  limit = +limit || 10;
  page = +page + 1 || 1;
  offset = limit * (page - 1);
  req.query.pagination = {
    limit: limit || 2,
    offset:limit * (page - 1),
  };
  return next();
};

module.exports = paginationMiddleware;
