<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div>
          <v-col cols="12" sm="6" md="10">
            <v-text-field
              v-model="question"
              label="제목없는 질문"
            ></v-text-field>
          </v-col>
        </div>
        <v-container fluid>
          <component
            @deleteOption="deleteOption"
            v-for="(item, index) in Options"
            :is="item"
            v-bind:key="index"
            :ref="index"
            :index="index"
          ></component>
          <v-col>
            <v-btn rounded text @click="addOption">
              <font-awesome-icon icon="plus-circle" />
              옵션 추가
            </v-btn>
          </v-col>
        </v-container>
      </v-list-item-content>
      <v-col class="d-flex" cols="12" sm="6">
        <v-btn rounded>
          <font-awesome-icon icon="image" />
        </v-btn>
        <v-spacer></v-spacer>
        <v-select
          @change="selectQuestion"
          v-model="selected"
          :items="items"
          label="Question type"
          dense
          solo
        ></v-select>
      </v-col>
    </v-list-item>
    <buttons @deleteQuestion="deleteQuestion" @addQuestion="addQuestion" />
    <v-btn @click="get"></v-btn>
  </v-card>
</template>


<script>
import buttons from "@/views/buttons";
import checkOption from "@/views/checkOption";

export default {
  props: ["index"],
  data: () => ({
    question: "",
    selected: "",
    Options: [],
    answers: [],
    items: ["ShortAnswer", "LongAnswer", "RadioAnswer", "CheckBox", "DropDown"],
  }),
  components: {
    buttons,
    checkOption,
  },
  methods: {
    addQuestion() {
      this.$emit("addQuestion");
    },
    deleteQuestion() {
      this.$emit("deleteQuestion", this.index);
    },
    selectQuestion() {
      this.$emit("selectQuestion", this.selected);
    },
    addOption() {
      this.Options.push(checkOption);
    },
    deleteOption(index) {
      this.Options.splice(index, 1);
    },
    saveQ() {
      for (let i = 0; i < this.Options.length; i++) {
        let a = this.$refs[i][0].answer;
        this.answers.push(a);
      }
      let Q = {
        question: this.question,
        answers: this.answers,
        type: "check",
      };
      this.$emit("saveQ", Q);
    },
    get() {
      console.log(this.$store.answer);
    },
  },
};
</script>