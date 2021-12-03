const sift = require('sift');
const { NotFound } = require('./test/utils/errors');

// This is a bonus but you need to do the previous tests before

class Server {

    // Create your server with query features with sift
    // We pass the db when the Server is instantiated (constructor)

    constructor(db){
        this.db = db;
    }

    find(collectionName, query){
        return this.catchError(this.db[collectionName].filter(sift(query)));
    }

    findOne(collectionName, documentId){
        if(documentId == null) return new NotFound('No data found with the id equal as "null".');
        return this.catchError(
            this.db[collectionName].find(sift({id: {$eq:documentId}}))
        );
    }

    updateOne(collectionName, documentId, dataToUpdate){
        if(documentId == null) return new NotFound('No data for update found with the id equal as "null".');
        let response = this.findOne(collectionName, documentId);
        return Object.assign(response, dataToUpdate);
    }

    catchError(response){
        if(response.length < 1) 
            return new NotFound();
        return response;
    }
}

module.exports = Server;