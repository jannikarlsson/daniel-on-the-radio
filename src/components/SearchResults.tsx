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
        <div className="error" role="alert">{texts.search.errorTitle}</div>
      )}
      {isLoading ? (
        <Loader />
      ) : songs.length > 0 ? (
        <SongList songs={songs} />
      ) : (
        <div className="empty" role="status">{texts.search.empty}</div>
      )}
    </>
  );
}

export default SearchResults;
