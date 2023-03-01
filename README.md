## 目的
基于antd封装的select列表组件。<br/>
配置化生成。方便一个选框变化，带动其他选框。<br/>


### 引入
    npm i react-antd-select

### 使用
    import {TopSelect} from "react-antd-select";

### 数据配置说明
        配置化组件：
        props:
        gutter---宽度间隔,row的gutter
        getSearch--远程搜索接口
        getValue--提交后的操作
        listArr--list循环 
        ps:搜索框：参数name接收，输出data：{label：name，value：value} 

        listArr配置
        {
        title: "类型", 标题
        width: "100", 宽度,默认270
        undisabled: true,   初始化状态是否可选
        mode: "multiple",  模式多选，其余配置同antd
        rule:true,   是否必选
        controlS:true,  被依赖方
        controlM:["startplace",{disable:true,ganged:true}], 订阅者["依赖字段",{disable:是否可选（true or 数组）,ganged:是否联级}]
        unplaceholder: "true",  //默认显示选项第一行数据
        valueName: "startplace_sub", 字段
        option: {              // option
            "1#":[...setChildren(5)],
            "2#":[...setChildren(7)]
        },
        //换成其他框
        type: () => {
            return <Input style={{ width: 270 }} />;
        },
        },
        远程搜索属性
        showSearch: true,
         showArrow: false,
        filterOption: false,
        onSearch: true,
        */
        //因为select清除与value同时存在antd有bug,故from存放值

        slot配置
        提交按钮，必填htmlType="submit"


### 使用方式
例子

```
const list = [
  {
    title: "类型",
    undisabled: true,
    rule: true,
    controlM: ["storage_code", { disable: true, ganged: "true" }],
    valueName: "plant_code",
    option: {
      k1: [{ value: "s1", label: "吾皇" }],
      k2: [{ value: "s1", label: "巴扎黑" }],
      k3: [{ value: "s1", label: "卡卡" }],
    },
  },
  {
    title: "视角",
    undisabled: false,
    controlS: true,
    rule: true,
    unplaceholder: "true",
    valueName: "storage_code",
    option: [
      { value: "k1", label: "12" },
      { value: "k2", label: "88" },
      { value: "k3", label: "66" },
    ],
  },
  {
    //远程搜索数据
    title: "时代",
    undisabled: false,
    rule: false,
    valueName: "material_name",
    showSearch: true,
    showArrow: false,
    filterOption: false,
    onSearch: true,
  },
  {
    title: "名称",
    rule: true,
    undisabled: false,
    valueName: "batch_number",
    type: () => {
      return <Input style={{ width: 270 }} />;
    },
  },
];
function App() {
     const getRefresh = (e) => {
      console.log('表单数据',e);
       console.log("执行了");
     };
  return (
    <>
      <Button type="primary" htmlType="submit" style={{ width: 130 }}>
        审核
      </Button>
      <TopSelect  getValue={getRefresh} listArr={list}>
        <div id="action">
          <div>
            <span>作业创建 ：</span>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 130 }}
            >审核</Button>
          </div>
        </div>
      </TopSelect>
    </>
  );
}

```