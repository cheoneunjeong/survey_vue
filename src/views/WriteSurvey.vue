<template>
  <div style="width: 100%">
    <v-col class="mx-auto" cols="12" sm="6">
      <v-textarea
        label="제목없는 설문지"
        auto-grow
        outlined
        rows="3"
        row-height="30"
        shaped
      >
      </v-textarea>
      <v-text-field label="설문지 설명"></v-text-field>
    </v-col>
    <br />
    <div>
      <ShortAnswer @addQuestion="addQuestion" />
      <component
        @addQuestion="addQuestion"
        @deleteQuestion="deleteQuestion"
        v-for="item in Questions"
        :is="item"
        v-bind:key="item.index"
      ></component>
    </div>
    <!-- <br />
    <div>
      <LongAnswer />
    </div>
    <br />
    <div>
      <RadioAnswer />
    </div>
    <br />
    <div>
      <CheckBox />
    </div>
    <br />
    <div>
      <DropDown />
    </div> -->
  </div>
</template>
<script>
import ShortAnswer from "@/views/ShortAnswer";
// import LongAnswer from "@/views/LongAnswer";
// import RadioAnswer from "@/views/RadioAnswer";
// import CheckBox from "@/views/CheckBox.vue";
// import DropDown from "@/views/DropDown.vue";

export default {
  data() {
    return {
      Questions: [],
    };
  },
  components: {
    ShortAnswer,
    // LongAnswer,
    // RadioAnswer,
    // CheckBox,
    // DropDown,
  },
  methods: {
    addQuestion() {
      this.Questions.push(ShortAnswer);
    },
    deleteQuestion(index) {
      this.Questions.splice(this.Questions.indexOf(index), 1);
    },
  },
};
</script>
