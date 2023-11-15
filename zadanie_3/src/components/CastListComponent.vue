<template>
    <div class="container">
        <h1>Filmy według obsady</h1>
        <div v-for="cast in uniqueCast" :key="cast">
            <p>{{ cast }}</p>
            <ol>
                <li v-for="movie in filteredMovies[cast]" :key="movie.title">
                    {{ movie.title }}
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore';

    export default {
        data() {
            return {
                filteredMovies: [],
                uniqueCast: []
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
                const allCast = _.flatten(_.map(this.movies, movie => movie.cast));
                this.uniqueCast = _.uniq(allCast);
                this.uniqueCast.forEach(cast => {
                    const moviesInCast = _.filter(this.movies, movie => _.contains(movie.cast, cast))
                    this.filteredMovies[cast] = moviesInCast;
                });
            }
        },
        props: {
            movies: Array,
        }
    }
</script>

<style>
</style>