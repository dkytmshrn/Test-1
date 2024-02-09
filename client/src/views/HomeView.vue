<template>
  <div>
    <div style="font-size: 30px; background-color: burlywood; margin-bottom: 25px; font-weight: 500; padding-left: 20px;">DAFTAR PIUTANG UNIT</div>
    <div class="button-container">
      <Button
        :iconClass="'fas fa-sync-alt'"
        :iconColor="'aqua'"
        :buttonText="'Refresh'"
        :title="'Memuat ulang data'"
        :handleClick="refreshData"
      />
      <Button
        :iconClass="'fas fa-file-export'"
        :iconColor="'rgba(30, 255, 0, 0.822)'"
        :buttonText="'Export'"
        :title="'Export data ke excel'"
        :handleClick="exportData"
      />
      <Button
        :iconClass="'fas fa-search-plus'"
        :iconColor="'rgb(162, 0, 255)'"
        :buttonText="'Advance Search'"
        :title="'Buka kolom pencarian terperinci'"
        :handleClick="toggleAdvanceSearchForm"
      />
    </div>
    <div v-if="showAdvanceSearchForm" class="filter-container-main">
      <div
        style="
          background-color: rgb(38, 221, 221);
          font-size: 20px;
          margin-bottom: 20px;
          text-align: center;
        "
      >
        PENCARIAN LANJUTAN
      </div>
      <form @submit.prevent="submitAdvanceSearch">
        <div class="filter-container-one">
          <div>
            <label for="obligationNumber">Nomor Kewajiban</label>
            <div>
              <input
                type="text"
                id="obligationNumber"
                v-model.trim="obligationNumber"
              />
            </div>
          </div>
          <div>
            <label for="policeNumber">Nomor Polisi</label>
            <div>
              <input
                type="text"
                id="policeNumber"
                v-model.trim="policeNumber"
              />
            </div>
          </div>
          <div>
            <label for="tax">Pajak</label>
            <div>
              <input
                type="number"
                id="taxMin"
                v-model.number="taxMin"
                placeholder="Minimal"
              />
              hingga
              <input
                type="number"
                id="taxMax"
                v-model.number="taxMax"
                placeholder="Maksimal"
              />
            </div>
          </div>
          <div>
            <label for="formedPrice">Harga Terbentuk</label>
            <div>
              <input
                type="number"
                id="formedPriceMin"
                v-model.number="formedPriceMin"
                placeholder="Minimal"
              />
              hingga
              <input
                type="number"
                id="formedPriceMax"
                v-model.number="formedPriceMax"
                placeholder="Maksimal"
              />
            </div>
          </div>
          <div>
            <label for="totalPrice">Harga Total</label>
            <div>
              <input
                type="number"
                id="totalPriceMin"
                v-model.number="totalPriceMin"
                placeholder="Minimal"
              />
              hingga
              <input
                type="number"
                id="totalPriceMax"
                v-model.number="totalPriceMax"
                placeholder="Maksimal"
              />
            </div>
          </div>
          <div>
            <label for="adminFee">Biaya Admin</label>
            <div>
              <input
                type="number"
                id="adminFeeMin"
                v-model.number="adminFeeMin"
                placeholder="Minimal"
              />
              hingga
              <input
                type="number"
                id="adminFeeMax"
                v-model.number="adminFeeMax"
                placeholder="Maximal"
              />
            </div>
          </div>
        </div>
        <div class="filter-container-two">
          <div>
            <label for="owner">Pemilik</label>
            <div>
              <input type="text" id="owner" v-model.trim="owner" />
            </div>
          </div>
          <div>
            <label for="participants">Peserta</label>
            <div>
              <input
                type="text"
                id="participants"
                v-model.trim="participants"
              />
            </div>
          </div>
          <div>
            <label for="dueDate">Tanggal Jatuh Tempo</label>
            <div style="display: flex">
              <div
                style="
                  margin-right: 10px;
                  display: flex;
                  align-items: center;
                  align-items: center;
                "
              >
                dari
              </div>
              <input type="date" id="dueDateMin" v-model="dueDateMin" />
              <div style="margin: 0px 10px; display: flex; align-items: center">
                sampai
              </div>
              <input type="date" id="dueDateMax" v-model="dueDateMax" />
            </div>
          </div>
          <div>
            <label for="auctionDate">Tanggal Lelang</label>
            <div style="display: flex">
              <div
                style="margin-right: 10px; display: flex; align-items: center"
              >
                dari
              </div>
              <input type="date" id="auctionDateMin" v-model="auctionDateMin" />
              <div style="margin: 0px 10px; display: flex; align-items: center">
                sampai
              </div>
              <input type="date" id="auctionDateMax" v-model="auctionDateMax" />
            </div>
          </div>
          <div>
            <label for="paidDate">Tanggal Pembayaran</label>
            <div style="display: flex">
              <div
                style="margin-right: 10px; display: flex; align-items: center"
              >
                dari
              </div>
              <input type="date" id="paidDateMin" v-model="paidDateMin" />
              <div style="margin: 0px 10px; display: flex; align-items: center">
                sampai
              </div>
              <input type="date" id="paidDateMax" v-model="paidDateMax" />
            </div>
          </div>
          <div class="container-status-box">
            <label>Status</label>
            <div class="container-status-item">
              <input
                type="checkbox"
                id="proses"
                v-model="statuses"
                value="PROSES PEMBAYARAN"
              />
              <label for="proses">Proses Pembayaran</label>
            </div>
            <div class="container-status-item">
              <input
                type="checkbox"
                id="konfirmasi"
                v-model="statuses"
                value="KONFIRMASI PEMBAYARAN"
              />
              <label for="konfirmasi">Konfirmasi Pembayaran</label>
            </div>
            <div class="container-status-item">
              <input
                type="checkbox"
                id="lunas"
                v-model="statuses"
                value="LUNAS"
              />
              <label for="lunas">Lunas</label>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="navigation-section">
      <div class="page-size-selection">
        <div>Jumlah data yang ditampilkan</div>
        <select @change="changePageSize($event.target.value)">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="all">ALL</option>
        </select>
      </div>
      <div class="page-size-selection">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Sebelumnya
        </button>
        <span v-for="pageNumber in displayedPages" :key="pageNumber">
          <button
            @click="changePage(pageNumber)"
            :class="{ active: isActivePage(pageNumber) }"
          >
            {{ pageNumber }}
          </button>
        </span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Selanjutnya
        </button>
      </div>
    </div>
    <MainTable :debtors="pagedDebtors" @markAsPaid="markAsPaid" />
    <div class="page-size-selection" style="display: flex; margin-top: 30px; justify-content: center;">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Sebelumnya
        </button>
        <span v-for="pageNumber in displayedPages" :key="pageNumber">
          <button
            @click="changePage(pageNumber)"
            :class="{ active: isActivePage(pageNumber) }"
          >
            {{ pageNumber }}
          </button>
        </span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Selanjutnya
        </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores/index";
