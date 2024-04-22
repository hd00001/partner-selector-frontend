<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, Toast} from "vant";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

// 不可以写在外面，否则页面不显示内容，还没有报错信息，原因未知
// const currentUser = await getCurrentUser();

const onSubmit = async () => {
  // 异步方法必须添加 await 才可以拿到数据, 否则拿到的是 promise 对象
  const currentUser = await getCurrentUser();
  console.log("-------UserEditPage", currentUser);
  const res = await myAxios.post("/user/update", {
    "id": currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue // 动态取值
  })
  console.log("修改用户信息", res);
  if (res.code === 0 && res.date > 0) {
    showSuccessToast('修改成功')
    router.back()
  }else {
    showFailToast('修改失败');
  }
};
</script>

<style scoped>

</style>
