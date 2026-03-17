async function loadWeather() {
    try {
        const res = await fetch('/api/weather')
        //console.log(res)
        const weather = await res.json()
        //console.log(weather)

        document.getElementById('weather').innerHTML = `
            <h2>${weather.name}</h2>
            <p>Temperature: ${weather.main.temp}C</p>
            <p>Condition: ${weather.weather[0].description}</p>
        `
    }
    catch(e) {
        document.getElementById('weather').innerHTML = '<p>Failed to load weather data</p>'
        console.error(e);
    }
}

async function loadChart() {
    try {
        const res = await fetch('/api/weather-log')
        console.log(res)
        const {timestamps, temperatures} = await res.json()

        const trace= {
            x: timestamps,
            y:temperatures,
            type:'scatter',
            mode: 'lines+markers',
            line: {
                color: 'purple'
            }
        }
        const layout = {
            title:'Temperature Over Time',
            xaxis: {title: 'Date', type : 'date'},
            yaxis: {title: 'Temperature C'},
            legend: {orientation: 'h', x:0, y: 1.1}
        }

        Plotly.newPlot('chart', [trace], layout)
    }
    catch (e) {
        console.error('Failed tp load chart', e)
    }
}

loadWeather()
loadChart()