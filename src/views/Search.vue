<template>
  <div>
    <div>
      Search
      <input v-model="searchText"
        type="text">
    </div>
    <link-item
      v-for="(link, index) in allLinks"
      :key="link.id"
      :link="link"
      :index="index">
    </link-item>
  </div>
</template>

<script>
import { ALL_LINKS_SEARCH_QUERY } from '../constants/graphql';
import LinkItem from '../components/LinkItem.vue';

export default {
  name: 'Search',
  data() {
    return {
      allLinks: [],
      searchText: '',
    };
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_SEARCH_QUERY,
      variables() {
        return {
          searchText: this.searchText
        }
      },
      skip() {
        return !this.searchText;
      }
    }
  },
  components: {
    LinkItem
  }
}
</script>

<style>

</style>
