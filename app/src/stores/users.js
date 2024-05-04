import { defineStore } from "pinia";
import api from "@/api/axios.config.js";
import { Notify } from "quasar";

export const useUsersStore = defineStore("counter", {
  state: () => ({
    url_default: "/api/user",
    url_get: "/api/user",
    url_post: "/api/user",
    url_delete: "/api/user",
    data: [],
    count: {},
    table: {
      columns: [],
      pagination: {
        page: 1,
        rowsPerPage: 15,
      },
      filters: {},
      defaultFilters: {},
      orderBy: {},
    },
    loading: {
      request: false,
      table: false,
      page: false,
      editPage: false,
    },
    responseType: null,
  }),
  actions: {
    clearFilters() {
      this.table.filters = {};
    },
    clearOrderBy() {
      this.table.orderBy = {};
    },
    clearData() {
      this.data = [];
    },
    reset() {
      this.table.filters = {};
      this.table.orderBy = {};
      this.data = [];
    },
    async firstPage() {
      if (this.table.pagination) this.table.currentPage = this.table.pagination.firstPage;
      await this.get();
    },
    async prevPage() {
      if (this.table.currentPage > 0) {
        this.table.currentPage -= 1;
        await this.get();
      }
    },
    async nextPage() {
      if (this.table.pagination && this.table.currentPage < this.table.pagination.lastPage) {
        this.table.currentPage += 1;
        await this.get();
      }
    },
    async lastPage() {
      if (this.table.pagination) this.table.currentPage = this.table.pagination.lastPage;
      await this.get();
    },
    async get() {
      try {
        this.loading.table = true;
        this.loading.request = true;

        const params = {
          page: this.table.pagination.page,
          rowsPerPage: this.table.pagination.rowsPerPage,
          orderBy: this.table.orderBy ?? { id: "desc" },
        };

        const response = await api.get(this.url_get, { params, responseType: this.responseType });
        this.data = response.data;

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // Handle error
        errorHandler(error);
        return {
          success: false,
          error,
        };
      } finally {
        this.loading.table = false;
        this.loading.request = false;
      }
    },
    async getById(id) {
      try {
        this.loading.table = true;
        this.loading.request = true;

        const response = await api.get(`${this.url_get}/${id}`);
        this.data = response.data;

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // Handle error
        errorHandler(error);
        return {
          success: false,
          error,
        };
      } finally {
        this.loading.table = false;
        this.loading.request = false;
      }
    },
    async post(payload) {
      try {
        this.loading.table = true;
        this.loading.request = true;

        const response = await api.post(this.url_post, payload);

        return { success: true, data: response.data };
      } catch (error) {
        // Handle error
        errorHandler(error);
        return {
          success: false,
          error,
        };
      } finally {
        this.loading.table = false;
        this.loading.request = false;
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`${this.url_delete}/${id}`);

        return { success: true, data: response.data };
      } catch (error) {
        // Handle error
        errorHandler(error);
        return {
          success: false,
          error,
        };
      }
    },
  },
});

function errorHandler(error) {
  const status = error.response.status;
  const response = error.response;

  switch (status) {
    case 402:
      Object.values(response.data.errors).forEach((erros) => {
        erros.forEach((erro) => {
          Notify.create({
            position: "top",
            color: "warning",
            message: erro,
            icon: "warning",
          });
        });
      });
      break;
    case 422:
      Object.values(response.data.errors).forEach((erros) => {
        erros.forEach((erro) => {
          Notify.create({
            position: "top",
            color: "warning",
            message: erro,
            icon: "warning",
          });
        });
      });
      break;
    default:
      Notify.create({
        position: "top",
        color: "negative",
        message: "Erro no servidor",
      });
      break;
  }
}
