const assert = require('assert');
const Book = require('../schema');
const {addNewBook} = require('../index');

const addNewBookTestCases = [
  {
    functionArguments: [
      '1111',
      'The Jungle book',
      'Rudyard Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1112',
      'Spider man',
      'Sam Jack',
      '405',
      ['Adventure', 'Fiction', 'Action'],
      'Macmillan',
      20,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1119',
      null,
      'Rudyrd Kipling',
      '409',
      ['Adventure', 'Fiction'],
      'Macmillan',
      19,
    ],
    result: false,
  },
  {
    functionArguments: [
      null,
      'The Jungle book',
      'Rudyard Kiping',
      '409',
      ['Adventure', 'Fiction'],
      'Dark Studio',
      3,
    ],
    result: false,
  },
  {
    functionArguments: [
      '2213',
      'King Kong',
      null,
      '400',
      ['Adventure', 'Fiction'],
      'Macmillan',
      3,
    ],
    result: false,
  },
  {
    functionArguments: [
      '1113',
      'Pennywise',
      'Stephan King',
      '489',
      ['Horror', 'Thriller'],
      'Simon & Schuster',
      9,
    ],
    result: true,
  },
  {
    functionArguments: [
      '1113',
      'Pennywise 2',
      'Stephan King',
      '489',
      ['Horror', 'Thriller'],
      'Simon & Schuster',
      9,
    ],
    result: false,
  },
];
const addNewBookTestDesign = {
  functionName: 'addNewBook',
  populate: false,
  withConnection: () => {
    addNewBookTestCases.forEach((testcase) => {
      it(`should ${testcase.result?'':'not'} insert into collection for inputs [${(testcase
          .functionArguments
          .join(', '))}]`,
      async ()=>{
        assert.strictEqual(await addNewBook(...(testcase.functionArguments)), testcase.result);
        const isExists = await Book.exists({bookId: testcase.functionArguments[0],
          bookName: testcase.functionArguments[1]});
        if (testcase.result) {
          assert.notStrictEqual(isExists, null);
        } else {
          assert.strictEqual(isExists, null);
        }
      });
    });
  },
  withoutConnection: () => {
    addNewBookTestCases.forEach((testcase) => {
      it(`should return ${false} any insertion`, async ()=>{
        assert.strictEqual(await addNewBook(...(testcase.functionArguments)), false);
      });
    });
  },
};
module.exports = {addNewBookTestDesign};
