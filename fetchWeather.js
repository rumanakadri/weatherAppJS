import fs from 'fs' //library IOsystem (file system). Allows to read and write into the file which is collected from weather api
import path from 'path' 
import dotenv from 'dotenv'

dotenv.config()

const DATA_DIR = path.join(import.meta.dirname, 'data'); //Generates a path to the folder
//'data' is the folder name, import.meta.dirname - gives current path to the folder i.e WeatherAppJs

//Check if data folder exists or not
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

//Create json and cs file inside 'data' folder
const WEATHER_FILE = path.join(DATA_DIR, 'weather.json');
const LOG_FILE = path.join(DATA_DIR, 'weather_log.csv');

//console.log(import.meta.filename);
//console.log(`${process.argv[1]}`);

export async function fetchWeather(){
    console.log(WEATHER_FILE)
    const apiKey = process.env.WEATHER_API_KEY;
    const city = process.env.CITY || 'London'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try{
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`HTTP error! Status ${resp.status}`)
        }
        else {
            const data = await resp.json();
            const nowUTC = new Date().toISOString();
            data._last_updated_utc = nowUTC
            fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2)) 
            // data - data we want to write, null - replacer - if something needs to replace, 2 - spacer - indentation to make file look pretty.

            //Create csv with data obtained above
            const header = 'timestamp,city,temperature,description\n'
            if (!fs.existsSync(LOG_FILE)) {
                fs.writeFileSync(LOG_FILE, header) //creates a file with writeFileSync and adds header to the file
            }
            else {
                const firstLine = fs.readFileSync(LOG_FILE, 'utf8').split('\n')[0];
                if (firstLine !== 'timestamp,city,temperature,description'){
                    fs.writeFileSync(LOG_FILE, header + fs.readFileSync(LOG_FILE, 'utf8'))
                }
            }
            const logEnttry = `${nowUTC},${city},${data.main.temp},${data.weather[0].description}\n`;
        fs.appendFileSync(LOG_FILE, logEnttry);
        console.log(`Weather data updated for ${city} at ${nowUTC}`)
        }
    }
    catch(e) {
        console.log('Error fetching weather: ', e)
    }
}

//path of js node - process.argv[1]
if (import.meta.filename === `${process.argv[1]}`) {
    fetchWeather();
}