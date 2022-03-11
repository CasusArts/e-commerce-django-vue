<template>
  <div class="page-sign-up">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Sign Up</h1>

      <form @submit.prevent="submitForm">
        <div class="field">
          <label>Username</label>
          <div class="control">
            <input type="text" class="input" v-model="username" />
          </div>
        </div>

        <div class="field">
          <label>Password</label>
          <div class="control">
            <input type="password" class="input" v-model="password" />
          </div>
        </div>

        <div class="field">
          <label>Repeat password</label>
          <div class="control">
            <input type="password" class="input" v-model="password2" />
          </div>
        </div>

        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-dark">Sing Up</button>
          </div>
        </div>

        <hr />

        <p>
          Or <router-link to="/login">click here</router-link> to log in!
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "SignUpView",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.username === "") {
        this.errors.push("Username is missing");
      }

      if (this.password === "") {
        this.errors.push("Password is missing");
      }

      if (this.password2 === "") {
        this.errors.push("Password repeat is missing");
      }

      if (this.password !== this.password2) {
        this.errors.push("Password doesn't match.");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "Account created, please log in.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });

            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");
              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
