export function getPrioritisedLearnCards(focusAreas, learnCards, limit = 3) {
  if (!focusAreas.length) {
    return learnCards.slice(0, limit);
  }

  const matching = learnCards.filter((card) =>
    card.tags.some((tag) => focusAreas.includes(tag))
  );

  const nonMatching = learnCards.filter(
    (card) => !card.tags.some((tag) => focusAreas.includes(tag))
  );

  return [...matching, ...nonMatching].slice(0, limit);
}
// final commit :)