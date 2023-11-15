<template>
    <div class="container">
        <h1>Filmy wg gatunku</h1>
        <div v-for="(movies, genre) in filteredMovies" :key="genre">
            <h1>Doszedlem pierszy</h1>
            <p>{{ genres }}</p>
            <ol>
                <li v-for="movie in movies" :key="movie.title">
                    {{ movie.title }}
                </li>
            </ol>
        </div>

        <div v-for="genre in uniqueGenres" :key="genre">
            <p>{{ genre }}</p>
            <ol>
                <li v-for="movie in filteredMovies[genre]" :key="movie.title">
                    {{ movie.title }}
                </li>
            </ol>
        </div>
        <p>Comedy</p>
        <ol>
            <li>Special Delivery</li>
        </ol>
    </div>
</template>

<script>
    import _ from 'underscore';

    export default {
        data() {
            return {
                filteredMovies: [], 
                uniqueGenres: []
            };
        },
        watch: {
            movies: {
                immediate: true,
                handler() {
                    this.handleMoviesChange();
                }
            }
        },
        methods: {
            handleMoviesChange() {
                const allGenres = _.flatten(_.map(this.movies, movie => movie.genres));
                this.uniqueGenres = _.uniq(allGenres);
                this.uniqueGenres.forEach(genre => {
                    const moviesInGenre = _.filter(this.movies, movie => _.contains(movie.genres, genre))
                    this.filteredMovies[genre] = moviesInGenre;
                });
            }
        },
        props: {
            movies: Array,
        }
    }
</script>

<style>
    /* Здесь ваши стили для компонента */
</style>