// 2. Based on sw-films.json, sw-starships.json, sw-planets.json, and sw-people.json: (https://swapi.dev/)
// a. Use the starter file starwars.js
// b. count sum of all starships cost from episodes 4-6
// c. find the fastest starship you can afford having 8500000 credits
// d. find the planet’s name with the lowest difference between the rotation period and orbital period
// e. map all starships with crew <= 4 that were created between 10 Dec 2014 and 15 Dec 2014
// f. create an array of people’s names from episodes 1 and 5 sorted by the diameter of the origin planet low to high

const films = require("./sw-films.json");
const planets = require("./sw-planets.json");
const peoplee = require("./sw-people.json");
const starships = require("./sw-starships.json");
const { lastIndexOf, includes } = require("lodash");

// count sum of all starships cost from episodes 4-6
console.log(
  "Sum of all starships cost from episodes 4 - 6 is: " +
    sumAllStarshipsCostFromEpisodes(4, 6)
);

function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
  let sum = 0;
  // TODO
  sum = starships
  .filter((cur)=>(cur.films.some(m=>(Number(m.slice(-2,-1))>startEp)&&(m.slice(-2,-1))<endEp)))
  .reduce(
    function (acc,cur){
      acc=Number(acc)+Number(cur.cost_in_credits)||0;
    return Number(acc);
  }, 0);
  return sum;
}

// find the fastest starship you can afford having 8500000 credits

console.log(
  "Fastest ship I can get for up to 8500000 is: " +getFastestShipFor(8500000).name

);

function getFastestShipFor(money) {
  let ship;
  ship=starships
  .filter((cur)=>cur.cost_in_credits<money)
  .reduce(
    function (acc, cur) {
    acc < Number(cur.max_atmosphering_speed) ? acc += Number(cur.max_atmosphering_speed) : acc;
    return acc;
  });
  return ship;
}

// find planet name with the lowest difference between the rotation period and orbital period

console.log(
  "Planet name with the lowest difference between the rotation period and orbital period is: " +
    getPlanetNameWithLowestDifference("rotation_period", "orbital_period")
);

function getPlanetNameWithLowestDifference(key1, key2) {
  let planetName;
  planetName =planets.reduce(function(acc, cur){
    if (acc<(cur[key1]-cur[key2])){
      (acc=(cur[key1]-cur[key2]))} 
      return acc}).name;
  return planetName;
}

// map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
  "Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: " +
    getCrewShipFrom(4, new Date(2014, 12, 10), new Date(2014, 12, 12)).length
);

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
  function dataConverter(d){
    let [rrrr,mm,dd] =d.slice(0,10).split('-');
    let date = new Date(rrrr,mm,dd);
    return date;
  }
  let ship;
  // TODO
  ship= starships.filter(m=>(Number(m.crew)<=maxCrew)&&(dataConverter(m.created)>=dateStart)&&dataConverter(m.created)<=dateEnd);
  return ship;
}

// create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high

console.log(
  "People from ep 1 - 5 sorted by origin planet diameter low to high: " +
    getPeopleSortedByOriginPlanetDiameter(1, 5)
);

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {
  function convertHomeworldToPlanet(hw){
   let planetno = hw.split('/')[hw.split('/').length-2];
   return planetno;
  }
  function convertPlanetnoToDiameter(planetNo){
  let diametr=planets.filter((n)=>n.url.split('/')[n.url.split('/').length-2]==(planetNo))[0].diameter;
  return diametr;
  }
  let people;
  // let diameters;
  people=
  peoplee
  .filter((m)=>Number(m.films.map(n=>n.slice(-2,-1)))>=startEp&&Number(m.films.map(n=>n.slice(-2,-1))<=endEp))
  .map(n=>[n.name,convertPlanetnoToDiameter(convertHomeworldToPlanet(n.homeworld))])
  .sort((a,b)=>a[1]-b[1])
  .map(m=>' '+m[0]);
  // return convertPlanetnoToDiameter(33);
  return people;
  ;
  
}
