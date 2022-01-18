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
      ></component>
    </div>
     <v-col cols="12" align="right">
       <v-btn router :to="{ name: 'SurveyList' }">
        <font-awesome-icon icon="backspace" />
      </v-btn>
      <v-btn @click="save">
        save
      </v-btn>
     </v-col>
  </div>
</template>
<script>
 //:ref="`${funcRef(index)}`" 
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
      selected: ShortAnswer,
      refs:[],
      questionList: [],
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
    },
    funcRef(index) {
      if(this.refs.indexOf(index) === -1){
        this.refs.push(index)
      }
    },
    save() {
      //this.$refs.getQuestion.saveQ()
      //  Object.keys(this.$refs).forEach(el => {
      //   console.log( this.$refs[el][0] )
      // })
       this.$refs.getQuestion.saveQ()
       for(let i=0; i<this.questionList.length; i++) {
         this.$refs[i][0].saveQ()
       }
      // this.$refs[0][0].saveQ()
  
    },
    saveQuestion(Q) {
      this.questionList.push(Q)
      console.log(this.questionList)
    }


  }
};
</script>
