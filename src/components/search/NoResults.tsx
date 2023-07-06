import { useAnswersState } from "@yext/answers-headless-react";
import cx from "classnames";
import * as React from "react";

type Props = {
  //Insert Props Here
  className?: string;
};

const NoResults = ({ className }: Props) => {
  const isLoading = useAnswersState((s) => s.searchStatus.isLoading);
  const vertical = useAnswersState((s) => s.vertical);
  const universal = useAnswersState((s) => s.universal);

  if (
    vertical.verticalKey &&
    ((vertical.resultsCount && vertical.resultsCount > 0) || isLoading)
  ) {
    return null;
  } else if (
    (universal.verticals && universal.verticals.length > 0) ||
    isLoading
  ) {
    return null;
  } else if (!vertical) {
    return null;
  } else if (!vertical.results) {
    return null;
  }

  return (
    <div className={cx(className)}>
      No results were round. Try another search.
    </div>
  );
};

export default NoResults;
