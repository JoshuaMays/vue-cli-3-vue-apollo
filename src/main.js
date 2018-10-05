// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import router from './router';
import 'tachyons';

import App from './App';
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings';

Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true;

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GC_URL || '',
});


const wsClient = new SubscriptionClient(process.env.VUE_APP_GC_WSS || '', {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem(GC_AUTH_TOKEN),
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const httpLinkWithSubscriptions = addGraphQLSubscriptions(
  authMiddleware.concat(httpLink),
  wsClient,
);

const apolloClient = new ApolloClient({
  link: httpLinkWithSubscriptions,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

let userId = localStorage.getItem(GC_USER_ID);

/* eslint-disable no-new */
new Vue({
  provide: apolloProvider.provide(),
  router,
  components: { App },
  data: {
    userId,
  },
  render: h => h(App),
}).$mount('#app');
