<template>
  <modal-atualizacao
    :dialogExterno="dialogExterno"
    @change="$emit('change', $event)"
    @salvar="$emit('salvar', produtoSelecionado)"
  >
    <!-- limitar em 38 caractere -->
    <v-text-field label="Nome" v-model="produtoSelecionado.nome" rounded filled />

    <v-select
      :items="categorias"
      label="Categoria"
      v-model="produtoSelecionado.categoriaId"
      item-text="descricao"
      item-value="id"
      rounded
      filled
    />
    <v-text-field label="Preço" v-model="produtoSelecionado.preco" type="number" rounded filled />
    <v-textarea label="Descrição" v-model="produtoSelecionado.descricao" rows="7" rounded filled no-resize />

    <v-file-input
      accept="image/png, image/jpeg, image/bmp, image/webp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Imagem"
      @change="processarImagem"
      rounded
      filled
    ></v-file-input>
  </modal-atualizacao>
</template>

<script>
import axios from 'axios';
import ModalAtualizacao from './ModalAtualizacao.vue';

export default {
  components: {
    ModalAtualizacao,
  },

  data() {
    return {
      produtoSelecionado: {},
      categorias: [],
    };
  },

  props: {
    produto: {
      type: Object,
    },
    dialogExterno: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    processarImagem(file) {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.produtoSelecionado.imagem = reader.result;
        };
      }
    },
  },

  watch: {
    produto: {
      handler() {
        this.produtoSelecionado = { ...this.produto };
      },
      immediate: true,
    },
  },
  async mounted() {
    const categorias = await axios.get('http://192.168.254.42:3000/categoria');
    this.categorias = categorias.data;
  },
};
</script>
