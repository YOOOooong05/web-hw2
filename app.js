// app.js : 영화 데이터 통계 계산 및 탐색 함수 / 용연승(2651042)

// ===== Part A =====
let sumScoreA = 0;
let maxA = 0;
let highRatingA = 0;
let y2020A = 0;
let y2010A = 0;
let y2000A = 0;
let yPrevA = 0;
let millionListA = "";

for (let i = 0; i < titles.length; i++) {
  sumScoreA += ratings[i];

  if (ratings[i] > ratings[maxA]) {
    maxA = i;
  }

  if (ratings[i] >= 8) {
    highRatingA++;
  }

  const decade = years[i] - (years[i] % 10);
  switch (decade) {
    case 2020:
      y2020A++;
      break;
    case 2010:
      y2010A++;
      break;
    case 2000:
      y2000A++;
      break;
    default:
      yPrevA++;
      break;
  }

  if (audiences[i] >= 1000000) {
    millionListA += millionListA === "" ? titles[i] : " " + titles[i];
  }
}

if (millionListA === "") {
  millionListA = "없음";
}

console.log("A1 평균 평점:", sumScoreA / ratings.length);
console.log("A2 최고 평점:", titles[maxA], ratings[maxA]);
console.log("A3 8점 이상:", highRatingA + "편");
console.log(`A4 2020년대 ${y2020A}편, 2010년대 ${y2010A}편, 2000년대 ${y2000A}편, 그 이전 ${yPrevA}편`);
console.log("A5 관객 100만 이상:", millionListA);


// ===== Part B =====

// average : 영화 객체 배열 ⇒ 평균 평점(숫자)
function average(list) {
  return averageBy(list, "rating");
}

// best : 영화 객체 배열 ⇒ 최고 평점 영화 객체
function best(list) {
  let topItem = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i].rating > topItem.rating) {
      topItem = list[i];
    }
  }
  return topItem;
}

// filterByRating : 영화 객체 배열, 최소 평점(숫자) ⇒ 기준 이상 영화 새 배열
function filterByRating(list, min) {
  return list.filter(movie => movie.rating >= min);
}

// sortBy : 영화 객체 배열, 기준 키(문자열), 내림차순 여부(불리언) ⇒ 정렬된 새 배열
function sortBy(list, key, desc) {
  const sign = desc ? -1 : 1;
  return [...list].sort((a, b) => {
    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]) * sign;
    }
    return (a[key] - b[key]) * sign;
  });
}

// search : 영화 객체 배열, 검색어(문자열) ⇒ 제목에 검색어가 포함된 새 배열
function search(list, keyword) {
  const query = keyword.trim().toLowerCase();
  return list.filter(movie => movie.title.toLowerCase().includes(query));
}

// formatNumber : 숫자 또는 숫자 문자열 ⇒ 천 단위 쉼표가 적용된 문자열
function formatNumber(n) {
  return Number(n).toLocaleString("ko-KR");
}

// yearsSince : 날짜 문자열("YYYY-MM-DD") ⇒ 올해 기준 경과 연수(숫자)
function yearsSince(dateStr) {
  return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

const bestMovie = best(movies);
const topAudienceObj = sortBy(movies, "audience", true)[0];

const lineOne = `전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점`;
const lineTwo = `최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)`;
const lineThree = `관객 1위 ${topAudienceObj.title} (누적 ${formatNumber(topAudienceObj.audience)}명)`;

document.getElementById("out").textContent = `${lineOne}\n${lineTwo}\n${lineThree}`;


// ===== Part C =====

// getList : TMDB 응답 객체 ⇒ 상영 영화 배열
function getList(data) {
  return data.results;
}

// averageBy : 객체 배열, 숫자 속성 키(문자열) ⇒ 해당 속성의 평균(숫자)
function averageBy(list, key) {
  if (list.length === 0) return 0;
  const totalSum = list.reduce((acc, obj) => acc + obj[key], 0);
  return totalSum / list.length;
}

const playingList = getList(TMDB);

console.log(
  `C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, 이번 응답 ${playingList.length}편`
);
console.log("C2 상영작 평균 평점:", averageBy(playingList, "vote_average").toFixed(1));
console.table(
  sortBy(playingList, "vote_average", true).slice(0, 5),
  ["title", "release_date", "vote_average"]
);

const searchWordC = "Spider";
console.log(`C4 '${searchWordC}' 검색:`, search(playingList, searchWordC).length + "편");


// ===== Step 5. 보너스 =====

// formatDate : 날짜 문자열("YYYY-MM-DD") ⇒ "YYYY년 M월 D일 (요일)" 형식 문자열
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${week[d.getDay()]})`;
}

console.log("보너스 formatDate:", formatDate("2014-11-06"));

// loadJson : tmdb.json 파일 비동기 읽기 ⇒ 콘솔에 평점 상위 5편 표 출력
async function loadJson() {
  try {
    const res = await fetch("tmdb.json");
    const data = await res.json();
    console.table(
      sortBy(getList(data), "vote_average", true).slice(0, 5),
      ["title", "vote_average"]
    );
  } catch (err) {
    console.warn("tmdb.json 로드 확인 필요(Live Server 또는 GitHub Pages 환경):", err.message);
  }
}

loadJson();
