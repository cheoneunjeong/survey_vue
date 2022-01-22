<template>
  <div>
    <br />
    <p>Q. {{ this.question }}</p>
    <v-container class="px-0" fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="items" label="Outlined style" outlined></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["question", "answers"],
  data() {
    return {
      items: [],
    };
  },
  created() {
    for (let i = 0; i < this.answers.length; i++) {
      this.items.push(this.answers[i].answer);
    }
  },
};
</script>