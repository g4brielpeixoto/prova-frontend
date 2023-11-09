<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-btn icon fixed style="z-index: 5" right top dark @click="atualizarProduto(produto)">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn icon fixed style="z-index: 5" right top dark class="mr-10" @click="deletarProduto(produto)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-card width="600" class="pa-4 mx-auto" rounded="lg" style="height: calc(100vh - 90px)" elevation="5">
      <div style="width: 100%; height: 300px" class="d-flex justify-center align-center">
        <img
          v-if="produto.imagem"
          :src="produto.imagem"
          style="max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 4px"
        />
        <v-icon v-else color="grey" x-large>mdi-cart</v-icon>
      </div>

      <div>
        <h1 class="font-weight-bold mb-1">
          {{ produto.nome }}
        </h1>

        <div class="d-flex align-center mb-3">
          <h2 class="success--text font-weight-bold mr-6">R$ {{ produto.preco }}</h2>
          <v-chip small outlined color="primary">{{ produto.categoria.descricao }}</v-chip>
        </div>

        <span class="font-weight-light">
          {{ produto.descricao }}
        </span>
      </div>
    </v-card>

    <modal-confirmacao
      :dialogExterno="dialogDeletar"
      @change="dialogDeletar = $event"
      @sim="confirmaDeletarProduto()"
      :texto="`Tem certeza que deseja excluir o produto ${produto.nome}?`"
    />

    <modal-produto
      :dialogExterno="dialogAtualizar"
      @change="dialogAtualizar = $event"
      @salvar="salvar"
      :produto="produtoAtualizando"
    />
  </div>
</template>

<script>
import ModalConfirmacao from '@/components/ModalConfirmacao.vue';
import ModalProduto from '@/components/ModalProduto.vue';
import { api } from '../service/api';

export default {
  components: {
    ModalConfirmacao,
    ModalProduto,
  },

  data() {
    return {
      produto: {
        nome: '',
        descricao: '',
        preco: 0,
        categoria: {
          id: 0,
          descricao: '',
        },
      },
      produtoAtualizando: {},
      categorias: [],
      dialogDeletar: false,
      dialogAtualizar: false,
    };
  },

  methods: {
    deletarProduto() {
      this.dialogDeletar = true;
    },

    async confirmaDeletarProduto() {
      try {
        await api.delete(`produto/${this.produto.id}`);
        this.dialogDeletar = false;
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },

    atualizarProduto() {
      this.produtoAtualizando = { ...this.produto };
      this.dialogAtualizar = true;
    },

    async salvar(produtoSalvar) {
      try {
        console.log(produtoSalvar);
        produtoSalvar.preco = Number(produtoSalvar.preco);
        delete produtoSalvar.categoria;

        const response = await api.put(`produto/${produtoSalvar.id}`, produtoSalvar);
        this.produto = response.data;
        this.dialogAtualizar = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    const produto = await api.get(`produto/${this.$route.params.id}`);
    this.produto = produto.data;
    if (this.produto) this.$emit('titulo', this.produto.nome);
  },
};
</script>

<style></style>
