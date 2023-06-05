import { useEffect, useState } from "react";
import { useGetSearchResultsMutation } from "../lib/api/blogApi";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { addBlogSearchResults } from "../lib/redux/slices/search";

const useBlogSearchHook = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [data, setData] = useState([]);
  const [searchApi] = useGetSearchResultsMutation();
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.search.blogResults);

  const fetchSearchResults = async () => {
    try {
      setIsError(false);
      setIsFetching(true);

      // check the results is already on fetched list and then fetch accourdingly
      const response = searchResults[query] && page == 1 ? searchResults[query] : await searchApi({ page, query }).unwrap();
      if (response?.docs?.length > 0 && page == 1) {
        dispatch(
          addBlogSearchResults({
            key: query,
            value: response,
          })
        );
      }

      //
      setData(response?.docs);
      setHasNextPage(response?.hasNextPage == true);
    } catch (error) {
      setIsError(true);
      setIsFetching(false);
      console.warn(error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchSearchResults();
      setIsLoading(false);
    })();
  }, [query, page]);

  return {
    page,
    query,
    data,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    setPage,
    setQuery,
  };
};

export default useBlogSearchHook;
