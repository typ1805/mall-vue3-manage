<template>
    <div class="user-password">
        <el-card shadow="never">
            <template #header>
                <div class="clearfix">
                    <el-image class="icon" :src="require('@/assets/image/icon/list.png')"/>
                    <span>修改密码</span>
                </div>
            </template>
            <div class="content">
                <el-form :model="passForm" :rules="rules" ref="validateForm" label-width="100px">
                    <el-form-item label="原始密码" prop="oldPassword">
                        <el-input class="input-size" type="password" v-model="passForm.oldPassword"
                                  prefix-icon="el-icon-lock"
                                  autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input class="input-size" type="password" v-model="passForm.password"
                                  prefix-icon="el-icon-lock"
                                  autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePassword">
                        <el-input class="input-size" type="password" v-model="passForm.rePassword"
                                  prefix-icon="el-icon-lock"
                                  autocomplete="off"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="submitForm">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {reactive, ref, toRefs, unref} from 'vue'
    import {useRouter} from 'vue-router'
    import {ElMessageBox} from 'element-plus'

    export default {
        setup() {
            const router = useRouter()
            const validateForm = ref(null)
            const state = reactive({
                passForm: {
                    oldPassword: '',
                    password: '',
                    rePassword: ''
                }
            })

            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== state.passForm.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            }

            const rules = {
                oldPassword: [
                    {required: true, message: '请输入原始密码', trigger: 'blur'},
                    {pattern: /^[a-zA-Z]\w{5,17}$/, message: '原始密码格式有误，请重新输入'}
                ],
                password: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {pattern: /^[a-zA-Z]\w{5,17}$/, message: '以字母开头，只能包含字符、数字和下划线，必须在6~18位之间'}
                ],
                rePassword: [
                    {required: true, validator: validatePass, trigger: 'blur'}
                ]
            }

            const submitForm = async () => {
                const form = unref(validateForm)
                if (!form) return
                await form.validate()

                console.log(state.passForm)

                ElMessageBox.alert('修改密码成功，需重新登录！', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        if ('confirm' == action) {
                            router.push({path: 'login'})
                        }
                    }
                })

            }

            return {
                ...toRefs(state),
                validateForm,
                rules,
                submitForm
            }
        }

    }
</script>

<style lang="less">
    @import '../common/style/common';

    .user-password {
        .content {
            .input-size {
                width: 40em;
            }
        }
    }
</style>