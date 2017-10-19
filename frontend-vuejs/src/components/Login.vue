<template>
  <el-row class="tac">
    <el-col :span="8">
      <h1>Login</h1>
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="Email" prop="name">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="pass">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
          <router-link :to="{ path: 'registration'}">
            <el-button type="text">Register</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        url: 'http://localhost:8000/users/authenticate',
        ruleForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this
            this.$ajax.post(_this.url, _this.ruleForm)
              .then((response) => {
                console.log(response)
                if (response.data.success === true) {
                  this.$message.success('Login successfully!')
                  window.localStorage.setItem('test', response.data.success)
                  console.log(window.localStorage.getItem('test'))
                  this.$router.push({path: '/success'})
                } else if (response.data.success === false) {
                  this.$message.error('username or password is incorrect!')
                } else {
                  this.$message.error('system error!')
                }
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>

</style>
