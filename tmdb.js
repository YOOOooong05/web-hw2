// data.js : 실습과제 #2 영화 배열 및 객체 데이터 / 용연승(2651042)

// ===== Part A : 10칸 배열 4종 (내 인생 영화 5편 + 박스오피스 5편) =====
const titles = [
  "Spider-Man: Across the Spider-Verse",
  "Spider-Man: Brand New Day",
  "Spider-Man: No Way Home",
  "Spider-Man 3",
  "Spider-Man",
  "박스오피스 1위",
  "박스오피스 2위",
  "박스오피스 3위",
  "박스오피스 4위",
  "박스오피스 5위"
];

const ratings = [8.4, 7.9, 8.0, 6.4, 7.3, 7.3, 7.8, 6.7, 7.5, 7.1];

const years = [2023, 2026, 2021, 2007, 2002, 2026, 2026, 2026, 2026, 2026];

// 내 영화 5편은 0, 박스오피스 5편은 KOBIS 누적 관객 수(숫자)
const audiences = [0, 0, 0, 0, 0, 2150000, 1340000, 780000, 420000, 190000];

// ===== Part B : 영화 객체 배열 10건 (키 8개, Part A와 동일 순서) =====
const movies = [
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    date: "2023-06-21",
    rating: 8.4,
    audience: 0,
    poster: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    type: "mine",
    rank: null
  },
  {
    title: "Spider-Man: Brand New Day",
    year: 2026,
    date: "2026-07-31",
    rating: 7.9,
    audience: 0,
    poster: null,
    type: "mine",
    rank: null
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    date: "2021-12-15",
    rating: 8.0,
    audience: 0,
    poster: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    type: "mine",
    rank: null
  },
  {
    title: "Spider-Man 3",
    year: 2007,
    date: "2007-05-01",
    rating: 6.4,
    audience: 0,
    poster: "/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    type: "mine",
    rank: null
  },
  {
    title: "Spider-Man",
    year: 2002,
    date: "2002-05-03",
    rating: 7.3,
    audience: 0,
    poster: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    type: "mine",
    rank: null
  },
  {
    title: "박스오피스 1위",
    year: 2026,
    date: "2026-10-01",
    rating: 7.3,
    audience: 2150000,
    poster: null,
    type: "boxoffice",
    rank: 1
  },
  {
    title: "박스오피스 2위",
    year: 2026,
    date: "2026-10-05",
    rating: 7.8,
    audience: 1340000,
    poster: null,
    type: "boxoffice",
    rank: 2
  },
  {
    title: "박스오피스 3위",
    year: 2026,
    date: "2026-10-08",
    rating: 6.7,
    audience: 780000,
    poster: null,
    type: "boxoffice",
    rank: 3
  },
  {
    title: "박스오피스 4위",
    year: 2026,
    date: "2026-10-12",
    rating: 7.5,
    audience: 420000,
    poster: null,
    type: "boxoffice",
    rank: 4
  },
  {
    title: "박스오피스 5위",
    year: 2026,
    date: "2026-10-15",
    rating: 7.1,
    audience: 190000,
    poster: null,
    type: "boxoffice",
    rank: 5
  }
];
