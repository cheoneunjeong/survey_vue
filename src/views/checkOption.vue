<template>
  <v-checkbox>
    <template v-slot:label>
      <v-col class="d-flex">
        <v-text-field
          style="width: 50px"
          label="CheckBox Option"
          v-model="answer"
        ></v-text-field>
        <v-btn @click="deleteOption" x-small>X</v-btn>
      </v-col>
    </template>
  </v-checkbox>
</template>
<script>
export default {
  props: ["index"],
  data() {
    return {
      answer: "",
    };
  },
  methods: {
    deleteOption() {
      this.$emit("deleteOption", this.index);
    },
  },
};
</script>
