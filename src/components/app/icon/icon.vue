<template>
  <svg :viewBox="viewbox"
       class="icon"
       width="1em" height="1em">
    <use :xlink:href="href"></use>
  </svg>
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
        return this.viewBox ? `0 0 ${this.viewBox}` : '0 0 20 20'
      }
    },
  };
</script>
