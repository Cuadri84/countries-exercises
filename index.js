"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function calculatePopulationDensity(country) {
    return country.population / country.area;
}
function parseCountry(line) {
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
function calculatePopulationDensities(filename) {
    const data = fs.readFileSync(filename, "utf-8");
    const lines = data.split("\n");
    const countries = [];
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
        }
        else if (isNaN(densityA)) {
            return 1;
        }
        else if (isNaN(densityB)) {
            return -1;
        }
        else {
            return densityB - densityA;
        }
    });
    const finalList = [];
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
