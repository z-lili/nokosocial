import zlrequest from '../../service/index.js'

const regist = async ()=>{
  // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
  const regpasswordObj = /^[a-zA-Z]\w{5,17}$/
  if (!userInfo.value.name || !userInfo.value.password || userInfo.value.name === '' || userInfo.value.password === '') {
    return ElMessage.error('用户名和密码不能为空')
  }
  if (userInfo.value.password !== userInfo.value.aginPassword) {
    return ElMessage.error('输入的密码不一致')
  }
  if (!regpasswordObj.test(userInfo.value.password)) {
    return ElMessage.error('密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
  }
  if (userInfo.value.name.length > 13) {
    return ElMessage.error('用户名必须小于13位')
  }
  if (userInfo.value.name.length <= 13 && regpasswordObj.test(userInfo.value.password) && userInfo.value.password === userInfo.value.aginPassword) {
    // 通过校验
    try {
      const res = await zlrequest.request({
        method: 'post',
        url: '/users',
        data: {
          name: userInfo.value.name,
          password: userInfo.value.password,
        },
      })
      if (res.status === 200) {
        ElMessage.success('注册成功,去登录吧~')
        moveToLeft()
        userInfo.value.name = ''
        userInfo.value.password = ''
        userInfo.value.aginPassword = ''
      } else {
        ElMessage.error('注册失败~')
      }
    } catch (err) {
      if (err.message == 'Request failed with status code 409') {
        ElMessage.error('用户名重复啦，换一个试试~')
      } else {
        ElMessage.error(err.message)
      }
    }
  } else {
    ElMessage.error('注册失败~')
  }
}

export default regist