<template>
  <v-dialog v-model="dialog" width="350">
    <v-card class="pa-4" rounded="xl">
      <v-card-title>Confirmação</v-card-title>
      <v-card-text>
        <p>{{ texto }}</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn text color="primary" @click="$emit('sim')">Sim</v-btn>
        <v-btn text color="error" @click="dialog = false">Não</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    texto: {
      type: String,
      default: 'Tem certeza que deseja excluir o item?',
    },
    dialogExterno: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    dialogExterno: {
      handler(newVal) {
        this.dialog = newVal;
      },
      immediate: true,
    },
    dialog: {
      handler(newVal) {
        this.$emit('change', newVal);
      },
    },
  },
};
</script>
