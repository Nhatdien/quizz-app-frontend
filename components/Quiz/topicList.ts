import type { Quiz } from "~/types/quiz";

// let testQuiz: Quiz = {
//   title: "Quiz về Lịch sử",
//   topicCode: "HISTORY",
//   description: "Quiz kiểm tra kiến thức về lịch sử thế giới",
//   questions: [
//     {
//       content: "Ai là người đầu tiên đặt chân lên mặt trăng?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Yuri Gagarin",
//           isCorrect: false,
//         },
//         {
//           content: "Neil Armstrong",
//           isCorrect: true,
//         },
//         {
//           content: "Buzz Aldrin",
//           isCorrect: false,
//         },
//         {
//           content: "Michael Collins",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Chiến tranh thế giới thứ hai kết thúc vào năm nào?",
//       questionType: 1,
//       answers: [
//         {
//           content: "1945",
//           isCorrect: true,
//         },
//         {
//           content: "1939",
//           isCorrect: false,
//         },
//         {
//           content: "1950",
//           isCorrect: false,
//         },
//         {
//           content: "1918",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Ai là người sáng lập Đế quốc Mông Cổ?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Kublai Khan",
//           isCorrect: false,
//         },
//         {
//           content: "Genghis Khan",
//           isCorrect: true,
//         },
//         {
//           content: "Ogedei Khan",
//           isCorrect: false,
//         },
//         {
//           content: "Tamerlane",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Cách mạng Pháp diễn ra vào năm nào?",
//       questionType: 1,
//       answers: [
//         {
//           content: "1789",
//           isCorrect: true,
//         },
//         {
//           content: "1812",
//           isCorrect: false,
//         },
//         {
//           content: "1776",
//           isCorrect: false,
//         },
//         {
//           content: "1799",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Ai là tổng thống Mỹ trong suốt Chiến tranh Việt Nam?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Lyndon B. Johnson",
//           isCorrect: true,
//         },
//         {
//           content: "Richard Nixon",
//           isCorrect: false,
//         },
//         {
//           content: "John F. Kennedy",
//           isCorrect: false,
//         },
//         {
//           content: "Dwight D. Eisenhower",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Tuyên ngôn độc lập của Mỹ được ký vào ngày nào?",
//       questionType: 1,
//       answers: [
//         {
//           content: "4/7/1776",
//           isCorrect: true,
//         },
//         {
//           content: "15/8/1776",
//           isCorrect: false,
//         },
//         {
//           content: "4/7/1775",
//           isCorrect: false,
//         },
//         {
//           content: "15/8/1775",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Ai là hoàng đế đầu tiên của Trung Quốc thống nhất?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Tần Thủy Hoàng",
//           isCorrect: true,
//         },
//         {
//           content: "Hán Vũ Đế",
//           isCorrect: false,
//         },
//         {
//           content: "Kangxi",
//           isCorrect: false,
//         },
//         {
//           content: "Hán Cao Tổ",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Ai là người nổi tiếng với phát minh bóng đèn?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Nikola Tesla",
//           isCorrect: false,
//         },
//         {
//           content: "Thomas Edison",
//           isCorrect: true,
//         },
//         {
//           content: "Benjamin Franklin",
//           isCorrect: false,
//         },
//         {
//           content: "Alexander Graham Bell",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Vua Tutankhamun thuộc thời đại nào của Ai Cập?",
//       questionType: 1,
//       answers: [
//         {
//           content: "Tân vương quốc",
//           isCorrect: true,
//         },
//         {
//           content: "Trung vương quốc",
//           isCorrect: false,
//         },
//         {
//           content: "Hậu kỳ",
//           isCorrect: false,
//         },
//         {
//           content: "Cổ vương quốc",
//           isCorrect: false,
//         },
//       ],
//     },
//     {
//       content: "Ai là nữ hoàng đầu tiên của Anh?",
//       questionType: 2,
//       answers: [
//         {
//           content: "Mary I",
//           isCorrect: true,
//         },
//       ],
//     },
//   ],
// };

export const topicList = [
  "GEOGRAPHY",
  "HISTORY",
  "SCIENCE",
  "SPORTS",
  "MUSIC",
  "COMPUTER SCIENCE",
  "MATHS",
  "LITERATURE",
  "ART",
  "PHILOSOPHY",
  "LANGUAGES",
  "ECONOMICS",
  "POLITICS",
  "PSYCHOLOGY",
  "SOCIOLOGY",
  "PHYSICS",
  "CHEMISTRY",
  "BIOLOGY",
  "ASTRONOMY",
  "ENGINEERING",
  "MEDICINE",
  "LAW",
  "BUSINESS",
  "EDUCATION",
  "ENVIRONMENTAL SCIENCE",
  "RELIGION",
  "ANTHROPOLOGY",
  "ARCHAEOLOGY",
  "COMMUNICATIONS",
  "CULTURAL STUDIES",
  "DESIGN",
  "FILM STUDIES",
  "GENDER STUDIES",
  "LINGUISTICS",
  "MEDIA STUDIES",
  "PERFORMING ARTS",
  "PHOTOGRAPHY",
  "PUBLIC HEALTH",
  "ZOOLOGY",
];
