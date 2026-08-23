export const MAP_PIN_PATH =
  "M13 1C6.37 1 1 6.37 1 13c0 8.16 10.53 18.31 11.44 19.17a.8.8 0 0 0 1.12 0C14.47 31.31 25 21.16 25 13 25 6.37 19.63 1 13 1z";

interface CasePinSvgOptions {
  active?: boolean;
  width: number;
  height: number;
}

export function renderCasePinSvg({
  active = false,
  width,
  height,
}: CasePinSvgOptions): string {
  const fill = active ? "#EF4444" : "#1EC8C8";
  const stroke = active ? "#DC2626" : "#FFFFFF";

  return `<svg width="${width}" height="${height}" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg"><path d="${MAP_PIN_PATH}" fill="${fill}" stroke="${stroke}" stroke-width="2"/><circle cx="13" cy="13" r="4.5" fill="#FFFFFF"/></svg>`;
}
