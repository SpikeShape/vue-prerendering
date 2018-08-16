<template>
  <ul>
    <li v-for="post in posts" v-if="post.title" :key="'id-' + post.id">
      <icon type="lorem-ipsum" class="icon-lorem-ipsum"></icon>
      <template v-if="post.href">
        <a :href="post.href">
          <h1 v-if="post.highlight">
            {{post.title}}
          </h1>
          <h2 v-else>{{post.title}}</h2>
          <strong>
            {{post.summary}}
          </strong>
          <p>
            {{post.content}}
          </p>
        </a>
      </template>
      <template v-else>
        <h1 v-if="post.highlight">
          {{post.title}}
        </h1>
        <h2 v-else>{{post.title}}</h2>
        <strong>
          {{post.summary}}
        </strong>
        <p>
          {{post.content}}
        </p>
      </template>
    </li>
  </ul>
</template>

<script>
  import posts from './teaser-data.json';
  import Icon from '../icon/icon.vue';

  export default {
    name: 'posts',
    components: {
      Icon
    },
    data () {
      return {
        posts
      }
    }
  }
</script>
