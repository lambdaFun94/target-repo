import {
  AnswersHeadlessProvider,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { FilterSearch } from "@yext/answers-react-components";
import cx from "classnames";
import * as React from "react";
import { FaSearch } from "react-icons/fa";
import searchConfig from "../../search.config";
import Button from "../Button";

type Props = {
  //Insert Props Here
  className?: string;
  headline?: string;
};

const DoctorFinderSearchBar = ({
  className,
  headline = "Find a Provider",
}: Props) => {
  const filters = useAnswersState((s) => s.filters);
  const actions = useAnswersActions();
  return (
    <div className={cx(className)}>
      <div className=" py-4 px-8 lg:py-4 flex flex-col items-center">
        <h2 className="text-3xl  mt-2  font-bold">{headline}</h2>
        <div className="flex md:items-end flex-col md:flex-row gap-4 my-4 w-full mx-8">
          <div className="flex-grow">
            <FilterSearch
              label="Search for specialty, procedure or provider name"
              placeholder="e.g. Cardiology or Jim Shaw"
              sectioned={true}
              searchFields={[
                {
                  entityType: "ce_doctor",
                  fieldApiName: "c_specialty.name",
                },
                {
                  entityType: "ce_doctor",
                  fieldApiName: "name",
                },
                // {
                //   entityType: "healthcareProfessional",
                //   fieldApiName: "c_specialty.taxonomy_relatedConditions.name",
                // },
                // {
                //   entityType: "healthcareProfessional",
                //   fieldApiName:
                //     "c_specialty.taxonomy_relatedReasonsForVisit.name",
                // },
              ]}
            />
          </div>
          <div className="flex-grow">
            <FilterSearch
              label="Location"
              placeholder="e.g. New York, NY or 10032"
              searchFields={[
                {
                  entityType: "healthcareProfessional",
                  fieldApiName: "builtin.location",
                },
              ]}
            />
          </div>
          <Button
            onClick={() => {
              window.location.href = `/doctors?filters=${JSON.stringify(
                filters.static
              )}`;
            }}
          >
            <div>Find Doctors</div>
            <FaSearch />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ({ headline }: { headline: string }) => (
  <AnswersHeadlessProvider
    headlessId="doctor-finder"
    {...searchConfig}
    verticalKey="doctors"
  >
    <DoctorFinderSearchBar headline={headline} />
  </AnswersHeadlessProvider>
);
