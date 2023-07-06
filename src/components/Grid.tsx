import cx from "classnames";
import * as React from "react";

type Props = {
  //Insert Props Here
  children: React.ReactNode;
  className?: string;
};

const Grid = ({ className, children }: Props) => {
  return (
    <div className={cx("grid md:grid-cols-3 gap-4", className)}>{children}</div>
  );
};

export default Grid;
