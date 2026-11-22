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
    <main className="app">
      <header className="app-header">
        <img
          src="/logo-text.png"
          alt={texts.app.title}
          className="logo"
        />
      </header>
      <div className="app-content">
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
    </main>
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
