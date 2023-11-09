<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="d-flex mx-auto mt-4 align-center" style="max-width: 650px">
      <v-select
        label="Categoria"
        :items="[{ id: 0, descricao: 'Tudo' }, ...categorias]"
        item-text="descricao"
        item-value="descricao"
        v-model="categoriaSelecionada"
        @change="filtrar"
        style="max-width: 150px"
        class="mr-2"
        rounded
        filled
        hide-details
      />

      <v-text-field rounded filled v-model="busca" label="Nome do Produto" @keyup="filtrar" hide-details />

      <v-select
        label="Ordenar por"
        :items="['Nome', 'Preço', 'Categoria']"
        v-model="ordenacaoSelecionado"
        @change="filtrar"
        style="max-width: 150px"
        class="ml-2"
        rounded
        filled
        hide-details
      />

      <v-btn icon @click="alterarSentidoOrdenacao">
        <v-icon>{{ ordemCrescente ? 'mdi-sort-ascending' : 'mdi-sort-descending' }}</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-wrap align-center">
      <div v-for="produto in produtosFiltrados" :key="produto.id">
        <CardProduto :produto="produto" @click="abrirProduto(produto)" />
      </div>
    </div>

    <v-btn fab @click="adicionarProduto" color="orange" dark bottom right fixed><v-icon>mdi-plus</v-icon></v-btn>

    <ModalProduto :dialogExterno="dialogAtualizar" @change="dialogAtualizar = $event" @salvar="salvar" />
  </div>
</template>

<script>
import ModalProduto from '@/components/ModalProduto.vue';
import CardProduto from '@/components/CardProduto.vue';
import { api } from '../service/api';

export default {
  components: {
    ModalProduto,
    CardProduto,
  },

  data() {
    return {
      produtos: [],
      produtosFiltrados: [],
      dialogDeletar: false,
      dialogAtualizar: false,
      categoriaSelecionada: 'Tudo',
      ordenacaoSelecionado: 'Nome',
      ordemCrescente: true,
      busca: '',
    };
  },

  methods: {
    async salvar(produto) {
      try {
        produto.preco = Number(produto.preco);
        delete produto.categoria;

        const novoProduto = await api.post('produto', produto);
        console.log(novoProduto.data);
        this.produtos.push(novoProduto.data);
        this.filtrar();
        console.log(this.produtos);
        this.dialogAtualizar = false;
      } catch (error) {
        console.log(error);
      }
    },

    abrirProduto(produto) {
      this.$router.push(`/produto/${produto.id}`);
    },

    adicionarProduto() {
      this.dialogAtualizar = true;
    },

    filtrar() {
      this.produtosFiltrados = this.produtos.filter(produto => {
        if (this.categoriaSelecionada === 'Tudo') {
          if (this.busca === '') return true;

          return produto.nome.toLowerCase().includes(this.busca.toLowerCase());
        }
        if (this.busca === '') return produto.categoria.descricao === this.categoriaSelecionada;
        return (
          produto.categoria.descricao === this.categoriaSelecionada &&
          produto.nome.toLowerCase().includes(this.busca.toLowerCase())
        );
      });

      if (this.ordemCrescente) this.ordenarCrescente();
      else this.ordenarDecrescente();
    },

    ordenarCrescente() {
      if (this.ordenacaoSelecionado === 'Nome') {
        this.produtosFiltrados.sort((a, b) => {
          if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
          if (a.nome.toLowerCase() > b.nome.toLowerCase()) return 1;
          return 0;
        });
      } else if (this.ordenacaoSelecionado === 'Preço') {
        this.produtosFiltrados.sort((a, b) => a.preco - b.preco);
      } else if (this.ordenacaoSelecionado === 'Categoria') {
        this.produtosFiltrados.sort((a, b) => {
          if (a.categoria.descricao < b.categoria.descricao) return -1;
          if (a.categoria.descricao > b.categoria.descricao) return 1;
          return 0;
        });
      }
    },

    ordenarDecrescente() {
      if (this.ordenacaoSelecionado === 'Nome') {
        this.produtosFiltrados.sort((a, b) => {
          if (a.nome.toLowerCase() < b.nome.toLowerCase()) return 1;
          if (a.nome.toLowerCase() > b.nome.toLowerCase()) return -1;
          return 0;
        });
      } else if (this.ordenacaoSelecionado === 'Preço') {
        this.produtosFiltrados.sort((a, b) => b.preco - a.preco);
      } else if (this.ordenacaoSelecionado === 'Categoria') {
        this.produtosFiltrados.sort((a, b) => {
          if (a.categoria.descricao < b.categoria.descricao) return 1;
          if (a.categoria.descricao > b.categoria.descricao) return -1;
          return 0;
        });
      }
    },

    alterarSentidoOrdenacao() {
      this.ordemCrescente = !this.ordemCrescente;
      this.filtrar();
    },
  },

  computed: {
    categorias() {
      return this.produtos.map(produto => produto.categoria);
    },
  },

  async mounted() {
    const produtos = await api.get('produto');
    this.produtos = produtos.data;
    this.produtosFiltrados = produtos.data;
    this.filtrar();
  },
};
</script>
