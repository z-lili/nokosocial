class VerfyLogin {
  // 注册校验
  verfyReg(uname,upassword,uaginPassword){
    // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    const regpasswordObj = /^[a-zA-Z]\w{5,17}$/
    if (!uname || !upassword || uname === '' || upassword === '') {
      return ElMessage.error('用户名和密码不能为空')
    }
    if (upassword !== uaginPassword) {
      return ElMessage.error('输入的密码不一致')
    }
    if (!regpasswordObj.test(upassword)) {
      return ElMessage.error('密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
    }
    if (uname.length > 13) {
      return ElMessage.error('用户名必须小于13位')
    }
    if(uname.length <= 13 && regpasswordObj.test(upassword) && upassword === uaginPassword){
      return 'yes'
    }
  }
  // 登录校验
  verLogin(uname,upassword){
    const regpasswordObj = /^[a-zA-Z]\w{5,17}$/
    if (!uname || !upassword || uname === '' || upassword === '') {
      return ElMessage.error('用户名和密码不能为空')
    }
    if (!regpasswordObj.test(upassword)) {
      return ElMessage.error('密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
    }
    if (uname.length > 13) {
      return ElMessage.error('用户名必须小于13位')
    }
    if(uname.length <= 13 && regpasswordObj.test(upassword)){
      return 'yes'
    }
  }
}

export default new VerfyLogin