<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="display: grid; justify-items: center">
    <v-list max-width="500" width="100%">
      <v-list-item v-for="categoria in categorias" :key="categoria.id">
        <v-list-item-icon>
          <v-avatar color="grey">
            <v-icon color="white">mdi-folder</v-icon>
          </v-avatar>
        </v-list-item-icon>

        <v-list-item-title>{{ categoria.descricao }}</v-list-item-title>

        <v-list-item-action class="d-flex flex-row pr-4">
          <v-btn icon @click="atualizarCategoria(categoria)">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon @click="deletarCategoria(categoria)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-divider />
      </v-list-item>
    </v-list>

    <v-btn fab @click="adicionarCategoria" color="orange" dark bottom right fixed><v-icon>mdi-plus</v-icon></v-btn>

    <modal-confirmacao
      :dialogExterno="dialogDeletar"
      @change="dialogDeletar = $event"
      @sim="confimaDeletarCategoria()"
      :texto="`Tem certeza que deseja excluir a categoria ${categoriaSelecionada.descricao}?`"
    />

    <modal-atualizacao :dialogExterno="dialogAtualizar" @change="dialogAtualizar = $event" @salvar="salvar()">
      <v-text-field label="Descrição" v-model="categoriaSelecionada.descricao" />
    </modal-atualizacao>
  </div>
</template>

<script>
import ModalConfirmacao from '@/components/ModalConfirmacao.vue';
import ModalAtualizacao from '@/components/ModalAtualizacao.vue';
import { api } from '../service/api';

export default {
  components: {
    ModalConfirmacao,
    ModalAtualizacao,
  },

  data() {
    return {
      categorias: [],
      categoriaSelecionada: {},
      dialogDeletar: false,
      dialogAtualizar: false,
    };
  },

  methods: {
    deletarCategoria(categoria) {
      this.categoriaSelecionada = categoria;
      this.dialogDeletar = true;
    },

    async confimaDeletarCategoria() {
      try {
        await api.delete(`categoria/${this.categoriaSelecionada.id}`);
        this.categorias = this.categorias.filter(c => c.id !== this.categoriaSelecionada.id);
        this.dialogDeletar = false;
      } catch (error) {
        console.log(error);
      }
    },

    atualizarCategoria(categoria) {
      this.categoriaSelecionada = { ...categoria };
      this.dialogAtualizar = true;
    },

    async salvar() {
      try {
        let categoria;
        if (this.categoriaSelecionada.id) {
          categoria = await api.put(`categoria/${this.categoriaSelecionada.id}`, this.categoriaSelecionada);
          this.categorias = this.categorias.map(c => (c.id === this.categoriaSelecionada.id ? categoria.data : c));
        } else {
          categoria = await api.post('categoria', this.categoriaSelecionada);
          this.categorias.push(categoria.data);
        }
        this.dialogAtualizar = false;
        this.categoriaSelecionada = {};
      } catch (error) {
        console.log(error);
      }
    },

    adicionarCategoria() {
      this.categoriaSelecionada = {};
      this.dialogAtualizar = true;
    },
  },

  async mounted() {
    const response = await api.get('categoria');
    this.categorias = response.data;
  },
};
</script>

<style></style>
