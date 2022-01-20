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
        {{ answer }}
      </v-col>
    </template>
  </v-checkbox>
</template>
<script>
export default {
  props: ["index"],
  data() {
    return {};
  },
  computed: {
    answer: {
      get() {
        return this.$store.state.answer;
      },
      set(value) {
        this.$store.commit("updateMessage", value);
      },
    },
  },
  methods: {
    deleteOption() {
      this.$emit("deleteOption", this.index);
    },
  },
  created() {
    this.$store.state.Question.answers.push({});
  },
};
</script>
