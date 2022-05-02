<template>
    <div class="upload-container" v-show="isOpen" @click.self="emit('closeModal')">
        <div class="upload" id="upload-modal">
            <img class="img-upload" v-show="fileSelected" :src="img" alt="image to post">
            <input class="upload-text" name="" type="text" placeholder="Share something..." v-model="caption" />

            <div class="buttons">
                <input type="file" id="upload-file" v-on:change="handleFileChange" />
                <label for="upload-file">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 64V48C64 39.16 71.16 32 80 32H144C152.8 32 160 39.16 160 48V64H192L242.5 38.76C251.4 34.31 261.2 32 271.1 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V128C0 92.65 28.65 64 64 64zM220.6 121.2C211.7 125.7 201.9 128 192 128H64V192H178.8C200.8 176.9 227.3 168 256 168C284.7 168 311.2 176.9 333.2 192H448V96H271.1L220.6 121.2zM256 216C207.4 216 168 255.4 168 304C168 352.6 207.4 392 256 392C304.6 392 344 352.6 344 304C344 255.4 304.6 216 256 216z"/></svg>
                </label>
                <div v-if="isLoading">Loading...</div>
                <button v-else @click="onSubmit" class="submit-btn" type="submit">Upload</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import {ref, getDownloadURL, uploadString} from '@firebase/storage'
import { onMounted, ref as vueRef }  from 'vue'
import { db, storage } from '../../firebase'

   const props = defineProps({
        currentUser: Object,
        isOpen: Boolean
   })

   const emit = defineEmits(['closeModal'])

    const caption = vueRef('')
    const img = vueRef('')
    const fileSelected = vueRef(false)
    const isLoading = vueRef(false)
                
    const handleFileChange = (e) => {
        const reader = new FileReader()

        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]) 
        }

        reader.onload = (readerEvent) => {
            img.value = readerEvent.target.result
        }

        fileSelected.value = true

    }
    
    const onSubmit = async (e) => {
        isLoading.value = true

        if (!caption.value && !img.value) {
            alert('POST CANNOT BE EMPTY!')
            return
        }

        const docRef = await addDoc(collection(db, 'posts'), {
            user: props.currentUser.name,
            caption: caption.value,
            timestamp: serverTimestamp()
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, img.value, "data_url").then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef)

            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            })
        })

        img.value = ''
        caption.value = ''
        fileSelected.value = false
        isLoading.value = false

        emit('closeModal')
    }
</script>