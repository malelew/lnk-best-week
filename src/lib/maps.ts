/** Map link targets: `geo:` on mobile, HTTPS search on desktop. */
export type LocationMap = {
  /** Address or place name sent to map apps */
  query: string;
  /** Optional coordinates for a sharper mobile `geo:` link */
  lat?: number;
  lng?: number;
};

export function locationMapUrls(map: LocationMap): {
  mobile: string;
  desktop: string;
} {
  const q = encodeURIComponent(map.query);
  const mobile =
    map.lat != null && map.lng != null
      ? `geo:${map.lat},${map.lng}?q=${q}`
      : `geo:0,0?q=${q}`;
  const desktop = `https://www.google.com/maps/search/?api=1&query=${q}`;
  return { mobile, desktop };
}
