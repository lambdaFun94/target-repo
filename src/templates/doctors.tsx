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
import { FaDirections, FaPhone } from "react-icons/fa";
import Button from "../components/Button";
import GridSection from "../components/GridSection";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import StaticMap from "../components/StaticMap";
import "../index.css";
import {
  HealthcareProfessional,
  HealthcareProfessionalCustomFields,
} from "../types/kg";

export const config: TemplateConfig = {
  stream: {
    $id: "pros-doctors-stream-234",
    fields: [
      "name",
      "meta",
      "id",
      "uid",
      "address",
      "firstName",
      "lastName",
      "middleName",
      "npi",
      // "mainPhone",
      "c_specialty.id",
      "c_specialty.name",
      "c_specialty.slug",
      "insuranceAccepted",
      "admittingHospitals",
      "c_locationsPracticingAt.id",
      "c_locationsPracticingAt.name",
      "c_locationsPracticingAt.slug",
      "c_locationsPracticingAt.address",
      "c_locationsPracticingAt.geocodedCoordinate",
      "headshot",
      "slug",
    ],
    filter: {
      entityTypes: ["ce_doctor"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const doctor = document as HealthcareProfessional &
    HealthcareProfessionalCustomFields;
  return `${doctor.slug}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const doctor = document as HealthcareProfessional &
    HealthcareProfessionalCustomFields;
  return {
    title: doctor.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const DoctorPage: Template<TemplateRenderProps> = ({ document }) => {
  const doctor = document as HealthcareProfessional &
    HealthcareProfessionalCustomFields;

  return (
    <PageLayout
      title={doctor.name}
      subtitle={`NPI: ${doctor.npi}`}
      image={doctor.headshot}
      breadcrumbs={[{ label: "All Doctors", href: "/doctors" }]}
    >
      <GridSection title="Specialties" items={doctor.c_specialty} />
      {doctor.c_locationsPracticingAt && (
        <Section title="Practicing At" className="flex flex-col gap-4">
          {doctor.c_locationsPracticingAt.map((l) => (
            <div id={l.id} className="flex gap-4 flex-col md:flex-row">
              <div>
                {l.geocodedCoordinate && (
                  <StaticMap
                    coordinates={l.geocodedCoordinate}
                    width={400}
                    height={200}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-bold">{l.name}</p>
                  <p>{l.address.line1}</p>
                  <p>{l.address.line2}</p>
                  <p>
                    {l.address.city}, {l.address.region}, {l.address.postalCode}
                  </p>
                </div>
                <Button secondary icon={<FaDirections />}>
                  Get Directions
                </Button>
                <Button secondary icon={<FaPhone />}>
                  Call Now
                </Button>
              </div>
            </div>
          ))}
        </Section>
      )}
    </PageLayout>
  );
};

export default DoctorPage;
