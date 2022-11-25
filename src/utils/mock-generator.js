import { booksModel } from '../db';
import fs from 'fs';
function csvToJSON(csv) {
  let [header, ...body] = csv.toString().split('\n');

  let headers = header.split(',');
  //정규표현식 참고
  //https://stackoverflow.com/questions/59218548/what-is-the-best-way-to-convert-from-csv-to-json-when-commas-and-quotations-may
  let result = body.map((v) => {
    let splitCSV = v
      .split(/s*(")?(.*?)\1s*(?:,|$)/gm)
      .filter((v) => v !== '' && v !== undefined && v !== '"');

    const newQuery = {};
    for (const num in headers) {
      const key = headers[num];
      const value = splitCSV[num];
      newQuery[key] = value;
    }
    return newQuery;
  });

  return result;
}
async function dataPull() {
  // 1. node.js의 fs모듈 추출
  const file_csv = fs.readFileSync(__dirname + '/mock/MOCK_BOOK_DATA.csv');
  const string_csv = file_csv.toString();
  const arr_json = csvToJSON(string_csv);

  for (const el of arr_json) {
    await booksModel.create(el);
  }

  console.log('collections deleteAll...');
}
async function dataReset() {
  await booksModel.deleteAll();
  console.log('data pulling...');
}

async function mockGenerator() {
  await dataReset();
  await dataPull();
}

export { mockGenerator };
