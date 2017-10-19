<template>
  <el-row class="tac">
    <el-col :span="8">
      <h1>Registration</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="email" prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        url: 'http://localhost:8000/users/register',
        ruleForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please enter the email', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please enter the email', trigger: 'blur' }
          ]
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
                if (response.data.success === false) {
                  this.$message.error('Username already exists')
                  console.log('error submit!!')
                } else if (response.data.success === true) {
                  this.$message.success('registration success!')
                  this.$refs[formName].resetFields()
                  this.$router.push({path: '/'})
                } else {
                  this.$message.error('error in system')
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
