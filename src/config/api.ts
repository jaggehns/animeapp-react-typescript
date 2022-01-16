export const TopAnimes = (): string => {
  return 'https://api.jikan.moe/v3/top/anime/1/favorite'
}

export const AnimeList = (page?: number): string => {
  if (!page) {
    page = 1
  }
  return `https://api.jikan.moe/v3/top/anime/${page}/tv`
}

export const AnimeSearch = (searchQuery: string, page?: number): string => {
  if (!page) {
    page = 1
  }
  return `https://api.jikan.moe/v3/search/anime?q=${searchQuery}&page=${page}`
}
