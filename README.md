# Steam Extension All-in-One

将常用的 Steam 价格查询、游戏捆绑包记录、通关时长和 SteamPy 查价功能整合到 Steam 网页中。仓库提供两个运行方式不同的整合脚本。

> **脚本一和脚本二是二选一。不要同时启用，也不要同时安装两个版本。** 两个版本包含大量重复功能，同时运行可能导致重复请求、重复按钮或界面冲突。

## 一键安装

### 脚本一：Tampermonkey 整合功能（Tampermonkey 完整版 steam++上 HLTB有问题）

[![安装脚本一](https://img.shields.io/badge/Install-Script%201-brightgreen?style=for-the-badge)](https://raw.githubusercontent.com/WuLinLee/steam-extension-all-in-one/main/wo%20bi%20jiao%20xi%20huan%20yong%20de%20steamcha%20jian%20zheng%20he.user.js) [![下载脚本一](https://img.shields.io/badge/Download-Script%201-lightgrey?style=for-the-badge)](https://github.com/WuLinLee/steam-extension-all-in-one/blob/main/wo%20bi%20jiao%20xi%20huan%20yong%20de%20steamcha%20jian%20zheng%20he.user.js)

### 脚本二：Steam++ 整合功能（Tampermonkey可以用 但更建议在steam++上用 因为导入脚本开启加速后可以直接在steam客户端和steam网页上使用）

[![安装脚本二](https://img.shields.io/badge/Install-Script%202-lightgrey?style=for-the-badge)](https://raw.githubusercontent.com/WuLinLee/steam-extension-all-in-one/main/%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81Steam%2B%2B%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%20%281%29.user.js) [![下载脚本二](https://img.shields.io/badge/Download-Script%202-blue?style=for-the-badge)](https://github.com/WuLinLee/steam-extension-all-in-one/blob/main/%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81Steam%2B%2B%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81%20%281%29.user.js)

> **点击 **INSTALL** 按钮，脚本管理器会自动弹出安装确认框。**（前提是你安装了 Tampermonkey/篡改猴/油猴 同一个东西）（另一种安装方式是打开 GitHub 文件页点 Raw）

> **点击 **DOWNLOAD** 按钮，会打开 GitHub 文件页，右上角点下载图标即可拿到 `.js` 文件。**

> **不要在steam++和油猴上都开启脚本，两个脚本有很多地方是重复的不需要重复开启脚本，总之只保留一个脚本一处开启就对了**

### Tampermonkey/篡改猴/油猴 安装操作顺序

> **Edge → 右上角三个点 … → 扩展 → 获取 Microsoft Edge 扩展 → 搜索 Tampermonkey 或者 篡改猴 → 点第一个 → 添加扩展 → 完成 → 点击这个页面的 **INSTALL** 按钮，脚本管理器会自动弹出安装确认框，点安装**

### **Steam++**（瓦特工具箱）导入脚本二操作顺序 [Steam++官网](https://steampp.net/)

> **点上面蓝色的Steam++官网下载安装 Steam++**

> **点击上方蓝色的 DOWNLOAD SCRIPT2 按钮（建议下载脚本二）会打开 GitHub 文件页，右上角点下载图标即可拿到 `.js` 文件，下载警告点保留**

> **打开Steam++/Watt Toolkit** → **网络加速 → 加速设置 → 打开 “启用脚本”**

> **打开Steam++/Watt Toolkit** → **网络加速 → 脚本配置 → +导入 → 选中下载的.js脚本 点打开 → 添加成功 → 网络加速 → 一键加速 操作之后只需要一键加速就行**

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
| HLTB 通关时长 | [HLTB for Steam（Chrome Web Store）](https://chromewebstore.google.com/detail/hltb-for-steam/hcfnndjmgbpndcninokmfmlblngabgap) · [解包源码（back/1.1.8_0）](https://github.com/WuLinLee/back/tree/main/1.1.8_0) · [content.js](https://github.com/WuLinLee/back/blob/main/1.1.8_0/content.js) · [background.js](https://github.com/WuLinLee/back/blob/main/1.1.8_0/background.js) · [HLTB 客户端](https://github.com/WuLinLee/back/blob/main/1.1.8_0/lib/hltb-client.js) · [匹配器](https://github.com/WuLinLee/back/blob/main/1.1.8_0/lib/matcher.js) · [缓存](https://github.com/WuLinLee/back/blob/main/1.1.8_0/lib/cache.js) | 对照的是 Chrome 扩展 1.1.8 解包文件。整合脚本一使用了对应的 HLTB 查询、端点发现/认证、缓存和游戏匹配逻辑，并改成用户脚本环境运行；页面面板和部分处理流程也经过整合调整。 |
| SteamPy 查价 | [PY查价助手（Chrome Web Store）](https://chromewebstore.google.com/detail/py%E6%9F%A5%E4%BB%B7%E5%8A%A9%E6%89%8B/aeapdkmgpgihkiebomafllebjbjpmfok) · [解包源码（back/1.0_0）](https://github.com/WuLinLee/back/tree/main/1.0_0) · [content.js](https://github.com/WuLinLee/back/blob/main/1.0_0/content.js) · [background.js](https://github.com/WuLinLee/back/blob/main/1.0_0/background.js) | 对照的是 PY查价助手 1.0 解包文件。整合脚本中的 API 地址、Steam 套餐读取、按套餐 ID/游戏名查询和愿望单查价流程，与该版本 content.js 有直接代码对应；请求代理则改为使用用户脚本的 GM_xmlhttpRequest。 |

### 许可证与使用说明

- 本仓库没有声明一个覆盖所有文件的统一许可证。不同功能模块可能包含来自上游项目的代码或衍生实现，应分别遵守相应上游项目的许可证及署名要求。
- 上述两个 GreasyFork 项目页面标注了 GPL 系列许可证。涉及这些项目代码的部分，不能仅凭本仓库自己的说明就取消或替换上游许可证要求。
- HLTB 和 PY查价的解包源码已整理在 [WuLinLee/back](https://github.com/WuLinLee/back)：HLTB 为 `1.1.8_0`，PY查价为 `1.0_0`。该仓库目前未见这两个扩展对应的 LICENSE 文件；找到源码不等于取得再分发授权，因此仍不能据此推定它们采用 GPL、MIT 或其他许可证。若要公开再分发或用于其他项目，应先核对扩展作者的授权条款或取得许可。
- 本仓库目前主要用于个人使用、学习和功能整合参考。**不要将整个仓库误认为已经获得统一的 MIT、GPL 或其他开源授权，也不要在未核实各部分授权前重新打包或分发。**
- 脚本按现状提供，不保证持续兼容 Steam 页面、第三方接口或 Steam 平台规则。使用者应自行判断第三方购买链接、地区价格和账号操作风险。

如果你是上游代码作者，并认为某部分内容需要补充署名或移除，请通过 [GitHub Issues](https://github.com/WuLinLee/steam-extension-all-in-one/issues) 联系。

## 更新说明

当前两个脚本头部没有显式设置 `@updateURL` 和 `@downloadURL`，因此本 README 不承诺用户脚本管理器一定能够自动更新。需要更新时，请回到本仓库查看最新版本，并重新安装或手动更新对应脚本。

## 问题反馈

发现功能失效、Steam 页面结构变化或第三方接口不可用时，欢迎通过 [GitHub Issues](https://github.com/WuLinLee/steam-extension-all-in-one/issues) 提交问题，并尽量附上出错页面、控制台报错和使用的脚本版本。
