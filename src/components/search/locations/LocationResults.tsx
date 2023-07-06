import { useAnswersState } from "@yext/answers-headless-react";
import { FilterSearch } from "@yext/answers-react-components";
import * as React from "react";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  onHover: (result: any) => void;
  onClick: (result: any) => void;
}

function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
}

const LocationResults = () => {
  const vertical = useAnswersState((s) => s.vertical);
  const location = useAnswersState((s) => s.location);
  const locationFilters = useAnswersState((s) =>
    s.filters.static?.filter((f) => f.fieldId === "builtin.location")
  );

  const nearText =
    locationFilters && locationFilters?.length > 0
      ? locationFilters[locationFilters.length - 1].displayName
      : location.locationBias?.displayName;

  return (
    <div className="bg-white rounded-lg shadow-xl border absolute inset-0 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-xl font-bold">Find a Location</h3>
      </div>
      <div className="p-4 border-b">
        <FilterSearch
          label="Enter a location"
          searchOnSelect={true}
          placeholder="e.g. New York, NY or 10032"
          searchFields={[
            {
              entityType: "healthcareFacility",
              fieldApiName: "builtin.location",
            },
          ]}
        />
      </div>
      {vertical && vertical.results && vertical.results.length > 0 && (
        <>
          <div className="px-4 py-2 border-b text-sm text-gray-700 bg-gray-100">
            Showing {vertical.results.length} of {vertical.resultsCount} near{" "}
            {nearText}
          </div>
          <div className="flex-grow overflow-y-auto">
            {vertical.results?.map((r) => {
              const location = r.rawData as any;
              const { address, mainPhone, slug } = location;
              return (
                <div className="p-4 border-b hover:bg-blue-100" key={r.id}>
                  <div className="text-lg mb-1 font-medium">{r.name}</div>
                  <a className="mb-1 block" href={`tel:${mainPhone}`}>
                    {formatPhoneNumber(mainPhone)}
                  </a>
                  <div>{address.line1}</div>
                  <div>{address.line2}</div>
                  <div>
                    {address.city}, {address.region}, {address.postalCode}
                  </div>
                  <a href={slug} className="flex gap-2 items-center mt-4">
                    View Details
                    <FaChevronRight />
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationResults;
