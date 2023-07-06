import { GetHeadConfig, TemplateRenderProps } from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import LocationResults from "../components/search/locations/LocationResults";
import ResultsMap from "../components/search/ResultsMap";
import SearchExperience from "../components/search/SearchExperience";
import { defaultHeadConfig } from "../utilities";
type Props = {
  //Insert Props Here
  className?: string;
};

export const getPath = () => {
  return `locations`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    ...defaultHeadConfig,
    title: "Find a Location",
  };
};

const LocationSearch = ({ className }: Props) => {
  return (
    <SearchExperience verticalKey="healthcare_facilities">
      <PageLayout fullWidth noPadding title="Location Search" hideTitle>
        <div className="relative w-full h-screen">
          <ResultsMap />
          <div className="absolute w-full max-w-md inset-8">
            <LocationResults />
          </div>
        </div>
      </PageLayout>
    </SearchExperience>
  );
};

export default LocationSearch;
