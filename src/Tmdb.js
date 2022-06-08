const API_KEY = "7240c70d3ea6b2b2d737c37174673e58";
const API_BASE = "https://api.themoviedb.org/3";
// https://api.themoviedb.org/3/genre/movie/list?api_key=7240c70d3ea6b2b2d737c37174673e58&language=en-US

const basicFetch = async (endpoint) => {
  let req = await fetch(`${API_BASE}${endpoint}`);
  let json = await req.json();
  return json;
};

export default {
  getMovies: async () => {
    let moviesList = await basicFetch(
      `/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    console.log("moviesList", moviesList);
    let results = [];
    for (const e of moviesList.genres) {
      results.push({
        slug: e.name,
        title: e.name,
        items: await basicFetch(
          `/discover/movie?with_genres=${e.id}&api_key=${API_KEY}`
        ),
      });
    }
    console.log(results);
    return results;
  },

  getTVShows: async () => {
    let TVShowsList = await basicFetch(
      `/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );
    let results = [];
    for (const e of TVShowsList.genres) {
      results.push({
        slug: e.name,
        title: e.name,
        items: await basicFetch(
          `/discover/tv?with_genres=${e.id}&api_key=${API_KEY}`
        ),
      });
    }
    console.log(results);
    return results;
  },

  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        items: await basicFetch(
          `/discover/tv?with_networks=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "history",
        title: "History",
        items: await basicFetch(
          `/discover/movie?with_genres=36&api_key=${API_KEY}`
        ),
      },
      {
        slug: "drama",
        title: "Drama",
        items: await basicFetch(
          `/discover/movie?with_genres=18&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Action",
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentaries",
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },

  getTrending: async () => {
    return [
      {
        type: "movie",
        time: "day",
        title: "Top Movies Today",
        items: await basicFetch(`/trending/movie/day?api_key=${API_KEY}`),
      },
      {
        type: "movie",
        time: "week",
        title: "Top Movies This Week",
        items: await basicFetch(`/trending/movie/week?api_key=${API_KEY}`),
      },
      {
        type: "tv",
        time: "day",
        title: "Top TV Shows Today",
        items: await basicFetch(`/trending/tv/day?api_key=${API_KEY}`),
      },
      {
        type: "tv",
        time: "week",
        title: "Top TV Shows This Week",
        items: await basicFetch(`/trending/tv/week?api_key=${API_KEY}`),
      },
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  },
};
