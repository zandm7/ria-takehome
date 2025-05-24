<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const weather = ref({})
const daily = ref([])
const firstDay = ref(0)

const apiKey = '9170e0e85794088df319259526c55afd'

const weatherURL = (coords) => {
  const [lat, lon] = coords
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
}

const weatherIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const coords = {
  losangeles: [34.05223, -118.24368],
  beijing: [39.9075, 116.39723],
  riodejaneiro: [-22.90278, -43.2075],
}

onMounted(async () => {
  refresh()
})

watch(
  () => route.params.city,
  async () => {
    refresh()
  },
)

const refresh = async () => {
  const latLon = coords[route.params.city]
  daily.value = []
  if (latLon) {
    const response = await fetch(weatherURL(latLon))
    weather.value = await response.json()
  }
  if (weather.value) {
    for (const i in weather.value.list) {
      const e = weather.value.list[i]
      const timestamp = e.dt_txt.split(' ')[1]
      if (timestamp === '00:00:00') {
        firstDay.value = Number(i)
        break
      }
    }
    let curIndex = 0
    while (curIndex < weather.value.list.length) {
      daily.value = daily.value ? daily.value : []
      if (curIndex === 0 && curIndex !== firstDay.value) {
        daily.value.push(weather.value.list.slice(curIndex, firstDay))
        curIndex += firstDay.value
      } else {
        daily.value.push(weather.value.list.slice(curIndex, curIndex + 8))
        curIndex += 8
      }
    }
    daily.value = daily.value.length
      ? daily.value.map((day) => {
          const temps = day ? day.map((hour) => hour.main.temp).sort() : []
          return {
            date: day[0].dt_txt.split(' ')[0],
            low: temps[0],
            high: temps[temps.length - 1],
            weather: day[0].weather[0],
          }
        })
      : null
  }
}
</script>

<template>
  <div class="weather" v-if="weather.list">
    <button @click="refresh">Refresh</button>
    <header>
      Hourly
      <ul>
        <div v-for="timestamp in weather.list.slice(0, 5)">
          <p>{{ timestamp.dt_txt }}</p>
          <img :src="weatherIcon(timestamp.weather[0].icon)" />
          <p>{{ timestamp.weather[0].description }}</p>
          <p>{{ timestamp.main.temp }}&deg;F</p>
          <p>{{ timestamp.main.humidity }}%</p>
        </div>
      </ul>
    </header>
    <header>
      Daily
      <ul>
        <div v-for="day in daily">
          <p>{{ day.date }}</p>
          <img :src="weatherIcon(day.weather!.icon)" />
          <p>{{ day.weather!.description }}</p>
          <p>High: {{ day.high }}&deg;F</p>
          <p>Low: {{ day.low }}&deg;F</p>
        </div>
      </ul>
    </header>
  </div>
  <div v-else>Whoops...</div>
</template>

<style>
.weather {
  display: flexbox;
  ul {
    display: flex;
    div {
      border: 1px solid white;
      padding: 10px;
      margin: 10px;
      width: fit-content;
    }
  }
}
</style>
