<template>
  <div align="center">
    <v-card color="white" width="70%">
      <v-toolbar color="grey lighten-3" flat>
        <span class="font-weight-black h6">Daily Timesheet</span>
        <v-spacer></v-spacer>
        <v-btn
          small
          class="mr-2"
          @click="resetAfterConfirm"
          aria-label="Reset timesheet. Delete all entries below."
          data-microtip-position="bottom"
          role="tooltip"
        >
          <v-icon small dark>mdi-delete-sweep</v-icon> Reset
        </v-btn>
        <v-menu offset-y close-on-content-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              class="mr-2"
              aria-label="Download timesheet."
              data-microtip-position="bottom"
              role="tooltip"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small dark>mdi-download</v-icon>
              Export
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in downloadItems"
              :key="index"
              @click="invokeAction(item.action)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          color="primary"
          small
          class="mr-2"
          @click="newDayTime"
          v-shortkey="['alt', 'shift', 'n']"
          @shortkey="newDayTime()"
          aria-label="Create new time. [alt+shift+n]"
          data-microtip-position="bottom"
          role="tooltip"
        >
          <v-icon small dark>mdi-plus</v-icon>Add
        </v-btn>
      </v-toolbar>
      <v-container>
        <div align="left" class="pl-3 pr-3">
          <label for="todayDate" class="font-weight-bold grey--text">
            Date
          </label>
          <DatePick
            name="todayDate"
            :field="dayDate"
            @update:field="setDayDate($event)"
            :dense="true"
          ></DatePick>
          <div class="text-h6" align="left">
            Total Hours:
            <span class="font-weight-bold" color="primary">
              {{ totalTime }}
            </span>
          </div>
        </div>
        <v-card
          flat
          color="transparent"
          height="400px"
          class="pl-3"
          style="overflow-y:auto; overflow-x:hidden"
        >
          <v-form @submit.prevent="addEntry">
            <v-row align="center" dense>
              <v-col cols="12" sm="10" align="left"> </v-col>
              <v-col
                cols="12"
                v-for="(dayTime, index) in dayTimes"
                :key="index"
              >
                <v-row dense>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      placeholder="What work is this for?"
                      v-model="dayTime['desc']"
                      dense
                      outlined
                      autofocus
                      @focus="activeIndex = index"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="2">
                    <v-text-field
                      dense
                      placeholder="Hours"
                      v-model="dayTime['time']"
                      outlined
                      type="number"
                      reverse
                      @focus="activeIndex = index"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" align="left">
                    <v-btn
                      fab
                      icon
                      small
                      @click="delDayTimeByIndex(activeIndex)"
                      v-shortkey="['alt', 'shift', 'del']"
                      @shortkey="delDayTimeByIndex(activeIndex)"
                      aria-label="Delete this entry. [alt+shift+del]"
                      data-microtip-position="bottom"
                      data-microtip-size="medium"
                      role="tooltip"
                    >
                      <v-icon color="grey">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-card>
    <confirm ref="confirm" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Daily",
  components: {
    DatePick: () => import("../components/DatePick"),
    Confirm: () => import("../components/Confirm"),
  },
  data() {
    return {
      activeIndex: 0,
      downloadItems: [
        { title: "CSV", action: "generateDownloadCsv" },
        { title: "TXT", action: "generateDownloadTxt" },
      ],
    };
  },
  computed: {
    ...mapState("daystr", ["dayTimes", "dayDate"]),

    totalTime() {
      return this.dayTimes.reduce(
        (sum, element) => sum + (Number(element["time"]) || 0),
        0
      );
    },
  },
  mounted() {
    if (this.dayTimes.length == 0) this.resetDay();
  },
  methods: {
    ...mapMutations("daystr", [
      "newDayTime",
      "setActiveDayTime",
      "setDayDate",
      "resetDay",
      "delDayTimeByIndex",
    ]),
    async resetAfterConfirm() {
      if (
        await this.$refs.confirm.open(
          "Confirm Reset",
          "Are you sure you want to reset timesheet? You will lose all data on this page."
        )
      )
        this.resetDay();
    },
    invokeAction(action) {
      this[action]();
    },
    generateDownloadCsv() {
      this.generateExportAndDownload("data:text/csv", "csv", ",");
    },
    generateDownloadTxt() {
      this.generateExportAndDownload("data:text/txt", "txt", " - ");
    },
    generateExportAndDownload(filetype, extn, separator) {
      let strDayTimes = `${filetype};charset=utf-8,Timesheet for Date: ${this.dayDate} \n\rTotal Time: ${this.totalTime} hours \n\rTime Records\n===============================\n`;
      strDayTimes += `Description${separator}Time (Hours)\n===============================\n`;
      strDayTimes += this.dayTimes
        .map(element => `${element["desc"]}${separator}${element["time"]}`)
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const fileData = encodeURI(strDayTimes);
      const link = document.createElement("a");
      link.setAttribute("href", fileData);
      link.setAttribute("download", `timesheet.${extn}`);
      link.click();
    },
  },
};
</script>
