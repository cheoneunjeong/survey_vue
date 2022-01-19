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
          <v-radio>
            <template v-slot:label>
              <v-text-field
                style="width: 280px"
                label="Radio Option"
                v-model="option"
              ></v-text-field>
            </template>
          </v-radio>
          <component
            @deleteOption="deleteOption"
            @saveOption="saveOption"
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
  </v-card>
</template>


<script>
import buttons from "@/views/buttons";
import raidoOption from "@/views/radioOption";

export default {
  props: ["index"],
  data: () => ({
    question: "",
    selected: "",
    option: "",
    Options: [],
    items: ["ShortAnswer", "LongAnswer", "RadioAnswer", "CheckBox", "DropDown"],
  }),
  components: {
    buttons,
    raidoOption,
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
      this.Options.push(raidoOption);
    },
    deleteOption(index) {
      this.Options.splice(this.Options.indexOf(index), 1);
    },
    saveOption(answer) {
      this.Options.push(answer);
    },
    saveQ() {
      this.Options.push(this.option);
      for (let i = 0; i < this.Options.length; i++) {
        this.Options.push(this.$refs[i][0].answer);
        //this.$refs[i][0].saveOptions();
      }
      let Q = {
        question: this.question,
        Answers: this.Options,
      };
      this.$emit("saveQ", Q);
    },
  },
};
</script>