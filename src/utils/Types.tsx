export enum Filters {
    All,
    Movies,
    Tv,
    People,
}

export type ApiRequest = {
    id: number,
    adult: boolean,
    title: string,
    name: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    poster_path: string,
    profile_path: string,
    media_type: string
}

export type Information = {
    label: string, value: string | number
}

export type Item = {
    id: number
    info: Information[],
    image: string,
    type: string,
    watched: boolean
}

export type DetailedItem = Person | Movie | Tv;

export type Person = {
    id: number
    imdb: string
    name: string
    description: string
    image: string
    footerInfo: Information[]
    type: string
}

export type Movie = {
    id: number
    imdb: string
    title: string
    tagline: string
    description: string
    image: string
    footerInfo: Information[]
    type: string
    watched?: boolean
}

export type Tv = {
    id: number
    imdb: string
    title: string
    tagline: string
    description: string
    image: string
    footerInfo: Information[]
    type: string
    watched?: boolean
}