<template>
  <v-app>
    <v-app-bar app color="primary darken-2" dark>
      <h3>Simple Timesheet</h3>
      <v-spacer></v-spacer>
      <v-btn text to="/daily">Daily</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <v-card color="grey lighten-5" height="100%">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
