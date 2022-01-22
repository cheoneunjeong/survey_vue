<template>
  <div style="width: 100%">
    <v-card class="mx-auto" width="80%">
      <v-card-text>
        <div>survey num_{{ SurveyDetail.s_num }}</div>
        <p class="text-h4 text--primary">{{ SurveyDetail.title }}</p>
        <p>{{ SurveyDetail.datetime }}</p>
        <br />
        <component
          v-for="(item, index) in SurveyDetail.questions"
          :is="item.t"
          :key="index"
          :question="item.q"
          :answers="item.answers"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4"> submit </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShortQ from "../views/ShortQ.vue";
import LongQ from "../views/LongQ.vue";
import RadioQ from "../views/RadioQ.vue";
import CheckQ from "../views/CheckQ.vue";
import DropQ from "../views/DropQ.vue";

export default {
  components: { ShortQ, LongQ, RadioQ, CheckQ, DropQ },
  data() {
    return {};
  },
  computed: {
    ...mapState(["SurveyDetail"]),
  },
};
</script>