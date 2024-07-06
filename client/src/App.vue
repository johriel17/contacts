<template>
  <div class="container-md mt-5">
    <div class="row">
      <div class="col-md-6">
        <Contacts @delete-contact="deleteContact" :contacts="contacts" @edit-contact="editContact" />
      </div>
      <div class="col-md-6">
        <ContactForm
          @add-contact="addContact"
          @update-contact="updateContact"
          @cancel-edit="cancelEdit" 
          :errorMessage="errorMessage"
          :errors="errors"
          :formReset="formReset"
          :editingContact="editingContact"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Contacts from "./components/Contacts.vue";
import ContactForm from "./components/ContactForm.vue";

export default {
  name: "App",
  components: {
    Contacts,
    ContactForm,
  },
  data() {
    return {
      contacts: [],
      errorMessage: "",
      errors: {},
      formReset: false,
      editingContact: null, // Track the contact being edited
    };
  },
  methods: {
    async fetchContacts() {
      try {
        const res = await fetch('http://localhost:4000/api/contacts')
        // const res = await fetch("api/contacts");
        const data = await res.json();
        this.contacts = data;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },

    async deleteContact(id) {
      if(confirm('Are you sure?')){

        const res = await fetch(`http://localhost:4000/api/contacts/${id}`, {
          method: 'DELETE',
        })

        res.status === 200 ? (this.contacts = this.contacts.filter((contact) => contact.id !== id)) : alert('Error deleting')
      }
    },

    async addContact(contact) {
      try {
        const res = await fetch("http://localhost:4000/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });

        const data = await res.json();

        if (res.ok) {
          this.formReset = true;
          this.errorMessage = "";
          this.errors = {};
          this.contacts = [...this.contacts, data];
        } else {
          console.error("Failed to add contact", res.status, res.statusText);
          this.errorMessage = data.error;
          this.errors = data.errors;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async editContact(contactId) {
      try {
        const res = await fetch(`http://localhost:4000/api/contacts/${contactId}`);
        const data = await res.json();

        if (res.ok) {
          this.editingContact = data[0];
        } else {
          console.error("Failed to fetch contact for editing", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    cancelEdit() {
      this.editingContact = null
    },

    async updateContact(contact) {
      try {
        const res = await fetch(`http://localhost:4000/api/contacts/${contact.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });

        const data = await res.json();

        if (res.ok) {
          this.formReset = true;
          this.errorMessage = "";
          this.errors = {};

          const index = this.contacts.findIndex((c) => c.id === contact.id);
          if (index !== -1) {
            this.contacts.splice(index, 1, data);
          }
          this.editingContact = null;
        } else {
          console.error("Failed to update contact", res.status, res.statusText);
          this.errorMessage = data.error;
          this.errors = data.errors;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  async created() {
    await this.fetchContacts();
  },
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
