export function getUniqueLogDates(logs) {
  return [...new Set(logs.map((log) => log.date))].sort((a, b) =>
    a > b ? -1 : 1
  );
}

export function getCurrentStreak(logs) {
  const uniqueDates = getUniqueLogDates(logs);
  if (uniqueDates.length === 0) return 0;

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];

  // streak only counts if user logged today or yesterday
  if (uniqueDates[0] !== todayString && uniqueDates[0] !== yesterdayString) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(uniqueDates[0]);

  for (let i = 1; i < uniqueDates.length; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const expected = previousDate.toISOString().split("T")[0];

    if (uniqueDates[i] === expected) {
      streak += 1;
      currentDate = new Date(uniqueDates[i]);
    } else {
      break;
    }
  }

  return streak;
}
