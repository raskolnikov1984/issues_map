import { MAP_PIN_PATH } from "./mapPinSvg";

interface MapPinProps {
  className?: string;
  color?: string;
  strokeColor?: string;
}

export function MapPin({
  className,
  color = "var(--color-active-pin)",
  strokeColor = "#FFFFFF",
}: MapPinProps) {
  return (
    <svg
      viewBox="0 0 26 34"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={MAP_PIN_PATH}
        fill={color}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <circle cx="13" cy="13" r="4.5" fill="#FFFFFF" className="map-pin-core" />
    </svg>
  );
}
