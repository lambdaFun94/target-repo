import { UniversalResults } from "@yext/answers-react-components";
import * as React from "react";
import DoctorTile from "./cards/DoctorTile";
import GenericCard from "./cards/GenericCard";
import SearchBar from "./SearchBar";
import SearchExperience from "./SearchExperience";
import GridSection from "./sections/GridSection";

type Props = {
  //Insert Props Here
  className?: string;
};

const defaultVerticalConfig = {
  CardComponent: GenericCard,
  SectionComponent: GridSection,
};

const UniversalSearchResults = ({ className }: Props) => {
  return (
    <SearchExperience>
      <SearchBar
        onSearch={({ query }) => {
          document.title = `Search | ${query}`;
        }}
      />
      <UniversalResults
        verticalConfigMap={{
          doctors: {
            ...defaultVerticalConfig,
            viewAllButton: true,
            getViewAllUrl: ({ query }) => `/doctors?query=${query}`,
            label: "Doctors",
            CardComponent: DoctorTile,
          },
          procedures: {
            ...defaultVerticalConfig,
            label: "Procedures",
          },
          healthcare_facilities: {
            ...defaultVerticalConfig,
            label: "Locations",
            viewAllButton: true,
            getViewAllUrl: ({ query }) => `/locations?query=${query}`,
          },
          reasons_for_visit: {
            ...defaultVerticalConfig,
            label: "Reasons for Visit",
          },
          conditions_treated: {
            ...defaultVerticalConfig,
            label: "Conditions Treated",
          },
          specialties: {
            ...defaultVerticalConfig,
            label: "Specialties",
            viewAllButton: true,
            getViewAllUrl: ({ query }) => `/specialties?query=${query}`,
          },
          subspecialties: {
            ...defaultVerticalConfig,
            label: "Sub-Specialties",
          },
        }}
      />
    </SearchExperience>
  );
};

export default UniversalSearchResults;
