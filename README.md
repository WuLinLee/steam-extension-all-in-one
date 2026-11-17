# Steam Extension All-in-One

将常用的 Steam 价格查询、游戏捆绑包记录、通关时长和 SteamPy 查价功能整合到 Steam 网页中。仓库提供两个运行方式不同的整合脚本。

> **脚本一和脚本二是二选一。不要同时启用，也不要同时安装两个版本。** 两个版本包含大量重复功能，同时运行可能导致重复请求、重复按钮或界面冲突。

## 一键安装

### 脚本一：Tampermonkey 完整版

包含完整的 HLTB 通关时长查询面板，适合使用 Tampermonkey、Violentmonkey 等用户脚本管理器。

[![安装脚本一](https://img.shields.io/badge/安装-Tampermonkey%20脚本一-brightgreen?style=for-the-badge)](https://raw.githubusercontent.com/WuLinLee/steam-extension-all-in-one/main/wo%20bi%20jiao%20xi%20huan%20yong%20de%20steamcha%20jian%20zheng%20he.user.js) [![查看脚本一](https://img.shields.io/badge/GitHub-查看脚本一源码-lightgrey?style=for-the-badge)](https://github.com/WuLinLee/steam-extension-all-in-one/blob/main/wo%20bi%20jiao%20xi%20huan%20yong%20de%20steamcha%20jian%20zheng%20he.user.js)

### 脚本二：Steam++ / Watt Toolkit 版

更适合导入 Steam++（Watt Toolkit）的脚本配置。它提供 HLTB 和 SteamDB 快捷跳转按钮，但**没有脚本一那种自动查询并显示四类通关时长的 HLTB 面板**。脚本二也可以由 Tampermonkey 等用户脚本管理器运行。

[![打开脚本二 Raw 文件](https://img.shields.io/badge/打开-Raw%20脚本二-blue?style=for-the-badge)](https://raw.githubusercontent.com/WuLinLee/steam-extension-all-in-one/main/%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81Steam%2B%2B%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%20%281%29.user.js) [![查看脚本二](https://img.shields.io/badge/GitHub-查看脚本二源码-lightgrey?style=for-the-badge)](https://github.com/WuLinLee/steam-extension-all-in-one/blob/main/%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81Steam%2B%2B%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%20%281%29.user.js)

## 两个版本的功能区别

| 功能 | 脚本一：Tampermonkey 完整版 | 脚本二：Steam++ 版 |
| :--- | :---: | :---: |
| 愿望单历史最低价 | ✓ | ✓ |
| 愿望单史低地区切换 | ✓ | ✓ |
| 游戏详情页史低 | ✓ | ✓ |
| 游戏进包次数标记 | ✓ | ✓ |
| HLTB 自动查询及通关时长面板 | ✓ | — |
| HLTB 搜索/查看快捷入口 | 面板内提供 | ✓ |
| SteamDB 快捷入口 | — | ✓ |
| SteamPy 代购/CDK 查价 | ✓ | ✓ |

**怎么选：**

- 想在 Steam 游戏页面直接看到主线、主线＋支线、完美通关和所有方式的平均时长，选**脚本一**。
- 想在 Steam++ 中使用整合功能，并通过按钮跳转到 HLTB、SteamDB 查询，选**脚本二**。

## 安装说明

### 方式一：使用 Tampermonkey（脚本一或脚本二）

1. 在浏览器安装 [Tampermonkey（篡改猴）](https://www.tampermonkey.net/)。
2. 根据需要点击上方对应脚本的 **安装** / **Raw** 链接。
3. 浏览器会打开用户脚本管理器的安装页面。
4. 检查脚本信息后，点击安装即可。

Edge 用户可以在 Edge 扩展商店搜索 Tampermonkey，添加扩展后再点击本仓库的脚本安装链接。

### 方式二：导入 Steam++ / Watt Toolkit（建议使用脚本二）

1. 从 [Steam++ / Watt Toolkit 官网](https://steampp.net/) 下载并安装软件。
2. 打开上方**脚本二**的 GitHub 文件页，点击右上角下载按钮，下载 `.user.js` 文件。
3. 打开 Steam++ / Watt Toolkit。
4. 进入 **网络加速 → 加速设置**，启用 **启用脚本**。
5. 进入 **网络加速 → 脚本配置**，点击 **+ 导入**，选择刚才下载的脚本文件。
6. 导入成功后，按平时的方式使用网络加速即可。

> Steam++ 的不同版本界面名称可能略有差异；找不到对应选项时，请以当前版本的脚本配置页面为准。

## 功能介绍

### 1. 愿望单与商品页历史最低价

在 Steam 愿望单游戏条目旁显示历史最低价、折扣幅度和发生日期，帮助判断当前价格是否值得购买。

愿望单右上角提供地区切换，可选择中国、日本、土耳其、美国和香港。切换地区后会重新查询对应地区的历史价格。

在单个游戏、套餐或捆绑包详情页，也会尝试在标题附近显示历史最低价。商品页单独查询使用中国区数据。

### 2. 游戏进包次数标记

在识别到游戏 AppID 的 Steam 游戏卡片上显示黄色标签，例如：

`进过 3 包`

数据来自 [Barter.vg](https://barter.vg/)，脚本读取其公开的 Bundle JSON 数据，并在本地缓存约 48 小时。标签显示的是数据源记录的捆绑包数量，不代表当前仍能购买这些捆绑包。

### 3. HLTB 通关时长

脚本一包含完整 HLTB 查询面板，在 Steam 游戏详情页尝试显示：

- **所有方式**：综合游玩时长。
- **主线剧情**：只完成主线所需时长。
- **主线 + 支线**：完成主线及支线所需时长。
- **完美通关**：完成度较高的全收集/全内容时长。

自动匹配失败时，可以在面板中输入游戏名称重新搜索；清除按钮可以清理当前游戏的查询缓存并重新获取数据。对于 DLC，脚本会尝试使用对应本体游戏进行回退查询。

脚本二不包含这套自动查询面板，只在游戏购买区域提供 **HLTB** 搜索快捷按钮，并提供 **SteamDB** 快捷按钮。

### 4. PY 查价助手（SteamPy）

在 Steam 游戏商店页，脚本会尝试查询当前选择的版本，并显示 SteamPy 上可用的代购或 CDK 购买入口。

在愿望单中，点击 **PY查价** 后开始查询；成功时会显示：

- **代**：代购商品页面。
- **K**：CDK 商品页面。

如果没有找到可用结果，会显示无价格或未找到货源。查价结果由 SteamPy 返回，价格、库存和商品可用性可能变化；跳转前请自行核对商品名称、版本、地区限制、激活条件和卖家信息。

## 上游来源与代码致谢

本项目是整合、改写性质的个人脚本集合，并非所有代码均为从零原创。以下列出能够确认的上游来源，以及它们与本仓库功能的对应关系。

| 本仓库功能 | 上游项目 / 页面 | 对应情况 |
| :--- | :--- | :--- |
| 愿望单史低查询、地区选择 | [Steam 史低自动查询（GreasyFork）](https://greasyfork.org/zh-CN/scripts/586080-steam-%E5%8F%B2%E4%BD%8E%E8%87%AA%E5%8A%A8%E6%9F%A5%E8%AF%A2-%E6%84%BF%E6%9C%9B%E5%8D%95-%E4%B8%AD%E6%97%A5%E5%9C%9F%E7%BE%8E-%E5%8D%95%E5%95%86%E5%93%81%E9%A1%B5-%E4%B8%AD-%E6%89%8B%E6%9C%BA%E7%94%B5%E8%84%91%E9%80%9A%E7%94%A8) · [代码页](https://greasyfork.org/zh-CN/scripts/586080-steam-%E5%8F%B2%E4%BD%8E%E8%87%AA%E5%8A%A8%E6%9F%A5%E8%AF%A2-%E6%84%BF%E6%9C%9B%E5%8D%95-%E4%B8%AD%E6%97%A5%E5%9C%9F%E7%BE%8E-%E5%8D%95%E5%95%86%E5%93%81%E9%A1%B5-%E4%B8%AD-%E6%89%8B%E6%9C%BA%E7%94%B5%E8%84%91%E9%80%9A%E7%94%A8/code) | 代码结构和史低查询请求逻辑有明确对应；本仓库对界面、缓存和页面适配作了调整。 |
| 游戏进包次数标记 | [Steam Family Game Analysis（GreasyFork）](https://greasyfork.org/zh-CN/scripts/588235-steam-family-game-analysis-publishable) · [代码页](https://greasyfork.org/zh-CN/scripts/588235-steam-family-game-analysis-publishable/code) | 对应其 Barter.vg Bundle 数据读取、缓存和游戏卡片标记模块；本仓库只整合了进包标记相关功能。 |
| HLTB 通关时长 | [HLTB for Steam（Chrome Web Store）](https://chromewebstore.google.com/detail/hltb-for-steam/hcfnndjmgbpndcninokmfmlblngabgap) | 功能参考来源。商店页面不是可直接核对的完整源代码链接，因此不将其描述为已逐行确认的代码来源。 |
| SteamPy 查价 | [PY查价助手（Chrome Web Store）](https://chromewebstore.google.com/detail/py%E6%9F%A5%E4%BB%B7%E5%8A%A9%E6%89%8B/aeapdkmgpgihkiebomafllebjbjpmfok) | 功能参考来源。商店页面不是可直接核对的完整源代码链接；本仓库的请求地址和页面处理逻辑可在脚本中查看。 |

### 许可证与使用说明

- 本仓库没有声明一个覆盖所有文件的统一许可证。不同功能模块可能包含来自上游项目的代码或衍生实现，应分别遵守相应上游项目的许可证及署名要求。
- 上述两个 GreasyFork 项目页面标注了 GPL 系列许可证。涉及这些项目代码的部分，不能仅凭本仓库自己的说明就取消或替换上游许可证要求。
- 两个 Chrome 扩展的商店介绍页不能代替其完整源代码和许可证文件。若要重新发布、再分发或用于其他项目，应先核对相应作者的授权条款。
- 本仓库目前主要用于个人使用、学习和功能整合参考。**不要将整个仓库误认为已经获得统一的 MIT、GPL 或其他开源授权，也不要在未核实各部分授权前重新打包或分发。**
- 脚本按现状提供，不保证持续兼容 Steam 页面、第三方接口或 Steam 平台规则。使用者应自行判断第三方购买链接、地区价格和账号操作风险。

如果你是上游代码作者，并认为某部分内容需要补充署名或移除，请通过 [GitHub Issues](https://github.com/WuLinLee/steam-extension-all-in-one/issues) 联系。

## 更新说明

当前两个脚本头部没有显式设置 `@updateURL` 和 `@downloadURL`，因此本 README 不承诺用户脚本管理器一定能够自动更新。需要更新时，请回到本仓库查看最新版本，并重新安装或手动更新对应脚本。

## 问题反馈

发现功能失效、Steam 页面结构变化或第三方接口不可用时，欢迎通过 [GitHub Issues](https://github.com/WuLinLee/steam-extension-all-in-one/issues) 提交问题，并尽量附上出错页面、控制台报错和使用的脚本版本。
