<template>
    <div>
        <el-card style="width: 100%">
            <template #header>
              <div class="card-header">
                  <!-- 庫存量統計 -->
                   <el-row>
                    <el-col :sm="12" :lg="8">
                      <el-result
                        icon="success"
                        title="登錄總數"
                        :sub-title="String(tableData.length)"
                      >
                      </el-result>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-result
                        icon="success"
                        title="已核對數"
                        :sub-title="String(verifiedCount)"
                      >
                      </el-result>
                    </el-col>
                    <el-col :sm="12" :lg="8">
                      <el-result
                        icon="success"
                        title="未核對數"
                        :sub-title="String(notVerifiedCount)"
                      >
                      </el-result>
                    </el-col>
                  </el-row>
                  <div>
                      <el-button type="primary" @click="addGoods">新增</el-button>
                      <el-button type="danger" @click="batchDelete">批次刪除</el-button>
                  </div>
              </div>
            </template>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" />
              <el-table-column prop="name" label="商品名稱" />
              <el-table-column prop="count" label="商品數量">
                <template #default="{row}">
                  <el-input-number 
                    v-model="row.count" 
                    :min="1" 
                    :max="1000"
                    size="small"
                    @change="handleChange" 
                  />
                </template>
              </el-table-column>
              <el-table-column prop="state" label="是否核對">
                <template #default={row}>
                  <el-switch
                    v-model="row.state"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="state" label="核對狀態">
                <template #default={row}>
                  <el-tag :type="row.state?'success':'danger'">{{row.state?'已核對':'未核對'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button 
                    size="small" 
                    type="success"
                  >
                    檢視
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                  >
                    刪除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <template #footer>
              <span>總庫存數量</span>
              <el-tag type="warning" effect="light">{{totalGoods}}</el-tag>
              <span>已核對庫存數量</span>
              <el-tag type="primary" effect="light">{{verifiedGoods}}</el-tag>
              <span>未核對庫存數量</span>
              <el-tag type="danger" effect="light">{{notVerifiedGoods}}</el-tag>
            </template>
        </el-card>

        <!-- 新增商品 -->
        <el-dialog v-model="dialogVisible" title="新增商品" width="500" center>
          <template #footer>
              <el-form :model="temp" label-width="auto">
                <el-form-item label="商品名稱">
                  <el-input v-model="temp.name" placeholder="請輸入商品名稱" />
                </el-form-item>
                <el-form-item label="商品數量">
                  <el-input v-model="temp.count" placeholder="請輸入商品數量" />
                </el-form-item>
                <el-form-item label="核對狀態">
                  <el-switch v-model="temp.state" />
                </el-form-item>
              </el-form>
            <div class="dialog-footer">
              <el-button type="primary" @click="submit">
                新增
              </el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </div>
          </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import http from '../../utils/request'
import type { ITableData } from '../../utils/models'

let dialogVisible = ref<boolean>(false) //彈跳視窗顯示與隱藏
const tableData = ref<ITableData[]>([] as ITableData[])
const temp = ref<ITableData>({} as ITableData)
const selectionData = ref<ITableData[]>([] as ITableData[])

//發送請求
onMounted(async()=>{
  let {data} = await http.request<ITableData[]>('get', '/data/data.json')
  tableData.value = data
  /* let data = await http.request('get', '/getWarehouseData') */
  console.log(data)
})
//新增商品
const addGoods = ():void => {
  dialogVisible.value = true
}
//新增
const submit = ():void => {
  dialogVisible.value = false
  tableData.value.push({...temp.value})
}
//全選狀態變更
const handleSelectionChange = (val:ITableData[]):void => {
  selectionData.value = val
}

//批次刪除
const batchDelete = ():void => {
  selectionData.value.forEach((item2:ITableData,i?:number)=>{
    tableData.value = tableData.value.filter(item1=>!(item1.name===item2.name && item1.state===item2.state))
  })
}

// 商品數量
const num = ref(1)
const handleChange = (value: number | undefined):void => {
  console.log(value)
}

//已核對數
const verifiedCount = computed<number>(()=>tableData.value.filter(v=>v.state).length)

//未核對數
const notVerifiedCount = computed<number>(()=>tableData.value.filter(v=>!v.state).length)

//總庫存數量
const totalGoods = computed<number>(
  ()=>tableData.value.reduce((total, cur)=>total+cur.count,0)
  )

//已核對庫存數量
const verifiedGoods = computed<number>(
  ()=>tableData.value.filter(v=>v.state).reduce((total, cur)=>total+cur.count,0)
  )

//未核對庫存數量
const notVerifiedGoods = computed<number>(
  ()=>tableData.value.filter(v=>!v.state).reduce((total, cur)=>total+cur.count,0)
  )

</script>

<style scoped>

</style>