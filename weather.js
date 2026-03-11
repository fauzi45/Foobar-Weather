require('dotenv').config();

const config = {
  apiKey: process.env.OPENWEATHER_API_KEY,
  lat: '-6.2088',
  lon: '106.8456',
  buildUrl() {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`;
  }
};

async function getWeatherData() {
  const url = config.buildUrl();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Weather Forecast:')
    return data;
  } catch (error) {
    console.error("Gagal mengambil data prakiraan cuaca:", error);
  }
}

getWeatherData().then(forecast => {
  if (forecast) {
    const seen = new Set();
    forecast.list.forEach(item => {
      if (seen.size >= 6) return;
      const dateTime = item.dt_txt;
      const date = dateTime.split(' ')[0];
      if (!seen.has(date)) {
        seen.add(date);
        const temp = item.main.temp;
        const d = new Date(dateTime);
        const wk = d.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = d.toLocaleDateString('en-US', { day: '2-digit' });
        const mon = d.toLocaleDateString('en-US', { month: 'short' });
        const yr = d.getFullYear();
        const formatted = `${wk}, ${dayNum} ${mon} ${yr}`;
        console.log(`${formatted}: ${temp}°C`);
      }
    });
  } else {
    console.log("Tidak ada data prakiraan tersedia.");
  }
});