<template>
    <div class="goods-add">
        <el-card shadow="never">
            <template #header>
                <el-page-header @back="goBack" content="商品详情"></el-page-header>
            </template>
            <div class="content">
                <el-form :model="goodsForm" :rules="rules" ref="validateForm" label-width="100px">
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input class="input-size" v-model="goodsForm.goodsName" maxlength="20" minlength="4"
                                  autocomplete="off"
                                  placeholder="请输入"/>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="categoryId">
                        <el-select class="input-size" v-model="goodsForm.categoryId" filterable placeholder="请选择">
                            <el-option v-for="(category,c) in categorys" :key="c"
                                       :label="category.label"
                                       :value="category.value"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品简介" prop="goodsIntro">
                        <el-input class="input-size" type="textarea" v-model="goodsForm.goodsIntro"
                                  :autosize="{minRows: 2, maxRows: 4}"
                                  maxlength="180" show-word-limit
                                  placeholder="请输入内容"/>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goodsPrice">
                        <el-input-number v-model="goodsForm.goodsPrice" controls-position="right"
                                         :precision="2"
                                         :step="0.01"
                                         :min="0.01"
                                         :max="100000"/>
                    </el-form-item>
                    <el-form-item label="市场价" prop="marketPrice">
                        <el-input-number v-model="goodsForm.marketPrice" controls-position="right"
                                         :precision="2"
                                         :step="0.01"
                                         :min="0.01"
                                         :max="100000"/>
                    </el-form-item>
                    <el-form-item label="库存" prop="stock">
                        <el-input-number v-model="goodsForm.stock" controls-position="right"
                                         :min="1"
                                         :max="100000"/>
                    </el-form-item>
                    <el-form-item label="商品主图" prop="coverImg">
                        <el-upload class="avatar-uploader" :action="uploadAction"
                                   :on-success="coverImgSuccess"
                                   :show-file-list="false"
                                   :auto-upload="false">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品轮播图" prop="carouselImg">
                        <el-upload :action="uploadAction" list-type="picture-card" :auto-upload="false" :limit="10">
                            <template #default>
                                <i class="el-icon-plus"></i>
                            </template>
                            <template #file="{file}">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url"/>
                                    <span class="el-upload-list__item-actions">
                                      <span class="el-upload-list__item-preview" @click="qryImage(file)">
                                        <i class="el-icon-zoom-in"></i>
                                      </span>
                                      <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="delImage(file)">
                                        <i class="el-icon-delete"></i>
                                      </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品详情" prop="goodsDetail">
                        <WangEditor></WangEditor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="submitForm">立即发布</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog v-model="dialogVisible">
                    <el-image width="100%" :src="imageItemUrl"/>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {onMounted, reactive, ref, toRefs, unref} from 'vue'
    import {useRouter} from 'vue-router'
    import WangEditor from "@/components/WangEditor"

    export default {
        components:{
            WangEditor
        },
        setup() {
            const router = useRouter()
            const validateForm = ref(null)
            const state = reactive({
                uploadAction: '#',
                imageUrl: '',
                imageItemUrl: '',
                dialogVisible: false,
                disabled: false,
                goodsForm: {
                    goodsName: '', // 名称
                    goodsIntro: '', // 描述
                    categoryId: '', // 分类id
                    goodsPrice: '', // 价格
                    marketPrice: '', // 市场价
                    stock: '', // 库存
                    coverImg: '', // 主图
                    carouselImg: '', // 轮播图
                    goodsDetail: '', // 详情
                },
                categorys: [],
            })

            const rules = {
                goodsName: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'},
                ],
                goodsIntro: [
                    {required: true, message: '请输入商品描述', trigger: 'blur'},
                ],
                categoryId: [
                    {required: true, message: '请输入选择分类', trigger: 'blur'},
                ],
                goodsPrice: [
                    {required: true, message: '请输入商品价格', trigger: 'blur'},
                ],
                marketPrice: [
                    {required: true, message: '请输入市场价', trigger: 'blur'},
                ],
                stock: [
                    {required: true, message: '请输入库存', trigger: 'blur'},
                ],
                coverImg: [
                    {required: true, message: '请上传商品主图', trigger: 'blur'},
                ],
                carouselImg: [
                    {required: true, message: '请上传轮播图，至少一张', trigger: 'blur'},
                ],
                goodsDetail: [
                    {required: true, message: '请输入商品详情', trigger: 'blur'},
                ]
            }

            onMounted(async () => {
                state.categorys = [
                    {label: '生鲜', value: '1'},
                    {label: '蔬菜', value: '2'},
                    {label: '水果', value: '3'},
                    {label: '日用', value: '4'},
                ]
            })

            const submitForm = async () => {
                const form = unref(validateForm)
                if (!form) {
                    return
                }
                await form.validate()

                console.log(state.goodsForm)
            }

            const resetForm = () => {
                const form = unref(validateForm)
                form.resetFields()
            }

            const goBack = () => {
                router.go(-1)
            }

            const coverImgSuccess = (res, file) => {
                state.imageUrl = URL.createObjectURL(file.raw);
            }

            // 查看大图
            const qryImage = (file) => {
                state.imageItemUrl = file.url
                state.dialogVisible = true
            }

            // 删除图片
            const delImage = (file) => {
                console.log("删除图片" + file)
            }

            return {
                ...toRefs(state),
                goBack,
                validateForm,
                rules,
                submitForm,
                resetForm,
                coverImgSuccess,
                qryImage,
                delImage,
            }
        }
    }
</script>

<style lang="less">
    .goods-add {
        padding-bottom: 4em;

        .input-size {
            width: 40em;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>