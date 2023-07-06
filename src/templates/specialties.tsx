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
import { Taxonomy_Specialty } from "../types/kg";
import { sortProps } from "../utilities";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "specialty-fad-234",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "meta",
      "id",
      "uid",
      "slug",
      "taxonomy_synonyms",
      "taxonomy_relatedConditions.id",
      "taxonomy_relatedConditions.name",
      "taxonomy_relatedConditions.slug",
      "taxonomy_subspecialties.id",
      "taxonomy_subspecialties.name",
      "taxonomy_subspecialties.slug",
      "taxonomy_relatedReasonsForVisit.id",
      "taxonomy_relatedReasonsForVisit.name",
      "taxonomy_relatedReasonsForVisit.slug",
      "c_relatedProcedures2.id",
      "c_relatedProcedures2.name",
      "c_relatedProcedures2.slug",
      "c_providersWithSpecialty.id",
      "c_providersWithSpecialty.name",
      "c_providersWithSpecialty.slug",
      "c_providersWithSpecialty.headshot",
      "c_providersWithSpecialty.c_specialty.name",
    ],
    filter: {
      entityTypes: ["taxonomy_specialty"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const specialty = document as Taxonomy_Specialty;
  return `${specialty.slug}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const specialty = document as Taxonomy_Specialty;
  return {
    title: specialty.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

export const transformProps: TransformProps<TemplateProps> = async (input) => {
  var specialty = input.document as Taxonomy_Specialty;

  input.document = sortProps(specialty, [
    "c_providersWithSpecialty",
    "taxonomy_relatedConditions",
    "taxonomy_relatedReasonsForVisit",
    "taxonomy_subspecialties",
    "c_relatedProcedures2",
  ]);

  return input;
};
const SpecialtyPage: Template<TemplateRenderProps> = ({ document }) => {
  const specialty = document as Taxonomy_Specialty;

  const subtitle =
    specialty.taxonomy_synonyms?.length > 0
      ? `aka ${specialty.taxonomy_synonyms?.join(", ")}`
      : undefined;

  return (
    <PageLayout title={specialty.name} subtitle={subtitle}>
      <GridSection
        title="Related Conditions"
        items={specialty.taxonomy_relatedConditions}
      />
      <GridSection
        title={`Providers Who Specialize in ${specialty.name}`}
        items={specialty.c_providersWithSpecialty?.map((d) => ({
          ...d,
          image: d.headshot,
          subtitle: d.c_specialty?.map((s) => s.name)?.join(", "),
        }))}
      />
      <GridSection
        title="Subspecialties"
        items={specialty.taxonomy_subspecialties}
      />
      <GridSection
        title="Related Procedures"
        items={specialty.c_relatedProcedures2}
      />
      <GridSection
        title="Reasons for Visit"
        items={specialty.taxonomy_relatedReasonsForVisit}
      />
    </PageLayout>
  );
};

export default SpecialtyPage;
