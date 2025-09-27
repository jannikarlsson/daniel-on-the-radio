import DateInput from "./components/DateInput";
import SongList from "./components/SongList";
import { SongProvider, useSongs } from "./contexts/SongContext";
import Loader from "./components/Loader";
import HistorySection from "./components/HistorySection";

function AppContent() {
  const { isLoading, error } = useSongs();

  return (
    <div className="has-background-success-dark">
      <div className="is-size-6 has-text-centered has-text-success-dark p-4 has-background-success-light">
        Har Daniel Hansson varit på radio nu igen?
      </div>
      <div className="container is-fluid">
        <DateInput />
        {error && (
          <div className="notification is-danger is-light mt-4">
            <div className="has-text-weight-bold">Error</div>
            <div>{error}</div>
          </div>
        )}
        {isLoading ? (
          <div className="mt-4">
            <Loader />
          </div>
        ) : (
          <>
            <SongList />
            <HistorySection />
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <SongProvider>
      <AppContent />
    </SongProvider>
  );
}

export default App;
