import * as React from "react";
import { Coordinate } from "../types/kg";
import { staticMapUrl } from "../utilities";

type Props = {
  coordinates: Coordinate;
  width?: number;
  height?: number;
  className?: string;
};

const StaticMap = ({
  coordinates,
  width = 300,
  height = 300,
  className,
}: Props) => {
  return (
    <>
      <img
        className={className}
        width={width}
        height={height}
        src={staticMapUrl(coordinates, width, height)}
        alt="static map"
      />
    </>
  );
};

export default StaticMap;
