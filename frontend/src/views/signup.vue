<template>
  <div class="signup">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <h2 @click="switchToSignup" v-if="mode == 'signup'" class="active">
          Inscription
        </h2>
        <h2
          @click="switchToSignup"
          v-if="mode == 'login'"
          class="inactive underlineHover"
        >
          Inscription
        </h2>
        <h2 @click="switchToLogin" v-if="mode == 'login'" class="active">
          Connexion
        </h2>
        <h2
          @click="switchToLogin"
          v-if="mode == 'signup'"
          class="inactive underlineHover"
        >
          Connexion
        </h2>
        <!-- Login Form -->
        <form v-on:submit.prevent="login">
          <input
            v-if="mode == 'signup'"
            type="text"
            id="nom"
            name="nom"
            placeholder="Ton nom"
            required
          />
          <p v-if="errorNom && mode == 'signup'" class="red">
            Ton nom doit contenir au moins 3 caractères
          </p>
          <input
            v-if="mode == 'signup'"
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Ton prenom"
            required
          />
          <p v-if="errorPrenom && mode == 'signup'" class="red">
            Ton prénom doit contenir au moins 3 caractères
          </p>
          <input
            v-if="mode == 'signup'"
            type="text"
            id="email"
            name="email"
            placeholder="Ton email"
            required
          />
          <p v-if="errorEmail && mode == 'signup'" class="red">
            Email invalide
          </p>
          <p v-if="sameEmail && mode == 'signup'" class="red">
            Cet Email est déja utilisé.
          </p>
          <input
            v-if="mode == 'signup'"
            type="password"
            id="password"
            name="login"
            placeholder="mot de passe"
            required
          />
          <input
            v-if="mode == 'login'"
            type="text"
            id="emailCheck"
            name="email"
            placeholder="Ton email"
            required
          />
          <input
            v-if="mode == 'login'"
            type="password"
            id="passwordCheck"
            name="login"
            placeholder="mot de passe"
            required
          />
          <p v-if="errorMdp && mode == 'signup'" class="red">
            Ton mot de passe doit contenir 8 caractères, une majuscule, une
            minuscule et un caractère spécial
          </p>
          <input
            v-if="mode == 'signup'"
            @click="signup"
            type="submit"
            value="INSCRIPTION"
          />
          <input
            v-if="mode == 'login'"
            @click="login"
            type="submit"
            value="CONNEXION"
          />
        </form>
        <div v-if="incorrect == true && mode == 'login'" class="error">
          <p>Email ou mot de passe incorrect</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.red {
  color: red;
  padding: 0px;
  margin: 0px;
}
.error {
  color: red;
  margin-top: -30px;
}
.signup {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 550px;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  border-radius: 15px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 30px 30px 60px 30px rgba(49, 49, 49, 0.3);
  box-shadow: 30px 30px 60px 30px rgba(49, 49, 49, 0.3);
  text-align: center;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: black;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="password"],
input[type="text"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes incorrect {
  0% {
    transform: translateX(20px);
  }
  50% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.incorrect {
  animation: incorrect ease-in 1;
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}
</style>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      sameEmail: false,
      mode: "signup",
      email: "",
      errorEmail: false,
      password: "",
      errorMdp: false,
      nom: "",
      errorNom: false,
      prenom: "",
      errorPrenom: false,
      incorrect: false,
    };
  },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    switchToLogin() {
      this.mode = "login";
    },
    validation() {
      let validEmail = new RegExp(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      let validName = new RegExp(
        /^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/
      );
      let validPassword = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/
      );
      validEmail.test(this.email)
        ? (this.errorEmail = false)
        : (this.errorEmail = true);
      validName.test(this.nom)
        ? (this.errorNom = false)
        : (this.errorNom = true);
      validName.test(this.prenom)
        ? (this.errorPrenom = false)
        : (this.errorPrenom = true);
      validPassword.test(this.password)
        ? (this.errorMdp = false)
        : (this.errorMdp = true);
      console.log(validPassword.test(this.password));
      return (
        validEmail.test(this.email) &&
        validName.test(this.nom) &&
        validName.test(this.prenom) &&
        validPassword.test(this.password)
      );
    },
    signup() {
      this.nom = document.querySelector("#nom").value;
      this.prenom = document.querySelector("#prenom").value;
      this.password = document.querySelector("#password").value;
      this.email = document.querySelector("#email").value;
      if (this.validation()) {
        const self = this;
        axios
          .post("http://localhost:3000/api/user/signup", {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
          })
          .then(function (response) {
            console.log(response);
            axios
              .post("http://localhost:3000/api/user/login", {
                email: self.email,
                password: self.password,
              })
              .then(function (response) {
                const token = response.data.token;
                const num = response.data.userId;
                const userId = CryptoJS.AES.encrypt(
                  num.toString(),
                  self.$store.state.CryptoKey
                ).toString();
                document.cookie = `user-token=${token}; SameSite=Lax; Secure; max-age=86400;`;
                document.cookie = `userId=${userId}; SameSite=Lax; Secure; max-age=86400;`;
                self.$router.push("/home");
                self.$router.go();
              })
              .catch(function (error) {
                if (error) {
                  self.incorrect = true;
                }
              });
          })
          .catch(function (error) {
            console.log(error);
            self.sameEmail = true;
          });
      }
    },
    login() {
      this.password = document.querySelector("#passwordCheck").value;
      this.email = document.querySelector("#emailCheck").value;
      const self = this;
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          const token = response.data.token;
          const num = response.data.userId;
          const userId = CryptoJS.AES.encrypt(
            num.toString(),
            self.$store.state.CryptoKey
          ).toString();
          document.cookie = `user-token=${token}; SameSite=Lax; Secure; max-age=86400;`;
          document.cookie = `userId=${userId}; SameSite=Lax; Secure; max-age=86400;`;
          self.$router.push("/home");
          self.$router.go();
        })
        .catch(function (error) {
          if (error) {
            self.incorrect = true;
          }
        });
    },
  },
  mounted() {
    if (document.cookie) {
      const userIdCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        .split("=")[1];
      console.log(userIdCookie);
      if (userIdCookie) {
        this.$router.push("/home");
      }
    }
  },
};
</script>
