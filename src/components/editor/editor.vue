<!-- editor -->
<template>
    <div class="editor">
        <div class="select">
            <button @click="editStyle('SelectAll',false,null)">
                <i class="iconfont icon-quanxuan" type="button"></i>
            </button>
            <button @click="editStyle('removeFormat',false,null)">
                <i class="iconfont icon-qingchu" type="button"></i>
            </button>
            <button @click="editStyle('Cut',false,null)">
                <i class="iconfont icon-jianqie" type="button"></i>
            </button>
            <button @click="editStyle('Copy',false,null)">
                <i class="iconfont icon-fuzhi" type="button"></i>
            </button>
            <button @click="editStyle('Paste',false,null)">
                <i class="iconfont icon-niantie" type="button"></i>
            </button>

            <button @click="editStyle('Delete',false,null)">
                <i class="iconfont icon-shanchu" type="button"></i>
            </button>
            <span
                    style="color:#aaa;display:flex;width:20px;text-align:center;justify-content:center;align-items:center"
            >|</span>
            <!--<button>-->
            <!--<i class="iconfont icon-biaoti" type="button"></i>-->
            <!--</button>-->
            <select class='headerSelect' @change="setHeading" @focus="headerSelect='-1'"
                    :value="headerSelect">
                <option :value="item" v-for="(item,index) in headerSelectOptions" :key="index">
                    {{item}}
                </option>
            </select>
            <button>
                <i class="iconfont icon-ziti" type="button"></i>
            </button>

            <button>
                <i class="iconfont icon-zihao" type="button"></i>
            </button>

            <button @click="editStyle('StrikeThrough',false,null)">
                <i class="iconfont icon-shanchuxian" type="button"></i>
            </button>
            <button @click="editStyle('Bold',false,null)">
                <i class="iconfont icon-bold" type="button"></i>
            </button>
            <button @click="editStyle('Underline',false,null)">
                <i class="iconfont icon-xiahuaxian" type="button"></i>
            </button>
            <button @click="editStyle('Italic',false,null)">
                <i class="iconfont icon-xieti" type="button"></i>
            </button>
            <span style="color:#aaa;display:flex;width:20px;text-align:center;justify-content:center;align-items:center"
            >|</span>
            <button @click="editStyle('indent',false,null)">
                <i class="iconfont icon-yousuojin" type="button"></i>
            </button>
            <button @click="editStyle('justifyLeft',false,null)">
                <i class="iconfont icon-youduiqi" type="button"></i>
            </button>
            <button @click="editStyle('justifyCenter',false,null)">
                <i class="iconfont icon-juzhongduiqi" type="button"></i>
            </button>
            <button @click="editStyle('justifyRight',false,null)">
                <i class="iconfont icon-zuoduiqi" type="button"></i>
            </button>
            <span
                    style="color:#aaa;display:flex;width:20px;text-align:center;justify-content:center;align-items:center"
            >|</span>
            <!-- 插入连接 (todo)-->
            <button @click="openLinkDialog" :class="{'active':this.activeButton==='createLink'}">
                <i class="iconfont icon-lianjie" type="button"></i>
            </button>
            <!-- 插入图片（todo） -->
            <button
                    @click="editStyle('InsertInputImage',false,null)"
                    :class="{'active':this.activeButton==='InsertInputImage'}"
            >
                <i class="iconfont icon-tupian" type="button"></i>
            </button>
            <!-- 插入html（finish）-->
            <button @click="openHtmlDialog" :class="{'active':this.activeButton==='insertHTML'}">
                <i class="iconfont icon--HTML" type="button"></i>
            </button>
            <button @click="openTableDialog" :class="{'active':this.activeButton==='addTable'}">
                <i class="iconfont icon-biaoge" type="button"></i>
            </button>
            <button @click="adjustList('insertOrderedList')">
                <i class="iconfont icon-youxuliebiao" type="button"></i>
            </button>
            <button @click="adjustList('insertUnorderedList')">
                <i class="iconfont icon-wuxuliebiao" type="button"></i>
            </button>
            <button @click="editStyle('insertHorizontalRule',false,null)">
                <i class="iconfont icon-line" type="button"></i>
            </button>
            <button @click="editStyle('insertParagraph',false,null)">
                <i class="iconfont icon-duanluo" type="button"></i>
            </button>
            <span
                    style="color:#aaa;display:flex;width:20px;text-align:center;justify-content:center;align-items:center"
            >|</span>
            <button @click="editStyle('Undo',false,null)">
                <i class="iconfont icon-chexiao" type="button"></i>
            </button>
            <button @click="editStyle('Redo',false,null)">
                <i class="iconfont icon-chongzuo" type="button"></i>
            </button>
        </div>
        <!-- editor输入框 -->
        <div class="input" id="editorInput" contenteditable="true" ref="editor" @mouseup="mouseup"
             @blur="editorBlur"></div>
        <!-- 输入html弹框 -->
        <div v-if="htmlshow" class="htmlinput">
            <textarea v-model="htmlinput" placeholder="输入html" class="textarea"/>
            <p class="footer">
                <button @click="()=>{htmlshow=false}">关闭</button>
                <button @click="insertHTML">插入</button>
            </p>
        </div>
        <!-- 插入连接 -->
        <div v-if="linkshow" class="linkinput">
            <p>
                文本：
                <input type="text" v-model="linkinput.text" placeholder="输入文本"/>
            </p>
            <p>
                链接：
                <input type="text" v-model="linkinput.link" placeholder="输入url"/>
            </p>
            <p class="footer">
                <button @click="()=>{linkshow=false}">关闭</button>
                <button @click="createLink">插入</button>
            </p>
        </div>
        <!-- 插入表格-->
        <div v-if="tableshow" class="tableinput">
            <p>
                行数：
                <input type="text" v-model="tableinput.rows" placeholder="输入行数"/>
            </p>
            <p>
                列数：
                <input type="text" v-model="tableinput.cells" placeholder="输入列数"/>
            </p>
            <p class="footer">
                <button @click="()=>{tableshow=false}">关闭</button>
                <button @click="Addtable">插入</button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                selection: {},
                originButton: "", //记录初始的按钮
                activeButton: "", //记录当前的按钮
                currentSelection: {},
                htmlshow: false, //输入html框是否显示
                htmlinput: "", //输入html框内容，
                linkshow: false, //输入link框是否显示
                linkinput: {
                    link: "",
                    text: ""
                }, //输入link框内容
                tableshow: false,
                tableinput: {
                    rows: '',
                    cells: ''
                },
                headerSelect: '',
                headerSelectOptions: [
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
                ]
            };
        },
        watch: {
            htmlshow(newVal) {
                if (newVal === false) {
                    this.htmlinput = "";
                    if (this.activeButton === "insertHTML") {
                        this.activeButton = "none";
                    }
                    this.originButton = "insertHTML";
                } else {
                    this.activeButton = "insertHTML";
                    this.linkshow = false;
                    this.tableshow = false;
                }
            },
            linkshow(newVal) {
                if (newVal === false) {
                    this.linkinput.text = "";
                    this.linkinput.link = "";
                    if (this.activeButton === "createLink") {
                        this.activeButton = "none";
                    }
                    this.originButton = "createLink";
                } else {
                    this.activeButton = "createLink";
                    this.htmlshow = false;
                    this.tableshow = false;
                }
            },
            tableshow(newVal) {
                if (newVal === false) {
                    this.tableinput.rows = "";
                    this.tableinput.cells = "";
                    if (this.activeButton === "addTable") {
                        this.activeButton = "none";
                    }

                    this.originButton = "addTable";
                } else {
                    this.activeButton = "addTable";
                    this.htmlshow = false;
                    this.linkshow = false;
                }
            },
        },
        computed: {
            // 每次点击是否是原来的按钮
            isOrginButton() {
                return this.activeButton === this.originButton ? true : false;
            }
        },
        methods: {
            //自适应
            autoadaption() {
                this.Sys = (function (ua) {
                    var s = {};
                    s.IE = ua.match(/msie ([\d.]+)/) ? true : false;
                    s.Firefox = ua.match(/firefox\/([\d.]+)/) ? true : false;
                    s.Chrome = ua.match(/chrome\/([\d.]+)/) ? true : false;
                    s.IE6 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6)) ? true : false;
                    s.IE7 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 7)) ? true : false;
                    s.IE8 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 8)) ? true : false;
                    return s;
                })(navigator.userAgent.toLowerCase());
                this
                //获取编辑器
                let editor = document.querySelector(".editor");
                //整个编辑器的高度
                let top = document.querySelector(".select").offsetHeight;
                //编辑器的输入框的高度自适应
                let target = document.querySelector(".input");
                target.style.position = "absolute";
                target.style.top = top + "px";
                target.style.height = editor.offsetHeight - top + "px";
                target.style.maxHeight = editor.offsetHeight - top + "px";
            },
            editorBlur() {
                // 记录当前的光标
                this.backupRange();
            },
            mouseup() {
            },
            // 通用execCommand
            editStyle(cmd, bool, value) {
                document.execCommand(cmd, bool, value);
            },
            // 打开输入html弹框
            openHtmlDialog() {
                this.htmlshow = !this.htmlshow;
            },
            // 插入html
            insertHTML() {
                // 恢复之前光标的记录
                this.restoreRange();
                document.execCommand("insertHTML", false, this.htmlinput);
                // 记录当前的光标
                this.backupRange();
                this.htmlshow = false;
            },
            // 打开输入链接弹框
            openLinkDialog() {
                this.linkshow = !this.linkshow;
            },
            // 插入连接
            insertLink(url, title) {
                let selection = document.getSelection(),
                    range = selection.getRangeAt(0);
                //range.collapsed 是只读属性。
                //它返回一个 Boolean 值表示是否起始点和结束点是同一个位置。
                //如果返回 true 表示Range 的起始位置和结束位置重合, false 表示不重合。
                if (range.collapsed) {
                    let start = range.startContainer,
                        parent = this.findParentByTagName(start, "a");

                    if (parent) {
                        parent.setAttribute("src", url);
                    } else {
                        document.execCommand(
                            "insertHTML",
                            false,
                            `<a  href="${url}">${title}</a>`
                        );
                        this.insertHTML(`<a  href="${url}">${title}</a>`);
                    }
                } else {
                    document.execCommand("createLink", false, url);
                }
            },
            // 插入连接
            createLink() {
                this.restoreRange();
                this.insertLink(this.linkinput.link, this.linkinput.text);
                // 记录当前的光标
                this.backupRange();
                this.linkshow = false;
            },
            /* 查找父元素
             * @param {String} root
             * @param {String | Array} name
             */
            findParentByTagName(root, name) {
                let parent = root;

                if (typeof name === "string") {
                    name = [name];
                }

                while (
                    name.indexOf(parent.nodeName.toLowerCase()) === -1 &&
                    parent.nodeName !== "BODY" &&
                    parent.nodeName !== "HTML"
                    ) {
                    parent = parent.parentNode;
                }

                return parent.nodeName === "BODY" || parent.nodeName === "HTML"
                    ? null
                    : parent;
            },
            // 记录range位置
            backupRange() {
                let selection;
                if (window.getSelection) {
                    //现代浏览器
                    selection = window.getSelection();
                } else if (document.selection) {
                    //IE浏览器
                    selection = document.selection.createRange();
                }
                let range = selection.getRangeAt(0);
                this.currentSelection = {
                    startContainer: range.startContainer,
                    startOffset: range.startOffset,
                    endContainer: range.endContainer,
                    endOffset: range.endOffset
                };
            },
            // 恢复range
            restoreRange() {
                if (
                    this.currentSelection &&
                    Object.keys(this.currentSelection).length != 0
                ) {
                    let selection = window.getSelection();
                    selection.removeAllRanges();
                    let range = document.createRange();
                    range.setStart(
                        this.currentSelection.startContainer,
                        this.currentSelection.startOffset
                    );
                    range.setEnd(
                        this.currentSelection.endContainer,
                        this.currentSelection.endOffset
                    );
                    // 向选区中添加一个区域
                    selection.addRange(range);
                } else {
                    this.$refs.editor.focus();
                }
            },
            // 设置列表
            adjustList(cmd) {
                document.execCommand(cmd, false, null);
                let lists = document.querySelectorAll("ol, ul");
                for (let i = 0; i < lists.length; i++) {
                    let ele = lists[i]; // ol
                    let parentNode = ele.parentNode;
                    if (
                        parentNode.tagName === "P" &&
                        parentNode.lastChild === parentNode.firstChild
                    ) {
                        parentNode.insertAdjacentElement("beforebegin", ele);

                        parentNode.remove();
                    }
                }
            },
            //获取当前光标所在处样式
            getCaretStyle() {
                let selection = window.getSelection(),
                    range = selection.getRangeAt(0);

                (aimEle = range.commonAncestorContainer), (tempEle = null);

                let tags = ["U", "I", "B", "STRIKE"],
                    result = [];

                if (aimEle.nodeType === 3) {
                    aimEle = aimEle.parentNode;
                }

                tempEle = aimEle;

                while (block.indexOf(tempEle.nodeName.toLowerCase()) === -1) {
                    if (tags.indexOf(tempEle.nodeName) !== -1) {
                        result.push(tempEle.nodeName);
                    }

                    tempEle = tempEle.parentNode;
                }

                let viewStyle = {
                    italic: result.indexOf("I") !== -1 ? true : false,

                    underline: result.indexOf("U") !== -1 ? true : false,

                    bold: result.indexOf("B") !== -1 ? true : false,

                    strike: result.indexOf("STRIKE") !== -1 ? true : false
                };

                let styles = window.getComputedStyle(aimEle, null);

                (viewStyle.fontSize = styles["fontSize"]),
                    (viewStyle.color = styles["color"]),
                    (viewStyle.fontWeight = styles["fontWeight"]),
                    (viewStyle.fontStyle = styles["fontStyle"]),
                    (viewStyle.textDecoration = styles["textDecoration"]);

                viewStyle.isH1 = Util.findParentByTagName(aimEle, "h1") ? true : false;

                viewStyle.isH2 = Util.findParentByTagName(aimEle, "h2") ? true : false;

                viewStyle.isP = Util.findParentByTagName(aimEle, "p") ? true : false;

                viewStyle.isUl = Util.findParentByTagName(aimEle, "ul") ? true : false;

                viewStyle.isOl = Util.findParentByTagName(aimEle, "ol") ? true : false;

                return viewStyle;
            },
            // 设置标题
            setHeading(event) {
                let obj = document.querySelector('.headerSelect');
                //获取选中项的索引
                let idx = obj.selectedIndex;
                //获取选中项的文本
                let text = obj.options[idx].text;
                //获取选中项的value值
                let value = obj.options[idx].value;
                this.headerSelect = text
                let formatTag = text,
                    formatBlock = document.queryCommandValue("formatBlock");

                if (formatBlock.length > 0 && formatBlock.toLowerCase() === formatTag) {
                    document.execCommand("formatBlock", false, formatTag);
                } else {
                    document.execCommand("formatBlock", false, formatTag);
                }
                document.querySelector('.headerSelect')[0].blur()
            },
            //打开创建表格弹框
            openTableDialog() {
                this.tableshow = !this.tableshow
            },
            //创建表格
            Addtable() {
                var _this = this
                if (this.tableinput.rows === 0 && this.tableinput.cells === 0) {
                    return
                }
                createTable('editorInput', this.tableinput.rows, this.tableinput.cells, Math.random() + 'createdTable')
                this.tableshow = false
                //dom转字符串
                function domToString (node) {
                    let tmpNode = document.createElement('div')
                    tmpNode.appendChild(node)
                    let str = tmpNode.innerHTML
                    tmpNode = node = null; // 解除引用，以便于垃圾回收
                    return str;
                }
                //创建表格
                function createTable(id, rows, cells, tbid) {
                    var tb = document.createElement("table");
                    tb.style.width = 300 + 'px'
                    tb.style.border = '1px solid #ccc'
                    var tbody = document.createElement("tbody");
                    for (var i = 0; i < rows; i++) {
                        var tr = document.createElement("tr");
                        tr.style.border = '1px solid red'
                        for (var j = 0; j < cells; j++) {
                            var cell = document.createElement("td");
                            cell.style.border = '1px solid #ccc'
                            cell.style.textAlign = 'center'
                            cell.style.minWidth = '40px'
                            cell.style.padding = '5px 10px'
                            tr.appendChild(cell);
                        }
                        tbody.appendChild(tr);
                    }
                    //将tbody塞入tb中
                    tb.appendChild(tbody);
                    //设置创建的TABLE的ID
                    tb.setAttribute("id", tbid);
                    // 恢复之前光标的记录
                    _this.restoreRange();
                    //将dom塞入光标位置
                    document.execCommand("insertHTML", false, domToString(tb)+'');
                    // 记录当前的光标
                    _this.backupRange();
                }

            },
        },
        mounted() {
            this.$refs.editor.focus();
            this.autoadaption()
        }
    };
