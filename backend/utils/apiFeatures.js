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
                $options: 'i'
            }
        } : {}

        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }
}

module.exports = APIFeatures;