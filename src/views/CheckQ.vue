<template>
  <div>
    <br />
    <p>Q. {{ this.question }}</p>
    <v-container class="px-0" fluid>
      <v-checkbox
        v-for="(item, index) in this.answers"
        :key="index"
        v-model="selected"
        :label="item.answer"
        :value="item.answer"
      ></v-checkbox>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["question", "answers"],
  data() {
    return {
      selected: [],
    };
  },
};
</script>