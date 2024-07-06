<template>
<div>
    <div :key="contact.id" v-for="contact in contacts" class="container-md shadow bg-dark-subtle rounded px-4 pt-2 mb-2">
        <Contact @delete-contact="$emit('delete-contact', contact.id)" @dblclick="$emit('edit-contact', contact.id)" :contact="contact" />
    </div>
</div>
</template>

<script>
import Contact from './Contact.vue'

export default {
    name: 'Contacts',
    props : {
        contacts : Array
    },
    components : {
        Contact
    },
}
</script>

