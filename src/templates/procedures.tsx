import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import * as React from "react";
import GridSection from "../components/GridSection";
import PageLayout from "../components/PageLayout";
import "../index.css";
import { Taxonomy_Procedure } from "../types/kg";
import { sortProps } from "../utilities";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "procedures-fad-234",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "meta",
      "id",
      "uid",
      "slug",
      "taxonomy_synonyms",
      "description",
      "c_relatedSpecialties2.id",
      "c_relatedSpecialties2.slug",
      "c_relatedSpecialties2.name",
    ],

    filter: {
      entityTypes: ["taxonomy_procedure"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const procedure = document as Taxonomy_Procedure;
  return procedure.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const procedure = document as Taxonomy_Procedure;
  return {
    title: procedure.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

export const transformProps: TransformProps<TemplateProps> = async (input) => {
  const procedure = input.document as Taxonomy_Procedure;

  input.document = sortProps(procedure, [
    "c_providersWithSpecialty",
    "taxonomy_relatedConditions",
    "taxonomy_relatedReasonsForVisit",
    "taxonomy_subspecialties",
    "c_relatedProcedures2",
  ]);

  return input;
};

const ProcedurePage: Template<TemplateRenderProps> = ({ document }) => {
  const procedure = document as Taxonomy_Procedure;

  return (
    <PageLayout title={procedure.name} subtitle={procedure.description}>
      <GridSection
        title="Related Specialties"
        items={procedure.c_relatedSpecialties2}
      />
    </PageLayout>
  );
};

export default ProcedurePage;
