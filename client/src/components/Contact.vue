<template>
    <div class="row contact-item">
            <div class="container">
                <div class="row">
                    <div class="col-md-2 col-3">
                        <div class="avatar"><span class="text-white h2">{{contact.name.charAt(0).toUpperCase()  }}</span></div>
                    </div>
                    <div class="col-md-9 col-8">
                        <h3>{{contact.name}}</h3>
                        <span class="fw-bold">{{contact.number}}</span>
                        <p class="fw-semibold">{{contact.description}}</p>
                    </div>
                    <div class="col-1">
                        <div @click="$emit('delete-contact', contact.id)" class="delete">
                            <i class="fa-solid fa-trash-can "></i>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name : 'Contact',
    props : {
        contact : Object
    },
}
</script>

<style scoped>
    .avatar {
        margin: 5px;
        width: 50px;
        height: 50px;
        background-color: darkslateblue;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contact-item:hover {
        cursor: pointer;
    }

    .delete{
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .delete:hover{
        background-color: rgb(29, 11, 11);
    }
</style>