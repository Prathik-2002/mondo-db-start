const assert = require('assert');
const Book = require('../schema');
const {changePublisherById} = require('../index');

const changePublisherByIdTestCases = [
  {
    id: '1239',
    newPublisher: 'JAmes',
    expected: false,
  },
  {
    id: '1235',
    newPublisher: 'Kim J',
    expected: true,
  },
];
const changePublisherTestDesign = {
  functionName: 'changePublisherById',
  populate: true,
  withConnection: () => {
    changePublisherByIdTestCases.forEach((testcase) => {
      it(`should return ${testcase.expected} for publisher change bookid ${testcase.id} `,
          async ()=>{
            assert.strictEqual(
                await changePublisherById(testcase.id, testcase.newPublisher), testcase.expected);
            if (testcase.expected === true) {
              const book = await Book.findOne({bookId: testcase.id}, {publisher: 1});
              assert.strictEqual(book.publisher, testcase.newPublisher);
            }
          });
    });
  },
  withoutConnection: () => {
    changePublisherByIdTestCases.forEach((testcase) => {
      it(`should return ${false} for publisher change bookid ${testcase.id} `, async ()=>{
        assert.strictEqual(await changePublisherById(testcase.id,
            testcase.newPublisher), false);
      });
    });
  },
};
module.exports = {changePublisherTestDesign, changePublisherByIdTestCases};
