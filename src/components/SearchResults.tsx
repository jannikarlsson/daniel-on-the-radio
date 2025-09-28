import SongList from "./SongList";
import Loader from "./Loader";
import DateInput from "./DateInput";
import { ISongWithDetails } from "../models/interfaces";
import texts from "../config/texts";

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  songs: ISongWithDetails[];
}

function SearchResults({ isLoading, error, songs }: SearchResultsProps) {
  return (
    <>
      <DateInput />
      {error && (
        <div className="notification is-danger is-light mt-4">
          <div className="has-text-weight-bold">{texts.search.errorTitle}</div>
        </div>
      )}
      {isLoading ? (
        <div className="mt-4">
          <Loader />
        </div>
      ) : songs.length > 0 ? (
        <SongList songs={songs} />
      ) : (
  <div className="has-text-warning-light has-text-centered mt-4">{texts.search.empty}</div>
      )}
    </>
  );
}

export default SearchResults;