</script>
<style lang='stylus' scoped>
    /*重置在chrome下滚动条的样式*/
    ::-webkit-scrollbar { /* 滚动条整体样式 */
        width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
        height: 4px;
        scrollbar-arrow-color: red;
    }

    ::-webkit-scrollbar-thumb { /* 滚动条里面小方块 */
        cursor: pointer;
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
        scrollbar-arrow-color: red;
    }

    ::-webkit-scrollbar-track { /* 滚动条里面轨道 */
        cursor: pointer;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }

    .editor {
        overflow hidden
        height: 100%;
        width: 100%;
        border: 3px solid #eee;
        box-sizing: border-box;
        position: relative;

        .select {
            min-height: 40px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            background-color: #f1f1f1;

            button {
                border: 1px solid #eee;
                margin: 2px 5px;
                padding: 1px;
                border-radius: 4px;
                font-size: 12px;
                box-sizing: border-box;
                cursor: pointer;
                outline: none;

                &.active {
                    transform: translateY(8px);
                    transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);

                    &:hover {
                        transform: translateY(8px);
                        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                        box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
                    }
                }

                &:hover {
                    transform: scale3d(1.006, 1.006, 1);
                    transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
                }
            }
        }

        .input {
            padding:10px
            width: 100%;
            max-width: 100%;
            outline: none;
            box-sizing: border-box;
            overflow-y: auto;
        }

        .htmlinput {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 3px;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);

            .textarea {
                width: 99%;
                height: 80%;
                outline: none;
                resize: none;
                border: none;
                box-sizing: border-box;
                font-size: 12px;
                font-family: Consolas;
                // font-weight: bold;
                background-color: #eee;
                padding: 10px;
            }

            // border: 1px solid #aaa;

            .footer {
                height: 20%;
                margin-top: -5px;
                display: flex;
                justify-content: flex-end;
                font-size: 12px;

                button {
                    display: inline-block;
                    border: 1px solid #eee;
                    margin: 2px 5px;
                    border-radius: 4px;
                    font-size: 8px;
                    box-sizing: border-box;
                    cursor: pointer;
                    outline: none;
                    font-family: SimSuncss;

                    &:hover {
                        transform: scale3d(1.006, 1.006, 1);
                        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                        box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
                    }
                }
            }
        }

        .linkinput {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 3px;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                font-size: 12px;
                color: #000000;

                input {
                    width: 100%;
                    font-size: 12px;
                    border: 1px solid #eee;
                    outline: none;
                    padding: 3px;
                    font-family: Consolas;
                    box-sizing: border-box;
                    height: 30px;
                }
            }

            .footer {
                width: 100%;
                height: 20%;
                display: flex;
                justify-content: flex-end;
                font-size: 12px;

                button {
                    border: 1px solid #eee;
                    margin: 2px 5px;
                    padding: 1px;
                    border-radius: 4px;
                    font-size: 12px;
                    box-sizing: border-box;
                    cursor: pointer;
                    outline: none;
                    font-family: SimSuncss;

                    &:hover {
                        transform: scale3d(1.006, 1.006, 1);
                        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                        box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
                    }
                }
            }
        }

        .headerSelect {

            /*统一边框*/
            border: none;
            outline none

        }

        .tableinput {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 3px;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20%;
            height: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                font-size: 12px;
                color: #000000;

                input {
                    width: 100%;
                    font-size: 12px;
                    border: 1px solid #eee;
                    outline: none;
                    padding: 3px;
                    font-family: Consolas;
                    box-sizing: border-box;
                    height: 30px;
                }
            }

            .footer {
                width: 100%;
                height: 20%;
                display: flex;
                justify-content: flex-end;
                font-size: 12px;

                button {
                    border: 1px solid #eee;
                    margin: 2px 5px;
                    padding: 1px;
                    border-radius: 4px;
                    font-size: 12px;
                    box-sizing: border-box;
                    cursor: pointer;
                    outline: none;
                    font-family: SimSuncss;

                    &:hover {
                        transform: scale3d(1.006, 1.006, 1);
                        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
                        box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.11);
                    }
                }
            }
        }

        //重写h1-h6样式

        & >>> h1 {
            font-size: 2em !important;
        }

        & >>> h2 {
            font-size: 1.5em !important;
        }

        & >>> h3 {
            font-size: 1.17em !important;
        }

        & >>> h4 {
            font-size: 1.17em !important;
        }

        & >>> h5 {
            font-size: 0.83em !important;
        }

        & >>> h6 {
            font-size: 0.67em !important;
        }

        //重写列表样式

        & >>> ul {
            list-style-type: square;
            padding-left: 40px !important;
        }

        & >>> ol {
            list-style-type: decimal;
            padding-left: 40px !important;
        }
    }
</style>
