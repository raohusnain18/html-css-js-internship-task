const apiKey = "a2caace3f85506bcdebf38bb00ac2f9e";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML = "<p id='error'>Please enter a city name.</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 401) {
                weatherResult.innerHTML = "<p id='error'>Invalid API Key. Please check your key in the code.</p>";
            } else if (response.status === 404) {
                weatherResult.innerHTML = "<p id='error'>City not found. Please check the spelling.</p>";
            } else {
                weatherResult.innerHTML = `<p id='error'>Error: ${response.status} ${response.statusText}</p>`;
            }
            return;
        }

        const data = await response.json();
        const weatherCondition = data.weather[0].main.toLowerCase();
        setDynamicBackground(weatherCondition);

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = "<p id='error'>Failed to fetch weather data. Please try again.</p>";
    }
}

function setDynamicBackground(condition) {
    let imageUrl = "";
    if (condition.includes("clear")) {
        imageUrl = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1950&q=80";
    } else if (condition.includes("cloud")) {
        imageUrl = "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?auto=format&fit=crop&w=1950&q=80";
    } else if (condition.includes("rain")) {
        imageUrl = "https://images.unsplash.com/photo-1495748191663-9e7d8c6f34c0?auto=format&fit=crop&w=1950&q=80";
    } else if (condition.includes("snow")) {
        imageUrl = "https://images.unsplash.com/photo-1608889175280-52e52e5e7cfd?auto=format&fit=crop&w=1950&q=80";
    } else {
        imageUrl = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1950&q=80";
    }
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
