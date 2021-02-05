<template>
    <div class="goods-order-list">
        <el-card shadow="never">
            <template #header>
                <div class="clearfix">
                    <el-image class="icon" :src="require('@/assets/image/icon/list.png')"/>
                    <span>商品订单列表</span>
                </div>
            </template>
            <div class="content">
                <div class="content-header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input v-model="keyword" placeholder="请输入商品订单信息"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="init">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="content-main">
                    <Table :datas="data" v-if="data.tableData.length" :index="false" :operation="operation" :loading="loading"></Table>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    import Table from '@/components/Table'

    export default {
        components: {
            Table
        },
        setup() {
            const state = reactive({
                loading: true,
                keyword: '',
                data: {
                    tableTitle: [
                        {prop:'username',label:'商户名称'},
                        {prop:'nickname',label:'商户昵称'},
                        {prop:'phone',label:'联系电话'},
                        {prop:'openId',label:'唯一标识'},
                        {prop:'birthday',label:'商户生日'},
                        {prop:'sex',label:'性别'},
                        {prop:'email',label:'邮箱'},
                        {prop:'status',label:'状态'},
                        {prop:'updateTime',label:'更新时间'}
                    ],
                    tableData:[],
                    currentPage: 1,
                    pageSize: 10,
                    total: ''
                },
                operation: {
                    flag: true,
                    detail: true,
                    edit: false,
                    del: true
                }
            })

            onMounted(() => {
                init()
                state.loading = false
            })

            // 初始化数据
            const init = () =>{
                let keyword = state.keyword
                if(keyword == null || keyword == ''){
                    keyword = null
                }
                state.data.tableData=[
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                    {username:'zahngsan',nickname:'张三',phone:'18850022005',openId:'15sdg5dsfb',birthday:'2001-12-12',sex:'男',email:'zhangsan@163.com',status:'正常',updateTime:'2021-01-20 12:52:12'},
                ]
                state.data.currentPage = 1
                state.data.pageSize = 1
                state.data.total = 4
            }

            return {
                ...toRefs(state),
                init,
            }
        }
    }
</script>

<style lang="less">
    @import '../common/style/common';

    .goods-order-list {

    }
</style>