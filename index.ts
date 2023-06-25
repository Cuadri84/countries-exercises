import * as fs from "fs";

interface Country {
  name: string;
  population: number;
  area: number;
}

function calculatePopulationDensity(country: Country): number {
  return country.population / country.area;
}

function parseCountry(line: string): Country {
  const words = line.split(" ");
  const name = words.slice(0, -2).join(" "); // Unir todas las palabras excepto las últimas dos como el nombre del país
  const population = parseInt(words[words.length - 2]); // Obtener la población
  const area = parseInt(words[words.length - 1]); // Obtener el área

  return {
    name,
    population,
    area,
  };
}

function calculatePopulationDensities(filename: string): void {
  const data = fs.readFileSync(filename, "utf-8");
  const lines = data.split("\n");
  const countries: Country[] = [];

  lines.forEach((line) => {
    if (line.trim() !== "") {
      const country = parseCountry(line);
      countries.push(country);
    }
  });

  countries.sort((a, b) => {
    const densityA = calculatePopulationDensity(a);
    const densityB = calculatePopulationDensity(b);

    if (isNaN(densityA) && isNaN(densityB)) {
      return 0;
    } else if (isNaN(densityA)) {
      return 1;
    } else if (isNaN(densityB)) {
      return -1;
    } else {
      return densityB - densityA;
    }
  });

  const finalList: string[] = [];
  countries.forEach((country) => {
    const density = calculatePopulationDensity(country);
    if (!isNaN(density) && density !== 0) {
      const countryData = `${country.name}: ${density} people per square unit`;
      finalList.push(countryData);
      console.log(countryData);
    }
  });

  const csvData = finalList.join("\n");
  fs.writeFileSync("countries.csv", csvData, "utf-8");
}

const filename = "countries.txt";
calculatePopulationDensities(filename);
