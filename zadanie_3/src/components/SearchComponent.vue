<template>
    <div>
        <div id="app">
            <div class="container">
                        <h1>Baza filmów</h1>
                        <form>
                            <div class="form-group">
                                <label for=inputTitle>Tytuł</label>
                                <input type="text" id=inputTitle class="form-control" v-model="title" placeholder="Podaj tytuł lub fragment tytułu filmu" />
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
                                <div class="col-sm-8">
                                    <input type="text" id=inputProductionFrom class="form-control" v-model="dateFrom" placeholder="Liczba naturalna z przedziału 1900-2019" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
                                <div class="col-sm-8">
                                    <input type="text" id=inputProductionTo class="form-control" v-model="dateTo" placeholder="Liczba naturalna z przedziału 1900-2019" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputCast">Obsada</label>
                                <input type="text" id="inputCast" class="form-control" v-model="cast" placeholder="Imię i nazwisko" />
                            </div>
                            <div class="form-group row">
                                <input type="button" class="btn btn-info col-sm-12" @click="searchMovies" value="Szukaj" />
                            </div>
                        </form>
                        <em class="task">Obsłuż filtrowanie listy filmów wg wszystkich pól wskazanych wyżej</em>
                    </div>
            </div>
            </div>
</template>

<script>
    import _ from 'underscore';
    export default {
        data() {
            return {
                filteredMovies: [],
                title: '',
                dateFrom: '',
                dateTo: '',
                cast: '',
            };
        },
        props: {
            displayedMovies: Array,
            movies: Array,
        },
        methods: {
            searchMovies() {
                this.filteredMovies = _.filter(this.movies, movie => {
                    const titleCondition = this.title === '' || movie.title.toLowerCase().includes(this.title.toLowerCase());
                    const dateFromCondition = this.dateFrom === '' || movie.year >= this.dateFrom;
                    const dateToCondition = this.dateTo === '' || movie.year <= this.dateTo;
                    const castCondition = this.cast === '' || movie.cast.join(' ').toLowerCase().includes(this.cast.toLowerCase());

                    return titleCondition && dateFromCondition && dateToCondition && castCondition;
                });
                this.$emit('search', this.filteredMovies);
            },
        },
    };
</script>

<style>
    /* Здесь ваши стили для компонента */
</style>