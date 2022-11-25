# Programming Rule

1. 변수

   - 이름
     - camelCase를 활용하도록 한다.
     - boolean의 경우: isOpen과 같이 사용하도록 한다.
     - 변수의 이름으로 해당 변수가 어떠한 역할을 하는지 파악할 수 있도록 명명한다.
   - var 사용 금지

     - var의 scope가 불안정 하므로 최대한 let과 const를 사용하도록 한다.

   - 최대한 let의 사용을 자제하도록 한다.
     - 불변성 유지를 위해 let의 사용을 최소화 하고 최대한 const를 쓰도록 한다.
     ```
     ex) 1 ~ 10 까지의 값을 구해야 하는 경우.
         즉시실행함수(IIFE)를 활용하여 해결하도록 한다.
             const sum = (() => {
                 let sum = 0
                 for(let i = 1; i <= 10; i++) {
                     sum += i
                 }
                 return sum
             })()
     ```
   - 세미콜론
     - 사용한다.
       prettier 참고.
   - String
     - Single quote 사용.
       prettier 참고.

2. 함수

   - 이름
     - 컴포넌트 내에서 관리하는 event 함수의 경우 onClickEventHandler와 같이 명명한다. (onNameEventHandler => on ~~~ EventHandler 와 같이 명명함.)
     - Class, consturctor Function와 같은 DOM를 리턴하는 함수는 PascalCase를 활용하도록 한다.
     - 해당 함수의 이름을 보고 동작을 파악할 수 있도록 작성한다.
     - 하위 컴포넌트에서 상위 컴포넌트로 값을 넘겨줄 때 사용하는 함수의 경우 Handler를 제외한다.
     ```
     ex) onClickEvent()
     ```
   - map, forEach, filter, every, some, reduce을 최대한 활용한다.

     - 적절한 상황에 적절한 함수를 호출하여 사용하도록 한다.

     ```
         ex) Bad!
         const arr = [1, 2, 3, 4, 5]
         let sum = 0
         for(let i = 0; i < arr.length; i++) {
             sum += arr[i]
         }

         ex) Good!
         const arr = [1, 2, 3, 4, 5]
         const sum = arr.reduce((acc, cur, i) => { return acc += cur }, 0)

         or

         const arr = [1, 2, 3, 4, 5]
         let sum = 0
         arr.forEach(e => sum += e)
     ```

3. HTML & CSS

   - 이름

     - css선택자는 class를 활용한다. id의 활용을 지양한다.

     ```
         ex) Bad!
         <div id = 'name'></div>

         ex) Good!
         <div class = 'name'></div>
     ```

   - 태그

     - 내용이 없을 경우 self closing을 한다.

     ```
         ex) Bad!
         <input value = 'function'><input>

         ex) Good!
         <input onclick = 'function'/>
     ```

   - 공동적으로 활용하는 CSS값의 경우 글로벌 데이터를 활용한다.

4. Git & README.md
   - 본인이 변경하지 않은 파일은 pull request(PR)에 포함시키지 않는다.
     - 굳이 띄어쓰기 들여쓰기 한 파일들을 PR에 포함될 이유가 없지 않을까?
   - 회고록은 돌아가면서 날짜별로 README.md -> 회고록에 작성하도록 한다. 이때, 중복되는 날짜도 상관없다.
   - 본인이 직면한 어려운 문제들은 README.md -> Issue에 문제상황 및 해결방법을 기록하도록 한다.
