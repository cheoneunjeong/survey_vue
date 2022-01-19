 <template>
  <v-col class="d-flex">
    <v-text-field
      v-model="answer"
      style="width: 5px"
      label="DropDown Option"
    ></v-text-field>
    <v-btn @click="deleteOption" x-small>X</v-btn>
  </v-col>
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