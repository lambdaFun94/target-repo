import {
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import {
  SearchBar as SB,
  SearchBarProps,
} from "@yext/answers-react-components";
import * as React from "react";
import { removeQueryParam, setQueryParam } from "../../utilities";

const SearchBar = (props: SearchBarProps) => {
  const searchActions = useAnswersActions();
  const verticalKey = useAnswersState((s) => s.vertical.verticalKey);

  return (
    <SB
      {...props}
      hideVerticalLinks={true}
      onSearch={(input) => {
        const { query } = input;
        if (query) {
          setQueryParam("query", query ?? "");
        } else {
          removeQueryParam("query");
        }

        if (verticalKey) {
          searchActions.setQuery(query ?? "");
          searchActions.executeVerticalQuery();
        } else {
          if (query) {
            searchActions.setQuery(query);
            searchActions.executeUniversalQuery();
          }
        }

        props.onSearch?.(input);
      }}
    />
  );
};

export default SearchBar;
