import cx from "classnames";
import * as React from "react";
import "../index.css";
import BreadCrumbs, { BreadcrumbItem } from "./BreadCrumbs";
import Footer from "./Footer";
import Header from "./Header";
import Img, { Image } from "./Img";

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  image?: Image;
  fullWidth?: boolean;
  noPadding?: boolean;
  hideTitle?: boolean;
  breadcrumbs?: BreadcrumbItem[];
};

const PageLayout = ({
  title,
  children,
  subtitle,
  image,
  fullWidth,
  breadcrumbs,
  noPadding,
  hideTitle,
}: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div
        className={cx(" mx-auto flex-grow w-full", {
          "max-w-screen-lg": !fullWidth,
          "py-2 px-4": !noPadding,
        })}
      >
        {breadcrumbs && title && (
          <BreadCrumbs items={breadcrumbs} pageTitle={title} />
        )}
        <div className="flex gap-4">
          {image && (
            <Img
              image={image}
              width={200}
              layout="fixed"
              className="rounded-md drop-shadow-md mb-4"
            />
          )}
          <div>
            {!hideTitle && (
              <div className="text-4xl font-medium mb-4 mt-4">{title}</div>
            )}
            {subtitle && <div className="text-gray-700 mb-4">{subtitle}</div>}
          </div>
        </div>
        <div
          className={cx("flex flex-col gap-8 ", {
            "mt-2 mb-8": !noPadding,
          })}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
