"use strict";

// Global Variables

/* Get Today's date */
const todayDate = new Date().toString().split(" ");
const todayDay = `${todayDate[0]}, ${todayDate[2]}`;

/* Displayed Info */
const weather = document.querySelector("#weather");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

/* User Input */
const zipCode = document.querySelector("#zip");
const userfeelings = document.querySelector("#feelings");

/* Generate Button */
const btnGenerate = document.querySelector("#generate");

// Personal API Key for OpenWeatherMap API
const apiKey = "46ac6cf49501cb639343c8e4dabcd677";

// Base OpenWeather Url
const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}&units=metric";

/* Function called by event listener */
const generateWeatherData = async (evt) => {
  evt.preventDefault();

  const code = parseInt(zipCode.value);
  if (!code) {
    content.innerHTML = "Please enter the zip code in a number format";
    return;
  }

  try {
    const url = baseUrl
      .replace("{zip code}", code)
      .replace("{API key}", apiKey);
    const data = await getWeatherData(url);
    const weatherData = {
      temp: Math.round(data.main.temp),
      date: todayDay,
      userResponse: userfeelings.value,
      weather: data.weather[0].main,
      city: data.name,
    };

    const res = await postData("/add", weatherData);
    console.log(res.msg);

    const projectData = await getProjectData("/all");
    temp.innerHTML = projectData.temp;
    date.innerHTML = projectData.date;
    content.innerHTML = projectData.userResponse;
    weather.innerHTML = projectData.weather;
    city.innerHTML = projectData.city;
  } catch (err) {
    content.innerHTML = "Please enter a valid zip code";
    console.log(err);
  }
};

// Event listener to add function to existing HTML DOM element
btnGenerate.addEventListener("click", generateWeatherData);

/* Function to GET Web API Data*/
const getWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/* Function to POST data */
const postData = async (url, postData) => {
  try {
    const axiosConfig = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(url, postData, axiosConfig);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/* Function to GET Project Data */
const getProjectData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
