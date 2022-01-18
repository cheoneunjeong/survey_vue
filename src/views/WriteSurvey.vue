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
      <component :is="selected"
      @addQuestion="addQuestion" @selectQuestion="changeType"/>
      <component
        @selectQuestion="selectQuestion"
        @addQuestion="addQuestion"
        @deleteQuestion="deleteQuestion"
        v-for="(item, index) in Questions"
        :is="item"
        v-bind:key="index"
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
import LongAnswer from "@/views/LongAnswer";
import RadioAnswer from "@/views/RadioAnswer";
import CheckBox from "@/views/CheckBox.vue";
import DropDown from "@/views/DropDown.vue";

export default {
  data() {
    return {
      Questions: [],
      selectedType:'',
      selected: ShortAnswer
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
    addQuestion() {
      this.Questions.push(ShortAnswer);
    },
    deleteQuestion(index) {
      this.Questions.splice(this.Questions.indexOf(index), 1);
    },
    selectQuestion(selectedType, index) {
     this.Questions.splice(this.Questions.indexOf(index), 1);
     if(selectedType==='LongAnswer'){
       this.Questions.push(LongAnswer);
     }else if(selectedType==='RadioAnswer'){
       this.Questions.push(RadioAnswer);
     }else if(selectedType==='CheckBox'){
       this.Questions.push(CheckBox);
     }else {this.Questions.push(DropDown);}
    },
    changeType(selectedType){
      this.selected = selectedType
    }
  }
};
</script>
