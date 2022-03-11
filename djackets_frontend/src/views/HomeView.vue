<template>
  <div class="home m-4">
    <section class="hero is-dark mb-b">
      <div class="hero-body has-text-centered">
        <div class="title mb-6">Welcome to Djackets</div>
        <div class="subtitle">The best jacket store online</div>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "@/components/ProductBox.vue";

export default {
  name: "HomeView",

  components: {
    ProductBox,
  },

  data() {
    return {
      latestProducts: [],
    };
  },

  methods: {
    getLatestProducts() {
      axios
        .get("/api/v1/latest-products")
        .then((response) => (this.latestProducts = response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    this.getLatestProducts();
    document.title = "Home | Djackets";
  },
};
</script>

