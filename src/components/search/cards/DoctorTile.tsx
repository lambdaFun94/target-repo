import {
  CardProps,
  renderHighlightedValue,
} from "@yext/answers-react-components";
import * as React from "react";
import Img, { Image } from "../../Img";

const DoctorTile = ({ result }: CardProps) => {
  const title = (result.highlightedFields?.name ?? result.name) as string;
  const npi = result.rawData.npi as string;
  const headshot = result.rawData.headshot as Image;
  return (
    <a
      className="border rounded-md flex flex-col overflow-hidden hover:shadow"
      href={result.rawData.slug as string}
    >
      {headshot && (
        <div className="">
          <Img
            image={headshot}
            className=""
            aspectRatio={1}
            layout="full-width"
          />
        </div>
      )}
      <div className="p-4">
        {title && <div>{renderHighlightedValue(title)}</div>}
        {npi && <div className="text-gray-500 text-sm">NPI: {npi}</div>}
        {/* <pre>{JSON.stringify(result.rawData, null, 2)}</pre> */}
      </div>
    </a>
  );
};

export default DoctorTile;
