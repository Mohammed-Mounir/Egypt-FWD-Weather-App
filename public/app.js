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
const generateWeatherData = () => {
  getWeatherData(
    baseUrl.replace("{zip code}", zipCode.value).replace("{API key}", apiKey)
  ).then((data) => {
    const weatherData = {
      temp: data.main.temp,
      date: todayDay,
      userResponse: userfeelings.value,
      weather: data.weather[0].main,
      city: data.name,
    };
    postData("/add", weatherData).then((res) => {
      console.log(res.msg);
      getProjectData("/all").then((data) => {
        temp.innerHTML = data.temp;
        date.innerHTML = data.date;
        content.innerHTML = data.userResponse;
        weather.innerHTML = data.weather;
        city.innerHTML = data.city;
      });
    });
  });
};

// Event listener to add function to existing HTML DOM element
btnGenerate.addEventListener("click", generateWeatherData);

/* Function to GET Web API Data*/
const getWeatherData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error: " + err);
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const msg = await response.json();
    return msg;
  } catch (err) {
    console.log("Error: " + err);
  }
};

/* Function to GET Project Data */
const getProjectData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error: " + err);
  }
};
