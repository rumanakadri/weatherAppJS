# Weather App - DataOps

## Description

The Weather App - DataOps project is a Node.js-based application that automatically fetches, stores, and visualizes weather data for a specified city. It integrates with a weather API to retrieve real-time data at regular intervals and saves it locally for further analysis and tracking.

This project demonstrates a simple DataOps pipeline, combining data ingestion, storage, and visualization. It includes automation using scripts and CI/CD workflows, enabling continuous data updates without manual intervention.

Users can view the latest weather conditions along with historical trends through a web interface, making it useful for monitoring changes over time. The application also supports containerization using Docker for easy deployment and scalability.

## Installation
- Clone this repo
- On your terminal
    - `cd` to root folder
    - delete data folder to start your own 
    - setup `.env` with:
        - `PORT` of your choosing
        - `API_KEY` from operweather
        - `CITY` of your choosing
    - `npm i` to install dependencies
    - `node fetchWeather.js` to create/update data folder
    - `node app.js` to start server
- Open browser on `PORT` to see weather and graph

## Using Docker

- Open your Docker Desktop
- Make sure you are on same path as Dockerfile
- On your terminal run:
    - `docker build -t <app-name>:<tag> .` or `docker build -t weatherapp:1.0 .` - to build an image based on Dockerfile
    - `docker run -p <local-port>:<container-port> <image-name>` or `docker run -p 3000:5000 weatherapp` - to run a container based on an image

## Tests

We have tests to check if files inside the data folder is correct.
