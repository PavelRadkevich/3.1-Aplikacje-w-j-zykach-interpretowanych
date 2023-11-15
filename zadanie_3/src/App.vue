<template>

    <div id="app">
        <SearchComponent :movies="movies" @search="searchMovies" />
        <TableComponent :movies="displayedMovies" @showMore="showMoreMovies" />     
        <GenreListComponent :movies="oneHundredFilms" />
        <CastListComponent :movies="oneHundredFilms" />
    </div>
</template>

<script>
    import SearchComponent from './components/SearchComponent.vue';
    import TableComponent from './components/TableComponent.vue';
    import GenreListComponent from './components/GenreListComponent.vue';
    import CastListComponent from './components/CastListComponent.vue';
    import axios from 'axios';

    

    export default {
        components: {
            SearchComponent,
            TableComponent,
            GenreListComponent,
            CastListComponent,
        },
        data() {
            return {
                filteredMovies: [],
                movies: [],
                displayedMovies: [],
                oneHundredFilms: [],
                moviesPerPage: 10
            };
        },
        mounted() {
            axios.get('http://localhost:8080//movies.json')
                .then(response => {
                    this.movies = response.data;
                    this.filteredMovies = this.movies.slice();
                    this.displayedMovies = this.filteredMovies.slice(0, 10);
                    this.oneHundredFilms = this.filteredMovies.slice(0, 100);
                })
                .catch(error => {
                    console.error('Błąd przy ładowaniu pliku json', error);
                });
        },
        methods: {
            searchMovies(filteredList) {
                this.filteredMovies = filteredList;
                this.displayedMovies = this.filteredMovies.slice(0, 10);
                this.oneHundredFilms = this.filteredMovies.slice(0, 100);
                this.moviesPerPage = 10;
            },
            showMoreMovies() {
                this.moviesPerPage += 10;
                this.displayedMovies = this.filteredMovies.slice(0, this.moviesPerPage);
            },
        },
    }
</script>

<style>

</style>
