<template>
<div id="teamPage">
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public"/>
    <van-tab title="加密" name="private"/>
  </van-tabs>
  <div style="margin-bottom: 16px"/>
  <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"/>
  <team-card-list :teamList="teamList"/>
</div>
</template>


<script setup lang="ts">
import TeamCardList from "../components/TeamCardList.vue";
import {showFailToast} from "vant";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";

const router = useRouter();
const active = ref('public')
const searchText = ref('')

const onTabChange = (name) => {
  if(name == 'public') {
    listTeam(searchText.value, 0);
  }else{
    listTeam(searchText.value, 2);
  }
}
//跳转到加入队伍页面
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([])

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',status=0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
     showFailToast('加载队伍失败，请刷新重试');
  }
}

onMounted(async () => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
}

</script>

<style scoped>

</style>
