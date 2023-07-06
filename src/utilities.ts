//@ts-ignore
import mapboxgl from "mapbox-gl";
import { DirectoryChild } from "./components/Directory/DirectoryList";
import { Coordinate } from "./types/kg";

export const sortProps = (obj: any, keys: string[]) => {
  keys.forEach((key) => {
    obj[key] = obj[key]?.sort((a: any, b: any) => a.name.localeCompare(b.name));
  });
  return obj;
};

export const defaultHeadConfig = {
  title: "Healthcare Demo",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1",
};

export const setQueryParam = (name: string, value: any) => {
  var queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.set("query", value);
  // OR do a push to history
  history.pushState(null, "", "?" + queryParams.toString());
};

export const removeQueryParam = (name: string) => {
  var queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.delete(name);
  // OR do a push to history
  history.pushState(null, "", "?" + queryParams.toString());
};

export interface BoundingArea {
  west: number;
  east: number;
  south: number;
  north: number;
  sw: mapboxgl.LngLat;
  ne: mapboxgl.LngLat;
  llb: mapboxgl.LngLatBounds;
  centerLng: number;
  centerLat: number;
}

export const calculateBoundingArea = (results: any[]): BoundingArea => {
  const coords = results
    .map((r) => {
      return r.rawData.geocodedCoordinate;
    })
    .filter((c) => c);

  const lats = coords.map((c) => c.latitude);
  const lngs = coords.map((c) => c.longitude);
  const west = Math.min(...lats);
  const east = Math.max(...lats);
  const south = Math.min(...lngs);
  const north = Math.max(...lngs);

  const sw = new mapboxgl.LngLat(south, west);
  const ne = new mapboxgl.LngLat(north, east);
  const llb = new mapboxgl.LngLatBounds(sw, ne);

  const centerLng = west - (east - west) / 2;
  const centerLat = north - (north - south) / 2;

  return {
    west,
    east,
    south,
    north,
    sw,
    ne,
    llb,
    centerLng,
    centerLat,
  };
};

/*
 "https://maps.googleapis.com/maps/api/staticmap?center=" +
            `${latitude}` +
            "," +
            `${longitude}` +
            "&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C" +
            `${latitude}` +
            "," +
            `${longitude}` +
            "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
            */

export const staticMapUrl = (
  { latitude, longitude }: Coordinate,
  width = 300,
  height = 300,
  zoom = 13
) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:LL%7C${latitude},${longitude}&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18&scale=2`;
};

export const buildBreadCrumbs = (arr: DirectoryChild[], pathToParent: string) => (
  arr != undefined ? arr.map(child => ({ label: child.name, href: pathToParent + child.slug })) : []
)