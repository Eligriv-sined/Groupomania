<template>
  <div class="home">
    <div class="container">
    
    </div>
  </div>
</template>

<style lang="scss" scoped>
.noPosts {
  color: #091f43;
  margin-top: 200px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  &_text {
    text-align: center;
  }
}
.metier {
  color: #091f43;
  font-style: italic;
  height: 100%;
  padding: 10px;
  border-radius: 15px;
}
.own {
  position: relative;
}
.file {
  height: 35px;
  position: absolute;
  left: 90px;
  top: 75px;
  display: none;
}
.home {
  margin-top: 50px;
}
.ppChange {
  object-fit: cover;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin-right: 60px;
  cursor: pointer;
  position: relative;
  &:hover {
    filter: brightness(40%);
    ~ .file {
      display: block;
    }
  }
}
.userName {
  color: #091f43;
  font-size: 35px;
  padding-top: 50px;
  padding-right: 50px;
}
.infoUser {
  color: #091f43;
  display: flex;
  margin-top: 60px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}
.ppFirst {
  object-fit: cover;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin-right: 60px;
}
.infopost {
  position: relative;
}
.text {
  color: #091f43;
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.imagePost {
  object-fit: cover;
  max-height: 500px;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.svg-react {
  &:hover {
    fill: #aaaaaa;
    animation: heart 0.5s cubic-bezier(0.06, 1.16, 0.83, 0.67) forwards;
  }
}

.react {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  padding-bottom: 5px;
}

.like {
  margin: auto;
  cursor: pointer;
}

.comment {
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  &__img {
    height: 40px;
  }
}
.heart {
  animation: heart 0.3s cubic-bezier(0.06, 1.16, 0.83, 0.67);
}
@keyframes heart {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

.ppPost {
  object-fit: cover;
  height: 40px;
  padding-right: 20px;
}
.publier {
  width: 100px;
}
.home {
  height: 140px;
}
.form {
  width: 90%;
}

#text {
  border-radius: 20px;
  background-color: #f0f2f5;
}

.nbr {
  font-weight: 300;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.posts:hover {
  .deletePost {
    display: inline;
  }
}
.deletePost {
  height: 20px;
  position: absolute;
  right: 20px;
  display: none;
  cursor: pointer;
}

.delete {
  height: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  display: none;
  cursor: pointer;
  margin-left: 20px;
}

.commentText {
  margin-left: 10px;
  margin-right: 10px;
}
.commentAuthor {
  color: #091f43;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
}
.comment {
  color: #091f43;
  margin: auto;
}
.nomUser {
  color: #091f43;
  font-weight: bold;
  font-size: 19px;
}
.pp {
  object-fit: cover;
  margin-right: 18px;
  height: 55px;
  width: 55px;
}

.pp2 {
  object-fit: cover;
  height: 45px;
  width: 45px;
  margin-left: 20px;
}

.comments {
  display: flex;
}

.disp {
  display: none;
}

.time {
  color: #091f43;
  font-size: 9px !important;
}

.socials i {
  margin-right: 14px;
  font-size: 17px;
  color: #d2c8c8;
  cursor: pointer;
}

.feed-image img {
  width: 100%;
  height: auto;
}

#comment {
  border-radius: 20px;
  background-color: #f0f2f5;
}

.commentaire {
  background-color: #f0f2f5;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
  position: relative;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 20px;
  &:hover {
    .delete {
      display: block;
    }
  }
}

@media only screen and (max-width: 600px) {
  .userName {
    font-size: 25px;
  }
}
</style>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      first: null,
      image: null,
      userIdPage: this.$route.params.userId,
      user: null,
      currentUser: null,
      likedPost: [],
      posts: null,
      postsRecive: null,
      token: document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null,
      comments: null,
      newComment: null,
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
   
    deletePost(postId, authorId) {
      const self = this;
      if (this.userId == authorId || (self.user && self.user.admin)) {
        axios
          .delete(`http://localhost:3000/api/post/${postId}`, {
            headers: { Authorization: `Bearer ${this.token}` },
            data: { userId: self.userId, admin: self.user.admin },
          })
          .then((response) => {
            console.log(response);
            self.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
   
    deleteComment(id, authorId, currentPostId) {
      const self = this;
      if (this.userId == authorId || (self.user && self.user.admin)) {
        axios
          .delete(`http://localhost:3000/api/comment/${id}/${currentPostId}`, {
            headers: { Authorization: `Bearer ${this.token}` },
            data: { userId: self.userId, admin: self.user.admin },
          })
          .then((response) => {
            console.log(response);
            self.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
   
  
    async getUser() {
      const self = this;
      axios
        .post(
          "http://localhost:3000/api/user",
          { userId: self.userIdPage },
          {
            headers: {
              Authorization: `Bearer ${self.token}`,
            },
          }
        )
        .then((response) => {
          this.currentUser = response.data[0];
        })
        .catch(function (error) {
          if (error.response && error.response.status === 403) {
            self.$router.push("/");
          }
        });
    },
  
  },
  mounted() {
    (this.userId = document.cookie
      ? CryptoJS.AES.decrypt(
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("userId="))
            .split("=")[1],
          this.$store.state.CryptoKey
        ).toString(CryptoJS.enc.Utf8)
      : null),
      (this.token = document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null);
    const self = this;
    this.getUser();
    axios
      .post(
        "http://localhost:3000/api/user",
        { userId: self.userId },
        {
          headers: {
            Authorization: `Bearer ${self.token}`,
          },
        }
      )
      .then((response) => (self.user = response.data[0]))
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          document.cookie = "userId=";
          document.cookie = "user-token=";
          self.$router.push("/");
        }
      });
  },
};
</script>
