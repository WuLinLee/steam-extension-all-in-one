# Steam‑Extension‑All‑in‑One

A userscript (Tampermonkey / Violentmonkey) that adds various quality‑of‑life improvements for the Steam web store and community pages.

---

## ⚠️ Important Notice, Copyright & Disclaimer
> **This is a remixed, derivative work, NOT fully original code.**

This project aggregates feature ideas, code snippets and implementation logic
from multiple publicly released, third‑party userscripts shared online.
Large‑scale restructuring, code refactoring, logic rearrangement, and partial
rewriting were performed with the assistance of AI tools, followed by manual
tweaks and debugging.

- **No global open‑source license is granted for the entire repository.**
  I cannot verify that every segment of code contained here carries explicit,
  redistributable permission from its original creator.
  No MIT, GPL, CC0 or any other public‑license terms apply to the project as a whole.
- Portions of code newly written or significantly transformed by me are shared
  for reference only; you may not treat the whole repository as open‑source.
- This project is made available **solely for non‑commercial, personal‑use and educational purposes**.
  Commercial usage, paid distribution, bundling into paid software or services is prohibited.
- The script is provided **AS‑IS**, without warranty of any kind, either expressed or implied.
  There is no guarantee of compatibility, stability, safety or compliance with Steam’s Terms of Service.
- You use this userscript entirely at your own risk.
  I take no responsibility for, and shall not be liable for, any account restrictions,
  bans, data loss, page breakage, or any other direct or indirect harm caused by running this script.
- If you are the original author of any source code, algorithm, or distinct functional
  implementation included in this work, and you do not wish your work to appear here,
  please open a GitHub Issue with sufficient identifying information.
  I will make reasonable efforts to locate and remove the relevant code segments promptly.
- Forking this repository is permitted for your own private backup, but you **must not**
  re‑publish, redistribute, or apply any formal open‑source license to your forked copy,
  to avoid misleading others into believing all code is freely relicensable.

> 本油猴脚本属于**衍生混改作品，并非全部为从零原创**。
>
> 本项目搜集整合了互联网上多个公开第三方用户脚本的功能思路、代码片段与实现逻辑，
> 使用AI工具完成了大规模结构调整、代码重构、逻辑重排、改写生成，之后经过人工调整与调试。
>
> - **整个仓库不存在全局开源许可证**：无法核验每一段代码都拥有可二次公开发布的完整授权，
>   整个项目不适用 MIT、GPL、CC0 等任何标准开源协议。
> - 仅由我新增或深度改写的部分可作为学习参考，**不能视作全项目开源**。
> - 本项目仅限**非商业、个人自用、学习研究**，禁止商用、付费分发、打包进收费产品。
> - 脚本按现状原样提供，不作任何稳定性、安全性、合规性担保，**不保证遵守Steam平台用户协议**。
> - 所有使用风险由使用者自行承担，作者不对账号限制、封禁、页面异常、数据问题等任何后果负责。
> - 如果您是任意一段原始代码、独有功能实现的原作者，不希望成果被收录，请提交 GitHub Issue，
>   附带能够定位对应代码的信息，我会尽力排查并移除相关内容。
> - 允许Fork做私人备份，但**禁止把Fork后的仓库重新公开发布、擅自套上开源协议**，
>   避免误导他人以为全部代码可以随意再分发。

---

## 📦 Installation
1. Install a userscript manager: Tampermonkey, Violentmonkey, or Greasemonkey.
2. Open the raw link of `steam‑all‑in‑one.user.js`
3. Your userscript manager will pop up an installation prompt.
4. Confirm install.

> Auto‑update is enabled if `@updateURL` is correctly set inside the script header.

---

## 📝 Changelog
> Version number will be incremented on each functional update or bug fix.
> No compatibility is guaranteed between different versions.

---

## 📮 Feedback & Issues
- Bug reports, feature suggestions are welcome via GitHub Issues.
- Requests to remove copyrighted material will be prioritized.
# steam-extension-all-in-one
/*不会写代码没精力维护 截取大佬的代码然后ai改了几百遍的*/


## 脚本一：愿望单史低查询（帮你判断“现在买亏不亏”）

**它解决什么问题？**
Steam 愿望单默认只显示“当前价格”，但你不知道这价格是不是历史最低。这个脚本直接在游戏旁边给你亮出答案。

**它长什么样、显示什么？**
在愿望单里，每个游戏右侧会多出一行字，例如：
`史低 ¥22.1 -75% (2026-01-15)`

- **¥22.1**：历史上最低价多少钱
- **-75%**：那次打折打了多少折
- **(日期)**：那次史低发生的具体时间

