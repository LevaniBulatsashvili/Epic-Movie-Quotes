import axios from "@/config/axios.js";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      movies: [],
      movie: null,
      quotes: [],
      quote: {},
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
    getMovies() {
      axios
        .get("http://127.0.0.1:8000/api/movies")
        .then((res) => (this.movies = res.data.movies))
        .catch((err) => console.log(err));
    },
    getMovie(id) {
      axios
        .get(`http://127.0.0.1:8000/api/movies/${id}`)
        .then((res) => {
          const movie = res.data.movie;
          movie.genres = res.data.genres;
          this.movie = movie;
        })
        .catch((err) => console.log(err));
    },
    deleteMovie(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/admin/movies/${id}`)
        .then(
          () => (this.movies = this.movies.filter((movie) => movie.id !== id))
        )
        .catch((err) => console.log(err));
    },
    getQuote(quoteId) {
      axios
        .get(`http://127.0.0.1:8000/api/quote/${quoteId}`)
        .then((res) => {
          this.quote = res.data.quote;
        })
        .catch((err) => console.log(err));
    },
    getQuotes(movieId) {
      axios
        .get(`http://127.0.0.1:8000/api/quotes/${movieId}`)
        .then((res) => {
          this.quotes = res.data.quotes;
        })
        .catch((err) => console.log(err));
    },
    getRecentQuotes() {
      axios
        .get(`http://127.0.0.1:8000/api/quotes/recent`)
        .then((res) => {
          this.quotes = res.data.quotes;
        })
        .catch((err) => console.log(err));
    },
    deleteQuote(quoteId) {
      axios
        .delete(`http://127.0.0.1:8000/api/admin/quotes/${quoteId}`)
        .then(
          () =>
            (this.quotes = this.quotes.filter((quote) => quote.id !== quoteId))
        )
        .catch((err) => console.log(err));
    },
    likeOrDislikeQuote(quoteId, userId) {
      axios
        .post(`http://127.0.0.1:8000/api/admin/quotes/${quoteId}/like`, {
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
    commentOnQuote(quoteId, username, body) {
      axios
        .post(`http://127.0.0.1:8000/api/admin/quotes/${quoteId}/comment`, {
          username,
          body,
        })
        .then((res) => {
          this.quote.comments.push(res.data.quoteComment);
          this.quotes = this.quotes.map(quote => {
            if (quote.id !== quoteId) return quote;
            quote.comments.push(res.data.comment);
            return quote;
          });
        })
        .catch((err) => console.log(err));
    },
  },
});
