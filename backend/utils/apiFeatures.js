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

        console.log(keyword);

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
}

module.exports = APIFeatures;