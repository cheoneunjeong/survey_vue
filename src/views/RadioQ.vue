<template>
  <div>
    <br />
    <p>Q. {{ this.question }}</p>
    <v-container class="px-0" fluid>
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="(item, index) in this.answers"
          :key="index"
          :label="item.answer"
          :value="item.answer"
        ></v-radio>
      </v-radio-group>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["question", "answers"],
  data() {
    return {
      radioGroup: 1,
    };
  },
};
</script>