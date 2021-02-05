<template>
    <div class="table">
        <el-table :data="tableData" border stripe style="width: 100%; margin: 1em 0"
                  v-loading="loading"
                  element-loading-text="拼命加载中..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column v-if="index" label="ID" type="index" :index="onIndex" align="center" show-overflow-tooltip/>
            <el-table-column v-for="(title,t) in tableTitle" :key="t" show-overflow-tooltip
                             :prop="title.prop"
                             :label="title.label"
                             :align="title.align != null ? title.align : 'center'"
                             :width="title.width"/>
            <el-table-column v-if="operation.flag" label="操作" align="center" width="210">
                <template #default="scope">
                    <el-button v-if="operation.detail" size="small" round @click="detail(scope.row)">查看</el-button>
                    <el-button v-if="operation.edit" type="primary" size="small" round @click="edit(scope.row)">编辑</el-button>
                    <el-button v-if="operation.del" type="danger" size="small" round @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="pageSize"
                       :pager-count="pagerCount"
                       :total="total"/>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    import {useRouter} from 'vue-router'
    import {ElMessageBox, ElNotification} from "element-plus";

    export default {
        props: {
            loading: Boolean,
            index: Boolean,
            operation: Object,
            datas: Object,
        },
        setup(props) {
            const router = useRouter()
            const state = reactive({
                tableTitle: [],
                tableData: [],
                currentPage: 1,
                pageSizes: [10, 20, 50, 100],
                pageSize: 10,
                total: 0,
            })

            onMounted(()=>{
                if(props.datas != null){
                    state.tableTitle = props.datas.tableTitle
                    state.tableData = props.datas.tableData
                    state.currentPage = props.datas.currentPage
                    state.pageSize = props.datas.pageSize
                    state.total = props.datas.total
                }
            })

            const detail = (val) => {
                console.log("detail:"+ JSON.stringify(val))
            }

            const edit = (val) => {
                router.push({ path: 'goods-add', query:{value: val, type: 'edit'}})
                console.log("edit:"+ JSON.stringify(val))
            }

            const del = (val) => {
                ElMessageBox.confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: action =>{
                        if('confirm' == action){
                            console.log("del:"+ JSON.stringify(val))
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

            const sizeChange = (val) => {
                state.pageSize = val
            }

            const currentChange = (val) => {
                state.currentPage = val
            }

            const onIndex = (index) => {
                return index + 1;
            }

            return {
                ...toRefs(state),
                detail,
                edit,
                del,
                onIndex,
                sizeChange,
                currentChange,
            }
        }

    }
</script>

<style lang="less">

</style>