<template>
    <div class="order-detail">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(turnover, t) in turnovers" :key="t" :offset="t==0? 3:0">
                <el-card shadow="hover">
                    <el-image class="turnover-image m120 mb120" :src="turnover.image" fit="fit"/>
                    <h2 class="turnover-text m120 mb120">{{turnover.price}}￥</h2>
                    <div class="m120">{{turnover.todayNum}}</div>
                    <div class="m120">{{turnover.yesterdayNum}}</div>
                    <div class="m120 mb120">{{turnover.ratio}}</div>
                    <div class="m120 mb120">
                        <el-button round>查看详情</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :offset="3">
                <div class="m120 f-weight">成交额：同比、环比分析</div>
                <div class="m120 mb120">包含今天较昨天、本月较上月、本年较上一年的详细分析展示。</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(turnover, t) in turnovers" :key="t" :offset="t==0? 3:0">
                <el-card shadow="hover">
                    <h2 class="turnover-text m120 mb120">{{turnover.price}}￥</h2>
                    <div class="m120">{{turnover.todayNum}}</div>
                    <div class="m120">{{turnover.yesterdayNum}}</div>
                    <div class="m120 mb120">{{turnover.ratio}}</div>
                    <div class="m120 mb120">
                        <el-button round>查看详情</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :offset="3">
                <div class="m120">查看详细数据，请到订单列表，及详情体局分析。</div>
                <div class="m120 mb120">
                    <el-button type="danger" round>查看列表</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'

    export default {
        setup() {
            const state = reactive({
                turnovers: [],
            })

            onMounted(() => {
                state.turnovers = [
                    {
                        price: '99',
                        todayNum: '今日成交数1002单',
                        yesterdayNum: '昨日成交数15624单',
                        ratio: '较昨日比例50%',
                        image: require('@/assets/image/icon/order-detail-1.png')
                    },
                    {
                        price: '120',
                        todayNum: '今日成交数1002单',
                        yesterdayNum: '昨日成交数15624单',
                        ratio: '较昨日比例50%',
                        image: require('@/assets/image/icon/order-detail-2.png')
                    },
                    {
                        price: '520',
                        todayNum: '今日成交数1002单',
                        yesterdayNum: '昨日成交数15624单',
                        ratio: '较昨日比例50%',
                        image: require('@/assets/image/icon/order-detail-3.png')
                    }
                ]
            })

            return {
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="less">
    @import '../common/style/common';

    .order-detail {
        margin-bottom: 10em;
        color: #494b52;
        .turnover-image {
            padding: 1.4em;
            width: 100px;
            height: 100px;
        }

        .el-card {
            text-align: center;
        }
        .el-card:hover{
            .turnover-image{
                border-radius: 50%;
                background: rgba(0,123,255,0.2);
            }
            .turnover-text{
                color: #007bff;
            }
        }
    }
</style>