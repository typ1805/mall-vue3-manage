<template>
    <div class="goods-list">
        <el-card shadow="never">
            <template #header>
                <div class="clearfix">
                    <el-image class="icon" :src="require('@/assets/image/icon/list.png')"/>
                    <span>商品列表</span>
                </div>
            </template>
            <div class="content">
                <div class="content-header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input v-model="keyword" placeholder="请输入商品信息"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="typeVal" filterable placeholder="请选择">
                                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="init">搜索</el-button>
                            <el-button type="primary" @click="addGoodsInfo">发布商品</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="content-main">
                    <el-table :data="tableData" border stripe style="width: 100%; margin: 1em 0"
                              v-loading="loading"
                              element-loading-text="拼命加载中..."
                              element-loading-spinner="el-icon-loading"
                              element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-table-column prop="goodsId" label="商品ID" align="center" show-overflow-tooltip/>
                        <el-table-column prop="goodsName" label="商品名称" align="center" show-overflow-tooltip/>
                        <el-table-column label="商品主图" align="center">
                            <template #default="scope">
                                <el-image class="table-image" :src="scope.row.coverImg"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stock" label="库存" align="center" show-overflow-tooltip/>
                        <el-table-column label="价格" align="center" show-overflow-tooltip>
                            <template #default="scope">
                                <span>￥{{scope.row.goodsPrice}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="categoryName" label="分类" align="center" show-overflow-tooltip/>
                        <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip>
                            <template #default="scope">
                                <span>{{scope.row.status == 1 ? '上架':'下架'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip/>
                        <el-table-column label="操作" align="center" width="210">
                            <template #default="scope">
                                <el-button size="small" round @click="qryGoodsInfo(scope.row.goodsId)">查看</el-button>
                                <el-button type="success" size="small" round v-if="scope.row.status == 1" @click="updGoodsStatus(scope.row.goodsId,scope.row.status)">上架</el-button>
                                <el-button type="info" size="small" round v-if="scope.row.status == 0" @click="updGoodsStatus(scope.row.goodsId,scope.row.status)">下架</el-button>
                                <el-button type="primary" size="small" round @click="updGoodsInfo(scope.row.goodsId)">编辑</el-button>
                                <el-button type="danger" size="small" round @click="delGoodsInfo(scope.row.goodsId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :current-page="currentPage"
                                   :page-sizes="pageSizes"
                                   :page-size="pageSize"
                                   :total="total"/>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    import {useRouter} from 'vue-router'
    import {ElMessageBox, ElNotification} from 'element-plus'

    export default {
        setup() {
            const router = useRouter()
            const state = reactive({
                keyword: '',
                types: [],
                typeVal: '',
                loading: true,
                tableData: [],
                currentPage: 1,
                pageSizes: [10, 20, 50, 100],
                pageSize: 10,
                total: 100,
            })

            onMounted(() => {
                state.types = [
                    {value: '1', label: '黄金糕'},
                    {value: '2', label: '双皮奶'}
                ]
                init()
            })

            // 初始化数据
            const init = () =>{
                let keyword = state.keyword
                if(keyword == null || keyword == ''){
                    keyword = null
                }

                let typeVal = state.typeVal
                if(typeVal == null || typeVal == 0){
                    typeVal = null
                }
                console.log("keyword:"+keyword+",typeVal:"+typeVal)
                console.log("currentPage:"+state.currentPage+",pageSize:"+state.pageSize)
                state.tableData = [
                    {goodsId: '10001', goodsName: '饼干-案件韩国大受打击会是大分公司丢案发把速度告发送', coverImg: require('@/assets/image/logo.png'),stock:'1000',goodsPrice:'12.58',categoryName:'食品',status:'1',updateTime:'2016-05-02 12:20:21'},
                    {goodsId: '10001', goodsName: '饼干', coverImg: require('@/assets/image/logo.png'),stock:'1000',goodsPrice:'12.58',categoryName:'食品',status:'0',updateTime:'2016-05-02 12:20:21'},
                ]

                state.loading = false
            }

            // 详情
            const qryGoodsInfo = (goodsId) =>{
                router.push({ path: 'goods-add', query:{goodsId: goodsId, type: 'query'}})
                console.log(goodsId)
            }

            // 添加
            const addGoodsInfo = () =>{
                router.push({ path: 'goods-add', query:{type: 'add'}})
            }

            // 删除
            const delGoodsInfo = (goodsId) =>{
                ElMessageBox.confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action =>{
                        if('confirm' == action){
                            console.log("提交："+goodsId)
                            init()
                            ElNotification({
                                title: '成功',
                                message: '删除成功！',
                                duration: 2000,
                                type: 'success'
                            })
                        }
                    }
                })
            }
            // 上下架
            const updGoodsStatus = (goodsId,status) =>{
                let msg = "上架"
                if(status == 1){
                    msg = "下架"
                }
                ElMessageBox.confirm('您是否要'+msg+'此商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action =>{
                        if('confirm' == action){
                            console.log("提交："+goodsId +"======="+ status)
                            init()
                            ElNotification({
                                title: '成功',
                                message: '操作成功！',
                                duration: 2000,
                                type: 'success'
                            })
                        }
                    }
                })
            }

            // 编辑
            const updGoodsInfo = (goodsId) =>{
                router.push({ path: 'goods-add', query:{goodsId: goodsId, type: 'edit'}})
                console.log(goodsId)
            }

            const sizeChange = (val) => {
                state.pageSize = val
            }

            const currentChange = (val) => {
                state.currentPage = val
            }

            return {
                ...toRefs(state),
                init,
                qryGoodsInfo,
                addGoodsInfo,
                delGoodsInfo,
                updGoodsStatus,
                updGoodsInfo,
                sizeChange,
                currentChange
            }
        }
    }
</script>

<style lang="less">
    @import '../common/style/common';

    .goods-list {
        .content-main{
            .table-image{
                width: 45px;
                height: 45px;
            }
        }
    }
</style>