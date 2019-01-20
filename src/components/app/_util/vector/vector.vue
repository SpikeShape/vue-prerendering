<template>
  <span class="vector" v-once v-html="src">
  </span>
</template>

<script>
  export default {
    props: [ 'src' ]
  }
</script>
