<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username}`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" >
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {withDefaults} from "vue";

interface UserCardListProps{
  loading: boolean;
  userList: UserType[];
}

function defineProps<T>() {
  return undefined;
}

// 给父组件设置默认值，保证数据不为空
const props= withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [],
});

</script>
<style scoped>
/* 标签颜色*/
.van-tag--danger.van-tag--plain {
  color: #002fff;
}
</style>
