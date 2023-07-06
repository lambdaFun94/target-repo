import { AnswersHeadlessProvider } from "@yext/answers-headless-react";
import { SearchBar } from "@yext/answers-react-components";
import * as React from "react";

import { FaBars, FaFileMedical, FaHandHoldingMedical } from "react-icons/fa";
//@ts-ignore
import searchConfig from "../search.config";
import Button from "./Button";

const Header = () => {
  return (
    <>
      <div className="relative bg-blue-700">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-white">
              <span className="">
                COVID-19: Testing, Visitor Details & Vaccines.
              </span>
              <span className="block sm:ml-2 sm:inline-block">
                <a href="#" className="text-white font-bold underline">
                  {" "}
                  View Details <span aria-hidden="true">&rarr;</span>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white border-b px-4 py-2 flex justify-between items-center lg:hidden text-white">
        <a href="/" className="flex justify-start items-center text-white/80">
          <FaFileMedical />
        </a>
        <FaBars className="opacity-50" />
      </div>
      <div className="bg-white  border-b hidden lg:block shadow-md">
        <div className="centered-container flex justify-between items-center py-2 gap-4">
          <div className="flex items-center justify-center text-lg font-medium  text-white ">
            <a
              href="/"
              className="flex justify-start items-center mr-4 text-blue/80 text-4xl"
            >
              <FaHandHoldingMedical />
            </a>
            <a
              href="/doctors"
              className="px-4 hover:bg-gray-300/50 rounded-full py-1 text-blue-900 transition-all"
            >
              Doctors
            </a>
            <a
              href="/locations"
              className="px-4 hover:bg-gray-300/50 rounded-full py-1 text-blue-900 transition-all"
            >
              Locations
            </a>
            <a
              href="/specialties"
              className="px-4 hover:bg-gray-300/50 rounded-full py-1 text-blue-900 transition-all"
            >
              Specialties
            </a>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button>Log In</Button>
            <AnswersHeadlessProvider {...searchConfig} headlessId="header">
              <SearchBar
                placeholder="Search for anything..."
                customCssClasses={{
                  container: "mb-0",
                }}
                hideVerticalLinks
                onSearch={({ query, verticalKey }) => {
                  window.location.href = `/search?query=${query}`;
                }}
              />
            </AnswersHeadlessProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
