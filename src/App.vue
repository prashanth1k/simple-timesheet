<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h3>Simple Timesheet</h3>
      <v-spacer></v-spacer>
      <v-btn text to="/daily">Daily</v-btn>
      <v-btn text to="/weekly">Weekly</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
