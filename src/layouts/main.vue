<template>
  <div class="container">
    <Logo></Logo>
    <ul>
      <li>
        <nav-link href="/">Home</nav-link>
      </li>
      <li>
        <nav-link href="/about">About</nav-link>
      </li>
      <li>
        <nav-link href="/contact">contact</nav-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
  import NavLink from '../components/app/_util/nav-link/nav-link'
  import Logo from '../components/app/logo/logo.vue'

  import '../components/main.css'

  export default {
    components: {
      NavLink,
      Logo
    }
  }
</script>
