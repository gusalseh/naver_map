import { useState, useEffect } from "react";
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
  useMap,
} from "react-naver-maps";
import { Store } from "../../data/stores";
import { getAllStores } from "../../services/storeService";

function InfoWindowWrapper({ store }: { store: Store | null }) {
  const navermaps = useNavermaps();
  const map = useMap();
  const [infoWindow, setInfoWindow] = useState<any | null>(null);

  useEffect(() => {
    if (navermaps && map) {
      const infoWindowInstance = new navermaps.InfoWindow({
        content: "",
        backgroundColor: "#fff",
        borderColor: "#E0E0E0",
        borderWidth: 1,
        anchorSize: new navermaps.Size(0, 0),
        anchorSkew: true,
        pixelOffset: new navermaps.Point(0, -10),
      });
      setInfoWindow(infoWindowInstance);
    }
  }, [navermaps, map]);

  useEffect(() => {
    if (infoWindow && store) {
      infoWindow.setContent(`
        <div style="width: 250px; padding: 20px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #333;">${
            store.name
          }</h3>
          <p style="margin: 0 0 10px 0; font-size: 13px; color: #666;">${
            store.description
          }</p>
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <a href="#" style="color: #2DB400; text-decoration: none;">상세보기</a>
            <a href="#" style="color: #2DB400; text-decoration: none;">부취픽 담기</a>
          </div>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #E0E0E0; font-size: 12px; color: #666;">
            <p style="margin: 0 0 5px 0;">주소: 서울특별시 강남구 테헤란로 ${Math.floor(
              Math.random() * 100
            )}길 ${Math.floor(Math.random() * 50)}</p>
            <p style="margin: 0;">전화: 02-${Math.floor(
              1000 + Math.random() * 9000
            )}-${Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
        </div>
      `);
      infoWindow.open(
        map,
        new navermaps.LatLng(store.position.lat, store.position.lng)
      );
    } else if (infoWindow) {
      infoWindow.close();
    }
  }, [infoWindow, store, navermaps, map]);

  return null;
}

function GeolocationMarker() {
  const navermaps = useNavermaps();
  const map = useMap();
  const [location, setLocation] = useState<any | null>(null);

  useEffect(() => {
    if (!map || !navermaps) return;

    const onSuccessGeolocation = (position: GeolocationPosition) => {
      const userLocation = new navermaps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      setLocation(userLocation);
      map.setCenter(userLocation);
      map.setZoom(15);
    };

    const onErrorGeolocation = () => {
      console.error("Geolocation failed or is not supported.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map, navermaps]);

  return (
    <>
      {location && (
        <Marker
          position={location}
          icon={{
            content: `<div style="width:10px;height:10px;background:#FF0000;border-radius:50%;"></div>`,
            anchor: new navermaps.Point(5, 5), // 마커의 중심점을 지정
          }}
        />
      )}
    </>
  );
}

export default function LandingPage() {
  const navermaps = useNavermaps();
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    setStores(getAllStores());
  }, []);

  const handleMarkerClick = (store: Store) => {
    setCurrentStore((prev) => (prev?.id === store.id ? null : store));
  };

  return (
    <MapDiv style={{ height: 800, width: 800 }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.494772, 127.036701)}
        defaultZoom={15}
      >
        {/* <Marker
          icon={{
            content: `<div style="width:10px;height:10px;background:#FF0000;border-radius:50%;"></div>`,
            anchor: new navermaps.Point(5, 5),
          }}
          defaultPosition={{ lat: 37.494772, lng: 127.036701 }}
        /> */}
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={store.position}
            onClick={() => handleMarkerClick(store)}
            clickable={true}
          />
        ))}
        <InfoWindowWrapper store={currentStore} />
        <GeolocationMarker />
      </NaverMap>
    </MapDiv>
  );
}
