<!--table

属性：
border是否有外边框；
stripe：斑马纹
columns:表头数据，
形如：columns: [
        {
          title: "姓名",
          // 对应的表格数据的字段
          filed: "name"
        },
        {
          title: "金钱",
          filed: "money"
        },
        {
          title: "地址",
          filed: "address"
        },
        {
          title: "操作",
          filed: "operate"
        }
      ],
dataSource：表格数据
形如：dataSource: [
        {
          key: "1",
          name: "John Brown",
          money: "￥300,000.00",
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          money: "￥1,256,000.00",
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Joe Black",
          money: "￥120,000.00",
          address:
            "Sidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake Park"
        },
        {
          key: "5",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney No. 1 Lake Park"
        }
      ],
align：对齐方式
checkable 是否使用全选



-->

<template>
  <div>
    <table class="table" :border="border" :stripe="stripe" :size="size">
      <!-- 表格头部 -->
      <thead>
        <tr>
          <th class="checkbox" v-if="checkable">
            <input
              type="checkbox"
              @click="self_checkAll($event)"
              ref="selectAll"
              :style="{'cursor':dataSource.length===0? 'not-allowed':'pointer','pointer-events':dataSource.length===0?'none':''}"
            />
          </th>

          <th v-for="(column,index) in columns" :key="index" :align="align">{{column.title}}</th>
        </tr>
      </thead>
      <!-- 表格主体 -->
      <tbody v-if="dataSource.length">
        <tr v-for="(item,index) in dataSource" :key="index" @click="self_clickTableTr($event)">
          <td class="checkbox" v-if="checkable">
            <input
              type="checkbox"
              @click.stop="self_singleCheck(item.key,$event)"
              ref="select"
              :data_key="item.key"
            />
          </td>
          <td v-for="(column,index) in columns" :key="index" :align="align">
            <slot v-bind:data="item" :name="column.filed">
              <template>{{item[column.filed]}}</template>
            </slot>
          </td>
        </tr>
        <!-- <tr>
              <td colspan="5"></td>
        </tr>-->
      </tbody>
      <!--无数据时 -->
      <tbody v-else>
        <tr class="nodata">
          <td :colspan="checkable?columns.length+1:columns.length">
            <slot name="nodata">
              <template>
                <img src="/static/img/noData.23b56c2.png" alt class="icon" />
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    //表头数据
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 表格主体数据
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否有边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否有边框
    align: {
      type: String,
      default: "center"
    },
    // 是否可以全选反选
    checkable: {
      type: Boolean,
      default: false
    },
    // 是否使用斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 尺寸--todo
    size: {
      type: String,
      default: "medium"
    },
    //被选中的行的key值,只能穿key值，以数组形式
    checkedKeys: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      checkedKeysCopy: this.checkedKeys
    };
  },
  watch: {
    //datasource用来匹配checkedKeys，确保checkedKeys的准确性
    dataSource: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val && val.length > 0) {
          let arr = [];
          val.forEach(item1 => {
            //  需要用datasource对checkedKeys进行匹配
            this.checkedKeys.forEach(item2 => {
              if (item2 === item1.key) {
                arr.push(item2);
              }
            });
          });
          this.self_update(this.self_unique(arr));
        } else if (val && val.length === 0) {
          this.self_update([]);
        }
      }
    },
    // key值控制着整个全选单选的状态
    checkedKeys: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          // 对checkedKeys进行去重是保障数据准备的一部分
          this.checkedKeysCopy = this.self_unique(val);
        }
      }
    },
    //组件也申明一个变量，用于在用户没有提供checkedKeys时，我们用checkedKeysCopy来控制整体，然后用checkedKeys来控制checkedKeysCopy
    checkedKeysCopy: {
      immediate: true,
      deep: true,
      handler(val) {
        //在视图更新后去修改选中与未选中
        this.$nextTick(() => {
          //
          if (this.$refs.selectAll) {
            if (
              val.length === this.dataSource.length &&
              this.dataSource.length !== 0
            ) {
              this.$refs.selectAll.checked = true;
              this.$refs.selectAll.indeterminate = false;
            } else if (val.length === 0) {
              this.$refs.selectAll.checked = false;
              this.$refs.selectAll.indeterminate = false;
            } else {
              this.$refs.selectAll.indeterminate = true;
            }
          }

          if (val && val.length > 0) {
            val.forEach(level1 => {
              this.$refs.select &&
                this.$refs.select.length > 0 &&
                this.$refs.select.forEach(level2 => {
                  if (level2.getAttribute("data_key") == level1) {
                    level2.checked = true;
                  }
                });
            });
          } else {
            this.$refs.select &&
              this.$refs.select.length > 0 &&
              this.$refs.select.forEach(level => {
                level.checked = false;
              });
          }
        });
      }
    }
  },
  methods: {
    //更新父组件里面的checkedkeys
    self_update(val) {
      // 如果用户传了checkedkeys，就去更新他传的值
      if (this.checkedKeys && this.checkedKeys.length >= 0) {
        this.$emit("update:checkedKeys", val);
      }
    },
    //单选框
    self_singleCheck(val, el) {
      if (el.target.checked) {
        this.$set(this.checkedKeysCopy, this.checkedKeysCopy.length, val);
        // this.checkedKeysCopy = this.unique(this.checkedKeysCopy);
      } else {
        const index = this.checkedKeysCopy.findIndex(item => {
          return item === val;
        });
        this.$delete(this.checkedKeysCopy, index);
      }
      this.self_update(this.checkedKeysCopy);
    },
    //全选框
    self_checkAll($el) {
      if ($el.target.checked) {
        const arr = [];
        this.dataSource.forEach(item => {
          arr.push(item.key || item.id);
        });
        this.checkedKeysCopy = arr;
      } else {
        this.checkedKeysCopy.splice(0, this.checkedKeysCopy.length);
      }
      this.self_update(this.checkedKeysCopy);
    },
    //数组去重
    self_unique(arr) {
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      let array = [];
      for (let i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
          array.push(arr[i]);
        }
      }
      return array;
    },
    // 点击当前行--todo
    self_clickTableTr(el) {},
    //下面都是向外暴露的函数
    //清空所有选中
    com_clearAllselect() {
      this.checkedKeysCopy = [];
      this.self_update();
    }
  }
};
</script>
<style lang='stylus' scoped>

