import React from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  NavermapsProvider,
} from "react-naver-maps";
import { Routes, Route } from "react-router-dom";
import NavermapPage from "./NavermapPage";

export default function RoutesSetup() {
  const REACT_APP_NAVER_MAPS_API_KEY = process.env
    .REACT_APP_NAVER_MAPS_API_KEY as string;

  if (!REACT_APP_NAVER_MAPS_API_KEY) {
    return <div>API Key is missing</div>;
  }

  return (
    <NavermapsProvider ncpClientId={REACT_APP_NAVER_MAPS_API_KEY}>
      {/* 랜딩페이지 맵 추가 코드 */}
      {/* <MapDiv style={{ height: 400 }}>
        <NaverMap>
          <Marker defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }} />
        </NaverMap>
      </MapDiv> */}

      <Routes>
        <Route index element={<NavermapPage />} />
      </Routes>
    </NavermapsProvider>
  );
}
