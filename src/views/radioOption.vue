<template>
  <v-radio>
    <template v-slot:label>
      <v-col class="d-flex">
        <v-text-field
          style="width: 280px"
          label="Radio Option"
          v-model="answer"
        ></v-text-field>
        <v-btn @click="deleteOption" x-small>X</v-btn>
      </v-col>
    </template>
  </v-radio>
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
    saveOptions() {
      this.$emit("saveOption", this.answer);
    },
  },
};
</script>