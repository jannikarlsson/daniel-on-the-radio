import { useState } from "react";
import DateInput from "./components/DateInput";
import SongList from "./components/SongList";
import { SongProvider, useSongs } from "./contexts/SongContext";
import Loader from "./components/Loader";
import HistorySection from "./components/HistorySection";

type Tab = 'search' | 'history';

function AppContent() {
  const { isLoading, error } = useSongs();
  const [activeTab, setActiveTab] = useState<Tab>('search');

  return (
    <section className="hero has-background-warning-dark is-fullheight">
      <div className="hero-head">
        <div className="is-size-6 has-text-centered has-text-warning-dark p-4 has-background-warning-light">
          Har Daniel Hansson varit på radio nu igen?
        </div>
      </div>
      <div className="hero-body is-align-items-flex-start">
        <div className="container is-fluid">
          <div className="buttons has-addons is-centered">
            <button 
              className={`button ${activeTab === 'search' ? 'is-warning' : 'is-warning is-light'}`}
              onClick={() => setActiveTab('search')}
            >
              Sök
            </button>
            <button 
              className={`button ${activeTab === 'history' ? 'is-warning' : 'is-warning is-light'}`}
              onClick={() => setActiveTab('history')}
            >
              Historik
            </button>
          </div>

          {activeTab === 'search' && (
            <>
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
                <SongList />
              )}
            </>
          )}

          {activeTab === 'history' && <HistorySection />}
        </div>
      </div>
    </section>
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
