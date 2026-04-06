export const TEST_IDS = {
  layout: {
    root: 'layout',
    header: 'header',
    headerTitle: 'header-title',
    headerSearchLink: 'header-search-link',
    langSwitch: (code: string) => `lang-switch-${code}`,
  },

  categoryCard: {
    root: 'category-card',
    title: 'category-card-title',
    description: 'category-card-description',
  },

  noteCard: {
    root: 'note-card',
    title: 'note-card-title',
    description: 'note-card-description',
    tags: 'note-card-tags',
  },

  homePage: {
    root: 'home-page',
    categoriesGrid: 'categories-grid',
  },

  categoryPage: {
    root: 'category-page',
    backLink: 'back-link',
    title: 'category-title',
    notesList: 'notes-list',
  },

  notePage: {
    root: 'note-page',
    backLink: 'back-link',
    title: 'note-title',
    tags: 'note-tags',
    content: 'note-content',
  },

  searchPage: {
    root: 'search-page',
    input: 'search-input',
    results: 'search-results',
    noResults: 'no-results',
  },

  notFoundPage: {
    root: 'not-found-page',
    title: 'not-found-title',
  },
} as const
