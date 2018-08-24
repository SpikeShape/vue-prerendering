<template>
  <div class="container">
    <Logo></Logo>
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
  import Logo from '../components/app/logo/logo.vue'

  import '../components/main.css'

  export default {
    components: {
      VLink,
      Logo
    }
  }
</script>
