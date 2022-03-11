<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)"><i class="fas fa-subtract"></i></a>
      <a @click="incrementQuantity(item)"><i class="fas fa-add"></i></a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td>
      <button class="delete" @click="removeFromCart(item)"></button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem
    }
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item);

      this.updateCart();
    },
    decrementQuantity(item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.$emit('removeFromCart', item);
      }

      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;

      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart))
    }
  }
}
</script>

<style scoped>

</style>
