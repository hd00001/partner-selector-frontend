<template>
<div id="teamPage">
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
  <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
  <team-card-list :teamList="teamList"/>
</div>
</template>


<script setup>
import TeamCardList from "../components/TeamCardList.vue";
import {showFailToast} from "vant";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";

const router = useRouter();

//跳转到加入队伍页面
const doJoinTeam = () => {
  router.push({
    path: "/team"
  })
}

const teamList = ref([])

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
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
