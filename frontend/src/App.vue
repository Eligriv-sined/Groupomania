<template>
  <header>
    <div class="navigation">
      <nav class="navbar navbar-expand-sm navbar-light">
        <a class="nav-link">
          <router-link to="/home">
            <img
              class="homeLinkBig"
              id="nav_groupomania"
              src="../image/icon-left-font-monochrome-black.png"
              alt="lien acceuil"
          /></router-link>
        </a>
        <a class="nav-link">
          <router-link to="/home"
            ><img
              class="homeLinkLil"
              src="../image/icon.svg"
              alt="lien acceuil"
          /></router-link>
        </a>
        <ul class="nav justify-content-center">
          <li class="nav-item" v-if="user">
            <a class="nav-link"> </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link to="/settings">
                <img
                  src="../image/settings.png"
                  alt="setting"
                  class="setting"
                />
              </router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link to="/"
                ><img
                  @click="deconnexion"
                  src="../image/deco.png"
                  alt="logout"
                  class="logout"
              /></router-link>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">



a:link {
  text-decoration: none;
}

a:hover {
  transition: 0.3s;
  transform: scale(1.1);
}
.userPageLink {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 40px;
  border-radius: 100%;
}
.homeLinkLil {
  height: 53px;
  margin-right: 20px;
}
.setting {
  height: 32px;
  margin-left: 20px;
}
.logout {
  height: 30px;
  width: 35px;
}
.navbar {
  height: 55px;
  display: flex;
  justify-content: space-between;
}
.navigation {
  padding-bottom: 30px;
}

body {
  margin: 0;
  background-color: #fafafa;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: red;
}
* {
  box-sizing: border-box;
}
#nav {
  &_groupomania {
    width: 200px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #d1515a;
    }
  }
}
@media only screen and (min-width: 1000px) {
  .homeLinkLil {
    display: none;
  }

}
@media only screen and (max-width: 1000px) {
  .homeLinkBig {
    display: none;
  }
  .userPageLink {
    margin: 0px;
  }
  #nav_groupomania {
    width: 30px;
  }
  .homeLinkLil {
    margin: 0px;
  }
  .inputsearch {
    display: none;
  }

  .flex_input {
    display: flex;
  }
  .navbar {
    display: flex;
    justify-content: center;
  }
}
@media only screen and (max-width: 570px) {
  li {
    margin-top: -15px;
  }
  .homeLinkLil {
    margin-top: -16px;
  }
}
</style>

<script>
const CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      research: "",
      userSearch: null,
      user: null,
      token: document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null,
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
    deconnexion() {
      document.cookie = "userId=";
      document.cookie = "user-token=";
      this.$router.go();
    },
  },
};
</script>
