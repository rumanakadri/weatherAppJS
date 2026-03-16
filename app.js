import express from 'express'
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const DATA_DIR = path.join(import.meta.dirname, 'data');
const WEATHER_FILE = path.join(DATA_DIR, 'weather.json');
const LOG_FILE = path.join(DATA_DIR, 'weather_log.csv');
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');

app.use(express.static(PUBLIC_DIR));

app.get('/api/weather', (req, res) => {
    if(!fs.existsSync(WEATHER_FILE)) {
        return res.status(404).json({error: 'No weather available'})    
    }
    
    try {
        const weatherData = JSON.parse(fs.readFileSync(WEATHER_FILE, 'utf8'))
        res.json(weatherData);
    }
    catch(e) {
        console.log('Error reading weather.json', e)
        res.status(500).json({error: 'Failed to read weather data'})
    }
})

app.get('/api/weather-log', (req, res) => {
    if(!fs.existsSync(LOG_FILE)) {
        return res.status(404).json({error:'No weather log available'})
    }
    const timestamps = [];
    const temperatures = [];

    //to read file line by line
    fs.createReadStream(LOG_FILE)
        .pipe(csv())
        .on('data', row => {
            if (row.timestamp && row.temperature){
                timestamps.push(row.timestamp)
                temperatures.push(parseFloat(row.temperature))
            }
        })
        .on('end', () => res.json({timestamps, temperatures}))
        .on('error', err => {
            console.log('Error reading CSV:', err)
            res.status(500).json({error:'Failed to read log'})
        })
})

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})