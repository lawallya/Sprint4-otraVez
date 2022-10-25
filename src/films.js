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
  let puntuacionesFiltradas = array.map(movie => movie.score).filter(item => item !== ''); //genero un array 
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
  //no puedo utilizar sort directamente porque se mantiene el mismo array. tiene que ser map que genera uno nuevo
  let peliculasPreparadas = array.map(element => ({ ...element }));
  console.table(peliculasPreparadas);
  let peliculasOrdenadas = peliculasPreparadas.sort((a, b) => {
    if (a.year > b.year) { return 1 }
    if (a.year === b.year) {
      let ac = (a.title > b.title) ? 1 : -1;
      return ac;
    }//estoy suponiendo que no hay 2 peliculas que se llamen igual
    if (a.year < b.year) { return -1 }
  });
  return peliculasOrdenadas

  /* array.sort((a, b) => {
     if (a.year > b.year) { return 1 }
     if (a.year === b.year) {
       let ac = (a.title > b.title) ? 1 : -1;
       return ac;
     }//estoy suponiendo que no hay 2 peliculas que se llamen igual
     if (a.year < b.year) { return -1 }
   });
   console.table(peliculasOrdenadas);
   return peliculasOrdenadas;*/


}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, categoria) {
  console.log("moviesAverageByCategory");
  let peliculasGenero = getMoviesFromProperty(array, "genre", categoria);//getMoviesFromProperty(movies, "genre", value);
  let media = moviesAverage(peliculasGenero);
  return media;

}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
//para cada pelicula calculo en tiempo en minutos preguntando si duracion ha salido con 2 items, en ese caso
// traduzco a minutos directamente, si no tiene 2 items, entonces tengo que saber si es el de horas o minutos, 
// si tiene horas multiplico por 60, si no saco directamente el resultado en minutos. Y en el nuevo objeto sera 
// igual al antiguo pero la duracion será la nueva.
  let peliculasEnMinutos = array.map(element => {
    let tiempoFinal = (element.duration.split(" ").length == 2) ? (parseInt(element.duration.split(" ")[0])*60 + parseInt(element.duration.split(" ")[1])) :
    (element.duration.includes("h"))?parseInt(element.duration.split(" ")[0])*60:parseInt(element.duration.split(" ")[0]);
    element = {...element};
    element.duration = tiempoFinal;
    return element;
  });
 
  return peliculasEnMinutos
}
/*function generarArrayTiempo(string) {//OK, PERO HAY QUE SIMPLIFICAR
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
function bestFilmOfYear(array, año) {
  console.log("bestFilmOfYear");
  // let peliculasAño = getMoviesFromProperty(movies, "year", año);
  let peliculasAño = array.filter((movie) => movie.year === año);
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
