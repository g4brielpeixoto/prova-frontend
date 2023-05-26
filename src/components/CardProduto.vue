<template>
  <v-card
    class="px-2 py-3 mx-1 my-3"
    rounded="lg"
    width="180px"
    height="243px"
    style="display: grid; grid-template-rows: 130px 110px"
    @click="$emit('click')"
  >
    <div class="d-flex justify-center align-center" style="width: 164px">
      <img
        v-if="produto.imagem"
        :src="produto.imagem"
        style="max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 4px"
        height="130"
      />
      <v-icon v-else color="grey" large>mdi-image</v-icon>
    </div>

    <div style="display: grid; grid-template-rows: 43px 24px 30px">
      <div style="display: grid; align-items: end">
        <span class="font-weight-medium" style="line-height: 20px">
          {{ produto.nome }}
        </span>
      </div>

      <span class="success--text font-weight-bold">R$ {{ produto.preco }}</span>
      <div>
        <v-chip small outlined color="primary">{{ produto.categoria.descricao }}</v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    produto: {
      type: Object,
      required: true,
    },
  },
};
</script>
