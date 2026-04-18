export const symptomSections = [
  {
    title: "Mood & mind",
    groups: [
      {
        key: "feelings",
        label: "Feelings",
        items: [
          "Low",
          "Fine",
          "Mood swings",
          "Anxious",
          "Irritable",
          "Overwhelmed",
        ],
      },
      {
        key: "cognitive",
        label: "Concentration",
        items: [
          "Clear-headed",
          "Brain fog",
          "Forgetful",
          "Difficulty focusing",
        ],
      },
    ],
  },
  {
    title: "Body",
    groups: [
      {
        key: "pain",
        label: "Pain",
        items: [
          "Pain free",
          "Cramps",
          "Headache",
          "Breast pain",
          "Back pain",
          "Bloating",
        ],
      },
      {
        key: "temperature",
        label: "Temperature",
        items: ["Comfortable", "Hot flushes", "Night sweats", "Chills"],
      },
    ],
  },
  {
    title: "Cycle",
    groups: [
      {
        key: "flow",
        label: "Flow",
        items: [
          "No bleeding",
          "Spotting",
          "Light flow",
          "Moderate flow",
          "Heavy flow",
        ],
      },
    ],
  },
  {
    title: "Daily wellbeing",
    groups: [
      {
        key: "sleep",
        label: "Sleep",
        items: [
          "Woke refreshed",
          "Woke tired",
          "Restless",
          "Trouble falling asleep",
        ],
      },
      {
        key: "energy",
        label: "Energy",
        items: ["Exhausted", "Tired", "OK", "Energetic"],
      },
      {
        key: "appetite",
        label: "Appetite",
        items: ["No changes", "Low appetite", "Cravings", "Increased appetite"],
      },
    ],
  },
];

export const emptySelections = {
  feelings: [],
  pain: [],
  sleep: [],
  energy: [],
  flow: [],
  cognitive: [],
  appetite: [],
  temperature: [],
};
