<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div>
          <v-col cols="12" sm="6" md="10">
            <v-text-field v-model="question" label="제목없는 질문"></v-text-field>
          </v-col>
        </div>
        <v-container fluid>
          <template>
            <v-text-field label="DropDown Option"></v-text-field>
          </template>
          <v-col>
            <v-btn rounded text>
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
        <v-select @change="selectQuestion" v-model="selected" :items="items" label="Question type" dense solo></v-select>
      </v-col>
    </v-list-item>
    <buttons @deleteQuestion="deleteQuestion" @addQuestion="addQuestion" />
  </v-card>
</template>


<script>
import buttons from "@/views/buttons";

export default {
  data: () => ({
    question:'',
    selected: '',
    items: [
      "ShortAnswer",
      "LongAnswer",
      "RadioAnswer",
      "CheckBox",
      "DropDown",
    ],
  }),
  components: {
    buttons,
  },
  methods: {
    addQuestion() {
      this.$emit("addQuestion");
    },
    deleteQuestion() {
      this.$emit("deleteQuestion");
    },
    selectQuestion() {
      this.$emit("selectQuestion", this.selected)
    },
  },
};
</script>