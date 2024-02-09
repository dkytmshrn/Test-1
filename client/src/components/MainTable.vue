<template>
    <table class="main-table">
      <thead>
        <tr>
            <th @click="sortBy('id')" class="Number" title="Klik untuk mengurutkan berdasarkan No.">No.</th>
            <th @click="sortBy('obligationNumber')" title="Klik untuk mengurutkan berdasarkan No. Kewajiban">No. Kewajiban</th>
            <th @click="sortBy('policeNumber')" title="Klik untuk mengurutkan berdasarkan No. Polisi">No. Polisi</th>
            <th @click="sortBy('owner')" class="owner" title="Klik untuk mengurutkan berdasarkan Pemilik">Pemilik</th>
            <th @click="sortBy('participant')" class="participant" title="Klik untuk mengurutkan berdasarkan Peserta">Peserta</th>
            <th @click="sortBy('virtualNumber')" title="Klik untuk mengurutkan berdasarkan Nomor VA">Nomor VA</th>
            <th @click="sortBy('formedPrice')" class="formed-price" title="Klik untuk mengurutkan berdasarkan Harga Terbentuk (Rp)">Harga Terbentuk (Rp)</th>
            <th @click="sortBy('adminFee')" class="admin-fee" title="Klik untuk mengurutkan berdasarkan Biaya Admin ex PPN (Rp)">Biaya Admin ex PPN (Rp)</th>
            <th @click="sortBy('tax')" class="tax" title="Klik untuk mengurutkan berdasarkan PPN (Rp)">PPN (Rp)</th>
            <th @click="sortBy('totalPrice')" class="total-price" title="Klik untuk mengurutkan berdasarkan Total (Rp)">Total (Rp)</th>
            <th @click="sortBy('auctionDate')" class="auction-date" title="Klik untuk mengurutkan berdasarkan Tanggal Lelang">Tanggal Lelang</th>
            <th @click="sortBy('dueDate')" class="due-date" title="Klik untuk mengurutkan berdasarkan Tanggal Jatuh Tempo">Tanggal Jatuh Tempo</th>
            <th @click="sortBy('paidDate')" class="paid-date" title="Klik untuk mengurutkan berdasarkan Tanggal Lunas">Tanggal Lunas</th>
            <th @click="sortBy('status')" class="status" title="Klik untuk mengurutkan berdasarkan Status">Status</th>
            <th class="action">Bayar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="debtor in sortedDebtors" :key="debtor.id">
          <td>{{ debtor.id }}</td>
          <td>{{ debtor.obligationNumber }}</td>
          <td>{{ debtor.policeNumber }}</td>
          <td>{{ debtor.owner }}</td>
          <td>{{ debtor.participant }}</td>
          <td>{{ debtor.virtualNumber }}</td>
          <td>{{ formatNumber(debtor.formedPrice) }}</td>
          <td>{{ formatNumber(debtor.adminFee) }}</td>
          <td>{{ formatNumber(debtor.tax) }}</td>
          <td>{{ formatNumber(debtor.totalPrice) }}</td>
          <td>{{ debtor.auctionDate }}</td>
          <td>{{ debtor.dueDate }}</td>
          <td>{{ debtor.paidDate }}</td>
          <td>{{ debtor.status }}</td>
          <td><button class="paid-button" v-if="debtor.status !== 'LUNAS'" @click="markAsPaid(debtor.id)">
            <i class="fas fa-check"></i>
          </button></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      debtors: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sortOrder: 'asc',
        sortKey: ''
      };
    },
    computed: {
      sortedDebtors() {
        if (!this.sortKey) return this.debtors;
  
        return this.debtors.slice().sort((a, b) => {
          let modifier = 1;
          if (this.sortOrder === 'desc') modifier = -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
      },
    },
    methods: {
      markAsPaid(debtorId) {
        this.$emit('markAsPaid', debtorId);
      },
      sortBy(key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortOrder = 'asc';
        }
      },
      formatNumber(number) {
        if (number != null) {
          return number.toLocaleString('id-ID', {
            minimumFractionDigits: 0
          });
        }
        return '';
      }
    }
  }
  </script>
  
  <style scoped>
  .main-table {
    font-size: 12px;
    width: 100%;
    border-collapse: collapse;
  }
  
  .main-table th {
    background-color: rgb(247, 176, 24);
    height: 50px;
    transition: background-color 0.3s ease;
  }

  .main-table th:hover {
    cursor: pointer;
    background-color: rgb(167, 121, 24);
  }
  
  .main-table td {
    background-color: #fcfcfcd8;
    height: 30px;
  }
  
  .main-table th,
  .main-table td {
    padding: 8px;
    border: 1px solid black;
    text-align: center;
  }
  
  .admin-fee {
    width: 60px;
  }
  
  .status {
    width: 40px;
  }
  
  .participant {
    width: 60px;
  }
  
  .formed-price {
    width: 90px;
  }
  
  .auction-date {
    width: 70px;
  }
  
  .due-date {
    width: 70px;
  }
  
  .paid-date {
    width: 70px;
  }
  
  .paid-button {
    color: black;
    background-color: rgb(83, 255, 3);
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
  }
  
  .paid-button:hover {
    background-color: rgb(52, 148, 14);
    color: whitesmoke;
  }
  </style>
  