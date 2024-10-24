// api.js
import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.map(country => country.name.common);
  } catch (error) {
    throw new Error('Error fetching countries: ' + error.message);
  }
};
