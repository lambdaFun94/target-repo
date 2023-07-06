/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  AppliedFilters,
  ResultsCount,
  StandardFacets,
  VerticalResults,
} from "@yext/answers-react-components";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import GenericCard from "../components/search/cards/GenericCard";
import SearchBar from "../components/search/SearchBar";
import SearchExperience from "../components/search/SearchExperience";
import "../index.css";
import { defaultHeadConfig } from "../utilities";
export const getPath: GetPath<TemplateProps> = (data) => {
  return `specialties`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  data
): HeadConfig => {
  return {
    ...defaultHeadConfig,
    title: "Search Results",
  };
};

const SearchResultsPage: Template<TemplateRenderProps> = (data) => {
  const { document } = data;
  const { streamOutput } = document;

  return (
    <PageLayout title="Specialties" fullWidth>
      <SearchExperience verticalKey="specialties">
        <div className="flex">
          <div className="border-r mr-4 pr-4 w-full max-w-md">
            <SearchBar placeholder="Search for a specialty" />
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
            <VerticalResults CardComponent={GenericCard} />
          </div>
        </div>
      </SearchExperience>
    </PageLayout>
  );
};

export default SearchResultsPage;
