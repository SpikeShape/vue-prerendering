<template>
  <svg viewBox="0 0 20 20"
       class="icon"
       width="1em" height="1em">
    <use :xlink:href="href"></use>
  </svg>
</template>

<script>
  import iconTypes from '../icon/icon-types.js';

  export default {
    name: 'icon',
    data() {
      return {
        iconTypes: iconTypes.map(icon => ({
          type: icon.type,
          name: icon.name
        })),
      }
    },
    props: {
      type: String,
    },
    computed: {
      href() {
        return `#${this.type}`;
      },
    },
  };
</script>
