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
import { Taxonomy_Condition } from "../types/kg";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "conditions-fad-234",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "meta",
      "id",
      "uid",
      "slug",
      "taxonomy_synonyms",
      "c_relatedSpecialties.id",
      "c_relatedSpecialties.name",
      "c_relatedSpecialties.slug",
    ],
    filter: {
      entityTypes: ["taxonomy_conditionTreated"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const condition = document as Taxonomy_Condition;
  return condition.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const condition = document as Taxonomy_Condition;
  return {
    title: condition.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const ConditionsPage: Template<TemplateRenderProps> = ({ document }) => {
  const condition = document as Taxonomy_Condition;
  const subtitle =
    condition.taxonomy_synonyms?.length > 0
      ? `aka ${condition.taxonomy_synonyms?.join(", ")}`
      : undefined;

  return (
    <PageLayout title={condition.name} subtitle={subtitle}>
      <GridSection
        title="Related Specialties"
        items={condition.c_relatedSpecialties}
      />
    </PageLayout>
  );
};

export default ConditionsPage;
