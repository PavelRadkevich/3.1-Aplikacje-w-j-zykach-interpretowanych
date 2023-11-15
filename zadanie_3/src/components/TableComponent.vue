<template>
    <div class="container">
        <table class="table-condensed table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Production Year</th>
                    <th>Cast</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movie in movies" :key="movie.title">
                    <td>{{movie.title}}</td>
                    <td>{{movie.year}}</td>
                    <td>{{ movie.cast.join(', ')}}</td>
                    <td>{{ movie.genres.join(', ')}}</td>
                </tr>
            </tbody>
        </table>
            <div class="mx-auto">
                <button type="button" class="btn btn-primary" @click="showMoreMovies">Show more</button>
            </div>
    </div>
</template>

<script>
    export default {
        props: {
            displayedMovies: Array,
            movies: Array,
        },
        methods: {
            showMoreMovies() {
                this.$emit('showMore');
            },

        },
    };
</script>

<style>

</style>