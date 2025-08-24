import { ApiRequest, Item } from "./Types";
import { apiKey, errorMessage } from "./Utils";

const getPopular = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`);
    if (response.ok) {
        const data = await response.json();

        let result: Item[] = [];
        data.results.forEach((item: ApiRequest) => {
            !item.adult && result.push({
                id: item.id,
                info: [
                    { label: "Title: ", value: item.title || item.name },
                    { label: "Popularity: ", value: item.popularity },
                    { label: "Score: ", value: item.vote_average },
                    { label: "Number of Votes: ", value: item.vote_count }
                ],
                image: item.poster_path || item.profile_path,
                type: "movie",
                watched: false
            });
        });

        return result;
    }
    else {
        errorMessage("Something went wrong...");
        return false;
    }
}

const getApiData = async (searchValue: string, filter: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/${filter}?api_key=${apiKey}&query=${searchValue}`);
    if (response.ok) {
        const data = await response.json();

        let result: Item[] = [];
        data.results.forEach((item: ApiRequest) => {
            !item.adult && result.push({
                id: item.id,
                info: [
                    { label: "Title: ", value: item.title || item.name },
                    { label: "Popularity: ", value: item.popularity },
                    { label: "Score: ", value: item.vote_average },
                    { label: "Number of Votes: ", value: item.vote_count }
                ],
                image: item.poster_path || item.profile_path,
                type: filter === "multi" ? item.media_type : filter,
                watched: false
            });
        });

        return result;
    }
    else {
        errorMessage("Something went wrong...");
        return false;
    }
}

const getDetailedInfo = async (id: number, type: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`);
    if (response.ok) {
        const data = await response.json();

        let result = {};
        switch (type) {
            case "person":
                result = {
                    id: data.id,
                    imdb: data.imdb_id,
                    name: data.name,
                    description: data.biography,
                    image: data.profile_path,
                    footerInfo: [
                        { label: "Birthday: ", value: data.birthday },
                        { label: "Deathday: ", value: data.deathday },
                    ],
                    type: type,
                };
                break;
            case "movie":
                result = {
                    id: data.id,
                    imdb: data.imdb_id,
                    title: data.title,
                    tagline: data.tagline,
                    description: data.overview,
                    image: data.poster_path,
                    footerInfo: [
                        { label: "Genre: ", value: data.genres },
                        { label: "Language: ", value: data.original_language },
                        { label: "Release date: ", value: data.release_date },
                        { label: "Runtime: ", value: data.runtime && data.runtime + " minutes" },
                        { label: "Popularity: ", value: data.popularity },
                        { label: "Score: ", value: data.vote_average },
                        { label: "Number of Votes: ", value: data.vote_count }
                    ],
                    type: type
                };
                break;
            case "tv":
                result = {
                    id: data.id,
                    imdb: data.imdb_id,
                    title: data.name,
                    tagline: data.tagline,
                    description: data.overview,
                    image: data.poster_path,
                    footerInfo: [
                        { label: "Genre: ", value: data.genres },
                        { label: "Language: ", value: data.original_language },
                        { label: "Popularity: ", value: data.popularity },
                        { label: "First aired on: ", value: data.first_air_date },
                        { label: "Runtime: ", value: data.runtime && data.runtime[0] + " minutes" },
                        { label: "Score: ", value: data.vote_average },
                        { label: "Number of Votes: ", value: data.vote_count }
                    ],
                    type: type
                };
        }

        return result;
    }
    else {
        errorMessage("Something went wrong...");
        return false;
    }
}

export { getPopular, getApiData, getDetailedInfo }