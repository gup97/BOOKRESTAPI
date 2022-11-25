# OOP 과제

---

## 목차

---

## 시작하기

```
npm install 후

아래와 같이 .env 파일 생성
MONGODB_URL="mongodb://localhost:27017"
PORT=5000

(node v17.x 이상의 경우)
MONGODB_URL="mongodb://127.0.0.1:27017"
PORT=5000
```

---

## 중점사항

### 1. DATA Mocking

쉼표로 구분할 시 `"Kunze, Russel and Leannon"` 처럼 쉼표가 포함된 데이터가 있기 때문에 아래 형식의 정규표현식을 사용하여 나눠주었습니다.

```javascript
//  src/utils/mock-generator.js
function csvToJSON(csv) {
  let [header, ...body] = csv.toString().split('\n');
  let headers = header.split(',');
  //정규표현식 참고

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

```

이렇게 json으로 변환한 데이터는 DB 연결 시
local DB에 추가하게 됩니다.  

```javascript
//  src/utils/mock-generator.js
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
```

### 2. SRP(Single Responsibility Principle)

단일 책임 원칙을 지키기 위해서
아래의 구조를 밑 처럼 나눴습니다

```bash
바뀌기 전 구조
├─services
│  └─index.js
│    books-service.js
│       
```

```bash
단일 책임 원칙을 적용한 구조
├─services
│  └─books-services
│          delete-books-service.js
│          get-books-service.js
│          index.js
│          post-books-service.js
│          put-books-service.js
```

---

## 질문

### 질문1

 API 명세가 book 이 아닌 books가 되어야 하는거 아닌가요?

### 질문2

 req.body 검사의 부분은 컨트롤러인가요? DTO 인가요? 만약 컨트롤러에서 req.body 유효성 검사를 안한다면 라우터와 컨트롤러 둘 중 하나만 있으면 되나요?

---

## 해결못한문제

### 문제1

 컨트롤러에서 의존성 주입을 하려고  
 service 코드처럼 인스턴스를 생성할 때 import 한 getBooksService 를 받아오고  

constructor 에서 프로퍼티로 가져와,  
`await this.getBooksService.getBooksAll();` 하면 에러가 나게 되어

import 한 getBooksService 그대로 쓰게된 문제  
현재 코드는 에러 때문에 밑 코드와 다르게 constructor 는 없습니다

> router -> controller -> service -> model

```javascript
//내가 작성하고 싶은 controller의 모습
import {
  getBooksService,
} from '../services/books-services';
import { booksService } from '../services/books-services';

class BookController {
  constructor(getBooksService) {
    this.getBooksService = getBooksService;
  }

  async getBooksAll(req, res, next) {
    // *******************************************
    // 여기 this.getBooksService 부분에서 에러납니다.
    const books = await this.getBooksService.getBooksAll();
    res.status(200).json({ books });
    try {
    } catch (err) {
      next(err);
    }
  }
}
const bookController = new BookController(getBooksService);
export { bookController };

```
"# BOOKRESTAPI"  
