import axios from "@/config/axios.js";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      movies: [],
      movie: null,
      quotes: [],
      quote: {},
      page: 1,
      allGenres: [
        {
          en: "romance",
          ka: "რომანტიკა",
        },
        {
          en: "drama",
          ka: "დრამა",
        },
        {
          en: "horror",
          ka: "საშინელება",
        },
        {
          en: "comedy",
          ka: "კომედია",
        },
        {
          en: "thriller",
          ka: "თრილერი",
        },
        {
          en: "crime",
          ka: "დანაშაული",
        },
        {
          en: "Sci-Fi",
          ka: "ფანტასტიკა",
        },
      ],
    };
  },
  actions: {
    getMovies(userId, lang = "", search = "") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_API_BASE_URL + `/user/${userId}/movies?lang=${lang}&search=${search}`
        )
        .then((res) => (this.movies = res.data.movies))
        .catch((err) => console.log(err));
    },
    getMovie(id) {
      axios
        .get(import.meta.env.VITE_BACKEND_API_BASE_URL + `/movies/${id}`)
        .then((res) => {
          const movie = res.data.movie;
          movie.genres = res.data.genres;
          this.movie = movie;
        })
        .catch((err) => console.log(err));
    },
    deleteMovie(id) {
      axios
        .delete(import.meta.env.VITE_BACKEND_API_BASE_URL + `/admin/movies/${id}`)
        .then(
          () => (this.movies = this.movies.filter((movie) => movie.id !== id))
        )
        .catch((err) => console.log(err));
    },
    getQuote(quoteId) {
      axios
        .get(import.meta.env.VITE_BACKEND_API_BASE_URL + `/quote/${quoteId}`)
        .then((res) => {
          this.quote = res.data.quote;
        })
        .catch((err) => console.log(err));
    },
    getQuotes(movieId, lang = "", search = "", from = "") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_API_BASE_URL + `/quotes/${movieId}?lang=${lang}&search=${search}&from=${from}`
        )
        .then((res) => {
          this.quotes = res.data.quotes;
        })
        .catch((err) => console.log(err));
    },
    getRecentQuotes() {
      axios
        .get(import.meta.env.VITE_BACKEND_API_BASE_URL + `/quotes/recent?page=${this.page}`)
        .then((res) => {
          this.page++;
          this.quotes = [...this.quotes, ...res.data.quotes.data];
        })
        .catch((err) => console.log(err));
    },
    deleteQuote(quoteId) {
      axios
        .delete(import.meta.env.VITE_BACKEND_API_BASE_URL + `/admin/quotes/${quoteId}`)
        .then(
          () =>
            (this.quotes = this.quotes.filter((quote) => quote.id !== quoteId))
        )
        .catch((err) => console.log(err));
    },
    likeOrDislikeQuote(quoteId, userId) {
      axios
        .post(import.meta.env.VITE_BACKEND_API_BASE_URL + `/admin/quotes/${quoteId}/like`, {
          userId,
        })
        .then((res) => {
          const dislike = res.data.message.includes("disliked");
          dislike ? this.quote.likes-- : this.quote.likes++;
          this.quotes = this.quotes.map((quote) => {
            if (quote.id !== quoteId) return quote;

            if (dislike) quote.likes--;
            else quote.likes++;
            return quote;
          });
        })
        .catch((err) => console.log(err));
    },
    commentOnQuote(quoteId, username, thumbnail, body) {
      axios
        .post(import.meta.env.VITE_BACKEND_API_BASE_URL + `/admin/quotes/${quoteId}/comment`, {
          username,
          thumbnail,
          body,
        })
        .then((res) => {
          if (this.quote.id) this.quote.comments.push(res.data.quoteComment);
          this.quotes = this.quotes.map((quote) => {
            if (quote.id !== quoteId) return quote;
            quote.comments.push(res.data.quoteComment);
            return quote;
          });
        })
        .catch((err) => console.log(err));
    },
  },
});
