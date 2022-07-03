// Implement API features; search, pagination, sorting, and filtering.
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        // Implement search functionality.
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i' // Case insensitive.
            }
        } : {}


        this.query = this.query.find({...keyword});
        return this;
    }

    // Implement filter functionality.
    filter() {

        const queryObj = { ...this.queryString };


        // Remove the field from the query object.
        const excludedFields = ['page', 'keyword', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering for prices, ratings, etc.
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Find filtered query.
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    // Implement pagination functionality.
    paginate(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = (currentPage - 1) * resultsPerPage; // Skip the first n results.

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

// Export APIFeatures class.
module.exports = APIFeatures;