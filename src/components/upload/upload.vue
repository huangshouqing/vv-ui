<template>
  <div>
    <label for="input" class="realInput">点击上传</label>
    <!-- multiple开启多文件上传 -->
    <input
      multiple
      v-show="isShow"
      id="input"
      ref="uploadInput"
      @change="uploadFile"
      type="file"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-    officedocument.spreadsheetml.sheet"
    />
  </div>
</template>
<script>
export default {
  name: "myinput",
  data() {
    return {
      isShow: false,
      // 上传文件的文件名
      uploadFileName: "",
      uploadFileUrl: "",
      // 上传文件的错误信息提示
      uploadFileErrMsg: "",
      // 文件的最大尺寸
      fileMaxSize: 2 * 1024 * 1024,
      // 文件接受的格式
      fileAcceptType:
        "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,jpg,png"
    };
  },
  methods: {
    // 上传文件
    uploadFile(e) {
      // 获取用户信息
      // let file = e.target.files[0];
      //  或者
      const file = this.getUploadFileInfo();
      console.log(file.name);
      // 这里是为了页面显示需要
      this.uploadFileName = `（${file.name}）`;

      // 验证文件是否符合要求
      if (this.validateUploadFile(file)) {
        // 创建一个formData实例
        // 将文件转为formdata格式
        const formData = new FormData();
        // 'file' 为 HTTP POST 里的字段名
        formData.append("file", file);
        //添加请求头
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        console.log("-----文件上传被触发------");
        // 触发父组件的 getUploadPointFileData 方法,使用axios上传
        this.$emit("getUploadPointFileData", formData, config);
      }
    },
    // 验证文件是否符合要求（文件是否为空，格式是否正确，大小是否合适）
    validateUploadFile(file) {
      if (file.size === 0) {
        this.setUploadFileErrMsg("上传文件不能为空");
        return false;
      }

      if (!this.validateUploadFileType(this.trim(file.type))) {
        this.setUploadFileErrMsg("上传文件格式错误");
        return false;
      }

      if (file.size > this.fileMaxSize) {
        this.setUploadFileErrMsg("上传文件大小超过2M");
        return false;
      }

      return true;
    },
    // 验证文件类型
    validateUploadFileType(curFileType) {
      const fileTypeArray = this.fileAcceptType.split(",");
      let isSuccess = false;
      fileTypeArray.forEach(type => {
        const curType = this.trim(type);
        if (curType === curFileType) isSuccess = true;
      });

      return isSuccess;
    },
    // 设置上传文件错误提示
    setUploadFileErrMsg(val) {
      this.uploadFileErrMsg = val;
    },
    // 去除掉多余的空格
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 获取用户信息，这里为单文件上传
    getUploadFileInfo() {
      return this.$refs.uploadInput.files[0];
    }
  }
};
</script>
<style  scoped>
.realInput {
  box-sizing: border-box;
  padding: 5px 20px;
  border: none;
  border-radius: 5%;
  font-size: 5px;
  background-color: #66a4ff;
  color: #fff;
}
.realInput:hover {
  background-color: #66b1ff;
}
</style>