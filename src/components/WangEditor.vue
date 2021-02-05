<template>
    <div class="wangeditor">
        <div ref="editor"></div>
    </div>
</template>

<script>
    import {onMounted, onBeforeUnmount,reactive, ref, toRefs} from 'vue'
    import WangEditor from 'wangeditor'

    export default {
        setup() {
            const editor = ref()
            const state = reactive({
                html: '',
                text: '',
            })

            let instance
            onMounted(() => {
                instance = new WangEditor(editor.value)
                Object.assign(instance.config, {
                    onchange() {
                        console.log('change')
                    }
                })
                instance.create()
            })

            onBeforeUnmount(() => {
                instance.destroy()
                instance = null;
            })

            return {
                ...toRefs(state),
                editor
            }
        }
    }
</script>

<style lang="less">
    .wangeditor{

    }
</style>