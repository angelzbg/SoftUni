export const ratingFilters = {
  newest: 'Newest',
  oldest: 'Oldest',
  highest: 'Highest',
  lowest: 'Lowest',
};

export const ratingIcons = {
  [ratingFilters.newest]: '⥂',
  [ratingFilters.oldest]: '⥄',
  [ratingFilters.highest]: '⤯',
  [ratingFilters.lowest]: '⤰',
};

export const ratingFilter = {
  [ratingFilters.newest]: (a, b) => b.created - a.created,
  [ratingFilters.oldest]: (a, b) => a.created - b.created,
  [ratingFilters.highest]: (a, b) => b.stars - a.stars || b.created - a.created,
  [ratingFilters.lowest]: (a, b) => a.stars - b.stars || b.created - a.created,
};

export const commentsFilters = {
  newest: 'Newest',
  oldest: 'Oldest',
  highest: 'Highest',
  lowest: 'Lowest',
};

export const commentsIcons = {
  [commentsFilters.newest]: '⥂',
  [commentsFilters.oldest]: '⥄',
  [commentsFilters.highest]: '⤯',
  [commentsFilters.lowest]: '⤰',
};

export const commentsFilter = {
  [commentsFilters.newest]: (a, b) => b.created - a.created,
  [commentsFilters.oldest]: (a, b) => a.created - b.created,
  [commentsFilters.highest]: (a, b) =>
    b.likes.length - b.dislikes.length - (a.likes.length - a.dislikes.length) || b.created - a.created,
  [commentsFilters.lowest]: (a, b) =>
    a.likes.length - a.dislikes.length - (b.likes.length - b.dislikes.length) || b.created - a.created,
};
