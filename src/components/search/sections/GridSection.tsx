import { SectionProps } from "@yext/answers-react-components";
import * as React from "react";

const GridSection = ({
  results,
  verticalKey,
  CardComponent,
  header,
  viewMore,
}: SectionProps) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }
  return (
    <div>
      <div>{header}</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1">
        {results.map((r) => (
          <CardComponent result={r} />
        ))}
      </div>
    </div>
  );
};

export default GridSection;
