<script setup lang="ts"> 
    import { ref, reactive } from 'vue'
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'

    import type {INavMenu} from '../utils/models'

    const items = reactive<INavMenu[]>([
        { name: '首頁', url: '/index'},
        { name: '訂單', url: '/order'},
        { name: '統計管理', url: '/census'},
        { name: '管理權限', url: '/manage'}
    ])
</script>

<template>
        <el-aside width="200px" class="custom-aside">
          <el-menu
              default-active="2"
              class="custom-menu-vertical" router
          >
            <el-menu-item class="custom-menu-item" :index="v.url" v-for="v in items" :key="v.url">
                <el-icon class="custom-icon"><icon-menu /></el-icon>
                <span>{{ v.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
</template>

<style>
.custom-aside {
  background-color: #fff8ee;
  color: #fff !important;
}

.custom-menu-vertical {
  background: transparent;
  border-right: none;
  height: 600px;
  color: #fff !important;
}

.custom-menu-vertical :deep(.custom-menu-item) {
  color: #fff !important;
  font-weight: 400;
}

.custom-menu-vertical :deep(.custom-menu-item.is-active),
.custom-menu-vertical :deep(.custom-menu-item:hover) {
  background: none;
  color: #fff !important;
}

.custom-menu-vertical :deep(.custom-icon) {
  color: #fff  !important;
  margin-right: 6px;
}
</style>