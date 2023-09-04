const axios = require('axios');
const readline = require('readline');

// Функция для выполнения поиска компаний
async function searchCompaniesByLocation(location) {
  try {
    const response = await axios.get(`https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=100&resultsFrom=0&businessLine=ohjelmi&registeredOffice=${encodeURIComponent(location)}&companyRegistrationFrom=2014-02-28`);
    const companies = response.data.results;

    if (companies.length === 0) {
      console.log(`En löytänyt yhtään yritystä ${location}:ssa.`);
    } else {
      console.log(`Yritykset ${location}:ssa:`);
      companies.forEach((company, index) => {
        console.log(`${index + 1}. ${company.name}`);
      });
    }
  } catch (error) {
    console.error('Tapahtui virhe:', error);
  }
}

// Создание интерфейса для ввода местоположения
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Anna kaupunki, jossa sinun täytyy löytää yrityksiä: ', (location) => {
  searchCompaniesByLocation(location);
  rl.close();
});