import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Form, message } from "antd";
import SelectD from "./select.js";
import { getMateria } from "./util.js"; //远程搜索

/*
配置化组件：
title:'标题'
width---宽度间隔
props:getCreate--创建的api
postPer--执行的api
getRefresh--执行成功返回一个提醒
listArr--list循环
isline--存在：无ChidlistArr   
ps:搜索框：参数name接收，输出data：{label：name，value：value} 
*/
/*
改良了一下，之前的不灵活
listArr配置
{
  title: "受料槽", 标题
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
//select清除与value同时会有bug,解决：from存放值
let ChidlistArr = [];
export default function TopSelect(props) {
  const [inf, setInf] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const { children, mark } = props;
  const listArr = props.listArr??[];
  const [messageApi] = message.useMessage();
  let slots = {
    default: [],
  };
  if (children) {
    let childrens = Array.isArray(children) ? children : [children];
    childrens.forEach((item) => {
      if (item.props.slot) {
        slots[item.props.slot] = item;
      } else {
        slots["default"].push(item);
      }
    });
  }
  const handleSearch = (newValue) => {
    if (!props.getSearch) {
      console.error(
        "Warning:属性配置使用了远程调用,请在子组件中设置getSearch属性"
      );
      return null;
    }

    if (newValue) {
      getMateria(newValue, props.getSearch, setData);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    listArr.map((i) => {
      if (i.unplaceholder) {
        form.setFieldsValue({
          [i.valueName]: i.option?.[0].value,
        });
      }
    });
    console.table(listArr);
    
  }, []);

  const clearValue = (arr, value = undefined) => {
    // if (arr instanceof Array) {
    //   arr.map((item) => {
    //     form.setFieldsValue({
    //       [item]: undefined,
    //     });
    //   });
    // } else {
    form.setFieldsValue({
      [arr]: value,
    });
    // }
  };
  const onFinish = (values) => {
    props.getValue?.(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const infBroad = (e) => {
    setInf(e);
  };
  return (
    <div style={{ color: "red" }}>
      <div className="carContent">
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          className="topForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={mark ?? false}
        >
          <Row gutter={props.gutter ?? [68, 6]}>
            {listArr.map((item, index) => {
              return (
                <Col className="gutter-row" key={index}>
                  <Form.Item
                    label={item.title + " :"}
                    name={item.valueName}
                    rules={[
                      {
                        required: item.rule ?? false,
                        message: "请选择!",
                      },
                    ]}
                  >
                    {item.type?.() ?? (
                      <SelectD
                        allowClear
                        {...item}
                        onSearch={item.onSearch ? handleSearch : undefined}
                        clearValue={clearValue}
                        option={item.option ?? data}
                        inf={inf}
                        style={{ width: item.width ?? 270 }}
                        infBroad={infBroad}
                      ></SelectD>
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
          {slots["default"]}
        </Form>
      </div>
    </div>
  );
}
