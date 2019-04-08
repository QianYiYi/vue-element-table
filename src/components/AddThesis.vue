<template>
  <div class="AddThesis">
    <div class="header-nav">
      <div class="logo"><img class="logo-img" src="../assets/logo.png"></div>
      <div class="nav">
        <el-menu :default-active="activeIndex2" router class="el-menu-demo" mode="horizontal" background-color="#123345" text-color="#fff" active-text-color="#ca4459">
          <el-menu-item index="/">处理中心</el-menu-item>
          <el-submenu index="2" >
            <template slot="title">人员模块</template>
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" > {{ item.navItem }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="添加" name="add">

       <el-button @click="addLine">添加行数</el-button>
      <el-button @click="save('formData')">baocun</el-button>
      <el-form :model="formData"  ref="formData" label-width="100px" class="demo-ruleForm">
        <template v-for="(thesis, index) in formData.thesisData" >
         <el-form-item :prop="'thesisData.' + index + '.thesisTitle'" label="名称" :rules="formData.rules.name">
            <el-input v-model="thesis.thesisTitle"></el-input>
         </el-form-item>

         <el-form-item :prop="'thesisData.' + index + '.proposer'" label="申请人" :rules="formData.rules.name">
           <el-input v-model="thesis.proposer"></el-input>
         </el-form-item>
         <el-form-item :prop="'thesisData.' + index + '.applicationDate'"  label="申请时间" :rules="formData.rules.name">
           <el-date-picker v-model="thesis.applicationDate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="购买日期">
           </el-date-picker>
         </el-form-item>
         <el-form-item :prop="'thesisData.' + index + '.fileId'"  label="文件" :rules="formData.rules.name">
           <el-input v-model="thesis.fileId"></el-input>
         </el-form-item>
         <el-form-item :prop="'thesisData.' + index + '.fileName'" label="文件" :rules="formData.rules.name">
           <el-input v-model="thesis.fileName"></el-input>
         </el-form-item>
         <el-form-item :prop="'thesisData.' + index + '.fileDir'" label="文件" :rules="formData.rules.name">
           <el-input v-model="thesis.fileDir"></el-input>
         </el-form-item>
         <el-form-item :prop="'thesisData.' + index + '.fileName'" label="文件" :rules="formData.rules.name2">

           <!-- <el-upload class="upload-demo" ref="upload" :http-server="uploadfile" action="http://10.167.35.186:8080/uploadFile" :on-change="handleChange" :on-success="fileSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" >
             <el-input slot="trigger" size="small" type="primary" @click.native="selectFile" placeholder="选择文件" id="selectFile" >选取文件</el-input>
             <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" id="testUpload">上传到服务器</el-button>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
           </el-upload> -->
           <el-input  v-model="testFileName" placeholder="选择文件" @click.native="testFile(index)"></el-input>

           <el-button @click.native="uploadTest(index)">默认按钮</el-button>

         </el-form-item>
         <el-button @click.prevent="removeThesis(index)">删除</el-button>
        </template>
      </el-form>

      <form class="" method="post" enctype="multipart/form-data" id="form-test">
        <input  type="file" placeholder="选择文件" name="file" multiple="multiple" @change="selectFile()" id="test-file">
      </form>

     </el-tab-pane>
     <el-tab-pane label="修改" name="modify">
    <el-button @click="savemodify('modifyForm')">保存</el-button>
       <el-form :rules="modifyForm.rules" :model="modifyForm"  ref="modifyForm" class="demo-ruleForm"  method="POST" enctype="multipart/form-data">
          <el-table :data="modifyForm.modifyData.slice((currpage - 1) * pagesize, currpage * pagesize)" style="width: 100%">
            <el-table-column type="index" label="序号"align="center" width="50px" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="paperTitle" label="论文题目">
              <template slot-scope="scope">
                  <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.paperTitle'" :rules='modifyForm.rules.nameModify'>
                    <el-input class="edit-input" v-model="scope.row.paperTitle"  placeholder="书名"></el-input>
                  </el-form-item>
                <span v-else>{{ scope.row.paperTitle }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="proposer" label="申请人">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.proposer'" :rules="modifyForm.rules.volumeModify1">
                   <el-input class="edit-input" v-model.number="scope.row.proposer" placeholder="册数"></el-input>
                 </el-form-item>
                  <span v-else>{{ scope.row.proposer}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="applicationDate" label="申请时间">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.applicationDate'" :rules='modifyForm.rules.nameModify'>
                   <el-input class="edit-input" v-model="scope.row.applicationDate"  placeholder="购买者"></el-input>
                 </el-form-item>
                 <span v-else>{{scope.row.applicationDate}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="fileViewerUri,fileDownloadUri" label="文件">

               <template slot-scope="scope">
                 <el-form-item>
                        <a :href="''+ scope.row.fileViewerUri +''" target="_blank">预览</a>
                        <!-- |
                          <a :href="''+ scope.row.fileDownloadUri +''">下载</a> -->
                 </el-form-item>

               </template>
            </el-table-column>

            <el-table-column prop="editing" label="操作">
               <template slot-scope="scope">
                 <el-button
                    size="mini"
                    type="danger"
                    v-if="!scope.row.editing"
                    v-model="scope.$index"
                    @click="handleEditThesis(scope.$index, scope.row)">编辑
                 </el-button>
                 <!-- <el-button
                    v-else
                    type="danger"
                    size="mini"
                    v-model="scope.$index"
                    @click="handleCancle(scope.$index, scope.row)">取消
                 </el-button>
                 |
                 <el-button
                    size="mini"
                    type="danger"

                    @click="handleDataDelete(scope.$index, scope.row)">删除
                 </el-button> -->
               </template>
            </el-table-column>
          </el-table>
          <el-pagination background
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            :total="modifyForm.modifyData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            >
          </el-pagination>
        </el-form>

     </el-tab-pane>
     <el-tab-pane label="删除" name="delete">
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="batchDelete">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
     </el-tab-pane>

   </el-tabs>
   <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

     <el-form :model="form" ref="form" class="demo-ruleForm">
       <el-form-item label="题目名称" :label-width="formLabelWidth" prop="thesisId,thesisTitle" :rules="form.formRules.name2">
          <el-input v-model="form.formData.thesisId" autocomplete="off"></el-input>
         <el-input v-model="form.formData.thesisTitle" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="申请人" :label-width="formLabelWidth" prop="proposer" :rules="form.formRules.name2">
         <el-input v-model="form.formData.proposer" autocomplete="off" ></el-input>
       </el-form-item>
       <el-form-item label="申请时间" :label-width="formLabelWidth" prop="applicationDate" :rules="form.formRules.name2">
         <el-input v-model="form.formData.applicationDate" autocomplete="off" ></el-input>
       </el-form-item>
       <el-form-item label="文件" :label-width="formLabelWidth" prop="fileName,fileId,fileDir" :rules="form.formRules.name2">
        <el-input v-model="form.formData.fileName" autocomplete="off" @click.native="testFile2()" ></el-input>
         <el-input v-model="form.formData.fileId" autocomplete="off" ></el-input>
         <el-input v-model="form.formData.fileDir" autocomplete="off" ></el-input>
         <!-- <el-input  v-model="testFileName2" placeholder="选择文件"></el-input> -->

         <el-button @click.native="uploadTest2()">默认按钮</el-button>
       </el-form-item>

     </el-form>
     <form method="post" enctype="multipart/form-data" id="form-test2">

       <input  type="file" placeholder="选择文件" name="file" multiple="multiple"  @change="selectFile2()" id="test-file2">
     </form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="formConfirm">确 定</el-button>
     </div>
   </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'AddThesis',
  data() {
       return {
         activeIndex2: '/',
          fileList: [],
          testFileName:'',
            testFileIndex:0,
          testFileName2:'',
          testFileIndex2:'',
          selectInput:'',
         navList:[
              {name:'/addBook',navItem:'书籍'},
              {name:'/addThesis',navItem:'论文'},
              {name:'/test',navItem:'Test'}
             ],
         activeName:'add',
         formData:{
              rules:{
                name:{
                        type:"string",
                        required:true,
                        message:"必填字段",
                        trigger:"blur"
                      },
                name2:{
                        type:"string",
                        message:"必填字段",
                        trigger:"change"
                      },
                volume1:{
                            type:"number",
                            required:true,
                            message:"册数必须为数字值",
                            trigger:"change"
                        },
                data1:{
                        required:true,
                        message:"请选择日期",
                        trigger:"change"
                       }
               },
              thesisData:[{
                thesisTitle: null,
                proposer: null,
                applicationDate: null,
                fileId: null,
                fileName:null,
                fileDir:null
              }]
          },
          modifyForm:{
              rules:{
                    nameModify:{ type:"string",required:true,message:"必填字段",trigger:"blur"},
                    nameModify2:{ type:"string",message:"必填字段",trigger:"blur"},
                    volumeModify1:{ type:"number",required:true,message:"册数必须为数字值",trigger:"change"},
                    dataModify:{required:true,message:"请选择日期",trigger:"change"}
                    },
              modifyData:[]
        },
        pagesize: 10,
        currpage: 1,
        formInline: {
          selectSort:'在录',
          searchBuyer:'',
          searchBook:''
        },
        modifyPostData:[],
        modifyPostModifyData:[],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogFormVisible: false,
        form: {
          formData:{
            thesisId:'',
            thesisTitle: '',
            proposer: '',
            applicationDate:'',
            fileId:'',
            fileName:'',
            fileDir:''
          },
          formRules:{
            name2:{type:"string",required:true,message:"必填字段",trigger:"blur"}
          }
        },
        formLabelWidth:'120px',
        submitFormData:[]
       }
   },
  mounted(){

  this.activeIndex2 = this.$route.path
    this.getData()
  },
   methods:{
         getData(){
            let postData = this.formInline;
            this.$ajax({
                method: 'get',
                url:'http://10.167.35.186:8080/mainThesis'

              }).then((response)=>{

               let _data = response.data.data,
                   datalength = _data.length;
               for(let i = 0;i < datalength; i++){
                  this.$set(_data[i], 'editing', false)
                }


               this.modifyForm.modifyData = _data;


              }).catch(function(err){
                  console.log(err)
              })
      },
       addLine(){ //添加行数
           var newValue = {
             thesisTitle: '',
             proposer: '',
             applicationDate: '',
             fileId: '',
             fileName:'',
             fileDir:''
           };
           //添加新的行数
           this.formData.thesisData.push(newValue);
       },
       handleDelete(index){ //删除行数
           this.formData.tableData.splice(index, 1)
       },
       save(formName){  //保存
           this.$refs[formName].validate((valid,model) => {



             let formDataList = this.formData.thesisData;
          console.log(JSON.stringify(postData))
             let postData = new FormData();

           if (valid) {

             postData.append("thesisTitle",formDataList[0].thesisTitle)
             postData.append("proposer",formDataList[0].proposer)
             postData.append("applicationDate",formDataList[0].applicationDate)
             postData.append("fileId",formDataList[0].fileId)
             postData.append("fileName",formDataList[0].fileName)
             postData.append("fileDir",formDataList[0].fileDir)

             this.$ajax({
                 method: 'post',
                 url:'http://10.167.35.186:8080/addThesis',
                 data:postData,
                 headers:{
                    'Content-Type': 'multipart/form-data'
                 }
               }).then((response)=>{
                 console.log(response)
                  alert('submit!');

               }).catch(function(err){
                   console.log(err)
               })

           } else {
             console.log('error submit!!');
             return false;
           }

         });
       },
       handleDataDelete(index,row){ //modify删除行数
         index = this.indexMethod(index)-1;

         console.log(row.editing)
        //  this.modifyForm.modifyData.splice(index, 1)

          // let deleteId = this.modifyForm.modifyData[index].bookId;
          // console.log(deleteId)
          // this.$ajax({
          //     method: 'post',
          //     url:'http://10.167.35.186:8080/findBook/deleteBook',
          //     params:{"bookId":deleteId}
          //   }).then((response)=>{
          //     console.log(response)
          //     this.getData();
          //   }).catch(function(err){
          //       console.log(err)
          //   })


      },
    handleSelectionChange(val) {
       this.multipleSelection = val;
     },
 	  handleCurrentChange(cpage) {
 			this.currpage = cpage;
 		},
 		handleSizeChange(psize) {
 			this.pagesize = psize;
 		},
    handleEditThesis(index,row){    //编辑按钮
        console.log(JSON.stringify(row))
        this.$delete(row,'editing')
        this.submitFormData = row;
          console.log(JSON.stringify(row))
        this.form.formData.thesisTitle =  this.submitFormData.paperTitle
        this.form.formData.proposer =  this.submitFormData.proposer
        this.form.formData.applicationDate =  this.submitFormData.applicationDate
        this.form.formData.fileName = this.submitFormData.fileName
        this.form.formData.fileId = this.submitFormData.fileId
        this.form.formData.fileDir = this.submitFormData.fileDownloadUri
        this.form.formData.thesisId = this.submitFormData.paperId
        this.dialogFormVisible = true

    },
    formConfirm(){
      console.log(JSON.stringify(  this.form))
      console.log()
    },
    handleEdit(index,row){
      row.editing = true;
      console.log(index)

      this.prevValue = JSON.parse(JSON.stringify(row));
      this.modifyPostData[index] = this.prevValue;
    },
    handleCancle(index,row){
      row.editing = false;
      let prevContent = this.prevValue;
      this.$set(row,"bookName",prevContent.bookName);
      this.$set(row,"bookVolume",prevContent.bookVolume);
      this.$set(row,"bookBuyer",prevContent.bookBuyer);
      this.$set(row,"bookBorrower",prevContent.bookBorrower);
      this.$set(row,"buyTime",prevContent.buyTime);
      this.modifyPostData.splice(index,1)

    },
    savemodify(formName){
      this.$refs[formName].validate((valid,model) => {
        let postData = this.modifyPostData,
            postDataLen = postData.length;
        for(let i=0;i<postDataLen;i++){
          if(postData[i] !== null && postData[i] !== undefined){
            this.modifyPostModifyData.push
          }
        }
        console.log(this.modifyPostData)

        if (valid) {
          let postData = this.modifyForm.modifyData
          // this.$ajax({
          //     method: 'post',
          //     url:'http://10.167.35.171:8888/addBook/insert',
          //     params:{
          //       ...postData
          //     }
          //   }).then((response)=>{
          //     console.log("sa")
          //   }).catch(function(err){
          //       console.log(err)
          //   })
      } else {
        console.log('error submit!!');
        return false;
      }
      });
      console.log(JSON.stringify(this.modifyForm.modifyData))
    },
    indexMethod(index){
      return (this.currpage - 1) * this.pagesize + index + 1;
    },
    toggleSelection(rows) {
       if (rows) {
         rows.forEach(row => {
           this.$refs.multipleTable.toggleRowSelection(row);
         });
       } else {
         this.$refs.multipleTable.clearSelection();
       }
     },
     batchDelete(){
         let  multData = this.multipleSelection;
         let  tableData =this.tableData3;
         let  multDataLen = multData.length;
         let  tableDataLen = tableData.length;
         for(let i = 0; i < multDataLen ;i++){
             for(let y=0;y < tableDataLen;y++){
                 if(JSON.stringify(tableData[y]) == JSON.stringify(multData[i])){
                   this.tableData3.splice(y,1)
                   console.log("aa")
                 }
             }
         }
     },
     handleSelectionChange(val) {
       this.multipleSelection = val;
       console.log(this.multipleSelection)
     },
     handleClick(tab, event) {
       console.log(tab, event);
      console.log(this.activeName);
    },
    uploadTest(index){
      console.log(index)



    },
    submitUpload() {

        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleChange(file, fileList) {

      this.fileList = [];
      this.fileList = fileList.slice(-1)

        console.log(JSON.stringify(file))
      console.log(JSON.stringify(fileList))
      return

    },
    uploadfile(){
      alert("fdfdd")
    },
    fileSuccess(response,file,fileList,index){
      console.log(index)
      this.$set(this.formData.thesisData,"fileId",response.id)
      this.$set(this.formData.thesisData,"fileName",response.fileName)
      this.$set(this.formData.thesisData,"fileDir",response.fileDownloadUri)
      // this.formData.thesisData.fileId = response.id
      // this.formData.thesisData.fileName = response.fileName
      // this.formData.thesisData.fileDir = response.fileDownloadUri
    },
    testFile(index){
      let testId = document.getElementById("test-file");
         testId.click();
         console.log(index);
         this.testFileIndex = index;
    },
    selectFile(){
      let testId = document.getElementById("test-file"),
          fileList = testId.files,
          fileLen = fileList.length,
          fileArr = [],
          indexData = this.testFileIndex;
      for(let i=0;i<fileLen;i++){
        fileArr.push(fileList[i].name)
      }
      this.testFileName = fileArr.join(",");

      var formDataPost = new FormData(document.getElementById("form-test"));
      this.$ajax({
          method: 'post',
          url:'http://10.167.35.186:8080/uploadFile',
          data:formDataPost
        }).then((response)=>{
          console.log(JSON.stringify(response.data))
          this.$set(this.formData.thesisData[indexData],"fileId",response.data.id)
          this.$set(this.formData.thesisData[indexData],"fileName",response.data.fileName)
          this.$set(this.formData.thesisData[indexData],"fileDir",response.data.fileDownloadUri)
        }).catch(function(err){
            console.log(err)
        })
    },
    testFile2(){
      let testId = document.getElementById("test-file2");
         testId.click();
    },
    selectFile2(){
        let testId = document.getElementById("test-file2"),
            fileList = testId.files,
            fileLen = fileList.length,
            fileArr = [],
            indexData = this.testFileIndex2;

        for(let i=0;i<fileLen;i++){
          fileArr.push(fileList[i].name)
        }
        this.form.fileName = fileArr.join(",");
        this.form.fileId = null;
        this.form.fileDir = null;

    },
    uploadTest2(){
      var formDataPost = new FormData(document.getElementById("form-test2"));
      this.$ajax({
          method: 'post',
          url:'http://10.167.35.186:8080/uploadFile',
          data:formDataPost
        }).then((response)=>{
          console.log(JSON.stringify(response.data))

          this.form.fileName = response.data.fileName
          this.form.fileId = response.data.id
          this.form.fileDir = response.data.fileDownloadUri

        }).catch(function(err){
            console.log(err)
        })
    },
    removeThesis(index){
      if (index !== -1) {
       this.formData.thesisData.splice(index, 1)
     }
    }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-nav{
  background: #123344;
  overflow: auto;
  clear: both;
  box-shadow: 1px 1px 7px #cdcdcd;
}
.nav{
  background: #123345;
}
.logo {
  float: left;
  padding: 0 7%;
  background: #fff;
}
.nav {
  float: left;
}
.logo-img {
  margin-top: 7px;;
  width: 107px;
  height: 50px;
}
.el-menu-demo {
  margin-left: 30px;
}

</style>
