import * as React from "react";
import "../.././styles/Directory.css"
import GridSection from "../GridSection";


export const directoryListFields = [
    "dm_directoryParents.slug",
    "dm_directoryParents.name",
    "dm_directoryChildrenCount",
    "dm_directoryChildren.slug",
    "dm_directoryChildren.name",
    "dm_directoryChildren.c_addressRegionDisplayName",
    "dm_directoryChildren.dm_directoryChildrenCount",
]

interface DirectoryListProps {
    name: string;
    count: number;
    directoryChildren: DirectoryChild[]
    relativePrefixToRoot: string;
    isRoot: boolean;
}

export interface DirectoryChild {
    slug: string;
    name: string,
    dm_directoryChildren: number[]
}

const sortByName = (x: DirectoryChild, y: DirectoryChild) => {
    if (x.name < y.name) { return -1; }
    if (x.name > y.name) { return 1; }
    return 0;
}

export function DirectoryList(props: DirectoryListProps) {
    const { directoryChildren, isRoot } = props;
    const sortedChildren = directoryChildren != undefined ? directoryChildren.sort(sortByName) : undefined;

    return (
        <div className="container my-10">
            <GridSection title={"Locations"} items={sortedChildren} isRoot={isRoot}>
            </GridSection>
        </div>
    )
}