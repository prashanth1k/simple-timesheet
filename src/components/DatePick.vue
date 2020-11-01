<template>
  <!-- Todo: This needs cleaning up - either incl. date format or remove them -->
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :nudge-right="40"
    scrollable
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="dateDisplay"
        outlined
        :label="label"
        append-icon="mdi-calendar"
        readonly
        :dense="dense"
        :hide-details="hideDetails"
        :disabled="disabled"
        @click:append="menu = true"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      no-title
      scrollable
      :min="min"
      :max="max"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "" },
    appendIcon: { type: String, default: "mdi-calendar" },
    field: { type: String, default: "" },
    dense: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    min: {
      type: String,
      default: () => {
        const dt = new Date();
        dt.setDate(dt.getDate() - 30);
        return dt.toISOString().substring(0, 10);
      },
    },
    max: {
      type: String,
      default: () => {
        const dt = new Date();
        dt.setDate(dt.getDate() + 365);
        return dt.toISOString().substring(0, 10);
      },
    },
  },
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      localField: "",
      dateValue: "",
    };
  },
  computed: {
    dateDisplay: {
      get() {
        return this.dateValue;
      },
      set(val) {
        this.$emit("update:field", val);
      },
    },
    localFieldFmt: {
      get() {
        return this.formatDate(this.localField);
      },
      set(val) {
        this.$emit("update:field", val);
      },
    },
  },
  watch: {
    localFieldFmt(val) {
      this.$emit("update:field", val);
    },
    dateValue(val) {
      this.$emit("update:field", val);
    },
  },
  mounted() {
    this.dateValue = this.field;
    // this.localField = this.parseDate(this.field);
  },
  methods: {
    test() {
      console.log("wow");
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      //   return `${day}/${month}/${year}`;
      return `${year}-${month}-${day}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("-");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    setLocalFieldFmt(val) {
      this.localFieldFmt = val;
      this.localField = val ? this.parseDate(val) : null;
    },
  },
};
</script>
