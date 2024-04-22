<template>
  <template v-if="user">
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称', user.username)"/>
  <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('userAccount','账号', user.userAccount)"/>
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="注册时间" :value="user.createTime"  />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, Toast} from "vant";
import qs from 'qs';
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const router = useRouter()

const user = ref();

onMounted(async () => {
  // const res = await myAxios.get('/user/current');
  // if (res.code === 0){
  //   user.value = res.data;
  //   showSuccessToast("获取用户信息成功")
  // } else {
  //   showFailToast('获取用户信息失败')
  // }
//  用户信息代码提取
  user.value = await getCurrentUser();

})

const toEdit = (editKey: String, editName: string, currentValue: String) => {
  router.push({
    path: './user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

</script>

<style scoped>

</style>
