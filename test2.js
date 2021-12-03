const { NotFound } = require('./test/utils/errors');

module.exports = async function Test2 (server, queries) {
    let response = await server.query(queries); // Will return an array with the results, empty array or error
    response = JSON.parse(response);
    if(response.length < 1) return new NotFound();
    return response;
}