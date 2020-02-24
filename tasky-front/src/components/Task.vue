<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
  <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">{{cardTitle}}</v-card-title>
            <v-card-subtitle>{{cardAuthor}}</v-card-subtitle>
            <v-card-text>{{cardContent}}</v-card-text>
            <v-card-actions>
              <v-btn text>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Task',
  props: {
    cardTitle: {
        type: String,
        required: true
    },
    cardContent:{
        type: String,
        required: true
    },
    cardAuthor:{
        type: String,
        required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
