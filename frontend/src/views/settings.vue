<template>
  <div class="container">
    <div class="delete" v-if="deleteAccount">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 class="suppr" v-if="!modePassword">SUPPRIMER LE PROFIL</h2>
          <!-- Modif Form -->
          <form v-on:submit.prevent="supprimerCompte()">
            <input
              type="text"
              id="password"
              name="login"
              placeholder="Mot de passe"
              required
            />
            <div class="alert alert-danger app" role="alert" v-if="errorMdp">
              Mot de passe incorrect !
            </div>
            <button class="btn btn-danger mt-3 mb-5" @click="supprimerCompte()">
              SUPPRIMER
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="modifyBox" v-if="!deleteAccount">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2
            class="modif underlineHoverH2"
            v-if="modePassword"
            @click="switchTo()"
          >
            Modifer ton profil
          </h2>
          <h2
            class="modif underlineHoverH2"
            v-if="!modePassword"
            @click="switchTo()"
          >
            Modifer ton mot de passe
          </h2>
          <!-- Modif Form -->
          <form v-on:submit.prevent="modifier, changePassword">
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Ton nom"
              v-if="!modePassword"
            />
            <input
              v-if="!modePassword"
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Ton prenom"
            />
            <input
              v-if="!modePassword"
              type="text"
              id="desc"
              name="desc"
              placeholder="Poste chez Groupomania"
            />
            <p class="red app" v-if="long && !modePassword">
              Les champs doivent faire au moins 3 caractères.
            </p>
            <input
              v-if="modePassword"
              type="password"
              id="oldPassword"
              name="login"
              placeholder="Ancien mot de passe"
              required
            />
            <input
              v-if="modePassword"
              type="password"
              id="password"
              name="login"
              placeholder="Nouveau mot de passe"
              required
            />
            <p class="red" v-if="errorNewMdp && modePassword">
              Ton mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule et un caractère spécial
            </p>
            <input
              v-if="!modePassword"
              @click="modifier()"
              type="submit"
              value="MODIFIER"
            />
            <input
              v-if="modePassword"
              @click="changePassword()"
              type="submit"
              value="CHANGER MOT DE PASSE"
            />
            <div class="alert alert-success app" role="alert" v-if="update">
              Utilisateur mis à jour !
            </div>
            <div class="alert alert-danger app" role="alert" v-if="errorMdp">
              Mot de passe incorrect !
            </div>
          </form>
          <div id="formFooter">
            <p @click="switchToDelete()" class="underlineHover" href="#">
              SUPPRIMER LE COMPTE
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      long: false,
      errorNewMdp: false,
      deleteAccount: false,
      oldPassword: null,
      modePassword: false,
      update: false,
      nom: null,
      prenom: null,
      password: null,
      desc: null,
      image: null,
      errorMdp: false,
      userId: document.cookie
        ? CryptoJS.AES.decrypt(
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("userId="))
              .split("=")[1],
            this.$store.state.CryptoKey
          ).toString(CryptoJS.enc.Utf8)
        : null,
    };
  },
  methods: {
    supprimerCompte() {
      this.password = document.querySelector("#password")
        ? document.querySelector("#password").value
        : null;
      console.log(this.password);
      const self = this;
      axios
        .delete(
          `http://localhost:3000/api/user/delete/${self.userId}`,
          { data: { password: self.password } },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          document.cookie = "userId=";
          document.cookie = "user-token=";
          self.$router.go("/");
        })
        .catch(function (error) {
          self.errorMdp = true;
          console.log(error);
        });
    },
    switchToDelete() {
      this.deleteAccount = true;
      this.modePassword = false;
    },
    switchTo() {
      this.modePassword
        ? (this.modePassword = false)
        : (this.modePassword = true);
    },
    upload(event) {
      this.image = event.target.files[0];
    },
    changePassword() {
      this.password = document.querySelector("#password")
        ? document.querySelector("#password").value
        : null;
      this.oldPassword = document.querySelector("#oldPassword")
        ? document.querySelector("#oldPassword").value
        : null;
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-token="))
        .split("=")[1];
      let validPassword = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/
      );
      if (validPassword.test(this.password)) {
        console.log(true);
        const self = this;
        axios
          .put(
            `http://localhost:3000/api/user/modifyPassword/${self.userId}`,
            {
              oldPassword: self.oldPassword,
              password: self.password,
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            self.update = true;
          })
          .catch(function (error) {
            console.log(error);
            self.errorMdp = true;
            self.update = false;
          });
      } else {
        console.log(false);
        this.errorNewMdp = true;
        this.update = false;
      }
    },
    modifier() {
      this.nom = document.querySelector("#nom")
        ? document.querySelector("#nom").value
        : null;
      this.prenom = document.querySelector("#prenom")
        ? document.querySelector("#prenom").value
        : null;
      this.desc = document.querySelector("#desc")
        ? document.querySelector("#desc").value
        : null;
      this.token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user-token="))
        .split("=")[1];
      let validName = new RegExp(
        /^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/
      );
      const self = this;
      if (
        validName.test(this.nom) ||
        validName.test(this.prenom) ||
        validName.test(this.desc)
      ) {
        axios
          .put(
            `http://localhost:3000/api/user/modifyAccount/${self.userId}`,
            {
              prenom: self.prenom,
              nom: self.nom,
              desc: self.desc,
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            self.update = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        self.long = true;
      }
    },
  },
  mounted() {
    if (!this.userId) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
@keyframes disparition {
  100% {
    opacity: 0;
  }
}
.app {
  animation: disparition 3.5s forwards;
}
.red {
  color: red;
  margin: 0px;
}
.underlineHover {
  color: red;
  cursor: pointer;
}
#image {
  margin: 20px;
}
.modif {
  text-align: center;
  cursor: pointer;
  position: relative;
}
.container {
  margin-top: 50px;
}
.error {
  color: red;
  margin-top: -30px;
}
.signup {
  margin-top: 70px;
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
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
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

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #091f43;
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

input[type="text"],
input[type="password"] {
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

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
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

.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: red;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

.underlineHoverH2:hover {
  color: #0d0d0d;
}

.underlineHoverH2:hover:after {
  width: 100%;
}
.suppr {
  color: rgb(197, 38, 38);
}
</style>
