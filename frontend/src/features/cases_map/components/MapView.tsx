import { useEffect } from 'react';
import {
  AttributionControl,
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { CaseSummary } from '../services/casesApi';

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

const MADRID_CENTER: [number, number] = [40.4168, -3.7038];

function MapClickWatcher({
  onPickLocation,
}: Pick<MapViewProps, 'onPickLocation'>) {
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
      center={MADRID_CENTER}
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
          <CircleMarker
            key={item.id}
            center={[item.latitude, item.longitude]}
            radius={active ? 10 : 7}
            bubblingMouseEvents={false}
            pathOptions={{
              color: active ? '#F5A623' : '#0B1F2D',
              weight: active ? 3 : 2,
              fillColor: active ? '#F5A623' : '#1EC8C8',
              fillOpacity: 0.85,
            }}
            eventHandlers={{ click: () => onSelectCase(item.id) }}
          />
        );
      })}

      {draftLocation && (
        <CircleMarker
          center={[draftLocation.latitude, draftLocation.longitude]}
          radius={8}
          pathOptions={{
            color: '#F5A623',
            weight: 2,
            dashArray: '4 3',
            fillColor: '#FFFFFF',
            fillOpacity: 0.4,
          }}
        />
      )}
    </MapContainer>
  );
}
