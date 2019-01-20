<template>
  <a
    :href="href"
    :class="{ active: isActive }"
  >
    <slot></slot>
  </a>
</template>

<script>
  export default {
    props: {
      href: {
        type: String,
        required: true
      }
    },
    computed: {
      isActive () {
        return this.href === window.location.pathname.split('.html')[0]
      }
    }
  }
</script>
