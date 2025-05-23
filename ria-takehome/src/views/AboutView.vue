<script setup lang="ts">
import { onMounted, ref } from 'vue'

const weatherLA = ref(null)
const weatherBei = ref(null)

onMounted(async () => {
  console.log(`the component is now mounted.`)
  const losAngeles = await fetch(
    'http://api.openweathermap.org/data/2.5/forecast?lat=34.05223&lon=-118.24368&appid=9170e0e85794088df319259526c55afd&units=imperial',
  )
  const beijing = await fetch(
    'http://api.openweathermap.org/data/2.5/forecast?lat=39.9075&lon=116.39723&appid=9170e0e85794088df319259526c55afd&units=imperial',
  )
  weatherLA.value = await losAngeles.json()
  weatherBei.value = await beijing.json()
  console.log(weatherLA)
  console.log(weatherBei)
})
</script>

<template>
  <div class="about">
    <ul v-if="weatherLA">
      <li v-for="day in weatherLA.list">
        {{ day.dt_txt }}
        <br />
        {{ day.main.temp }}
      </li>
    </ul>
    <ul v-if="weatherBei">
      <li v-for="day in weatherBei.list">
        {{ day.dt_txt }}
        <br />
        {{ day.main.temp }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
