<template>
  <div class="container">
    <ul>
      <li>
        <v-link href="/">Home</v-link>
      </li>
      <li>
        <v-link href="/about">About</v-link>
      </li>
      <li>
        <v-link href="/contact">contact</v-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../components/app/vlink/vlink.vue'

  import '../components/main.css'

  export default {
    components: {
      VLink
    }
  }
</script>
