<template>
  <div class="AddBook">
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
      <el-button @click="save('formDom')">baocun</el-button>
      <el-form  :model="formData"  ref="formDom" class="demo-ruleForm">
        <el-table :data="formData.tableData" style="width: 100%">
          <el-table-column prop="bookName" label="书名">
             <template slot-scope="scope">
                <el-form-item :prop="'tableData.' + scope.$index + '.bookName'" :rules='formData.rules.name'>
                  <el-input v-model="scope.row.bookName" placeholder="书名" ></el-input>
                </el-form-item>
             </template>
          </el-table-column>
          <el-table-column prop="bookVolume" label="册数">
              <template slot-scope="scope">
                 <el-form-item :prop="'tableData.' + scope.$index + '.bookVolume'" :rules="formData.rules.volume1">
                    <el-input v-model.number="scope.row.bookVolume" placeholder="册数"></el-input>
                 </el-form-item>
              </template>
          </el-table-column>
          <el-table-column prop="bookBuyer" label="购买者">
              <template slot-scope="scope">
                 <el-form-item :prop="'tableData.' + scope.$index + '.bookBuyer'" :rules='formData.rules.name'>
                    <el-input v-model="scope.row.bookBuyer" placeholder="购买者"></el-input>
                 </el-form-item>
              </template>
          </el-table-column>
          <el-table-column prop="bookBorrower" label="借阅者">
             <template slot-scope="scope">
               <el-form-item :prop="'tableData.' + scope.$index + '.bookBorrower'" :rules='formData.rules.name'>
                   <el-input v-model="scope.row.bookBorrower" placeholder="借阅者"></el-input>
               </el-form-item>
             </template>
          </el-table-column>
          <el-table-column prop="buyTime" label="购买日期">
             <template slot-scope="scope">
               <el-form-item :prop="'tableData.' + scope.$index + '.buyTime'" :rules='formData.rules.data1'>
                 <el-date-picker v-model="scope.row.buyTime" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="购买日期">
                 </el-date-picker>
               </el-form-item>
             </template>
          </el-table-column>
          <el-table-column  label="操作">
             <template slot-scope="scope">
               <el-button
                  size="mini"
                  type="danger"
                  v-if="!scope.row.editing"
                  @click="handleDelete(scope.$index, scope.row)">删除
               </el-button>
             </template>
          </el-table-column>
        </el-table>
     </el-form>



     </el-tab-pane>
     <el-tab-pane label="修改" name="modify">
    <el-button @click="savemodify('modifyForm')">保存</el-button>
       <el-form :rules="modifyForm.rules" :model="modifyForm"  ref="modifyForm" class="demo-ruleForm">
          <el-table :data="modifyForm.modifyData.slice((currpage - 1) * pagesize, currpage * pagesize)" style="width: 100%">
            <el-table-column type="index" label="序号"align="center" width="50px" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="bookName" label="书名">
              <template slot-scope="scope">
                  <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.bookName'" :rules='modifyForm.rules.nameModify'>
                    <el-input class="edit-input" v-model="scope.row.bookName"  placeholder="书名"></el-input>
                  </el-form-item>
                <span v-else>{{ scope.row.bookName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="bookVolume" label="册数">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.bookVolume'" :rules="modifyForm.rules.volumeModify1">
                   <el-input class="edit-input" v-model.number="scope.row.bookVolume" placeholder="册数"></el-input>
                 </el-form-item>
                  <span v-else>{{ scope.row.bookVolume}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="bookBuyer" label="购买者">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.bookBuyer'" :rules='modifyForm.rules.nameModify'>
                   <el-input class="edit-input" v-model="scope.row.bookBuyer"  placeholder="购买者"></el-input>
                 </el-form-item>
                 <span v-else>{{scope.row.bookBuyer}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="bookBorrower" label="借阅者">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.bookBorrower'" :rules='modifyForm.rules.nameModify2'>
                   <el-input class="edit-input" v-model="scope.row.bookBorrower"  placeholder="借阅者"></el-input>
                 </el-form-item>
                 <span v-else>{{scope.row.bookBorrower}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="buyTime" label="购买日期">
               <template slot-scope="scope">
                 <el-form-item v-if="scope.row.editing" :prop="'modifyData.' + scope.$index + '.buyTime'" :rules='modifyForm.rules.dataModify'>
                   <el-date-picker
                     v-model="scope.row.buyTime"
                     type="date"
                     format="yyyy/MM/dd"
                     value-format="yyyy/MM/dd"
                     placeholder="购买日期">
                   </el-date-picker>
                 </el-form-item>
                <span v-else>{{scope.row.buyTime}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="editing" label="操作">
               <template slot-scope="scope">
                 <el-button
                    size="mini"
                    type="danger"
                    v-if="!scope.row.editing"
                    v-model="scope.$index"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                 </el-button>
                 <el-button
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
                 </el-button>
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
  </div>
</template>

<script>
export default {
  name: 'AddBook',
  data() {
       return {
         activeIndex2: '/',
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
              tableData:[{
                bookName: '',
                buyTime: new Date(),
                bookBuyer: '',
                bookBorrower: '',
                bookVolume:1
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
        }]
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
                params:{
                  ...postData
                },
                url:'http://10.167.35.171:8088/findBook/All'

              }).then((response)=>{

               let _data = response.data.data,
                   datalength = _data.length;
               for(let i = 0;i < datalength; i++){
                  this.$set(_data[i], 'editing', false)
                }


               this.modifyForm.modifyData = _data;

                    console.log(JSON.stringify(response.data))
              }).catch(function(err){
                  console.log(err)
              })
      },
       addLine(){ //添加行数
           var newValue = {
                 bookName: '',
                 buyTime: '',
                 bookBuyer: '',
                 bookBorrower: '',
                 bookVolume:1
             };
           //添加新的行数
           this.formData.tableData.push(newValue);
       },
       handleDelete(index){ //删除行数
           this.formData.tableData.splice(index, 1)
       },
       save(formName){  //保存
           this.$refs[formName].validate((valid,model) => {

           let postData = this.formData.tableData
          console.log(JSON.stringify(postData))

           if (valid) {

             this.$ajax({
                 method: 'post',
                 url:'http://10.167.35.171:8088/findBook/insert',
                 data:postData
               }).then((response)=>{
                 console.log(response)
                  alert('submit!');
                  this.formData.tableData = [{
                           bookName: '',
                           buyTime: '',
                           bookBuyer: '',
                           bookBorrower: '',
                           bookVolume: 1
                       }]
                  this.getData();
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
