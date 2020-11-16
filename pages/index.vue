<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
    >
      <div class="blue--text">
        <div class="text-center">
          <h1>Bienvenid@ a Central Services :D</h1>
          <p>Esta es una SPA que consume una API con la finalidad de hacer búsquedas simples mediante un criterio específico</p>
        </div>

        <!-- tarjeta con lista informativa -->
        <v-card
          class="mx-auto"
          elevation="5"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Servicios consumidos por la API:</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Apple</v-list-item-title>
              <v-list-item-subtitle>
                Consulta a la API pública de itunes. (películas, podcast, música, videos musicales, audio libros, filmes cortos, episodios de TV, software y libros electrónicos)
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <a href="https://www.apple.com/la/itunes/" target="_blank">link de itunes</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>TV Maze</v-list-item-title>
              <v-list-item-subtitle>
                Consulta la API publica de TV Maze. (Series de TV)
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <a href="http://www.tvmaze.com/" target="_blank">link de TV Maze</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Crcind</v-list-item-title>
              <v-list-item-subtitle>
                Consulta la API publica de Crcind. (Personas)
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <a href="http://www.crcind.com/csp/samples/%25SOAP.WebServiceInvoke.cls?CLS=SOAP.Demo&OP=GetListByName" target="_blank">link de Crcind</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br>

        <!-- form para la barra de busqueda -->
        <v-form @submit.prevent="validateDataToSend">
          <v-row>
            <v-col
              cols="6"
              xl="10"
              lg="10"
              md="10"
              sm="9"
              xs="6"
            >
              <v-text-field
                id="searchInput"
                v-model="searchInput"
                label="¿que desea buscar?"
                type="text"
              >
                <v-icon
                  slot="append"
                  color="blue"
                >
                  search
                </v-icon>
              </v-text-field>
            </v-col>
            <v-col
              cols="6"
              xl="2"
              lg="2"
              md="2"
              sm="3"
              xs="6"
            >
              <v-btn
                dark
                type="submit"
                color="blue"
                class="mt-3"
                :loading="loading"
              >
                Buscar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <!-- alerta en caso de que el backend no regrese datos -->
        <v-alert
          v-if="displayAlert"
          color="red"
          elevation="24"
          type="error"
        >
          hay un problema con  la consulta al regresar los datos
          <v-btn
            slot="append"
            icon
            color="white"
            @click="updateDisplayAlert"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-alert>

        <!-- dataTable con los resultados -->
        <v-data-table
          v-if="!firstQuery"
          :headers="headers"
          :items="table"
          :items-per-page="5"
          class="elevation-12"
          :search="searchTable"
        >
          <template v-slot:top>
            <v-text-field
              v-model="searchTable"
              label="Filtrar resultados"
              class="mx-4"
            />
          </template>
          <template v-slot:body="{items}">
            <tbody>
              <tr v-for="(item, i) in items" :key="i">
                <td>
                  <span v-if="item.name.length >= 25">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                        >{{ cutElementString(25, item.name) }}</span>
                      </template>
                      <span>{{ item.name }}</span>
                    </v-tooltip>
                  </span>
                  <span v-else>{{ item.name }}</span>
                </td>
                <td>
                  <v-icon>
                    {{ getIconByOrigin(item.origin) }}
                  </v-icon>
                </td>
                <td>{{ item.category }}</td>
                <td>
                  <span v-if="item.author.length >= 25">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                        >{{ cutElementString(25, item.author) }}</span>
                      </template>
                      <span>{{ item.author }}</span>
                    </v-tooltip>
                  </span>
                  <span v-else>{{ item.author }}</span>
                </td>
                <td>
                  <span v-if="item.previewUrl === 'Not available'">
                    {{ item.previewUrl }}
                  </span>
                  <a v-else :href="item.previewUrl" target="_blank">
                    {{ cutElementString(35, item.previewUrl) }}
                  </a>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { centralServiceApi } from '@/services/centralServicesApi'

export default {
  data () {
    return {
      searchTable: '',
      firstQuery: true,
      table: [],
      displayAlert: false,
      searchInput: '',
      loading: false,
      headers: [
        { text: 'Nombre', value: 'name', witdth: '15%' },
        { text: 'Origen', value: 'origin', witdth: '15%' },
        { text: 'Categoria', value: 'category', witdth: '15%' },
        { text: 'Autor', value: 'author', witdth: '15%' },
        { text: 'Url', value: 'previewUrl', witdth: '40%' }
      ]
    }
  },
  methods: {
    async validateDataToSend () {
      this.loading = true
      const { searchInput } = this
      const { success, items } = await centralServiceApi.searchByCriteria(searchInput)

      if (success) {
        if (this.firstQuery) {
          this.firstQuery = false
        }
        this.table = items
      } else {
        this.table = []
        this.displayAlert = true
      }

      this.loading = false
    },
    updateDisplayAlert () {
      this.displayAlert = !this.displayAlert
    },
    cutElementString (total, item) {
      return item.length >= total ? `${item.substr(0, total - 3)}...` : item
    },
    getIconByOrigin (origin) {
      switch (origin) {
        case 'apple':
          return 'mdi-apple'

        case 'tvmaze':
          return 'mdi-television-box'

        case 'crcind':
          return 'mdi-face'
      }
    }
  }
}
</script>
