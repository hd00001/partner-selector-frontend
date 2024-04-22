<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="small" type="primary" @close="doclose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>

  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 20px">
    <van-button block type="primary" @click="toSearchResult" style="margin: 12px">搜索</van-button>
  </div>


</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter()

const searchText = ref('');

const originTagList = [
      {
        text: '性别',
        children: [
          {text: '男', id: '男' },
          {text: '女', id: '女'},
        ],
      },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
    ],
  },{
    text: '方向',
    children: [
      {text: 'Java', id: 'Java'},
      {text: 'Python', id: 'Python'},
    ],
  },{
    text: '兴趣',
    children: [
      {text: '乒乓球', id: '乒乓球'},
      {text: '羽毛球', id: '羽毛球'},
      {text: '篮球', id: '篮球'},
      {text: '排球', id: '排球'},
    ],
  },
]


//标签列表
const tagList = ref(originTagList);

/**
 * 搜索标签
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children]
    const tempParentTag ={...parentTag}
    tempParentTag.children = tempChildren.filter(item => item .text.includes(searchText.value))
    return tempParentTag
  })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 已选中标签
const activeIds = ref([]);
const activeIndex = ref(0);

//移除标签
const doclose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
      return item !== tag;
    })
}
  /**
   * 跳转到搜索
   */
const toSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>
