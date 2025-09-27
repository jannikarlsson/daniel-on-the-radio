const texts = {
  app: {
    title: "Har Daniel Hansson varit på radio nu igen?"
  },
  history: {
    button: (count: number) => `Visa ${count} senaste`,
    empty: "Inga tidigare fynd hittades.",
    errorTitle: "Något gick fel"
  },
  search: {
    errorTitle: "Något gick fel",
    empty: "Nej."
  },
  song: {
    noAudio: "Det har gått längre tid än 30 dagar",
    audioFallback: "Din webbläsare stöder inte ljudtaggar"
  },
  tabs: {
    search: "Sök",
    history: "Historik"
  }
};

export default texts;
