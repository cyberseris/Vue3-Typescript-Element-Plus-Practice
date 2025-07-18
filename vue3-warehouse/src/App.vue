<script setup lang="ts"> 
import navMenu from './view/navMenu.vue'
</script>

<template>
  <div id="module">
    <el-container>
      <el-header class="el-header">
        <div class="header-title">智能倉庫管理系統</div>
      </el-header>
      <el-container>

        <navMenu />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header{
  background-color: #76bbc4;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  padding-left: 20px;
}

</style>
