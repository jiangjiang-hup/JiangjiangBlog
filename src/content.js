import articles from "./articles.json";
import energyImage from "../img/sucai1.png";
import deviceImage from "../img/sucai2.png";
import visitorImage from "../img/sucai3.jpg";
import commandImage from "../img/sucai4.png";

export const projects = [
  {
    id: "energy",
    number: "01",
    name: "让能源数据，一目了然。",
    english: "ENERGY / VISUALIZATION",
    category: "数据可视化",
    tags: ["ECharts", "企业应用", "数据看板"],
    image: energyImage,
    imageAlt: "能源分析看板：用电趋势、能量流向及电表对比",
    windowTitle: "energy.dashboard",
    description: "从用电趋势到能源流向，把复杂的业务数据变成可以理解的界面。",
    sections: [
      [
        "界面观察",
        "这张项目素材展示了总用电量、总电费、损耗量与损耗率，并通过趋势图、能源流向和电表用量对比组织信息。先看全局，再下钻到具体环节，是这类业务界面的阅读顺序。",
      ],
      [
        "开发关注",
        "参与能源管理业务页面开发，使用 ECharts 展示业务数据。移动端场景包含水表查询、扫码选表、用量提报及上传历史，并支持未审核记录的编辑和删除。",
      ],
      [
        "设计取舍",
        "图表服务于判断：明确单位、统计范围和时间口径，保留加载与空状态，让现场人员能够区分“暂无数据”和“尚未加载”。",
      ],
    ],
  },
  {
    id: "device",
    number: "02",
    name: "让屏幕，连接真实设备。",
    english: "HARDWARE / INTERACTION",
    category: "设备交互",
    tags: ["JavaScript", "H5", "蓝牙通信"],
    image: deviceImage,
    imageAlt: "LVCU 程序升级页面：设备版本与固件信息",
    windowTitle: "device.console",
    description: "探索浏览器之外的前端边界：设备连接、状态反馈与现场操作。",
    sections: [
      [
        "项目背景",
        "参与蓝牙 H5 与设备交互页面开发，提供设备扫描、连接恢复、日志展示及设备参数交互能力。配图为提供的 LVCU 程序升级界面素材。",
      ],
      [
        "承担工作",
        "封装蓝牙交互接口，优化扫描、缓存和连接恢复；开发故障码展示与清除、CAN 波特率设置页面，并参与铭牌打印尺寸、排版和打印结束后的页面清理。",
      ],
      [
        "开发关注",
        "设备通信存在断连、超时和重复回调。页面需要表达明确的连接状态，并区分“指令已发送”和“设备已确认”，避免把本地交互成功当作设备执行成功。",
      ],
    ],
  },
  {
    id: "command",
    number: "03",
    name: "把全局，放在同一张屏幕。",
    english: "DATA / COMMAND CENTER",
    category: "数据可视化",
    tags: ["数字化平台", "可视化大屏", "业务数据"],
    image: commandImage,
    imageAlt: "中农博鼎数字化平台决策中心，展示产品分布及销售、采购、设备、能源、质量和库存指标",
    windowTitle: "digital.command.center",
    description: "以产品分布地图为中心，串联销售、采购、生产与经营数据。",
    sections: [
      ["界面展示", "数字化平台决策中心将产品分布置于画面中心，周围组织销售、采购、计划、人员、设备、能源、品质与库存等业务信息。配图为提供的实际界面素材。"],
      ["信息层级", "地图回答分布在哪里，趋势图呈现变化，环形图与关键指标传达当前状态。不同图表承载不同的问题，共同组成全局概览。"],
      ["阅读方式", "先看全局与关键指标，再定位到各业务区块。截图中的数值仅用于呈现原始界面，不代表博客实时数据。"],
    ],
  },
  {
    id: "visitor",
    number: "04",
    name: "从预约开始，让到访更简单。",
    english: "MINI PROGRAM / SMART PARK",
    category: "小程序",
    tags: ["智慧园区", "访客预约", "移动体验"],
    image: visitorImage,
    imageAlt: "博鼎集团智慧园区访客管理小程序，提供访客登录与员工登录入口",
    windowTitle: "visitor.mini.program",
    description: "为访客与员工分别组织入口，让园区通行从清晰的第一步开始。",
    sections: [
      ["界面展示", "智慧园区访客管理小程序以园区形象作为首屏背景，通过两种身份入口组织服务。配图为提供的实际小程序界面素材。"],
      ["两种使用路径", "访客入口对应来访预约与预约记录，员工入口对应员工认证与访客审批。身份先行，帮助不同使用者快速找到自己的任务。"],
      ["移动端表达", "大面积触控区域、清楚的主次关系和授权说明，让首次到访的用户也能理解下一步。此处展示界面作品，不提供真实预约服务。"],
    ],
  },
  {
    id: "mes",
    number: "05",
    name: "把复杂流程，装进口袋。",
    english: "MES / MOBILE PLATFORM",
    category: "移动业务",
    tags: ["Vue 3", "uni-app", "WebSocket"],
    visual: "mes",
    description: "设备、工具、资产、生产，一个面向制造现场的移动业务入口。",
    sections: [
      [
        "项目背景",
        "MES 企业移动端业务平台面向制造企业内部人员，整合设备、工具、资产、能源及生产管理入口。",
      ],
      [
        "承担工作",
        "开发设备台账、保养、维修、知识库及资产盘点页面；完善刀具申请、扫码入出库、交旧品及历史记录流程；重构工作台菜单配置、权限控制和无权限提示。",
      ],
      [
        "公共能力",
        "重构多组织登录与切换逻辑，处理重复请求、车间缓存和组织状态同步。建设统一环境配置，并处理内外网切换、地址缓存与 WebSocket 故障切换。",
      ],
    ],
  },
  {
    id: "warehouse",
    number: "06",
    name: "每一次扫码，都有迹可循。",
    english: "WAREHOUSE / TRACEABILITY",
    category: "移动业务",
    tags: ["PDA", "RFID", "uni-app"],
    visual: "warehouse",
    description: "从到货登记到物料出库，连接现场设备与仓储业务。",
    sections: [
      [
        "项目背景",
        "智能仓储 PDA 系统面向仓库现场，覆盖物料到货、预收货、入出库及追溯流程。",
      ],
      [
        "承担工作",
        "开发到货登记、到货明细、预收货及历史查询页面，支持筛选、分页和详情查看。对接滑橇 RFID 绑定，完善自动读取、单件绑定限制和操作校验。",
      ],
      [
        "业务细节",
        "开发物料入出库、送检送修及其他出库页面，对接 PLC 出库相关接口；完善批量提交、多到货单编辑、物料添加、物料标识校验及参数传递，并整理操作和接口文档。",
      ],
    ],
  },
];

export { articles };
