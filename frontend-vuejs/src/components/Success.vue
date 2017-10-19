<template>
    <div>
        <div v-if="!authorized">
            <button type="button" class="btn btn-outline-success" @click="login">Login</button>
        </div>
        <div v-else>
            <img v-show="profile.name" :src="profilePicture" alt="profile" class="profile-picture" />
            <h1 v-html="msg"></h1>
            <div v-for="item in profile.albums.data" style="display: inline-block;float: none;vertical-align: middle;padding:10px">
                <button type="button" class="btn btn-success" @click="getPhotos(item)">{{item.name}}</button>
            </div><br><br><br>
            <div class="pins">
                <div class="pin" v-for="photo in photos.data">
                    <a target="_blank" :src="photo.source">
                        <img :src="photo.source" alt="profile" />
                    </a>
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profile: {},
            url: '',
            authorized: false,
            photos: []
        }
    },
    computed: {
        msg() {
            if (this.profile.name) {
                console.log(this.profile)
                return `Welcome <b><i> ${this.profile.name} </i></b> to Vue.js App`
            } else {
                return 'Login Facebook to Enjoy the App'
            }
        },
        profilePicture() {
            return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=300` : `/static/man.gif`
        }
    },
    methods: {
        getProfile() {
            let vm = this
            FB.api('/me?fields=name,id,email,albums,photos', function(response) {
                vm.profile = response
            })
        },
        login() {
            let vm = this
            FB.login(function(response) {
                vm.statusChangeCallback(response)
            }, {
                    scope: 'email, public_profile, user_photos',
                    return_scopes: true
                })
        },
        logout() {
            let vm = this
            FB.logout(function(response) {
                vm.statusChangeCallback(response)
            })
            window.localStorage.setItem('test', false)
            console.log(window.localStorage.getItem('test'))
            this.$router.push({path: '/'})
        },
        statusChangeCallback(response) {
            let vm = this
            if (response.status === 'connected') {
                vm.authorized = true
                vm.getProfile()
            } else if (response.status === 'not_authorized') {
                vm.authorized = false
            } else if (response.status === 'unknown') {
                vm.profile = {}
                vm.authorized = false
            } else {
                vm.authorized = false
            }
        },
        profilePicture_2(item) {
            FB.api(this.profile.albums.data[0].id + '/photos?fields=source', function(response) {
                console.log(response)
            })
            return (item.id) ? `https://graph.facebook.com/${item.id}/picture?width=300` : `/static/man.gif`
        },
        getPhotos(item) {
            let vm = this
            console.log(item)
            FB.api(item.id + '/photos?fields=source', function(response) {
                vm.photos = response;
                console.log(response)
            })
        }
    },
    mounted() {
        let vm = this
        window.fbAsyncInit = function() {
            FB.init({
                appId: '<FB API ID>',
                cookie: true,
                xfbml: true,
                version: 'v2.9'
            })
            FB.AppEvents.logPageView()

            // Get FB Login Status
            FB.getLoginStatus(response => {
                vm.statusChangeCallback(response)
            })
        }
    }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.profile-picture {
  width: 150px;
  border-radius: 75px;
}
div.pins {
  column-count: 3; 
}
div.pin {
  display: inline-block;
  margin: 0 2px 10px;
  padding: 5px;
}
button {
    cursor: pointer;
}
</style>