import MainTable from "../components/MainTable.vue";
import Button from "../components/Button.vue";

export default {
  name: "HomeView",
  components: { MainTable, Button },
  data() {
    return {
      showAdvanceSearchForm: false,
      obligationNumber: "",
      policeNumber: "",
      owner: "",
      participants: "",
      taxMin: null,
      taxMax: null,
      formedPriceMin: null,
      formedPriceMax: null,
      totalPriceMin: null,
      totalPriceMax: null,
      adminFeeMin: null,
      adminFeeMax: null,
      dueDateMin: null,
      dueDateMax: null,
      auctionDateMin: null,
      auctionDateMax: null,
      paidDateMin: null,
      paidDateMax: null,
      statuses: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(useIndexStore, ["debtors"]),

    totalPages() {
      return Math.ceil(this.filteredDebtors.length / this.pageSize);
    },

    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },

    endIndex() {
      return this.currentPage * this.pageSize;
    },
    pagedDebtors() {
      return this.filteredDebtors.slice(this.startIndex, this.endIndex);
    },

    displayedPages() {
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + 4);
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },

    filteredDebtors() {
      return this.debtors.filter((debtor) => {
        let passStatus = true;
        let passPoliceNumber = true;
        if (this.policeNumber !== "") {
          passPoliceNumber = debtor.policeNumber
            .toLowerCase()
            .includes(this.policeNumber.toLowerCase());
        }
        let passObligationNumber = true;
        if (this.obligationNumber !== "") {
          passObligationNumber = debtor.obligationNumber
            .toLowerCase()
            .includes(this.obligationNumber.toLowerCase());
        }

        let passOwner = true;
        if (this.owner !== "") {
          passOwner = debtor.owner
            .toLowerCase()
            .includes(this.owner.toLowerCase());
        }

        let passParticipants = true;
        if (this.participants !== "") {
          passParticipants = debtor.participant
            .toLowerCase()
            .includes(this.participants.toLowerCase());
        }
        if (this.statuses.length > 0) {
          passStatus = this.statuses.includes(debtor.status);
        }

        let passTax = true;
        if (this.taxMin !== null || this.taxMax !== null) {
          passTax =
            (this.taxMin === null || debtor.tax >= this.taxMin) &&
            (this.taxMax === null || debtor.tax <= this.taxMax);
        }

        let passFormedPrice = true;
        if (this.formedPriceMin !== null || this.formedPriceMax !== null) {
          passFormedPrice =
            (this.formedPriceMin === null ||
              debtor.formedPrice >= this.formedPriceMin) &&
            (this.formedPriceMax === null ||
              debtor.formedPrice <= this.formedPriceMax);
        }

        let passTotalPrice = true;
        if (this.totalPriceMin !== null || this.totalPriceMax !== null) {
          passTotalPrice =
            (this.totalPriceMin === null ||
              debtor.totalPrice >= this.totalPriceMin) &&
            (this.totalPriceMax === null ||
              debtor.totalPrice <= this.totalPriceMax);
        }

        let passAdminFee = true;
        if (this.adminFeeMin !== null || this.adminFeeMax !== null) {
          passAdminFee =
            (this.adminFeeMin === null ||
              debtor.adminFee >= this.adminFeeMin) &&
            (this.adminFeeMax === null || debtor.adminFee <= this.adminFeeMax);
        }

        let passDueDate = true;
        if (this.dueDateMin !== null || this.dueDateMax !== null) {
          passDueDate =
            (this.dueDateMin === null || debtor.dueDate >= this.dueDateMin) &&
            (this.dueDateMax === null || debtor.dueDate <= this.dueDateMax);
        }

        let passAuctionDate = true;
        if (this.auctionDateMin !== null || this.auctionDateMax !== null) {
          passAuctionDate =
            (this.auctionDateMin === null ||
              debtor.auctionDate >= this.auctionDateMin) &&
            (this.auctionDateMax === null ||
              debtor.auctionDate <= this.auctionDateMax);
        }

        let passPaidDate = true;
        if (this.paidDateMin !== null || this.paidDateMax !== null) {
          passPaidDate =
            (this.paidDateMin === null ||
              debtor.paidDate >= this.paidDateMin) &&
            (this.paidDateMax === null || debtor.paidDate <= this.paidDateMax);
        }

        return (
          passStatus &&
          passObligationNumber &&
          passPoliceNumber &&
          passOwner &&
          passParticipants &&
          passTax &&
          passFormedPrice &&
          passTotalPrice &&
          passDueDate &&
          passAuctionDate &&
          passPaidDate &&
          passAdminFee
        );
      });
    },
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchAllDebtors", "markDebtorAsPaid", "exportDebtorsToExcel"]),

    markAsPaid(debtorId) {
      this.markDebtorAsPaid(debtorId);
    },

    exportData() {
      this.exportDebtorsToExcel(this.filteredDebtors);
    },

    refreshData() {
      this.obligationNumber = "";
      this.policeNumber = "";
      this.owner = "";
      this.participants = "";
      this.taxMin = null;
      this.taxMax = null;
      this.formedPriceMin = null;
      this.formedPriceMax = null;
      this.totalPriceMin = null;
      this.totalPriceMax = null;
      this.adminFeeMin = null;
      this.adminFeeMax = null;
      this.dueDateMin = null;
      this.dueDateMax = null;
      this.auctionDateMin = null;
      this.auctionDateMax = null;
      this.paidDateMin = null;
      this.paidDateMax = null;
      this.statuses = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.fetchAllDebtors();
    },

    toggleAdvanceSearchForm() {
      this.showAdvanceSearchForm = !this.showAdvanceSearchForm;
    },

    changePageSize(size) {
      if (size === 'all') {
        this.pageSize = this.filteredDebtors.length;
      } else {
        this.pageSize = size;
      }
      this.currentPage = 1;
    },

    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },

    isActivePage(pageNumber) {
      return this.currentPage === pageNumber;
    },

    applyFilters() {
      this.filteredDebtors;
    },
  },
  created() {
    this.fetchAllDebtors();
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.filter-container-main {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: 2px solid #000;
  background-color: #f0f0f0;
  padding: 10px;
}

.filter-container-main form {
  display: flex;
  flex-wrap: wrap;
}

.filter-container-main form > div {
  flex: 1;
  margin-right: 10px;
}

.filter-container-main form > .filter-container-two {
  margin-right: 0;
}

.filter-container-main label {
  font-weight: bold;
}

.filter-container-main input {
  width: 70%;
  padding: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.filter-container-main input[type="number"] {
  width: 30%;
  margin-right: 5px;
}

.container-status-item label {
  font-weight: 500;
}
.container-status-box input {
  width: min-content;
  font-weight: normal;
  margin-right: 5px;
}

.container-status-box input:hover {
  cursor: pointer;
}

.filter-container-main button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-container-main button:hover {
  background-color: #45a049;
}

.navigation-section {
  display: flex;
  justify-content: space-between;
}

.page-size-selection {
  margin-bottom: 10px;
}

.page-size-selection button {
  transition: background-color 0.3s ease;
  margin-right: 5px;
}

.page-size-selection button.active {
  background-color: #474947;
  color: white;
}

.page-size-selection button:hover {
  background-color: #b9bbb9;
  cursor: pointer;
}
</style>

