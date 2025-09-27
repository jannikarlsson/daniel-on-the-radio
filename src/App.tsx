import { useState } from "react";
import SearchResults from "./components/SearchResults";
import { SongProvider, useSongs } from "./contexts/SongContext";
import HistorySection from "./components/HistorySection";
import TabButtons from "./components/TabButtons";
import { Tab, ButtonOption } from "./models/interfaces";
import texts from "./config/texts";

const TAB_OPTIONS: ButtonOption<Tab>[] = [
  { value: 'search', label: texts.tabs.search },
  { value: 'history', label: texts.tabs.history }
];

function AppContent() {
  const { isLoading, error, songs } = useSongs();
  const [activeTab, setActiveTab] = useState<Tab>('search');

  return (
    <section className="hero has-background-warning-dark is-fullheight">
      <div className="hero-head">
        <div className="is-size-6 has-text-centered has-text-warning-dark p-4 has-background-warning-light">
          {texts.app.title}
        </div>
      </div>
      <div className="hero-body is-align-items-flex-start">
  <div className="container is-fluid no-side-padding">
          <TabButtons 
            options={TAB_OPTIONS} 
            selectedValue={activeTab} 
            onChange={value => setActiveTab(value)}
          />

          {activeTab === 'search' && (
            <SearchResults isLoading={isLoading} error={error} songs={songs} />
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