// 边框颜色
$border = #EBEEF5;
// 斑马纹颜色
$bgcolor = #FAFAFA;
// hover
$hovercolor = #F5F7FA;
/*  */
$titlecolor = #fff;
/* 全局主要颜色 */
$maincolor = #606266;
/* 字体大小 */
$size = 14px;


.table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 2px;

  /* *带边框的table */
  &[border] {
    tr {
      td, th {
        border: 1px solid $border;
      }
    }
  }

  /* *带斑马纹的table */
  &[stripe] {
    tbody {
      tr {
        &:nth-child(even) {
          background-color: $bgcolor;
        }
      }
    }
  }

  /* *表头 */
  thead {
    width: 100%;
    border-top: 1px solid $border;

    tr {
      background-color: #3078EC;
      font-weight: bolder;

      th {
        min-width: 50px;
        padding: 10px 0;
        border-bottom: 1px solid $border;
        font-size: $size;
        color: $titlecolor;

        // display: flex;
        &[align='center'] {
          text-align: center;
        }

        &[align='left'] {
          text-align: left;
        }

        &[align='right'] {
          text-align: right;
        }
      }
    }
  }

  /* *表主体 */
  tbody {
    border-top: 1px solid $border;

    tr {
      &:hover {
        td {
          background-color: $hovercolor;
        }
      }

      td {
        min-width: 50px;
        color: $maincolor;
        padding: $size 0;
        border-bottom: 1px solid $border;
        font-size: $size;

        /* line-height 14px */
        &[data-align='center'] {
          text-align: center;
        }

        &[data-align='left'] {
          text-align: left;
        }

        &[data-align='right'] {
          text-align: right;
        }
      }
    }
  }

  /*
   * 复选框样式
   */
  .checkbox {
    width: 30px;
    position: relative;

    input {
      cursor: pointer;
      position: absolute;
      right: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &[type='checkbox'] {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 100%;
        position: absolute;
      }
      

      /* 未选中状态 */
      &[type='checkbox']::before {
        content: '';
        position: absolute;
        line-height: 100%;
        top: 0;
        left: 0;
        background: #fff;
        width: 100%;
        height: 100%;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
      }

      /* *全选中状态 */
      &[type='checkbox']:checked::before {
        content: '\2714';
        background-color: #66b1ff;
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        line-height: 100%;
        border: 1px solid #66b1ff;
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
      }

      /* *半选中状态 */
      &[type='checkbox']:indeterminate::before {
        content: '\2212';
        background-color: #66b1ff;
        position: absolute;
        vertical-align: middle;
        line-height: 100%;
        top: 0px;
        left: 0;
        width: 100%;
        border: 1px solid #66b1ff;
        border-radius: 2px;
        font-weight: bolder;
        color: #fff;
        font-size: 12px;
      }
    }
  }

  // 无数据时的状态
  .nodata {
    td {
      position: relative;
      background-color: #fff;
      text-align: center;
      color: #95989D;
      height: 450px;
      border: none;

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>