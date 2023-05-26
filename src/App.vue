<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item v-for="(rota, index) in rotas" :key="index">
            <v-list-item-icon>
              <v-icon>{{ rota.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title @click="goTo(rota.path)">{{ rota.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        {{ titulo ? titulo : $route.name }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main app>
      <v-container>
        <router-view @titulo="tituloPagina" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const VApp = () => import('vuetify/es5/components/VApp/VApp');
export default {
  name: 'App',
  components: {
    VApp,
  },

  data() {
    return {
      drawer: false,
      titulo: '',
      rotas: [
        { title: 'Produtos', icon: 'mdi-cart', path: '/produtos' },
        { title: 'Categorias', icon: 'mdi-folder', path: '/categorias' },
      ],
    };
  },

  methods: {
    goTo(path) {
      if (path !== this.$route.path) this.$router.push(path);
    },
    tituloPagina(titulo) {
      this.titulo = titulo;
    },
  },
};
</script>
