<template>
  <div class="login">
    <div class="list list1">
      <span class="cursor">手机登录</span>
      <div class="line"></div>
      <span style="color:rgba(204,204,204,1);" class="cursor" @click="quickLogoin">快捷登录</span>
    </div>
    <div class="title_text list list2">
      <div class="title">手机号</div>
      <Input placeholder="请输入手机号码" style="width: 220px"  v-model="list.account"/>
    </div>
    <div class="title_text list list3">
      <div class="title">密码</div>
      <Input placeholder="请输入密码" type="password" style="width: 220px" v-model="list.password"/>
    </div>
    <!-- <div class="list list4">
      <Checkbox>自动登录</Checkbox>
    </div> -->
    <div class="list list5">
      <Button type="error" style="width:220px;" :loading="loading" @click="logoinClick">立即登录</Button>
    </div>
    <div class="list list6">
      <span class="cursor" @click="typeClick(4)">立即注册</span>
      <span class="cursor" @click="typeClick(3)">忘记密码</span>
    </div>
  </div>
</template>
<script>
import { getLogin } from '@/api/api';
export default {
  name: 'passwordLogin',
  components: {},
  data () {
    return {
      loading: false,
      list: {
        account: '',
        password: '',
        profile: 'type:user'
      }
    }
  },
  methods: {
    logoinLoading() {
      this.loading = true;
    },
    typeClick(key) {
      this.$emit('switchingMode', key)
    },
    logoinClick() {
      this.loading = true
      if (this.list.account === '') {
        this.$Message.error('请输入手机号');
        this.loading = false
      } else if (this.list.password === '') {
        this.$Message.error('请输入密码');
        this.loading = false
      } else {
        getLogin(this.list).then(res => {
          this.$Message.success('登录成功');
          window.localStorage.setItem('token', 'Bearer ' + res.data.token)
          window.localStorage.setItem('loginType', true)
          this.emptyData()
          this.$emit('loginSuccess', '1')
          window.location.reload()
        }).catch(err => {
          if (err.response) {
            this.$Message.error(err.response.data.message)
          } else {
            this.$Message.error('请求超时,请重试')
          }
          this.loading = false
        })
      }
    },
    emptyData() {
      this.list.account = ''
      this.list.password = ''
      this.loading = false
    },
    quickLogoin() {
      this.$Message.error('暂不可用');
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  position: relative;
  .list{
    position: absolute;
    left: 67px;
  }
  .list1{
    top: 60px;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(50,50,50,1);
    .line{
      display: inline-block;
      width: 1px;
      height: 8px;
      margin: 6px 14px 0 12px;
      background:rgba(221,221,221,1);
    }
  }
  .list2{
    top: 110px;
  }
  .list3{
    top: 175px;
  }
  .list4{
    top: 242px;
    color:rgba(50,50,50,1);
    font-size:12px;
  }
  .list5{
    top: 287px;
  }
  .list6{
    width: 220px;
    top: 335px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(50,50,50,1);
    display: flex;
    justify-content: space-between;
  }
  .title{
    color:rgba(50,50,50,1);
    margin-left: 2px;
    margin-bottom: 4px;
  }
}
</style>
