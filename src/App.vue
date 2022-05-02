<template>
  <Header 
    @sign-in="handleSignIn"
    @sign-out="handleSignOut"
    @upload="handleUpload"
    :currentUser="currentUser"
    :isLoggedIn="isLoggedIn"
  />
  <Feed 
    :currentUser="currentUser"
  />
  <Upload 
    :currentUser="currentUser"
    :isLoggedIn="isLoggedIn"
    :isOpen="isOpen"
    @closeModal="closeModal"
  />
</template>

<script setup>
  import Header from './components/Header.vue';
  import Feed from './components/Feed.vue';
  import Upload from './components/Upload.vue';

  import { onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'
  import { onMounted, ref } from 'vue';
  import { auth, provider } from '../firebase'

    const currentUser = ref(null)
    const isOpen = ref(false)
    const isLoggedIn = ref(false)

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user){
          isLoggedIn.value = true
          currentUser.value = {
          email: user.email,
          name: user.displayName,
          img: user.photoURL
          }

        } else {
          isLoggedIn.value = false
        }
      })
    })
 
    const handleSignIn = () => {
      signInWithPopup(auth, provider)
    }

    const handleSignOut = () => {
      signOut(auth, provider)
    }

    const handleUpload = () => {
      isOpen.value = true
    }

    const closeModal = () => {
      isOpen.value = false
    }
</script>
