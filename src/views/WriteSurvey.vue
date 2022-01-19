<template>
  <div style="width: 100%">
    <v-col class="mx-auto" cols="12" sm="6">
      <v-textarea
        v-model="title"
        label="제목없는 설문지"
        auto-grow
        outlined
        rows="3"
        row-height="30"
        shaped
      >
      </v-textarea>
      <v-text-field v-model="disc" label="설문지 설명"></v-text-field>
    </v-col>
    <br />
    <div>
      <component
        :is="selected"
        @addQuestion="addQuestion"
        @selectQuestion="changeType"
        @saveQ="saveQuestion"
        ref="getQuestion"
      />
      <component
        @selectQuestion="selectQuestion"
        @addQuestion="addQuestion"
        @deleteQuestion="deleteQuestion"
        @saveQ="saveQuestion"
        v-for="(item, index) in Questions"
        :is="item"
        v-bind:key="index"
        :ref="index"
        :index="index"
      ></component>
    </div>
    <v-col cols="12" align="right">
      <v-btn router :to="{ name: 'SurveyList' }">
        <font-awesome-icon icon="backspace" />
      </v-btn>
      <v-btn @click="save"> save </v-btn>
    </v-col>
  </div>
</template>
<script>
import ShortAnswer from "@/views/ShortAnswer";
import LongAnswer from "@/views/LongAnswer";
import RadioAnswer from "@/views/RadioAnswer";
import CheckBox from "@/views/CheckBox.vue";
import DropDown from "@/views/DropDown.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      Questions: [],
      selectedType: "",
      selected: ShortAnswer,
      questionList: [],
      title: "",
      disc: "",
    };
  },
  components: {
    ShortAnswer,
    LongAnswer,
    RadioAnswer,
    CheckBox,
    DropDown,
  },
  methods: {
    ...mapActions(["CreateSurvey"]),

    addQuestion() {
      this.Questions.push(ShortAnswer);
    },
    deleteQuestion(num) {
      this.Questions.splice(this.Questions.indexOf(num), 1);
    },
    selectQuestion(selectedType, index) {
      this.Questions.splice(this.Questions.indexOf(index), 1);
      if (selectedType === "LongAnswer") {
        this.Questions.push(LongAnswer);
      } else if (selectedType === "RadioAnswer") {
        this.Questions.push(RadioAnswer);
      } else if (selectedType === "CheckBox") {
        this.Questions.push(CheckBox);
      } else {
        this.Questions.push(DropDown);
      }
    },
    changeType(selectedType) {
      this.selected = selectedType;
    },
    save() {
      this.$refs.getQuestion.saveQ();
      for (let i = 0; i < this.Questions.length; i++) {
        this.$refs[i][0].saveQ();
      }
    },
    saveQuestion(Q) {
      this.questionList.push(Q);
      if (this.questionList.length === this.Questions.length + 1) {
        let survey = {
          questions: this.questionList,
          title: this.title,
          disc: this.disc,
        };
        this.CreateSurvey(survey);
      }
    },
  },
};
</script>
