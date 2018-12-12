<template>
  <div class="TestWord">
    <div class="header-nav">
      <div class="logo"><img class="logo-img" src="../assets/logo2.png"></div>
      <div class="nav">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#123345" text-color="#fff" active-text-color="#ca4459">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">人员模块</template>
            <el-menu-item index="2-1">通讯录</el-menu-item>
            <el-menu-item index="2-2">论文</el-menu-item>
            <el-menu-item index="2-3">专利</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加" name="first">
      <el-button @click="addLine">添加行数</el-button>
      <el-button @click="save">baocun</el-button>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="bookname" label="书名">
             <template slot-scope="scope">
             <el-input type="bookname" v-model="scope.row.bookname" placeholder="书名"></el-input>
             </template>
          </el-table-column>
          <el-table-column prop="bookvolume" label="册数">
             <template slot-scope="scope">
             <el-input v-model="scope.row.bookvolume" placeholder="册数"></el-input>
             </template>
          </el-table-column>
          <el-table-column prop="bookbuyer" label="购买者">
             <template slot-scope="scope">

             <el-input v-model="scope.row.bookbuyer" placeholder="购买者"></el-input>
             </template>
          </el-table-column>
          <el-table-column prop="bookborrower" label="借阅者">
             <template slot-scope="scope">
             <el-input v-model="scope.row.bookborrower" placeholder="借阅者"></el-input>
             </template>
          </el-table-column>
          <el-table-column prop="bookbuytime" label="购买日期">
             <template slot-scope="scope">
               <el-date-picker
                 v-model="scope.row.bookbuytime"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="购买日期">
               </el-date-picker>
             </template>
          </el-table-column>
          <el-table-column prop="bookbuytime" label="购买日期">
             <template slot-scope="scope">
               <el-button
                  size="mini"
                  type="danger"
                  v-if="!scope.row.editing"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)">删除
               </el-button>
             </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="修改" name="second">
      <el-button @click="savemodify">保存</el-button>
        <el-table
          :data="modifyData"
          style="width: 100%">
          <el-table-column prop="bookname" label="书名">
            <template slot-scope="scope">
  	          	<template v-if="scope.row.editing">
  	            	<el-input class="edit-input" v-model="scope.row.bookname"  placeholder="书名"></el-input>
  	          	</template>
  	         	<span v-else>{{ scope.row.bookname }}</span>
  	        </template>
          </el-table-column>
          <el-table-column prop="bookvolume" label="册数">
             <template slot-scope="scope">
               <template v-if="scope.row.editing">
                 <el-input class="edit-input" v-model="scope.row.bookvolume" placeholder="册数"></el-input>
               </template>
               	<span v-else>{{ scope.row.bookvolume}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="bookbuyer" label="购买者">
             <template slot-scope="scope">
               <template v-if="scope.row.editing">
                 <el-input class="edit-input" v-model="scope.row.bookbuyer"  placeholder="购买者"></el-input>
               </template>
               <span v-else>{{scope.row.bookbuyer}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="bookborrower" label="借阅者">
             <template slot-scope="scope">
               <template v-if="scope.row.editing">
                 <el-input class="edit-input" v-model="scope.row.bookborrower"  placeholder="借阅者"></el-input>
               </template>
               <span v-else>{{scope.row.bookborrower}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="bookbuytime" label="购买日期">
             <template slot-scope="scope">
               <template v-if="scope.row.editing">
                 <el-date-picker
                   v-model="scope.row.bookbuytime"
                   type="date"
                   value-format="yyyy-MM-dd"
                   placeholder="购买日期">
                 </el-date-picker>
               </template>
              <span v-else>{{scope.row.bookbuytime}}</span>
             </template>
          </el-table-column>
          <el-table-column prop="editing" label="操作">
             <template slot-scope="scope">
               <el-button
                  type="danger"
                  v-if="!scope.row.editing"
                  icon="el-icon-delete"
                  v-model="scope.$index"
                  @click="handleEdit(scope.$index, scope.row)">编辑
               </el-button>
               <el-button
                  v-else
                  type="danger"
                  icon="el-icon-delete"
                  v-model="scope.$index"
                  @click="handleCancle(scope.$index, scope.row)">取消
               </el-button>
             </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="删除" name="third">
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
  name: 'TestWord',
  data () {
    return {
      activeIndex2: '1',
      options: [{
          value: '选项1',
          label: '在录'
        }, {
          value: '选项2',
          label: '未过期'
        }, {
          value: '选项3',
          label: '过期'
        }],
      value: '选项1',
      value1: '',
      activeName: 'first',
      tableData:[{
          bookname: '',
          bookbuytime: '',
          bookbuyer: '',
          bookborrower: '',
          bookvolume:''
        }],
        bookArr:[],
        sub:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶dfgd'
        }],
        modifyData:[],
        prevValue:{},
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
        multipleSelection: []
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
    this.$ajax({
        method: 'get',
        url:'../static/json/1.1.1.json', //<---本地地址
        //url: '/api/drummer/8bd17859',
      }).then((response)=>{
        console.log(JSON.stringify(response.data))

        let _data = response.data;
        let datalength = _data.length;
        for(let i = 0;i < datalength; i++){
           this.$set(_data[i], 'editing', false)
        }
        this.modifyData = _data;
      }).catch(function(err){
          console.log(err)
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    addLine(){ //添加行数
    var newValue = {
      bookname: '',
      bookbuytime: '',
      bookbuyer: '',
      bookborrower: '',
      bookvolume:''
      };

      this.tableData.push(newValue) ;
        console.log(this.tableData)
      console.log("ni hao")

    },
    handleDelete(index){ //删除行数
      console.log(index)
      this.tableData.splice(index, 1)
    },
    save(){
      console.log(this.tableData)
      console.log(JSON.stringify(this.tableData))
      console.log("dsd")
    },
    handleEdit(index,row){
      row.editing = true;
      console.log(index)
      this.prevValue = JSON.parse(JSON.stringify(row));
    },
    handleCancle(index,row){
      row.editing = false;
      let prevContent = this.prevValue.bookname;
      this.$set(row,"bookname",prevContent);
    },
    savemodify(){
      console.log(JSON.stringify(this.modifyData))
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
