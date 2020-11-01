export default {
  namespaced: true,
  name: "daystr",
  state: {
    dayDate: "",
    dayTimes: [],
    activeDayTime: {},
  },
  mutations: {
    newDayTime(state) {
      state.dayTimes.push({ desc: "", time: 1 });
    },

    setActiveDayTime(state, val) {
      state.activeDayTime = val;
    },

    delDayTimeByIndex(state, index) {
      state.dayTimes.splice(index, 1);
    },

    setDayDate(state, val) {
      state.dayDate = val;
    },

    resetDay(state) {
      state.dayDate = new Date().toISOString().substr(0, 10);
      state.dayTimes = [{ desc: "", time: 1 }];
    },
  },
};
