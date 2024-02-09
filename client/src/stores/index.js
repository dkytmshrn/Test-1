import { defineStore } from 'pinia';
import axios from 'axios';
import { saveAs } from 'file-saver';

const baseUrl = 'http://localhost:3000';

export const useIndexStore = defineStore('index', {
  state: () => ({
    debtors: [],
    debtor: []
  }),
  actions: {
    async fetchAllDebtors() {
      try {
        const { data } = await axios.get(`${baseUrl}/debtors`);
        this.debtors = data;
      } catch (error) {
        this.error = error.message;
      }
    },
    async exportDebtorsToExcel(filteredData) {
        try {
            const response = await axios.post(`${baseUrl}/debtors/export`, filteredData, {
              responseType: 'blob',
          });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'debtors.xlsx');
        } catch (error) {
            console.error(error);
            this.error = error.message;
        }
    },
  
    async markDebtorAsPaid(id) {
      try {
        const result = await Swal.fire({
          title: "Merubah status pembayaran, apakah anda yakin?",
          text: "Perubahan ini tidak akan bisa dikembalikan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, tandai ini sebagai LUNAS!",
          cancelButtonText : "Batalkan"
        });
        if (result.isConfirmed) {
          await axios.patch(`${baseUrl}/debtors/${id}/mark-as-paid`);
          Swal.fire({
            title: "Menandai sebagai LUNAS!",
            text: "Piutang telah terbayar.",
            icon: "success"
          });
        }
        this.fetchAllDebtors()
      } catch (error) {
        this.error = error.message;
      }
    },

    async searchDebtors(query) {
      try {
        const { data } = await axios.get(`${baseUrl}/debtors/search?query=${query}`);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
