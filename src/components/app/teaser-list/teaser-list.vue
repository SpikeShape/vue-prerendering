<template>
    <ul>
        <li v-for="post in posts" v-if="post.title" :key="'id-' + post.id">
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
    import posts from './teasers.json';

    export default {
        name: 'posts',
        data () {
            return { posts }
        }
    }
</script>
