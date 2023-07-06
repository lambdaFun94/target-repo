//@ts-ignore
import { useAnswersState } from "@yext/answers-headless-react";
import * as mapboxgl from "mapbox-gl";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import { calculateBoundingArea } from "../../utilities";
import MapPin from "./MapPin";

const mapboxAccessToken =
  "pk.eyJ1IjoibWRhdmlzaCIsImEiOiJja3pkNzZ4cDYydmF6MnZtemZrNXJxYmtvIn0.9CYfaiw9PB90VlQEqt3dRQ";

// if (!mapboxgl.accessToken) {
//   //@ts-ignore
//   mapboxgl.accessToken = mapboxAccessToken;
// }

const ResultsMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const results = useAnswersState((a) => a.vertical.results);

  // const mapContainer = useRef<HTMLDivElement | null>(null);
  // const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current || !results) {
      return;
    } else {
      const boundingArea = calculateBoundingArea(results);
      map.current = new mapboxgl.Map({
        container: mapContainer.current || "",
        style: "mapbox://styles/mapbox/streets-v11",
        interactive: true,
        center: [boundingArea.centerLat, boundingArea.centerLng],
        zoom: 9,
        scrollZoom: false,
        accessToken: mapboxAccessToken,
      });

      map.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [results]);

  useEffect(() => {
    if (results && map.current !== undefined && map !== undefined) {
      results?.forEach((r: any, i) => {
        const { latitude, longitude } = r.rawData.geocodedCoordinate ?? {};
        if (latitude && longitude) {
          const coord = { lat: latitude, lon: longitude };
          const el = document.createElement("div");

          ReactDOM.render(<MapPin result={r} />, el);
          el.className = "marker";

          new mapboxgl.Marker(el)
            .setLngLat(coord)
            // @ts-ignore: Object is possibly 'null'.
            .addTo(map.current);
        }
      });
      const boundingArea = calculateBoundingArea(results);
      // @ts-ignore: Object is possibly 'null'.
      map.current.fitBounds(boundingArea.llb);
    }
  }, [results]);

  return (
    <div ref={mapContainer} className="absolute inset-0 bg-blue-200 h-screen" />
  );
};

export default ResultsMap;
