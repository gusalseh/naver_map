export interface Store {
  id: number;
  name: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
}

const stores: Store[] = [
  {
    id: 1,
    name: "다돈식당 역삼점",
    description: "돈까스 및 삼겹살",
    position: { lat: 37.494605, lng: 127.03741 },
  },
  {
    id: 2,
    name: "라멘 풍림화산",
    description: "라멘 및 일식",
    position: { lat: 37.494524, lng: 127.037147 },
  },
  {
    id: 3,
    name: "복숭아꽃 살구꽃",
    description: "한식포차 한잔?",
    position: { lat: 37.494568, lng: 127.037292 },
  },
];

export default stores;
