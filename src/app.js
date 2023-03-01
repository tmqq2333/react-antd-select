import React from "react";
import { createRoot } from 'react-dom/client';//更新后的写法
import { TopSelect } from "./components";
import {  Button, Input } from "antd";
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
       console.log("faafafafa", e);
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
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
