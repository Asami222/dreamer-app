
//utilsフォルダ　　　純粋関数、ロジックだけを書く。データではなくロジック（関数）を置く場所
/*
export const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  //const day = now.getDay();
  //const week = ["日", "月", "火", "水", "木", "金", "土"][day];

  return `${year}年${month}月${date}日`;
}; 

export const imageData1 = [
  '/images/icecream1.webp',
  '/images/macaron1.webp',
  '/images/macaron-red1.webp',
  '/images/macaron-pink1.webp',
  '/images/icecream02.webp',
  '/images/strawberry1.webp',
]

export const imageData2 = [
  '/images/bear01.webp',
  '/images/bear02.webp',
  '/images/flower1.webp',
]

export const imageData3 = [
  '/images/balloon1.webp',
  '/images/rainbow1.webp',
  '/images/shootingstar1.webp',
  '/images/signinImg.webp',
  '/images/signinImg2.webp',
]

export const chooseImage = (image: string[]) => {
  const arrayIndex = Math.floor(Math.random() * image.length);
  return image[arrayIndex];
}
*/
export function formatDateToJapanese(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0始まりなので +1
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}