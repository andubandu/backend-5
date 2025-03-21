const paginate = (req, res, next) => {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    req.pagination = { page, limit };
    next();
};

export default paginate;