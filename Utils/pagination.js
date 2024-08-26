const paginate = (model, page = 1, limit = 10) => {

    const skip = (page - 1) * limit;

  
    const query = model.find().skip(skip).limit(limit);

  
    return {
        query,
        pagination: {
            currentPage: page,
            limit,
        }
    };
};

module.exports = paginate;
