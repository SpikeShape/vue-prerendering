<template>
  <span class="icon">
    <svg :viewBox="viewbox">
      <use :xlink:href="href"></use>
    </svg>
  </span>
</template>

<script>
  const files = require.context('./img', false, /.*\.svg$/);
  files.keys().forEach(files);

  export default {
    name: 'icon',
    props: {
      type: String,
      viewBox: String,
    },
    computed: {
      href() {
        return `#${this.type}`;
      },
      viewbox() {
        return this.viewBox ? `0 0 ${this.viewBox}` : false
      }
    },
  };
</script>
