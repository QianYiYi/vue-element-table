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
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入购买者"
        v-model="input10"
        clearable>
      </el-input>
      <el-input
        placeholder="请输入书名关键字"
        v-model="input10"
        clearable>
      </el-input>
      <el-button>搜索</el-button>
      <router-link class="el-button el-button--edit" to="/test">编 辑</router-link>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="bookname"
          label="书名"
          min-width="50%"
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
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
      input10: '',
      tableData: [{
          bookname: '普通高等教育物联网工程专业规划用书：物联网技术概论',
          bookbuytime: '2016-05-02',
          bookbuyer: '王小虎',
          bookborrower: '李晓月',
          bookvolume:'1'
        }, {
          bookname: '普通高等教育物联网工程专业规划用书：物联网技术概论',
          bookbuytime: '2016-05-02',
          bookbuyer: '王小虎',
          bookborrower: '李晓月',
          bookvolume:'1'
        }, {
          bookname: '普通高等教育物联网工程专业规划用书：物联网技术概论',
          bookbuytime: '2016-05-02',
          bookbuyer: '王小虎',
          bookborrower: '李晓月',
          bookvolume:'1'
        }, {
          bookname: '普通高等教育物联网工程专业规划用书：物联网技术概论',
          bookbuytime: '2016-05-02',
          bookbuyer: '王小虎',
          bookborrower: '李晓月',
          bookvolume:'1'
        }]
    }
  },
  methods: {
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
