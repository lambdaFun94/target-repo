import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import GridSection from "../components/GridSection";
import PageLayout from "../components/PageLayout";
import "../index.css";
import { Taxonomy_ReasonForVisit } from "../types/kg";
import { defaultHeadConfig } from "../utilities";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "visit-reason-fad-234",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "meta",
      "id",
      "uid",
      "slug",
      "taxonomy_synonyms",
      "taxonomy_relatedSpecialties.id",
      "taxonomy_relatedSpecialties.slug",
      "taxonomy_relatedSpecialties.name",
    ],
    filter: {
      entityTypes: ["taxonomy_reasonForVisit"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const visitReason = document as Taxonomy_ReasonForVisit;
  return visitReason.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const visitReason = document as Taxonomy_ReasonForVisit;
  return {
    ...defaultHeadConfig,
    title: visitReason.name,
  };
};

const VisitReasonPage: Template<TemplateRenderProps> = ({ document }) => {
  const visitReason = document as Taxonomy_ReasonForVisit;

  const subtitle =
    visitReason.taxonomy_synonyms?.length > 0
      ? `aka ${visitReason.taxonomy_synonyms?.join(", ")}`
      : undefined;

  return (
    <PageLayout title={visitReason.name} subtitle={subtitle}>
      <GridSection
        title="Related Specialties"
        items={visitReason.taxonomy_relatedSpecialties}
      />
    </PageLayout>
  );
};

export default VisitReasonPage;
