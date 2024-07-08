<template>
  <div class="container bg-dark-subtle shadow rounded px-4 py-2 mb-2">
    <form @submit.prevent="onSubmit">
      <h3>{{ editingContact ? 'Edit Contact' : 'Add Contact' }}</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              :class="['form-control', errors && errors.name ? 'border-danger' : '']"
              type="text"
              v-model="name"
              name="name"
              placeholder="name"
              autocomplete="off"
            />
            <span v-show="errors.name" class="text-danger">{{ errors.name }}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="number">Number:</label>
            <input
              :class="['form-control', errors && errors.number ? 'border-danger' : '']"
              v-model="number"
              type="text"
              name="number"
              placeholder="number"
              autocomplete="off"
            />
            <span v-show="errors.number" class="text-danger">{{ errors.number }}</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          :class="['form-control', errors && errors.description ? 'border-danger' : '']"
          v-model="description"
          type="text"
          name="description"
        ></textarea>
        <span v-show="errors.description" class="text-danger">{{ errors.description }}</span>
      </div>
      <div class="d-flex justify-content-end gap-2 py-2">
          
        <input class="btn btn-success" type="submit" :value="editingContact ? 'Update contact' : 'Add contact'" />
        <button @click.prevent="$emit('cancel-edit')" v-show="editingContact" class="btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
  props: {
    errorMessage: String,
    errors: Object,
    formReset: Boolean,
    editingContact: Object, 
  },
  data() {
    return {
      name: "",
      number: "",
      description: "",
    };
  },
  watch: {
    formReset(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetForm();
      }
    },
    editingContact(newVal, oldVal) {
      // Populate form fields when editingContact prop changes
      if (newVal) {
        this.name = newVal.name || "";
        this.number = newVal.number || "";
        this.description = newVal.description || "";
      } else {
        this.resetForm();
      }
    },
  },
  methods: {
    onSubmit() {
      const contactData = {
        id: this.editingContact ? this.editingContact.id : null,
        name: this.name,
        number: this.number,
        description: this.description,
      };

      if (this.editingContact) {
        this.$emit("update-contact", contactData);
      } else {
        this.$emit("add-contact", contactData);
      }
    },
    resetForm() {
      this.name = "";
      this.number = "";
      this.description = "";

    },
  },
};
</script>
