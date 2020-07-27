<!--button组件
属性
type 按钮类型，primary，danger，warning，info，default
size 按钮大小 默认normal 还有，small,mini
plain 是否为镂空按钮
disabled 是否禁用
round 是否圆角

组件注册事件，需要使用.native修饰符，原理是子组件来触发$emit(click,data)
-->

<template>
    <div class="button" :disabled="disabled" @click="buttonClick">
        <template v-if="!plain">
            <button
                    class="btn-normal"
                    :type="type"
                    :disabled="disabled?true:false"
                    :round="round"
                    :size="size"
                    :cirle="cirle"
            >
                <slot></slot>
            </button>
        </template>
        <template v-if="plain">
            <button
                    class="btn-Hollow"
                    :type="type"
                    :disabled="disabled?true:false"
                    :round="round"
                    :size="size"
                    :cirle="cirle"
            >
                <slot></slot>
            </button>
        </template>
    </div>
</template>
<script>
    export default {
        name: "vv-button",
        props: {
            // 按钮类型
            type: {
                type: String,
                default: ""
            },
            // 是否镂空
            plain: {
                type: Boolean,
                default: false
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 控制圆角
            round: {
                type: Boolean,
                default: false
            },
            //尺寸
            size: {
                type: String,
                default: "normal"
            },
            // 待做
            cirle: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        },
        methods: {
            buttonClick(el) {
                if (this.disabled) {
                    el.stopPropagation()
                    el.preventDefault()
                }
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .button {
        display: inline-block;
        font-size: 14px;
        margin:2px 0px

        /* 设置禁用状态 */
        &[disabled] {
            pointer-events: none;
        }
        .btn-normal[disabled], .btn-Hollow[disabled] {
            cursor:no-drop||not-allowed;
            box-shadow: none;
            opacity: 0.5;
        }

        .btn-Hollow, .btn-normal {
            outline none
            display: inline-block;
            line-height: 14px;
            border-radius: 4px;
            border: none;
            cursor: pointer;

            &[size='normal'] {
                padding: 10px 20px;

                &[round] {
                    border-radius: 20px;
                }
            }

            &[size='medium'] {
                padding: 9px 15px;

                &[round] {
                    border-radius: 20px;
                }
            }

            &[size='small'] {
                padding: 7px 15px;
                font-size: 12px;

                &[round] {
                    border-radius: 17px;
                }
            }

            &[size='mini'] {
                padding: 3px 7px;
                font-size: 10px;

                &[round] {
                    border-radius: 15px;
                }
            }
        }

        .btn-normal {
            color: #606266;
            background-color: #fff;
            border: 1px solid #DCDFE6;
        }

        .btn-normal:hover {
            color: #409EFF;
            background-color: #ECF5FF;
            border: 1px solid #409EFF;
        }

        /*  */

        .btn-normal[type='default'] {
            color: #fff;
            background-color: #909399;
            border: 1px solid #909399;
        }

        .btn-normal[type='default']:hover {
            color: #fff;
            background-color: #bbb;
            border: 1px solid #bbb;
        }

        .btn-normal[type='primary'] {
            color: #fff;
            background-color: #3078EC;
            border: 1px solid #3078EC;
        }

        .btn-normal[type='primary']:hover {
            color: #fff;
            background-color: #66a4ff;
            border: 1px solid #66a4ff;
        }

        /*  */

        .btn-normal[type='success'] {
            color: #fff;
            background-color: #67C23A;
            border: 1px solid #67C23A;
        }

        .btn-normal[type='success']:hover {
            color: #fff;
            background-color: #81C061;
            border: 1px solid #81C061;
        }

        /*  */

        .btn-normal[type='warning'] {
            color: #fff;
            background-color: #E6A23C;
            border: 1px solid #E6A23C;
        }

        .btn-normal[type='warning']:hover {
            color: #fff;
            background-color: #F1AA3F;
            border: 1px solid #F1AA3F;
        }

        /*  */

        .btn-normal[type='danger'] {
            color: #fff;
            background-color: #f1556c;
            border: 1px solid #f1556c;
        }

        .btn-normal[type='danger']:hover {
            color: #fff;
            background-color: #fa6d82;
            border: 1px solid #fa6d82;
        }

        /*  */

        .btn-Hollow {
            color: #606266;
            background-color: #fff;
            border: 1px solid #DCDFE6;
        }

        .btn-Hollow:hover {
            color: #409EFF;
            background-color: #fff;
            border: 1px solid #409EFF;
        }

        .btn-Hollow[type='default'] {
            color: #909399;
            border: 1px solid #909399;
        }

        .btn-Hollow[type='default']:hover {
            color: #fff;
            background-color: #909399;
            border: 1px solid #909399;
        }

        /*  */

        .btn-Hollow[type='primary'] {
            color: #66a4ff;
            border: 1px solid #3078EC;
        }

        .btn-Hollow[type='primary']:hover {
            color: #fff;
            background-color: #3078EC;
        }

        .btn-Hollow[type='success'] {
            color: #67C23A;
            border: 1px solid #67C23A;
        }

        .btn-Hollow[type='success']:hover {
            color: #fff;
            background-color: #67C23A;
        }

        .btn-Hollow[type='warning'] {
            color: #E6A23C;
            border: 1px solid;
        }

        .btn-Hollow[type='warning']:hover {
            color: #fff;
            background-color: #E6A23C;
        }

        .btn-Hollow[type='danger'] {
            color: #f1556c;
            border: 1px solid #f1556c;
        }

        .btn-Hollow[type='danger']:hover {
            color: #fff;
            background-color: #fa6d82;
        }


    }
</style>