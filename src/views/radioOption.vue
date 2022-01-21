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
  props: ["index", "qindex"],
  data() {
    return {};
  },
  computed: {
    answer: {
      get() {
        return this.$store.state.Survey.questions[this.qindex].answers[
          this.index
        ].answer;
      },
      set(value) {
        let data = { value: value, index: this.index, qindex: this.qindex };
        this.$store.commit("updateAnswer", data);
      },
    },
  },
  methods: {
    deleteOption() {
      console.log("여긴 옵션" + this.index);
      this.$emit("deleteOption", this.index);
    },
  },
  created() {
    this.$store.state.Survey.questions[this.qindex].answers.push({
      answer: {},
    });
  },
};
</script>