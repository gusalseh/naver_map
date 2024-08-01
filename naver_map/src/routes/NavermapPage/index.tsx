import React, { useState, useRef, useEffect } from "react";
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  InfoWindow,
  Marker,
  LoadNavermapsScript,
} from "react-naver-maps";

interface Store {
  id: number;
  name: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function LandingPage() {
  const navermaps = useNavermaps();
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

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

  const handleMarkerClick = (store: Store) => {
    setCurrentStore(store);
    setInfoWindowVisible(true);
  };

  useEffect(() => {
    console.log("InfoWindow visible:", infoWindowVisible);
    console.log("Current store:", currentStore);
  }, [infoWindowVisible, currentStore]);

  return (
    // <MapDiv style={{ height: 400 }}>
    <MapDiv style={{ width: "100%", height: "100vh" }}>
      <NaverMap defaultCenter={new navermaps.LatLng(37.494772, 127.036701)}>
        <Marker defaultPosition={{ lat: 37.494772, lng: 127.036701 }} />
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={store.position}
            onClick={() => handleMarkerClick(store)}
            clickable={true}
          />
        ))}

        {/* {infoWindowVisible && currentStore && (
          <InfoWindow
            position={currentStore.position}
            content={`<div>
                <h4>{currentStore.name}</h4>
                <p>{currentStore.description}</p>
              </div>`}
            onClick={() => setInfoWindowVisible(false)}
          />
        )} */}

        {infoWindowVisible && currentStore && (
          <InfoWindow
            position={currentStore.position}
            content={`
      <div style="padding: 10px;">
        <h4 style="margin: 0 0 5px 0;">${currentStore.name}</h4>
        <p style="margin: 0;">${currentStore.description}</p>
      </div>
    `}
            onClick={() => setInfoWindowVisible(false)}
          />
        )}
      </NaverMap>
    </MapDiv>
  );
}
