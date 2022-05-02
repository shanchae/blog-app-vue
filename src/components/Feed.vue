<template>
    <div class="feed">
        <div :key="post.id" v-for="post in posts">
            <Post 
                :post="post"
                :currentUser="currentUser"
            />
        </div>
    </div>
</template>

<script setup>
    import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
    import { onMounted, ref } from 'vue';
    import { db } from '../../firebase';
    import Post from './Post.vue';

    const posts = ref([])

    const props = defineProps({
        currentUser: Object
    })

    onMounted(() => {
        onSnapshot(query(collection(db, 'posts'), (orderBy("timestamp", "desc"))), (snapshot) => {
            posts.value = snapshot.docs
        })
    })


    
</script>