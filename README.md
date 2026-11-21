# 실습과제 #2: 영화 데이터를 자바스크립트로

- 이름/학번 : 용연승 / 2651042
- 사이트 주소 : https://아이디.github.io/web-hw2/
- 사용한 API: TMDB (영화 정보, now_playing 응답), KOBIS 일별 박스오피스 (기준일 YYYY-MM-DD)

## 구현 항목 체크
- [x] 1. Part A: `data.js`에 10칸짜리 배열 4개 작성 및 `app.js`에서 `A1`~`A5` 콘솔 출력 (`console-a.png`)
- [x] 2. Part B 함수 7개: 8개 키로 구성된 영화 객체 10건 작성, 함수 7종 구현 및 자가 테스트 완료
- [x] 3. Part C 응답 구조: `tmdb.js`에 `now_playing` 응답 전체 저장, `getList`·`averageBy` 연동 및 `C1`~`C4`·표 출력 (`console-c.png`)
- [x] 4. 출력: 캡처 이미지 2장 저장 및 페이지 `<pre id="out">` 영역에 요약 3줄 출력
- [x] 5. 코드 품질: 함수별 `입력 ⇒ 출력` 주석 표기, `const`/`let` 사용, 원본 배열 불변 유지, `average`에서 `averageBy` 재사용
- [x] 6. 제출 형식: Public 저장소 `web-hw2` 루트 업로드, GitHub Pages 활성화, 파일 내 API 키 미포함
- [x] 보너스: `reduce` 기반 평균 계산, `formatDate` 요일 표기, `fetch`로 `tmdb.json` 비동기 읽기 (`bonus.png`)

## 자가 테스트 표

| 번호 | 호출 | 기대 결과 | 실제 결과 |
|---|---|---|---|
| 1 | `formatNumber("1234567")` | `'1,234,567'` | |
| 2 | `average(movies).toFixed(1)` | `'7.4'` | |
| 3 | `best(movies).title` | `'Spider-Man: Across the Spider-Verse'` | |
| 4 | `sortBy(movies, "rating", true)[0].title` | `'Spider-Man: Across the Spider-Verse'` | |
| 5 | `filterByRating(movies, 8).length` | `2` | |
| 6 | `search(movies, "Spider ").length` | `0` | |
| 7 | `yearsSince("2014-11-06")` | `12` | |
| 8 | 4번 실행 뒤 `movies[0].title` | `'Spider-Man: Across the Spider-Verse'` | |

## 어려웠던 점 3가지와 해결
1. **정렬 이후에도 초기 데이터 배열 상태 보존**: 자바스크립트의 기본 `sort()` 메서드는 호출 즉시 원본 배열의 인덱스 순서를 덮어쓰기 때문에, 정렬 이후에 `movies[0]`을 확인했을 때 처음 입력한 영화가 바뀌는 문제가 있었습니다. 이를 막기 위해 `[...list]` 전개 연산자로 얕은 복사본을 먼저 생성한 뒤 정렬 결과를 반환하도록 처리했습니다.
2. **영문·국문 제목과 수치형 속성을 모두 지원하는 단일 정렬 함수 설계**: `sortBy` 함수에 전달되는 `key`가 문자열(`title`)일 때와 숫자(`rating`, `audience`, `year`)일 때 비교 연산 방식이 달라 오류가 발생했습니다. `typeof a[key] === "string"` 분기문을 두고 문자열은 `localeCompare()`, 숫자는 뺄셈 연산을 수행한 후 내림차순 플래그(`desc`)에 따라 `-1` 또는 `1`을 곱해 일관된 정렬을 구현했습니다.
3. **서로 다른 JSON 스키마 간의 평균 계산 통합**: 직접 정의한 `movies` 객체의 평점 속성은 `rating`이지만 TMDB API `results` 객체의 평점 속성은 `vote_average`라서 평균 함수를 따로 만들면 코드가 중복되었습니다. 속성명을 인자로 받는 `averageBy(list, key)`를 `reduce`로 구현하고, `average(list)` 내부에서는 `averageBy(list, "rating")`을 호출하도록 구조화하여 중복을 제거했습니다.

## 참고한 자료
- 웹개발기초 교재 8~11장 (변수, 반복문, 함수, 객체, 표준 내장 객체)
- MDN Web Docs: `Array.prototype.sort()`, `Array.prototype.reduce()`, `Array.prototype.filter()`, `String.prototype.localeCompare()`, `Fetch API`

## 생성형 AI 사용 내역
- 질문 요지 : 용연승(2651042) 인적사항과 스파이더맨 시리즈 5편을 적용한 실습과제 #2 전체 코드 및 새롭게 구성한 README 작성 요청
- 답변 요약 : Part A·B·C 및 보너스 요구사항이 반영된 `index.html`, `data.js`, `tmdb.js`, `app.js` 코드와 별도 문체로 작성한 `README.md` 초안을 제공받음
- 채택 여부 : 채택 (실제 KOBIS 박스오피스 및 TMDB `now_playing` 응답 데이터로 교체하고 개발자 도구 콘솔에서 자가 테스트를 검증해 최종 적용)
