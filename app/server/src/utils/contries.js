const axios = require("axios");
const countries = [];
const ids = [];
fs = require("fs");
async function getCountries(params) {
  const countries2 = await axios.get(
    "http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey=prtl6749387986743898559646983194"
  );
  const res = await countries2.data.Continents;
  console.log(res);

  for (let index = 0; index < res.length; index++) {
    const element = res[index];

    for (let j = 0; j < element.Countries.length; j++) {
      const element2 = element.Countries[j];
      countries.push(element2);
    }
  }

  for (let yea = 0; yea < countries.length; yea++) {
    const element = countries[yea];
    ids.push({ id: element.Id + "-sky", name: element.Name });
  }

  ids.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  let data = JSON.stringify(ids);
  fs.writeFileSync("countriees.json", data);
  console.log(ids);
}
getCountries();
