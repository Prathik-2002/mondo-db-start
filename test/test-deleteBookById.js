const assert = require('assert');
const Book = require('../schema');
const {deleteBookById} = require('../index');

const deleteBookByIdTestcases = [
  {input: '1234', output: true},
  {input: '1333', output: false},
];
const deleteBookByIdTestDesign = {
  functionName: 'deleteBookById',
  populate: true,
  withConnection: () => {
    deleteBookByIdTestcases.forEach((testcase) => {
      it(`should return ${testcase.output} for id ${testcase.input}`, async ()=>{
        assert.strictEqual(await deleteBookById(testcase.input), testcase.output);
        assert.strictEqual(await Book.exists({bookId: testcase.input}), null);
      });
    });
  },
  withoutConnection: () => {
    deleteBookByIdTestcases.forEach((testcase) => {
      it(`should return ${false} for id ${testcase.input}`, async ()=>{
        assert.strictEqual(await deleteBookById(testcase.input), false);
      });
    });
  },
};
module.exports = {deleteBookByIdTestDesign, deleteBookByIdTestcases};