**最核心的价值（小白必看）**：
> 如果你看到“史低”是 ¥22，而现在的价格是 ¥30，那说明现在不是最低点，你可以再等等。如果现在正好就是历史最低价，那你现在买就是最划算的，不用犹豫。

**额外功能（左上角切换国家）**：
右上角有个下拉框，可以切换中国、日本、土耳其、美国、香港等地区，帮你比较不同区服的价格。比如某个游戏土耳其区史低只要 10 块钱，你可以心里有数（但注意跨区有风险）。

---

## 脚本二：进包标记（帮你判断“这游戏值不值钱”）

**它解决什么问题？**
很多游戏会被塞进“慈善包”或“捆绑包”里贱卖过。一旦进过包，这个游戏以后就很难再卖出高价了。这个脚本直接给这种游戏打个“标签”，让你一眼识别。

**它长什么样、显示什么？**
在 Steam 任何页面的游戏封面/卡片右上角，会出现一个黄色小标签，写着比如：
`进过3包`

**最核心的价值（小白必看）**：
> 如果你看到一个游戏挂着“进过5包”，说明这游戏曾经被当白菜价甩卖过，那你就不用急着原价买，它迟早还会再进包或打骨折。反过来，如果它从来没进过包，说明这游戏比较“硬”，打折幅度通常不会太大。

**数据来源**：数据来自国外一个叫 Barter.vg 的网站，专门记录游戏历史上过哪些包，比较权威。

---

## 脚本三：HLTB 通关时长（帮你规划“要玩多久”）

**它解决什么问题？**
你看到一个游戏很心动，但不知道要花多少时间才能通关。这个脚本直接从“HowLongToBeat”网站把平均通关时间拉过来，显示在 Steam 页面上。

**它长什么样、显示什么？**
在 Steam 商店的购买按钮附近，会出现一块深色面板，上面显示四行数据：

- **所有方式**：所有玩家平均时长（综合）
- **主线剧情**：只做主线任务需要多少小时
- **主线 + 支线**：顺带做支线任务需要多少小时
- **完美通关**：全成就、全收集需要多少小时

**最核心的价值（小白必看）**：
> 如果你平时上班忙、游戏时间少，看到“主线剧情 80 小时”的游戏，就知道这得玩一两个月，可以先放一放。看到“完美通关 3 小时”的小游戏，周末半天就能搞定，可以立马买来玩。帮你合理分配宝贵的娱乐时间。

**额外功能**：如果自动匹配不上，会显示一个搜索框，你输入游戏英文名后按回车，它会重新搜索。旁边还有个“清”字按钮，点一下会清除缓存并重新匹配。

---

## 脚本四：PY 查价助手（帮你找“更便宜的渠道”）

**它解决什么问题？**
Steam 官方商店的价格不一定是最便宜的。SteamPy 是一个国内的第三方平台，可以买到“代购”或“CDK（激活码）”，价格有时候比 Steam 官方还便宜。这个脚本帮你一键对比并跳转购买。

**它长什么样、怎么用？**

- **在商店详情页**：购买按钮下面会多出一块区域，显示当前版本在 SteamPy 上的“代购价”和“CDK价”，并附带“代购购买”和“CDK购买”两个蓝色按钮，点一下直接跳转去 SteamPy 下单。
- **在愿望单里**：每个游戏左侧会多出一个蓝色的“PY查价”按钮，你点一下它，它会自动去查询。查询成功后，按钮会变成两个小链接：
  - **代**：代表“代购购买链接”
  - **K**：代表“CDK激活码购买链接”
  点击就能直接跳转。

**最核心的价值（小白必看）**：
> 有时候 Steam 官方卖 100 块，SteamPy 上代购可能只要 85 块，或者 CDK 只要 80 块。这个脚本相当于帮你“货比三家”，找出更便宜的那个买法，帮你省下几十块钱。而且它直接给你跳转链接，不用你自己去搜。

---

## 四个脚本怎么配合用？（一句话总结）

| 场景 | 用哪个脚本 |
| :--- | :--- |
| 我想知道这游戏现在买亏不亏 | 用 **史低查询** |
| 我想知道这游戏是不是经常被当白菜甩卖 | 用 **进包标记** |
| 我想知道这游戏要玩多久才通关 | 用 **HLTB** |
| 我想找比 Steam 官方更便宜的购买渠道 | 用 **PY查价** |

四个脚本各有分工，**互不打架**，装在一起就是一套完整的 Steam 购物决策辅助系统。看完价格看时长，看完时长看渠道，全方面帮你省钱省时间。😊*/
