declare interface Good {
  caption: string;
  url: string;
  price: number;
  salesPrice: number;
  imgSrc: string;
}

declare interface Share {
  goods: Good[];
  dates: [number, number];
}
