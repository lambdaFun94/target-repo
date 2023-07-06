import { Image } from "../components/Img";

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

export type Taxonomy_Condition = {
  id: string;
  name: string;
  slug: string;
  taxonomy_synonyms: string[];
  c_relatedSpecialties?: Taxonomy_Specialty[];
};

export type Taxonomy_ReasonForVisit = {
  id: string;
  name: string;
  slug: string;
  taxonomy_synonyms: string[];
  taxonomy_relatedSpecialties?: (
    | Taxonomy_Subspecialty
    | Taxonomy_Subspecialty
  )[];
};

export type Taxonomy_Specialty = {
  id: string;
  name: string;
  slug: string;
  taxonomy_relatedConditions: Taxonomy_Condition[];
  c_relatedProcedures2: Taxonomy_Procedure[];
  taxonomy_subspecialties: Taxonomy_Subspecialty[];
  taxonomy_synonyms: string[];
  taxonomy_relatedReasonsForVisit: Taxonomy_ReasonForVisit[];
  c_providersWithSpecialty?: (HealthcareProfessional &
    HealthcareProfessionalCustomFields)[];
};

export type Taxonomy_Subspecialty = {
  id: string;
  name: string;
  slug: string;
  c_specialties: Taxonomy_Specialty[];
  taxonomy_relatedConditions: Taxonomy_Condition[];
  c_relatedProcedures2: Taxonomy_Procedure[];
  taxonomy_subspecialties: Taxonomy_Specialty[];
  taxonomy_synonyms: string[];
  taxonomy_relatedReasonsForVisit: Taxonomy_ReasonForVisit[];
};

export type Taxonomy_Procedure = {
  id: string;
  name: string;
  slug: string;
  description: string;
  c_relatedSpecialties2: (Taxonomy_Specialty | Taxonomy_Subspecialty)[];
};

export type HealthcareProfessional = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  middleName: string;
  officeName: string;
  npi: string;
  address: Address;
  mainPhone: any;
  gender: any;
  insuranceAccepted?: any;
  admittingHospitals?: any;
  slug: string;
  headshot?: Image;
};

export type HealthcareProfessionalCustomFields = {
  c_specialty?: Taxonomy_Specialty[];
  c_locationsPracticingAt?: HealthcareFacility[];
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type HealthcareFacility = {
  id: string;
  name: string;
  npi: string;
  address: Address;
  mainPhone: any;
  gender: any;
  insuranceAccepted?: any;
  admittingHospitals?: any;
  slug: string;
  headshot?: Image;
  geocodedCoordinate?: Coordinate;
  c_doctorsPracticingHere?: HealthcareProfessional[];
};

export type Site = {
  c_featuredSpecialties: Taxonomy_Specialty[];
  c_featuredProcedures: Taxonomy_Procedure[];
};
