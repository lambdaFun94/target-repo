import {
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import { useEffect } from "react";

export const useLoadStateFromURL = () => {
  const searchActions = useAnswersActions();
  const verticalKey = useAnswersState((s) => s.vertical.verticalKey);

  const loadSearchParamsFromUrl = () => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    const { query, filters } = params;

    if (filters && filters.length > 0) {
      searchActions.setStaticFilters(JSON.parse(filters));
    }

    if (query) {
      searchActions.setQuery(query);

      if (verticalKey) {
        searchActions.executeVerticalQuery();
      } else {
        searchActions.executeUniversalQuery();
      }
    } else {
      if (verticalKey) {
        searchActions.executeVerticalQuery();
      }
    }
  };

  useEffect(() => {
    if (window) {
      loadSearchParamsFromUrl();
      window.onpopstate = (e) => {
        loadSearchParamsFromUrl();
      };
    }
  }, [verticalKey]);

  return;
};
