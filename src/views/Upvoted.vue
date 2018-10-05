<template>
  <div>
    <div>
      <h4 v-if="loading">Loading...</h4>
      <link-item v-for="(link, index) in allLinks"
        :key="link.id"
        :link="link"
        :index="index"></link-item>
    </div>
  </div>
</template>

<script>
import LinkItem from '../components/LinkItem.vue';
import { ALL_LINKS_UPVOTED_BY_USER } from '../constants/graphql';
import { GC_USER_ID } from '../constants/settings';

export default {
  name: 'Upvoted',
  computed: {
    userId() {
      return this.$root.$data.userId;
    }
  },
  data() {
    return {
      allLinks: [],
      loading: 0
    };
  },
  components: {
    LinkItem
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_UPVOTED_BY_USER,
      variables() {
        return {
          userId: localStorage.getItem(GC_USER_ID)
        };
      }
    }
  }
}
</script>

<style>

</style>
