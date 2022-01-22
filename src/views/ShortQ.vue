<template>
  <div>
    <br />
    <p>Q. {{ this.question }}</p>
    <v-col cols="12" md="5">
      <v-text-field v-model="answer" label="단답형입니다."></v-text-field>
    </v-col>
  </div>
</template>
<script>
export default {
  props: ["question"],
};
</script>