const assert = require('assert');
const {
  connectToMongoDB,
  closeConnection,
} = require('../index');
const URIs = {
  validURI: {uri: 'mongodb://localhost/Demo', connectionResult: true},
  invalidURI: {uri: 'mongod://localhost/Demo', connectionResult: false},
  testURI: {uri: 'mongodb://localhost/Test', connectionResult: true},
};


describe('MongoDB connection', () => {
  afterEach(async ()=>{
    await closeConnection();
  });
  Object.keys(URIs).forEach((URI) => {
    it(`should return ${URIs[URI].connectionResult} for ${URI}`, async ()=>{
      assert.strictEqual(await connectToMongoDB(URIs[URI].uri), URIs[URI].connectionResult);
    });
  });
});
