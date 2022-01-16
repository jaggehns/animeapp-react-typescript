export default interface ISingleAnime {
  request_hash: string
  request_cached: boolean
  request_cache_expiry: number
  mal_id: number
  url: string
  image_url: string
  trailer_url: string
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: any
  status: string
  airing: boolean
  aired: {
    from: string
    to: any
    prop: {
      from: {
        day: number
        month: number
        year: number
      }
      to: {
        day: any
        month: any
        year: any
      }
    }
    string: string
  }
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  premiered: string
  broadcast: string
  related: {
    Adaptation: [mal_id: number, type: string, name: string, url: string]
    'Side story': [mal_id: number, type: string, name: string, url: string]
    Character: [mal_id: number, type: string, name: string, url: string]
    Summary: [mal_id: number, type: string, name: string, url: string]
    'Alternative version': [mal_id: number, type: string, name: string, url: string]
    Other: [mal_id: number, type: string, name: string, url: string]
    producers: [mal_id: number, type: string, name: string, url: string]
    licensors: [mal_id: number, type: string, name: string, url: string]
    studios: [mal_id: number, type: string, name: string, url: string]
    genres: [mal_id: number, type: string, name: string, url: string]
    explicit_genres: any[]
    demographics: [mal_id: number, type: string, name: string, url: string]
    themes: [mal_id: number, type: string, name: string, url: string]
    opening_themes: string[]
    ending_themes: string[]
    external_links: [name: string, url: string]
  }
}
