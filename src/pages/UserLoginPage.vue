<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccout"
          name="userAccout"
          label="账户"
          placeholder="账户"
          :rules="[{ required: true, message: '请填写账户' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div class="reg">
      <div style="text-align: center" @click="toRegister">没有账号？立即注册</div>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, Toast} from "vant";

  const router = useRouter();
  const route = useRoute();

  const userAccout = ref('');
  const userPassword = ref('');
  const onSubmit = async () => {
    const res = await myAxios.post('/user/login',{
      userAccount: userAccout.value,
      userPassword: userPassword.value
    })
    console.log(res,'登录');
    if (res.code === 0 && res.data){
      showSuccessToast('登录成功');
      //跳转到之前页面
      const redirectUrl = route.query?.redirect as string ?? '/';
      window.location.href = redirectUrl;
    } else {
      showFailToast('登录失败');
    }
  }
  const toRegister = () =>{
    router.push("/user/register")
  }


</script>

<style scoped>

</style>
