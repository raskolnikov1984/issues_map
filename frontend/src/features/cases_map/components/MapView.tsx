import { useEffect } from "react";
import {
  AttributionControl,
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { divIcon } from "leaflet";
import type { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CaseSummary } from "../services/casesApi";

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  cases: CaseSummary[];
  selectedId: string | null;
  draftLocation: GeoPoint | null;
  onSelectCase: (id: string) => void;
  onPickLocation: (point: GeoPoint) => void;
}

const MEDELLIN_CENTER: [number, number] = [6.2442018, -75.6224112];

function pinIcon({ active }: { active: boolean }): DivIcon {
  const width = active ? 64 : 52;
  const height = active ? 84 : 68;

  return divIcon({
    className: active ? "case-pin case-pin--active" : "case-pin",
    html: `<svg width="${width}" height="${height}" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1C6.37 1 1 6.37 1 13c0 8.16 10.53 18.31 11.44 19.17a.8.8 0 0 0 1.12 0C14.47 31.31 25 21.16 25 13 25 6.37 19.63 1 13 1z"
        fill="${active ? "#EF4444" : "#1EC8C8"}"
        stroke="${active ? "#DC2626" : "#FFFFFF"}"
        stroke-width="2" />
      <circle cx="13" cy="13" r="4.5" fill="#FFFFFF" />
    </svg>`,
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
  });
}

function MapClickWatcher({
  onPickLocation,
}: Pick<MapViewProps, "onPickLocation">) {
  useMapEvents({
    click(event) {
      onPickLocation({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

function FlyToSelected({ point }: { point: GeoPoint | null }) {
  const map = useMap();

  useEffect(() => {
    if (!point) return;

    map.flyTo([point.latitude, point.longitude], Math.max(map.getZoom(), 14), {
      duration: 0.8,
    });
  }, [map, point]);

  return null;
}

export function MapView({
  cases,
  selectedId,
  draftLocation,
  onSelectCase,
  onPickLocation,
}: MapViewProps) {
  const selectedCase = cases.find((item) => item.id === selectedId) ?? null;

  return (
    <MapContainer
      center={MEDELLIN_CENTER}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <AttributionControl position="bottomleft" />

      <MapClickWatcher onPickLocation={onPickLocation} />
      <FlyToSelected
        point={
          selectedCase && {
            latitude: selectedCase.latitude,
            longitude: selectedCase.longitude,
          }
        }
      />

      {cases.map((item) => {
        const active = item.id === selectedId;

        return (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
            icon={pinIcon({ active })}
            bubblingMouseEvents={false}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ click: () => onSelectCase(item.id) }}
          />
        );
      })}

      {draftLocation && (
        <CircleMarker
          center={[draftLocation.latitude, draftLocation.longitude]}
          radius={8}
          pathOptions={{
            color: "#F5A623",
            weight: 2,
            dashArray: "4 3",
            fillColor: "#FFFFFF",
            fillOpacity: 0.4,
          }}
        />
      )}
    </MapContainer>
  );
}
