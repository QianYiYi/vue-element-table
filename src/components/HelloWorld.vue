<template>
  <div class="hello">
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
    <div class="filter-condition">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.state" placeholder="请选择">
             <el-option label="在录" value="在录"></el-option>
             <el-option label="过期" value="过期"></el-option>
             <el-option label="未过期" value="为过期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入购买者"
            v-model="formInline.writebuyer"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入书名关键字"
            v-model="formInline.writebookname"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchInfor">搜索</el-button>
        </el-form-item>
      </el-form>
      <router-link class="el-button el-button--edit" to="/test">编 辑</router-link>
      <el-table
        v-loading="loading"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        style="width: 100%">
        <el-table-column
         type="index"
         label="序号"
         align="center"
         width="50px"
        >
        </el-table-column>
        <el-table-column
          prop="bookname"
          label="书名"
          min-width="49%"
          >
        </el-table-column>
        <el-table-column
          prop="bookvolume"
          label="册数"
          min-width="8%">
        </el-table-column>
        <el-table-column
          prop="bookbuyer"
          label="购买者"
          min-width="14%">
        </el-table-column>
        <el-table-column
          prop="bookborrower"
          label="借记人"
          min-width="14%">
        </el-table-column>
        <el-table-column
          prop="bookbuytime"
          label="购买日期"
          min-width="14%">
        </el-table-column>
      </el-table>
      <el-pagination background
  			layout="prev, pager, next, sizes, total, jumper"
  			:page-sizes="[5, 10, 15, 20]"
  			:page-size="pagesize"
  			:total="tableData.length"
  			@current-change="handleCurrentChange"
  			@size-change="handleSizeChange"
  			>
  		</el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex2: '1',
      formInline: {
        state:'在录',
        writebuyer:'',
        writebookname:''
      },
      pagesize: 10,
currpage: 1,
      loading: false,
      value: '选项1',
      input10: '',
      tableData: []
    }
  },
  mounted(){
    this.getBookData()
  },
  methods: {
    getBookData(){
      this.loading = true;
      this.$ajax({
        method: 'get',
      //  url:'../static/json/1.1.1.json', //<---本地地址
        url:'http://localhost:3030/getList'
      }).then((response)=>{
        console.log(JSON.stringify(response.data))
        let _data = response.data;
      //  let datalength = _data.length;
      //  for(let i = 0;i < datalength; i++){
      //     this.$set(_data[i], 'editing', false)
        //}
        this.tableData = _data;
        this.loading = false;
      }).catch(function(err){
          console.log(err)
      })
    },
    searchInfor(){
      console.log(JSON.stringify(this.formInline))
      let postData = this.formInline;
      this.loading = true;
      this.$ajax({
        method: 'get',
      //  url:'../static/json/1.1.1.json', //<---本地地址
        url:'http://localhost:3030/getList',
        params:{
          ...postData
        }
      }).then((response)=>{
        console.log(JSON.stringify(response.data))
        let _data = response.data;
      //  let datalength = _data.length;
      //  for(let i = 0;i < datalength; i++){
      //     this.$set(_data[i], 'editing', false)
        //}
        this.tableData = _data;
        this.loading = false;
      }).catch(function(err){
          console.log(err)
      })
    },
		handleCurrentChange(cpage) {
			this.currpage = cpage;
		},
		handleSizeChange(psize) {
			this.pagesize = psize;
		},
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  .filter-condition .el-select {
    display: inline-block !important;
    width: 100px;
  }
  .filter-condition .el-input {
    display: inline-block !important;
    width: 200px;
  }
  .el-button--edit {
    color:#f5f5f5;
    background: #275873;
    -webkit-box-shadow: inset 0 -4px 0 #123344;
    box-shadow: inset 0 -4px 0 #123344;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .el-button--edit:focus, .el-button--edit:hover{
    background: #123345;
    border-color: #123345;
    color: #fff;
  }
</style>
