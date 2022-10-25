// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  let result = array.map(pelicula => pelicula.director);
   //result.sort();
  return result;
  
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  let peliculasDirector = array.filter(movie => movie.director === director);
  //console.table(peliculasDirector);
  return peliculasDirector;
}

//ex6, modificacion del ejercio 2
function getMoviesFromProperty(array, propiedad, value) {//OK
  console.log("getMoviesFromProperty");
  let x = propiedad;
  let valor = value;
  console.log(x);
  console.log(valor);
  switch (x) {
    case "director": let peliculasDirector = array.filter((movie) => movie.director === value);
      console.table(peliculasDirector);
      return peliculasDirector;
      break;
    case "genre": let peliculasGenero = array.filter(movie => movie.genre.includes(value));
      console.table(peliculasGenero);
      return peliculasGenero;
      break;
    case "year": let peliculasAño = array.filter((movie) => movie.year === value);
      console.table(peliculasAño);
      return peliculasAño;
  }
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

//ex 6, modificacion del ejercicio 3
function moviesAverage(array) {//aqui le llega ya el array de peliculas de objetos de un director dado
  let puntuacionesFiltradas = array.map(movie => movie.score).filter(item => item !== undefined); //genero un array 
  //de puntuaciones válidas
  let total = puntuacionesFiltradas.reduce((ac, item) => { return ac += item });
  let long = puntuacionesFiltradas.length;
  let media = parseFloat((total / long).toFixed(2));
  console.log(media);
  return media;
}


// Exercise 4:  Alphabetic order by title 
function orderAlphabetically(array) {
  console.log("orderAlphabetically");
  let titulosPeliculas = array.map(movie => movie.title.toLowerCase());//devuelve un array con solo los títulos
  console.table(titulosPeliculas);
  //las pongo en minusculas para que ordene alfabeticamente correctamente, que no ponga ET antes que El niño 
  //las ordeno alfabéticamente:
  titulosPeliculas.sort();
  //solo mostrar las 20 primeras peliculas 
  let primerasPeliculas = titulosPeliculas.filter((element, index) => index < 20);

  console.table(primerasPeliculas);
  return primerasPeliculas;

}

// Exercise 5: Order by year, ascending
function orderByYear(array) {
  //no son dos pasos uno detrás del otro, es en caso de que el año sea el mismo entonces ordena alfabéticamente    
  let peliculasOrdenadas = array.sort((a, b) => {
    if (a.year > b.year) { return 1 }
    if (a.year === b.year) {
      let ac = (a.title > b.title) ? 1 : -1;
      return ac;
    }//estoy suponiendo que no hay 2 peliculas que se llamen igual
    if (a.year < b.year) { return -1 }
  });
  console.table(peliculasOrdenadas);
  return peliculasOrdenadas;

}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(categoria) {
  console.log("moviesAverageByCategory");
  let peliculasGenero = getMoviesFromProperty(movies, "genre", categoria);//getMoviesFromProperty(movies, "genre", value);
  let media = moviesAverage(peliculasGenero);
  return media;

}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  console.log("hoursToMinutes");
  let peliculasEnMinutos = array.filter(item => item.duration = generarArrayTiempo(item.duration));
  //console.table(peliculasEnMinutos);
  return peliculasEnMinutos
}
function generarArrayTiempo(string) {//OK, PERO HAY QUE SIMPLIFICAR
  console.log("generarArrayTiempo");

  let tiempoFinal = 0;
  if (string.includes("h") && string.includes("min")) {
    let sinHoras = string.replace("h", "");//quito el caracter h, si lo hago con un parseInt pierdo la parte de min 
    let sinMinutos = sinHoras.replace("min", "");//quito el caracter min
    let tiempo = sinMinutos.split(" "); // ahora en duration hay un arry de long 2
    tiempoFinal = parseInt(tiempo[0] * 60) + parseInt(tiempo[1]);
  } else if (string.includes("h") && !string.includes("min")) {//solo hay  horas
    tiempoFinal = parseInt(string);
    tiempoFinal *= 60;
  } else if (!string.includes("h") && !string.includes("min")) {//solo hay  minutos
    tiempoFinal = parseInt(string);
  }
  return tiempoFinal;
}


// Exercise 8: Get the best film of a year
function bestFilmOfYear(year) {
  console.log("bestFilmOfYear");
    // let peliculasAño = getMoviesFromProperty(movies, "year", año);
    let peliculasAño = movies.filter((movie) => movie.year === año);
   // console.table(peliculasAño);
    let mejorPelicula = peliculasAño.sort((a, b) => { return b.score - a.score }); //ordena en orden descendente
    //console.table(mejorPelicula);
    let maxPuntuacion = mejorPelicula[0].score;
    //console.log(maxPuntuacion);
    let mejoresPeliculas = mejorPelicula.filter(movie => movie.score === maxPuntuacion);

    return mejoresPeliculas;

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
