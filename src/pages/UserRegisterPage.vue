<template>
  <div>
    <div class="icon-back" @click="tologin">
      <van-icon size="25" name="arrow-left" />
    </div>
    <van-form>
      <van-cell-group>
        <van-field
            v-model="userAccout"
            required
            label="账号"
            placeholder="请输入账号（大于四位）"
        />
        <van-field
            v-model="userPassword"
            required
            type="password"
            label="密码"
            placeholder="请输入密码（大于8位）"
        />
        <van-field
            v-model="userPassword1"
            required
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
        />
      </van-cell-group>
    </van-form>
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" @click="onSubmit">注册</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const userAccout = ref('');
const userPassword = ref('');
const userPassword1 = ref('');

const onSubmit = async () => {

    const res = await myAxios.post('/user/register',{
      userAccount: userAccout.value,
      userPassword: userPassword.value,
      checkPassword: userPassword1.value
    })
    console.log(res,'注册');
    if (res.code === 0 && res.data){
      showSuccessToast('注册成功');
      //跳转到之前页面
      const redirectUrl = route.query?.redirect as string ?? '/';
      window.location.href = redirectUrl;
    } else {
      showFailToast('注册失败');
    }

}

</script>

<style scoped>
.icon-back{
  position: absolute;
  left: 2px;
  top:15px
}
</style>

