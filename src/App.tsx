import DateInput from "./components/DateInput";
import SongList from "./components/SongList";
import { SongProvider } from "./contexts/SongContext";

function App() {
  return (
    <SongProvider>
      <div className="has-background-success-dark">
        <div className="is-size-6 has-text-centered has-text-success-dark p-4 has-background-success-light">Har Daniel Hansson varit på radio nu igen?</div>
        <div className="container is-fluid">
          <DateInput />
          <SongList />
        </div>
      </div>
    </SongProvider>
  );
}

export default App;
