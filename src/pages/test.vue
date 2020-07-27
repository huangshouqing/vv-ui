<template>
  <div class="container">
    <ul class="show">
      <div class='title'>编辑器</div>
      <div style="height:300px;width:800px">
       <vv-editor></vv-editor>
      </div>
      <div class="title">布局</div>
      <li>
        <vv-layout style="height:400px;width:500px">
          <vv-sider style="width:20%"></vv-sider>
          <vv-content>
            <vv-layout>
              <vv-header></vv-header>
              <vv-content></vv-content>
              <vv-footer></vv-footer>
            </vv-layout>
          </vv-content>
        </vv-layout>
      </li>
      <li>
        <vv-layout style="height:400px;width:500px">
          <vv-header></vv-header>
          <vv-content></vv-content>
          <vv-footer></vv-footer>
        </vv-layout>
      </li>
      <li>
        <vv-layout style="height:400px;width:500px">
          <vv-header></vv-header>
          <vv-content>
            <vv-layout>
              <vv-sider style="width:20%"></vv-sider>
              <vv-content></vv-content>
            </vv-layout>
          </vv-content>
          <vv-footer></vv-footer>
        </vv-layout>
      </li>
      <div class="title">按钮</div>
      <li>
        <label for="normal">normal</label>
        <div style="margin:20px" id="normal">
          <vv-button>primary</vv-button>
          <vv-button type="primary">primary</vv-button>
          <vv-button type="default">default</vv-button>
          <vv-button type="success">success</vv-button>
          <vv-button type="warning">info</vv-button>
          <vv-button type="danger">danger</vv-button>
        </div>
        <label for="plain">镂空</label>
        <div style="margin:20px" id="plain">
          <vv-button plain>primary</vv-button>
          <vv-button type="primary" plain>primary</vv-button>
          <vv-button type="default" plain>default</vv-button>
          <vv-button type="success" plain>success</vv-button>
          <vv-button type="warning" plain>info</vv-button>
          <vv-button type="danger" plain>danger</vv-button>
        </div>
        <label for="disabled">禁用</label>
        <div style="margin:20px" id="disabled">
          <vv-button type="primary" disabled>primary</vv-button>
          <vv-button type="primary" plain disabled>primary</vv-button>
        </div>
        <label for="round">圆角</label>
        <div style="margin:20px" id="round">
          <vv-button type="primary" round>primary</vv-button>
          <vv-button type="success" plain disabled>success</vv-button>
        </div>
        <label for="large">尺寸</label>
        <div style="margin:20px" id="large">
          <vv-button type="success" size="normal" round>success</vv-button>
          <vv-button type="danger" size="medium" round>danger</vv-button>
          <vv-button type="primary" size="small" round>primary</vv-button>
          <vv-button type="primary" size="mini" round>primary</vv-button>
        </div>
      </li>
      <div class="title">输入框</div>
      <li>
        <div>
          <vv-input placeholder="请输入" type="textarea" width="400px" v-model="text"></vv-input>
        </div>
        <div>
          <vv-input placeholder="请输入" type="text" width="200px" v-model="text"></vv-input>
        </div>
        <div>
          <vv-input placeholder="请输入" type="password" width="200px" v-model="text" @search="search">
            <span slot="right">
              <i class="iconfont icon-search"></i>
            </span>
          </vv-input>
        </div>
      </li>
      <div class="title">选择框</div>
      <li>
        <!-- 选择框 -->
        <vv-select width="200px" multiple v-model="selectText" placeholder="请选择产品"></vv-select>
      </li>
      <div class="title">对话框</div>
      <li>
        <vv-button type="primary" size="normal" @click.native="showModal=true">点击展示对话框</vv-button>

        <modal
          title="提示"
          :content="modalContent"
          :showCancle="showCancle"
          @modalConfirm="modalConfirm"
          @modalCancel="modalCancel"
          v-if="showModal"
        >
          <!-- <div slot="header" class="modal-header">表格</div> -->
          <div slot="content" class="modal-body">
            <vv-table
              :columns="columns"
              :dataSource.sync="dataSource"
              align="left"
              checkable
              border
              stripe
              :checkedKeys.sync="checkedKeys"
            >
              <!-- 使用插槽 -->
              <template slot-scope="scope" slot="operate">
                <div>
                  <vv-button type="primary" size="small" @click.native="details(scope.data.key)">查看</vv-button>
                  <vv-popmessage
                    @confirm="popmessageconfirm(scope.data.key,$event)"
                    @cancel="popmessagecancel"
                  >
                    <template slot="title">确认要删除吗?</template>
                    <vv-button type="danger" size="small">删除</vv-button>
                  </vv-popmessage>
                </div>
              </template>
              <template slot-scope="scope" slot="name">
                <div>{{scope.data.name}}</div>
              </template>
              <template slot-scope="scope" slot="money">
                <div>{{scope.data.money}}</div>
              </template>
              <template slot-scope="scope" slot="address">
                <vv-popover trigger="hover">
                  <template slot="content">
                    <div style="font-size:12px">{{scope.data.address}}</div>
                  </template>
                  <div style="width:100px">{{scope.data.address}}</div>
                </vv-popover>
              </template>
            </vv-table>
          </div>
          <div slot="footer" class="modal-footer">
            <vv-button type="primary" size="normal" @click.native="showModal=false">关闭</vv-button>
          </div>
        </modal>
      </li>
      <div class="title">树形组件</div>
      <li>
        <vv-tree
          :list="[item]"
          v-for="item in treeList"
          @tongxing="fatongxing"
          :key="item.id"
          width="400px"
        ></vv-tree>
      </li>
      <div class="title">表格</div>
      <li>
        <vv-table
          :columns="columns"
          :dataSource.sync="dataSource"
          align="center"
          checkable
          stripe
          :checkedKeys.sync="checkedKeys"
        >
          <!-- 使用插槽 -->
          <template slot-scope="scope" slot="operate">
            <div>
              <vv-button type="primary" size="small" @click.native="details(scope.data.key)">查看</vv-button>
              <vv-popmessage
                @confirm="popmessageconfirm(scope.data.key,$event)"
                @cancel="popmessagecancel"
              >
                <template slot="title">确认要删除吗?</template>
                <vv-button type="danger" size="small">删除</vv-button>
              </vv-popmessage>
            </div>
          </template>
          <template slot-scope="scope" slot="name">
            <div>{{scope.data.name}}</div>
          </template>
          <template slot-scope="scope" slot="money">
            <div>{{scope.data.money}}</div>
          </template>
          <template slot-scope="scope" slot="address">
            <vv-popover trigger="hover">
              <template slot="content">
                <div style="font-size:12px">{{scope.data.address}}</div>
              </template>
              <div style="width:100px">{{scope.data.address}}</div>
            </vv-popover>
          </template>
        </vv-table>
      </li>
      <div class="title">popover</div>
      <li>
        <vv-popover trigger="hover">
          <template slot="content">
            <div style="font-size:12px">hover</div>
          </template>
          <vv-button>hover</vv-button>
        </vv-popover>
        <vv-popover trigger="click">
          <template slot="content">
            <div style="font-size:12px">click</div>
          </template>
          <vv-button>click</vv-button>
        </vv-popover>
        <vv-popover trigger="hover" position="right">
          <template slot="content">
            <div style="font-size:12px">right</div>
          </template>
          <vv-button>right</vv-button>
        </vv-popover>
        <vv-popover trigger="click" position="left">
          <template slot="content">
            <div style="font-size:12px">left</div>
          </template>
          <vv-button>left</vv-button>
        </vv-popover>
        <vv-popover trigger="hover" position="bottom">
          <template slot="content">
            <div style="font-size:12px">bottom</div>
          </template>
          <vv-button>bottom</vv-button>
        </vv-popover>

        <vv-popover trigger="hover" position="top">
          <template slot="content">
            <div style="font-size:12px">click</div>
          </template>
          <vv-button>top</vv-button>
        </vv-popover>
      </li>
      <div class="title">popmessage</div>
      <li>
        <vv-popmessage @confirm="popmessageconfirm" @cancel="popmessagecancel">
          <template slot="title">确认要删除吗?</template>
          <vv-button type="primary">点击</vv-button>
        </vv-popmessage>
      </li>
      <div class="title">数字加减框</div>
      <li>
        <!-- 选择框 -->
        <inputNumber></inputNumber>
      </li>
      <div class="title">message</div>
      <li>
        <vv-button type="warning" @click.native="message('warning')">警告</vv-button>
        <vv-button type="success" @click.native="message('success')">成功</vv-button>
        <vv-button type="danger" @click.native="message('error')">错误</vv-button>
        <vv-button type="default" @click.native="message('info')">消息</vv-button>
      </li>
      <div class="title">notice</div>
      <li>
        <vv-button type="warning" @click.native="notice('warning')">点击警告</vv-button>
        <vv-button type="success" @click.native="notice('success')">点击成功</vv-button>
        <vv-button type="danger" @click.native="notice('error')">点击错误</vv-button>
        <vv-button type="default" @click.native="notice('info')">点击消息</vv-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hidden: true,
      isVisible: false,
      showCancle: true,
      modalContent: "hahhahha",
      showModal: false,
      text: "",
      selectText: ["烤鸭"],
      treeList: [
        {
          title: "成人票",
          id: 1,
          open: false,
          children: [
            {
              open: false,
              id: 2,
              title: "成人三馆联票",
              children: [
                {
                  open: false,
                  id: 3,
                  title: "成人三馆联票 - 某一连锁店销售",
                  children: [
                    {
                      open: false,
                      id: 8,
                      title: "成人四馆联票 - 某一连锁店销售",
                      children: [
                        {
                          open: false,
                          id: 9,
                          title: "成人五馆联票 - 某一连锁店销售"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              title: "成人五馆联票",
              open: false
            }
          ]
        },
        {
          id: 5,
          open: false,
          title: "学生票",
          children: [
            {
              open: false,
              id: 10,
              title: "学生票三馆联票",
              children: [
                {
                  open: false,
                  id: 11,
                  title: "学生票三馆联票 - 某一连锁店销售",
                  children: [
                    {
                      open: false,
                      id: 12,
                      title: "学生票四馆联票 - 某一连锁店销售",
                      children: [
                        {
                          open: false,
                          id: 13,
                          title: "学生票五馆联票 - 某一连锁店销售"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              title: "成人五馆联票",
              open: false
            }
          ]
        },
        {
          id: 6,
          open: false,
          title: "儿童票"
        },
        {
          id: 7,
          open: false,
          title: "特惠票"
        }
      ],
      columns: [
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
      dataSource: [
        {
          key: "1",
          name: "John Brown",
          money: "￥300,000.00",
          address: "New York "
        },
        {
          key: "2",
          name: "Jim Green",
          money: "￥1,256,000.00",
          address: "London"
        },
        {
          key: "3",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney"
        },
        {
          key: "4",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney"
        },
        {
          key: "5",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney"
        }
      ],
      checkedKeys: []
    };
  },
  methods: {
    // 模态框显示还是隐藏
    modalConfirm() {
      this.showModal = false;
      // this.$message.warning("警告消息");
    },
    modalCancel() {
      this.showModal = false;
      // this.$toast("欢迎");
    },
    message(val) {
      this.$message[val]({
        message: "这是条警告",
        duration: 2000
      });
    },
    notice(val) {
      this.$notice[val]({
        title: "",
        message:
          "是条警告这是这是条警告这是告这是这是条警告这是这是条警告这是这是,条警告这是这是条警告这是这是条警告这是这是条警告这是这是111",
        autoclose: true,
        duration: 4000,
        buttonClose: {
          buttonText: "关闭",
          isShow: true
        }
      });
    },
    search() {
      console.log(this.text);
    },
    // 父组件传到子组件的通信函数
    fatongxing(val) {
      console.log(val + "接收到11111");
    },

    // 泡泡信息的确认
    popmessageconfirm(val, el) {
      this.$message.success({
        message: "操作成功"
      });
      this.dataSource.forEach((item, index) => {
        if (item.key === val) {
          this.$delete(this.dataSource, index);
        }
      });
    },
    // 泡泡信息的取消
    popmessagecancel(val) {
      this.$message.error({
        message: "操作已取消"
      });
    },
    // 表格查看详情
    details(val) {
      console.log(val);
    }
  }
};
</script>

<style lang='stylus' scoped>
.show {
  padding: 30px;
}

a {
  text-decoration: none;
}

.container {
  height: 100%;
}

.title {
  display: flex;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  font-weight: bolder;
  color: red;
}

.modal-header {
  color: #313131;
  justify-content: left;
  padding: 15px 15px 0 15px;
  display: flex;
  font-size: 20px;
}

.modal-body {
  position: relative;
  padding: 15px;
  font-size: 15px;
  color: #606266;
}

.modal-footer {
  padding: 0 15px 15px 15px;
  text-align: right;
}

.show > li {
  list-style: none;
  margin: 60px 0px;
}
</style>