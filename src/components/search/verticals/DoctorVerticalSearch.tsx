import {
  AppliedFilters,
  CardComponent,
  ResultsCount,
  StandardFacets,
  VerticalResults,
} from "@yext/answers-react-components";
import * as React from "react";
import DoctorCard from "../cards/DoctorCard";
import NoResults from "../NoResults";
import SearchBar from "../SearchBar";
import SearchExperience from "../SearchExperience";

type Props = {
  //Insert Props Here
  className?: string;
};

const DoctorVerticalSearch = ({ className }: Props) => {
  return (
    <SearchExperience verticalKey="doctors">
      <div className="flex">
        <div className="border-r mr-4 pr-4 w-full max-w-md">
          <SearchBar />
          <StandardFacets
            searchable={true}
            collapsible={false}
            defaultExpanded={true}
            customCssClasses={{
              container: "w-full",
            }}
          />
        </div>
        <div className="w-full">
          <div className="flex gap-4">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            displayAllOnNoResults={false}
            CardComponent={DoctorCard as CardComponent}
          />
          <NoResults />
        </div>
      </div>
    </SearchExperience>
  );
};

export default DoctorVerticalSearch;
