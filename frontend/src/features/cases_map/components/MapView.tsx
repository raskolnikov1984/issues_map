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
import { renderCasePinSvg } from "../../../components/common/mapPinSvg";
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
    html: renderCasePinSvg({ active, width, height }),
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
    <div className="relative h-full w-full">
      <MapContainer
        center={MEDELLIN_CENTER}
        zoom={13}
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

      {draftLocation && (
        <div className="absolute top-3 right-3 z-[1000] w-80 rounded-xl border border-accent/50 bg-white/95 p-3 shadow-lg backdrop-blur">
          <p className="text-xs font-medium text-neutral-700">
            <strong>Ubicación seleccionada:</strong>{" "}
            {draftLocation.latitude.toFixed(5)},{" "}
            {draftLocation.longitude.toFixed(5)}
          </p>
          <button
            type="button"
            disabled
            className="mt-2 w-full cursor-not-allowed rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary/60"
          >
            Crear caso aquí (próximamente)
          </button>
        </div>
      )}
    </div>
  );
}
