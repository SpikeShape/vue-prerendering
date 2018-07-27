<template>
  <main-layout>
    <p>Home</p>
    <teaser-list />
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/main.vue'
import TeaserList from '../components/app/teaser-list/teaser-list.vue'

export default {
  components: {
    MainLayout,
    TeaserList
  }
}
</script>
