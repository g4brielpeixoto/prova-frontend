<template>
  <v-dialog v-model="dialog" width="350">
    <v-card class="pa-6" rounded="xl">
      <slot />
      <v-card-actions class="d-flex justify-end">
        <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary" text @click="$emit('salvar')">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
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
