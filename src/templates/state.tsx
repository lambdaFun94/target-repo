import * as React from "react";
import {
    Template,
    TemplateProps,
    TemplateRenderProps,
    GetPath,
    TemplateConfig,
} from "@yext/pages";
import { DirectoryList, directoryListFields } from "../components/Directory/DirectoryList"
import PageLayout from "../components/PageLayout";
import { buildBreadCrumbs } from "../utilities";

export const config: TemplateConfig = {
    stream: {
        $id: "state-directory",
        fields: [
            "id",
            "uid",
            "meta",
            "name",
            "slug",
            "c_addressRegionDisplayName",
            ...directoryListFields
        ],
        filter: {
            entityTypes: ["ce_state"],
        },
        localization: {
            locales: ["en"],
            primary: false,
        },
    },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
    return document.slug;
};

const StateDirectory: Template<TemplateRenderProps> = ({ document, relativePrefixToRoot }) => {
    const { name, dm_directoryChildren, dm_directoryChildrenCount, dm_directoryParents, c_addressRegionDisplayName } = document;

    return (
        <PageLayout
            title={`Health Care Facilities in ${c_addressRegionDisplayName}`}
            breadcrumbs={
                [
                    { label: "All Locations", href: "/locations" },
                    ...buildBreadCrumbs(dm_directoryParents, relativePrefixToRoot)
                ]}>
            <div>
                <DirectoryList
                    name={name}
                    showNumLocs={true}
                    regionName={c_addressRegionDisplayName}
                    count={dm_directoryChildrenCount}
                    directoryChildren={dm_directoryChildren}
                    relativePrefixToRoot={relativePrefixToRoot}
                    isRoot={false}
                />
            </div>
        </PageLayout>
    );
};

export default StateDirectory;