import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#42a5f5',
        warning: '#ec407a',
        textPrimaryColor: '#000',
        textSecondaryColor: '#fafafa',
      },
    },
  },
});
