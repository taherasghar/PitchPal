import maplibregl from "maplibre-gl";
import Map, { NavigationControl, Marker } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MapContainer({ coordinates }) {
  const [latitude, longitude] = coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  return (
    <>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 35.49548,
          latitude: 33.88863,
          zoom: 11,
        }}
        style={{ width: "100%", height: " calc(50vh)" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=f1BRioFLqSyQ2mpFGpLQ"
      >
        <NavigationControl position="top-left" />
        <div className="flex col gap">
          <Marker
            latitude={latitude}
            longitude={longitude}
            color="rgb(255, 174, 0)"
          />
          <Marker
            latitude={latitude}
            longitude={longitude}
            style={{ color: "black", fontSize: "18px" }}
          />
        </div>
      </Map>
    </>
  );
}

export default MapContainer;
