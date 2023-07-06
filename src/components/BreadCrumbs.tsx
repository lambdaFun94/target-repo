import cx from "classnames";
import * as React from "react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  //Insert Props Here
  className?: string;
  items: BreadcrumbItem[];
  pageTitle: string;
};

const BreadCrumbs = ({ className, items, pageTitle }: Props) => {
  return (
    <div className={cx(className, "my-4")}>
      <div className="flex">
        {items.map((i) => (
          <div className="flex" key={i.label}>
            <a href={i.href} className="">
              {i.label}
            </a>
            <div className="px-2">/</div>
          </div>
        ))}
        <div>{pageTitle}</div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
