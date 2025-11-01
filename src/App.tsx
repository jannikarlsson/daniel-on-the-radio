import { useState } from "react";
import SearchResults from "./components/SearchResults";
import { SongProvider, useSongs } from "./contexts/SongContext";
import HistorySection from "./components/HistorySection";
import TabButtons from "./components/TabButtons";
import { Tab, ButtonOption } from "./models/interfaces";
import texts from "./config/texts";

const TAB_OPTIONS: ButtonOption<Tab>[] = [
  { value: Tab.Search, label: texts.tabs.search },
  { value: Tab.History, label: texts.tabs.history }
];

function AppContent() {
  const { isLoading, error, songs } = useSongs();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Search);

  return (
    <section className="hero has-background-warning-dark is-fullheight">
      <div className="has-text-centered">
        <img
          src="/logo-text.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="hero-body is-align-items-flex-start hero-body-padding">
        <div className="container is-fluid no-side-padding">
          <TabButtons 
            options={TAB_OPTIONS} 
            selectedValue={activeTab} 
            onChange={value => setActiveTab(value)}
          />

          {activeTab === Tab.Search && (
            <SearchResults isLoading={isLoading} error={error} songs={songs} />
          )}

          {activeTab === Tab.History && <HistorySection />}
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
