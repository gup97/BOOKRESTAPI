import mongoose from 'mongoose';
import { mockGenerator } from '../utils/mock-generator';
if (process.env.MONGODB_URL === undefined) {
  throw new Error(
    '어플리케이션을 시작하려면 Mongo DB URL(MONGODB_URL) 환경변수가 필요합니다.',
  );
}

const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL, {
  minPoolSize: 4, // min pool size 설정
  maxPoolSize: 20, // max pool size 설정
});
const db = mongoose.connection;

db.on('connected', async () => {
  await mockGenerator();
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL);
});
db.on('error', (error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);

export * from './models/books-model';
