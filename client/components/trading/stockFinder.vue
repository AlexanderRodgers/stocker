<template>
  <v-toolbar
    color="orange accent-1"
    prominent
    tabs
  >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="title mr-4">Stocks</v-toolbar-title>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      multiple
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="Search for a stock..."
      solo
    >
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            Search for your favorite
            <strong>Stocks</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template
        slot="selection"
        slot-scope="{ item, selected }"
      >
        <v-chip
          :selected="selected"
          color="blue-grey"
          class="white--text"
        >
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template
        slot="item"
        slot-scope="{ item }"
      >
      <!-- <logger :info="item"/> -->
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
        </v-list-tile-content>
        <!-- <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action> -->
      </template>
    </v-autocomplete>
    <v-tabs
      slot="extension"
      :hide-slider="!model"
      color="transparent"
      slider-color="blue-grey"
    >
      <v-tab :disabled="!model">News</v-tab>
      <v-tab :disabled="!model">Trading</v-tab>
      <v-tab :disabled="!model">Blog</v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
import Logger from '~/components/logger.vue'
  export default {
    components: {
      Logger,
    },
    data: () => ({
      // apiKey: '11303c9f-617c-4d50-b384-73a03d7ed81e',
      endpoint: 'https://api.iextrading.com/1.0/',
      isLoading: false,
      items: [],
      model: null,
      search: 'null'
    }),

    methods: { 
      stocks() {
        this.$axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
          .then(res => {
            this.items = res.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },

      searchCompanies(searchOptions) {
        for(let option of searchOptions) {
          if(this.items[option] && this.items[option].includes(this.search)) {
            return option
          }
        }
        return "name"
      }

    },

    watch: {
      search (val) {
        console.log('model', this.model)

        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true
        this.stocks()
        
      }
    },
  }
</script>

<style>

</style>
