// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  let result = movies.map(pelicula => pelicula.director);
  result.sort();
  return result;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  let peliculasDirector = array.filter(movie => movie.director === director);
  //console.table(peliculasDirector);
  return peliculasDirector;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  let peliculasDirector = getMoviesFromDirector(array, director);
    let puntuacionesFiltradas = peliculasDirector.filter(movie => movie.score != undefined);//para array solo con las puntuaciones .map, si quisiera un array 
    // con objetos .filter
    let long = puntuacionesFiltradas.length;
    let total = puntuacionesFiltradas.reduce((acc, movie) => { return acc += parseFloat(movie.score) }, 0);
    let media = parseFloat((total / long).toFixed(2));

    return media;

}

// Exercise 4:  Alphabetic order by title 
function orderAlphabetically(array) {

}

// Exercise 5: Order by year, ascending
function orderByYear() {

}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory() {

}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes() {

}

// Exercise 8: Get the best film of a year
function bestFilmOfYear() {

}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}
