// ==UserScript==
// @name         !我比较喜欢用的steam插件整合!(再用steam db插件就完美了)
// @namespace   https://github.com/WuLinLee/steam-extension-all-in-one/
// @version      1.0
// @description  整合愿望单史低查询、进包标记、HLTB通关时长、PY查价助手
// @author       AI服务人类
// @license      No general license · Remixed & AI‑refactored derivative work, non‑commercial study & personal‑use only
// @match        *://store.steampowered.com/wishlist/*
// @match        *://store.steampowered.com/app/*
// @match        https://steamcommunity.com/*
// @match        *://store.steampowered.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @connect      augmentedsteam.com
// @connect      bartervg.com
// @connect      howlongtobeat.com
// @connect      steampy.com
// @connect      store.steampowered.com
// @run-at       document-end
// ==/UserScript==
/*不会写代码没精力维护 截取大佬的代码然后ai改了几百遍的*/
/*好的，不扯代码和术语，我用**完全小白能听懂的大白话**，把这四个脚本挨个介绍清楚。

---

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

// ========== 1. 愿望单史低查询（原脚本1） ==========
(function() {
    'use strict';

    // 仅当页面是愿望单才执行
    if (!location.href.includes("/wishlist/")) return;

    // ---------- 国家配置 ----------
    const COUNTRIES = {
        'cn': { name: '🇨🇳 中国', currency: 'CNY' },
        'jp': { name: '🇯🇵 日本', currency: 'JPY' },
        'tr': { name: '🇹🇷 土耳其', currency: 'TRY' },
        'us': { name: '🇺🇸 美国', currency: 'USD' },
        'hk': { name: '🇭🇰 香港', currency: 'HKD' },
    };
    const DEFAULT_COUNTRY = 'cn';

    const EXCHANGE_TO_CNY = {
        'CNY': 1,
        'JPY': 0.048,
        'TRY': 0.22,
        'USD': 7.25,
        'HKD': 0.92,
    };
    const CURRENCY_SYMBOLS = {
        'CNY': '¥', 'JPY': '¥', 'TRY': 'TL', 'USD': '$', 'HKD': 'HK$',
    };

    const getSymbol = cur => CURRENCY_SYMBOLS[cur] || cur;
    const formatPrice = (amount, currency) => {
        if (amount == null || isNaN(amount)) return '?';
        const sym = getSymbol(currency);
        return (currency === 'JPY') ? sym + Math.round(amount) : sym + amount.toFixed(2);
    };
    const toCNY = (amount, currency) => {
        if (!amount || currency === 'CNY') return null;
        const rate = EXCHANGE_TO_CNY[currency];
        return rate ? (amount * rate).toFixed(2) : null;
    };

    let currentCountry = DEFAULT_COUNTRY;

    // ---------- API 请求 ----------
    function fetchPrices(apps, subs, bundles, country) {
        const data = {
            country,
            apps: apps.map(Number).filter(n => !isNaN(n)),
            subs: subs.map(Number).filter(n => !isNaN(n)),
            bundles: bundles.map(Number).filter(n => !isNaN(n)),
            voucher: true,
            shops: [61]
        };
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                url: location.protocol + "//api.augmentedsteam.com/prices/v2",
                data: JSON.stringify(data),
                onload: function (response) {
                    if (response.status === 200) {
                        try { resolve(JSON.parse(response.responseText)); }
                        catch (e) { reject(new Error('JSON 解析失败')); }
                    } else reject(new Error(`HTTP ${response.status}`));
                },
                onerror: () => reject(new Error('网络错误'))
            });
        });
    }

    // ---------- 创建国家选择下拉框（右上角，无背景框） ----------
    function createCountrySelect(onChange) {
        const select = document.createElement('select');
        select.className = 'shc-select';
        for (const [code, info] of Object.entries(COUNTRIES)) {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = info.name;
            if (code === currentCountry) opt.selected = true;
            select.appendChild(opt);
        }
        select.addEventListener('change', (e) => {
            currentCountry = e.target.value;
            GM_setValue('steamHistoryCountry', currentCountry);
            allLoadedIds.clear();
            wishlistPricesCache = {};
            document.querySelectorAll('.game_lowest_price').forEach(e => e.remove());
            clearTimeout(pendingTimer);
            fetchAndUpdateWishlist();
            if (onChange) onChange(currentCountry);
        });
        return select;
    }

    // ---------- 创建价格元素（只显示史低，白色14px，单行） ----------
    function createPriceElement(info) {
        const lowest = info.lowest;
        const dateStr = new Date(lowest.timestamp).toLocaleDateString();
        const lowPriceStr = formatPrice(lowest.price.amount, lowest.price.currency);
        const div = document.createElement('div');
        div.className = 'game_lowest_price';
        div.innerHTML = `
            史低 <span style="font-size:14px; color:#acf;">${lowPriceStr}</span> -${lowest.cut}% <span style="font-size:14px; color:#acf;">(${dateStr})</span>
        `;
        return div;
    }

    // ---------- 愿望单核心 ----------
    let wishlistPricesCache = {};
    let allLoadedIds = new Set();
    let pendingTimer = null;

    function initWishlist() {
        const rows = document.querySelectorAll('div.Panel[data-index]');
        if (rows.length === 0) {
            setTimeout(initWishlist, 500);
            return;
        }

        if (!document.getElementById('wishlist-country-controls')) {
            const controls = document.createElement('div');
            controls.id = 'wishlist-country-controls';
            controls.style.cssText = 'position:fixed; top:10px; right:10px; z-index:9999;';
            controls.appendChild(createCountrySelect(() => {}));
            document.body.appendChild(controls);
        }

        fetchAndUpdateWishlist();

        const observer = new MutationObserver(() => {
            clearTimeout(pendingTimer);
            pendingTimer = setTimeout(() => { checkAndRequestNew(); }, 300);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        setInterval(() => { restoreMissingFromCache(); }, 1000);
    }

    function checkAndRequestNew() {
        const rows = document.querySelectorAll('div.Panel[data-index]');
        const neededApp = [], neededSub = [], neededBundle = [];
        rows.forEach(row => {
            const link = row.querySelector('a[href*="store.steampowered.com"]');
            if (!link) return;
            const match = link.href.match(/(app|sub|bundle)\/(\d+)/);
            if (!match) return;
            const type = match[1], id = match[2];
            const key = `${type}/${id}`;
            if (!allLoadedIds.has(key)) {
                allLoadedIds.add(key);
                if (type === 'app') neededApp.push(id);
                else if (type === 'sub') neededSub.push(id);
                else neededBundle.push(id);
            }
        });
        if (neededApp.length + neededSub.length + neededBundle.length > 0) {
            requestNewIds(neededApp, neededSub, neededBundle);
        }
    }

    async function requestNewIds(apps, subs, bundles) {
        try {
            const data = await fetchPrices(apps, subs, bundles, currentCountry);
            const prices = data.prices || {};
            Object.assign(wishlistPricesCache, prices);
            updateVisibleRows();
        } catch (e) {}
    }

    async function fetchAndUpdateWishlist() {
        const rows = document.querySelectorAll('div.Panel[data-index]');
        if (rows.length === 0) return;
        const appIds = [], subIds = [], bundleIds = [];
        rows.forEach(row => {
            const link = row.querySelector('a[href*="store.steampowered.com"]');
            if (!link) return;
            const match = link.href.match(/(app|sub|bundle)\/(\d+)/);
            if (!match) return;
            const type = match[1], id = match[2];
            const key = `${type}/${id}`;
            if (!allLoadedIds.has(key)) {
                allLoadedIds.add(key);
                if (type === 'app') appIds.push(id);
                else if (type === 'sub') subIds.push(id);
                else bundleIds.push(id);
            }
        });
        if (appIds.length + subIds.length + bundleIds.length === 0) return;

        const progress = getProgressDiv();
        progress.style.display = 'block';
        progress.textContent = '正在更新...';
        try {
            const data = await fetchPrices(appIds, subIds, bundleIds, currentCountry);
            const prices = data.prices || {};
            Object.assign(wishlistPricesCache, prices);
            updateVisibleRows();
            progress.textContent = '更新完成';
            setTimeout(() => { progress.style.display = 'none'; }, 2000);
        } catch (e) {
            progress.textContent = '更新失败';
            setTimeout(() => { progress.style.display = 'none'; }, 3000);
        }
    }

    function updateVisibleRows() {
        const rows = document.querySelectorAll('div.Panel[data-index]');
        rows.forEach(row => {
            const link = row.querySelector('a[href*="store.steampowered.com"]');
            if (!link) return;
            const match = link.href.match(/(app|sub|bundle)\/(\d+)/);
            if (!match) return;
            const key = `${match[1]}/${match[2]}`;
            const info = wishlistPricesCache[key];
            if (!info || !info.lowest || !info.lowest.price) return;

            const old = row.querySelector('.game_lowest_price');
            if (old) old.remove();

            const div = createPriceElement(info);
            div.style.cssText = 'font-size:12px; color:#acf; display:inline-block; margin-left:auto; padding-left:12px; flex-shrink:0; vertical-align:middle; white-space:nowrap;';

            const targetContainer = row.querySelector('div.lZzQoZsDjew-');
            if (targetContainer) {
                targetContainer.appendChild(div);
            } else {
                const bottomContainer = row.querySelector('div.E4PXslhR-fI-');
                if (bottomContainer) {
                    const blueBtn = bottomContainer.querySelector('div[style*="PY查价"]');
                    if (blueBtn) {
                        blueBtn.insertAdjacentElement('afterend', div);
                    } else {
                        bottomContainer.appendChild(div);
                    }
                } else {
                    row.insertBefore(div, row.firstChild);
                }
            }
        });
    }

    function restoreMissingFromCache() {
        const rows = document.querySelectorAll('div.Panel[data-index]');
        rows.forEach(row => {
            if (row.querySelector('.game_lowest_price')) return;
            const link = row.querySelector('a[href*="store.steampowered.com"]');
            if (!link) return;
            const match = link.href.match(/(app|sub|bundle)\/(\d+)/);
            if (!match) return;
            const key = `${match[1]}/${match[2]}`;
            const info = wishlistPricesCache[key];
            if (info && info.lowest && info.lowest.price) {
                const div = createPriceElement(info);
                div.style.cssText = 'font-size:12px; color:#acf; display:inline-block; margin-left:auto; padding-left:12px; flex-shrink:0; vertical-align:middle; white-space:nowrap;';
                const targetContainer = row.querySelector('div.lZzQoZsDjew-');
                if (targetContainer) {
                    targetContainer.appendChild(div);
                } else {
                    const bottomContainer = row.querySelector('div.E4PXslhR-fI-');
                    if (bottomContainer) {
                        bottomContainer.appendChild(div);
                    }
                }
            }
        });
    }

    function getProgressDiv() {
        let div = document.getElementById('wishlist-progress');
        if (!div) {
            div = document.createElement('div');
            div.id = 'wishlist-progress';
            div.style.cssText = 'position:fixed; top:50px; right:10px; z-index:9999; background:rgba(26,30,36,0.95); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:5px 10px; font-size:12px; color:#e2e8f0; display:none;';
            document.body.appendChild(div);
        }
        return div;
    }

    GM_addStyle(`
        .shc-select { background: #2c313f; color: #e2e8f0; border: 1px solid rgba(255,255,255,.15); border-radius: 4px; padding: 2px 6px; font-size: 12px; }
        .game_lowest_price { word-break: keep-all; }
    `);

    const savedCountry = GM_getValue('steamHistoryCountry', DEFAULT_COUNTRY);
    if (savedCountry && COUNTRIES[savedCountry]) {
        currentCountry = savedCountry;
    }
    initWishlist();
})();

// ========== 2. 进包标记（原脚本2） ==========
(function() {
    'use strict';

    const FA_BUNDLE_CACHE_KEY = 'fa_bundle_cache';
    const FA_BUNDLE_CACHE_KEY_TIME = 'fa_bundle_cache_time';
    const FA_BUNDLE_CACHE_TTL = 48 * 60 * 60 * 1000;

    let faBundleData = null;
    let faBundleLoading = false;

    function getBundleCount(appId) {
        if (!faBundleData || !appId) return 0;
        var entry = faBundleData[String(appId)];
        return entry ? (entry.bundles || 0) : 0;
    }

    function faLoadBundleData() {
        if (faBundleData || faBundleLoading) return;
        faBundleLoading = true;

        var cached = GM_getValue(FA_BUNDLE_CACHE_KEY, null);
        var cachedTime = GM_getValue(FA_BUNDLE_CACHE_KEY_TIME, 0);
        if (cached && (Date.now() - cachedTime < FA_BUNDLE_CACHE_TTL)) {
            faBundleData = cached;
            faBundleLoading = false;
            console.log('[Bundle] 缓存命中: ' + Object.keys(cached).length + ' 条记录');
            return;
        }

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://bartervg.com/browse/bundles/json/',
            timeout: 30000,
            onload: function(r) {
                try {
                    var json = JSON.parse(r.responseText);
                    if (Object.keys(json).length < 7000) {
                        console.warn('[Bundle] 数据 sanity check 失败');
                        return;
                    }
                    faBundleData = json;
                    GM_setValue(FA_BUNDLE_CACHE_KEY, json);
                    GM_setValue(FA_BUNDLE_CACHE_KEY_TIME, Date.now());
                    console.log('[Bundle] 数据加载完成: ' + Object.keys(json).length + ' 条记录');
                } catch(e) {
                    console.warn('[Bundle] 数据解析失败:', e);
                } finally {
                    faBundleLoading = false;
                }
            },
            onerror: function() {
                console.warn('[Bundle] 数据获取失败（网络错误）');
                faBundleLoading = false;
            },
            ontimeout: function() {
                console.warn('[Bundle] 数据获取超时');
                faBundleLoading = false;
            }
        });
    }

    function getAppIdFromNode(node) {
        if (!node || !node.getAttribute) return null;
        var ds = node.getAttribute('data-ds-appid');
        if (ds) return ds.split(',')[0].trim();
        var dai = node.getAttribute('data-app-id');
        if (dai) return dai.split(',')[0].trim();
        var href = node.href || node.getAttribute('href') || '';
        var m = /\/app\/(\d+)/.exec(href);
        return m ? m[1] : null;
    }

    GM_addStyle(`
        .fa-bundle-flag {
            position: absolute;
            right: 0;
            top: 0;
            padding: 1px 6px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 0 0 0 3px;
            background: #f59e0b;
            color: #fff;
            z-index: 10;
            white-space: nowrap;
            pointer-events: none;
        }
        .ds_flagged { position: relative !important; }
    `);

    function addBundleFlag(node) {
        if (!node) return;
        if (node.querySelector('.fa-bundle-flag')) return;

        var appid = getAppIdFromNode(node);
        if (!appid) return;

        var count = getBundleCount(Number(appid));
        if (count === 0) return;

        node.style.position = 'relative';
        node.classList.add('ds_flagged');

        var flag = document.createElement('div');
        flag.className = 'fa-bundle-flag';
        flag.textContent = '进过' + count + '包';
        flag.title = '此游戏曾出现在 ' + count + ' 个 bundle 中（数据来源: Barter.vg）';
        node.appendChild(flag);
    }

    var CARD_SELECTOR = [
        '[data-ds-appid]',
        'a[href*="/app/"]'
    ].join(',');

    function scanCards() {
        document.querySelectorAll(CARD_SELECTOR).forEach(function(el) {
            if (el.dataset.faBundleScanned) return;
            el.dataset.faBundleScanned = '1';
            if (el.tagName === 'A' && !el.querySelector('img')) return;
            addBundleFlag(el);
        });
    }

    var scanTimer = null;
    function scheduleScan() {
        if (scanTimer) clearTimeout(scanTimer);
        scanTimer = setTimeout(scanCards, 300);
    }

    function init() {
        faLoadBundleData();

        setTimeout(scanCards, 500);
        setTimeout(scanCards, 1500);
        setTimeout(scanCards, 3000);

        var observer = new MutationObserver(function(mutations) {
            var needScan = false;
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    needScan = true;
                    break;
                }
            }
            if (needScan) scheduleScan();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ========== 3. HLTB for Steam（原脚本3，取一份） ==========
(function() {
    'use strict';

    const LANG = {
        panel_title: 'How Long To Beat',
        stat_main: '主线剧情',
        stat_main_sides: '主线 + 支线',
        stat_completionist: '完美通关',
        stat_all_styles: '所有方式',
        view_on_hltb: '在 HLTB 上查看',
        search_on_hltb: '在 HLTB 搜索',
        search_placeholder: '输入英文名后按 Enter 重搜',
        loading: '加载中…',
        error_no_match: '在 HowLongToBeat 上未找到匹配项。',
        error_endpoint: '无法发现 HLTB API 端点。',
        error_network: '获取 HLTB 数据时出现网络错误。',
        unit_hours_short: '小时',
        value_unknown: '—',
    };
    const t = key => LANG[key] || key;

    const HltbCache = {
        GAME_KEY_PREFIX: 'hltb_game_',
        ENDPOINT_KEY: 'hltb_endpoint',
        GAME_TTL_MS: 7 * 24 * 60 * 60 * 1000,
        NO_MATCH_TTL_MS: 24 * 60 * 60 * 1000,
        ENDPOINT_TTL_MS: 30 * 60 * 1000,

        async getGame(appid) {
            const key = this.GAME_KEY_PREFIX + appid;
            const entry = await this._get(key);
            if (!entry) return null;
            if (Date.now() - entry.timestamp > this._ttlFor(entry)) return null;
            return entry.data;
        },
        async setGame(appid, data, ttlMs) {
            const key = this.GAME_KEY_PREFIX + appid;
            await this._set(key, {
                data,
                timestamp: Date.now(),
                ttl: typeof ttlMs === 'number' ? ttlMs : this.GAME_TTL_MS,
            });
        },
        async removeGame(appid) {
            const key = this.GAME_KEY_PREFIX + appid;
            await this._remove(key);
        },
        async getEndpoint() {
            const entry = await this._get(this.ENDPOINT_KEY);
            if (!entry) return null;
            if (Date.now() - entry.timestamp > this.ENDPOINT_TTL_MS) return null;
            return entry.data;
        },
        async setEndpoint(data) {
            await this._set(this.ENDPOINT_KEY, { data, timestamp: Date.now() });
        },
        async clearAll() {
            const listKey = 'hltb_keys_list';
            const list = JSON.parse(GM_getValue(listKey, '[]'));
            for (const k of list) GM_deleteValue(k);
            GM_deleteValue(listKey);
        },
        async countGames() {
            const listKey = 'hltb_keys_list';
            const list = JSON.parse(GM_getValue(listKey, '[]'));
            return list.filter(k => k.startsWith(this.GAME_KEY_PREFIX)).length;
        },
        _ttlFor(entry) {
            if (typeof entry.ttl === 'number') return entry.ttl;
            const isNegative = entry.data && entry.data.matchType === 'none';
            return isNegative ? this.NO_MATCH_TTL_MS : this.GAME_TTL_MS;
        },
        _get(key) {
            return new Promise(resolve => {
                const val = GM_getValue(key, null);
                resolve(val ? JSON.parse(val) : null);
            });
        },
        _set(key, val) {
            return new Promise(resolve => {
                GM_setValue(key, JSON.stringify(val));
                const listKey = 'hltb_keys_list';
                let list = JSON.parse(GM_getValue(listKey, '[]'));
                if (!list.includes(key)) {
                    list.push(key);
                    GM_setValue(listKey, JSON.stringify(list));
                }
                resolve();
            });
        },
        _remove(key) {
            return new Promise(resolve => {
                GM_deleteValue(key);
                const listKey = 'hltb_keys_list';
                let list = JSON.parse(GM_getValue(listKey, '[]'));
                list = list.filter(k => k !== key);
                GM_setValue(listKey, JSON.stringify(list));
                resolve();
            });
        }
    };

    const HltbClient = {
        HLTB_ORIGIN: 'https://howlongtobeat.com',
        HOMEPAGE_URL: 'https://howlongtobeat.com/',
        DEFAULT_SEARCH_PATH: '/api/search/site',
        USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',

        _request(method, url, headers, body) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: method,
                    url: url,
                    headers: headers || {},
                    data: body,
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            resolve(response);
                        } else {
                            reject(new Error(`HTTP ${response.status}: ${response.statusText}`));
                        }
                    },
                    onerror: function(err) {
                        reject(new Error('Network error'));
                    }
                });
            });
        },

        _fetchText(url) {
            return this._request('GET', url, {
                'User-Agent': this.USER_AGENT,
                'Origin': this.HLTB_ORIGIN,
                'Referer': this.HOMEPAGE_URL,
            }).then(res => res.responseText);
        },

        _fetchJSON(url, method = 'GET', headers = {}, body = null) {
            return this._request(method, url, {
                ...headers,
                'Content-Type': 'application/json',
                'User-Agent': this.USER_AGENT,
                'Origin': this.HLTB_ORIGIN,
                'Referer': this.HOMEPAGE_URL,
            }, body).then(res => JSON.parse(res.responseText));
        },

        _extractScriptUrls(html) {
            const urls = [];
            const re = /<script\b[^>]*\bsrc=(["'])(.*?)\1[^>]*>/gi;
            let m;
            while ((m = re.exec(html)) !== null) {
                try {
                    urls.push(new URL(m[2], this.HOMEPAGE_URL).toString());
                } catch (e) {}
            }
            return urls;
        },

        _extractSearchPathFromScript(scriptText) {
            if (!scriptText.includes('searchTerms') || !scriptText.includes('searchOptions')) return null;
            const initRe = /["'`]\/api\/((?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+)\/init\b/g;
            let m;
            while ((m = initRe.exec(scriptText)) !== null) {
                if (m[1]) return `/api/${m[1]}`;
            }
            const pattern = /fetch\s*\(\s*["'`](\/api\/[a-zA-Z0-9_/-]+)[^"'`]*["'`]\s*,\s*\{[^}]*method:\s*["'`]POST["'`]/gi;
            while ((m = pattern.exec(scriptText)) !== null) {
                const candidate = m[1].replace(/\/+$/, '');
                if (candidate && candidate !== '/api') return candidate;
            }
            return null;
        },

        async discoverSearchPath() {
            let html;
            try {
                html = await this._fetchText(this.HOMEPAGE_URL);
            } catch (e) {
                return this.DEFAULT_SEARCH_PATH;
            }
            const scripts = this._extractScriptUrls(html);
            for (const src of scripts) {
                try {
                    const u = new URL(src);
                    if (u.origin !== this.HLTB_ORIGIN || !u.pathname.endsWith('.js')) continue;
                    const body = await this._fetchText(src);
                    const found = this._extractSearchPathFromScript(body);
                    if (found) return found;
                } catch (e) {}
            }
            return this.DEFAULT_SEARCH_PATH;
        },

        _parseAuth(data) {
            if (!data || typeof data !== 'object') return null;
            const token = typeof data.token === 'string' ? data.token : null;
            let hpKey = null, hpVal = null;
            for (const [name, value] of Object.entries(data)) {
                if (typeof value !== 'string') continue;
                const lower = name.toLowerCase();
                if (!hpKey && lower.includes('key')) hpKey = value;
                else if (!hpVal && lower.includes('val')) hpVal = value;
            }
            if (token && hpKey && hpVal) return { token, hpKey, hpVal };
            return null;
        },

        async fetchAuth(searchPath) {
            const url = `${this.HLTB_ORIGIN}${searchPath}/init?t=${Date.now()}`;
            const json = await this._fetchJSON(url);
            const auth = this._parseAuth(json);
            if (!auth) throw new Error('auth_parse_failed');
            return auth;
        },

        _buildSearchBody(title, auth, { stripAll = false, modifier = 'hide_dlc' } = {}) {
            let cleaned = title.replace(/[™®©]/g, '').replace(/[‘’ʼ]/g, "'");
            if (stripAll) cleaned = cleaned.replace(/['`]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ');
            const terms = cleaned.split(/\s+/).map(t => t.trim()).filter(Boolean);
            const body = {
                searchType: 'games',
                searchTerms: terms,
                searchPage: 1,
                size: 20,
                searchOptions: {
                    games: {
                        userId: 0,
                        platform: '',
                        sortCategory: 'name',
                        rangeCategory: 'main',
                        rangeTime: { min: 0, max: 0 },
                        gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
                        modifier,
                    },
                    users: {},
                    filter: '',
                    sort: 0,
                    randomizer: 0,
                },
            };
            body[auth.hpKey] = auth.hpVal;
            return body;
        },

        async postSearch(searchPath, auth, body) {
            const headers = {
                'x-auth-token': auth.token,
                'x-hp-key': auth.hpKey,
                'x-hp-val': auth.hpVal,
                'Content-Type': 'application/json',
            };
            const url = this.HLTB_ORIGIN + searchPath;
            const json = await this._fetchJSON(url, 'POST', headers, JSON.stringify(body));
            return json;
        },

        async _loadBootstrap() {
            const cached = await HltbCache.getEndpoint();
            if (!cached) return { searchPath: null, auth: null };
            return {
                searchPath: cached.searchPath || null,
                auth: cached.auth && cached.auth.token && cached.auth.hpKey && cached.auth.hpVal
                    ? cached.auth : null,
            };
        },

        async _saveBootstrap(searchPath, auth) {
            await HltbCache.setEndpoint({ searchPath, auth });
        },

        async _ensureAuth(state) {
            let searchPath = state.searchPath || await this.discoverSearchPath();
            if (state.auth) {
                await this._saveBootstrap(searchPath, state.auth);
                return { searchPath, auth: state.auth };
            }
            try {
                const auth = await this.fetchAuth(searchPath);
                await this._saveBootstrap(searchPath, auth);
                return { searchPath, auth };
            } catch (e) {
                searchPath = await this.discoverSearchPath();
                const auth = await this.fetchAuth(searchPath);
                await this._saveBootstrap(searchPath, auth);
                return { searchPath, auth };
            }
        },

        async _executeSearch(state, title, opts) {
            let body = this._buildSearchBody(title, state.auth, opts);
            try {
                const json = await this.postSearch(state.searchPath, state.auth, body);
                return { results: this._pickResults(json), body };
            } catch (e) {
                try {
                    const auth = await this.fetchAuth(state.searchPath);
                    await this._saveBootstrap(state.searchPath, auth);
                    state.auth = auth;
                    body = this._buildSearchBody(title, state.auth, opts);
                    const json = await this.postSearch(state.searchPath, state.auth, body);
                    return { results: this._pickResults(json), body };
                } catch (e2) {
                    const fresh = await this._ensureAuth({ searchPath: null, auth: null });
                    state.searchPath = fresh.searchPath;
                    state.auth = fresh.auth;
                    body = this._buildSearchBody(title, state.auth, opts);
                    const json = await this.postSearch(state.searchPath, state.auth, body);
                    return { results: this._pickResults(json), body };
                }
            }
        },

        _pickResults(json) {
            return Array.isArray(json && json.data) ? json.data : [];
        },

        async search(title, options = {}) {
            let state = await this._loadBootstrap();
            state = await this._ensureAuth(state);

            const base = title.replace(/[™®©]/g, '').replace(/[‘’ʼ]/g, "'").trim();
            const words = base.split(/\s+/).filter(Boolean);
            const shared = typeof options.modifier === 'string' ? { modifier: options.modifier } : {};

            const passes = [
                { title: base, opts: { ...shared } },
                { title: base.toLowerCase(), opts: { ...shared } },
                { title: base, opts: { ...shared, stripAll: true } },
            ];
            if (words.length >= 3) {
                const broader = words.slice(0, -1).join(' ');
                passes.push({ title: broader, opts: { ...shared } });
                passes.push({ title: broader.toLowerCase(), opts: { ...shared } });
            }

            const attempts = [];
            for (const pass of passes) {
                const { results, body } = await this._executeSearch(state, pass.title, pass.opts);
                attempts.push({ terms: body.searchTerms, count: results.length });
                if (results.length > 0) {
                    return { results, terms: body.searchTerms, attempts };
                }
            }
            return { results: [], terms: [], attempts };
        }
    };

    const HltbMatcher = {
        ROMAN_MAP: { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 },

        romanToArabic(token) {
            if (!/^[ivxlcdm]+$/i.test(token)) return null;
            const lower = token.toLowerCase();
            let total = 0, prev = 0;
            for (let i = lower.length - 1; i >= 0; i--) {
                const value = this.ROMAN_MAP[lower[i]];
                if (!value) return null;
                if (value < prev) total -= value;
                else total += value;
                prev = value;
            }
            return total > 0 ? String(total) : null;
        },

        normalize(input) {
            if (!input) return '';
            let text = input.toLowerCase();
            text = text.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
            if (!text) return '';
            text = text.split(' ').map(token => {
                const arabic = this.romanToArabic(token);
                return arabic !== null ? arabic : token;
            }).join(' ');
            return text;
        },

        levenshtein(a, b) {
            if (a === b) return 0;
            if (!a.length) return b.length;
            if (!b.length) return a.length;
            let prev = new Array(b.length + 1);
            let curr = new Array(b.length + 1);
            for (let j = 0; j <= b.length; j++) prev[j] = j;
            for (let i = 1; i <= a.length; i++) {
                curr[0] = i;
                for (let j = 1; j <= b.length; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    curr[j] = Math.min(
                        curr[j - 1] + 1,
                        prev[j] + 1,
                        prev[j - 1] + cost
                    );
                }
                [prev, curr] = [curr, prev];
            }
            return prev[b.length];
        },

        match(results, appid, title) {
            if (!Array.isArray(results) || results.length === 0) return null;
            const byAppid = results.find(r => r && String(r.profile_steam) === String(appid) && r.profile_steam);
            if (byAppid) return { entry: byAppid, matchType: 'appid' };

            const normalizedTitle = this.normalize(title);
            if (!normalizedTitle) return null;

            const byExact = results.find(r => r && this.normalize(r.game_name) === normalizedTitle);
            if (byExact) return { entry: byExact, matchType: 'exact' };

            let best = null;
            for (const r of results) {
                if (!r || !r.game_name) continue;
                const candidate = this.normalize(r.game_name);
                if (!candidate) continue;
                const distance = this.levenshtein(normalizedTitle, candidate);
                const popularity = Number(r.comp_all_count) || 0;
                if (!best || distance < best.distance || (distance === best.distance && popularity > best.popularity)) {
                    best = { entry: r, distance, popularity };
                }
            }
            return best ? { entry: best.entry, matchType: 'fuzzy', distance: best.distance } : null;
        }
    };

    function getAppId() {
        const match = /\/app\/(\d+)/.exec(location.pathname);
        return match ? match[1] : null;
    }

    function getGameTitle() {
        const selectors = ['.apphub_AppName', '#appHubAppName', 'div.apphub_AppName'];
        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el && el.textContent && el.textContent.trim()) {
                return el.textContent.trim();
            }
        }
        const og = document.querySelector('meta[property="og:title"]');
        if (og && og.content) return og.content.trim();
        return null;
    }

    async function fetchAppDetails(appid) {
        try {
            const res = await fetch(`/api/appdetails?appids=${encodeURIComponent(appid)}&l=english&filters=basic`);
            if (!res.ok) return null;
            const json = await res.json();
            const entry = json && json[appid];
            if (!entry || !entry.success || !entry.data) return null;
            const data = entry.data;
            const full = data.fullgame && data.fullgame.appid && data.fullgame.name
                ? { appid: String(data.fullgame.appid), name: String(data.fullgame.name).trim() }
                : null;
            return {
                name: data.name ? String(data.name).trim() : null,
                type: data.type ? String(data.type) : null,
                fullgame: full && full.name ? full : null,
            };
        } catch (e) {
            return null;
        }
    }

    async function resolveLookupTarget(appid, localizedTitle) {
        const details = await fetchAppDetails(appid);
        const isDlc = !!(details && details.type === 'dlc');
        return {
            appid,
            title: (details && details.name) || localizedTitle,
            isDlc,
            fallback: isDlc && details.fullgame
                ? { appid: details.fullgame.appid, title: details.fullgame.name }
                : null,
        };
    }

    function formatHours(seconds) {
        if (!seconds || seconds <= 0) return t('value_unknown');
        const hours = seconds / 3600;
        const rounded = hours < 10 ? hours.toFixed(1) : Math.round(hours).toString();
        return `${rounded} ${t('unit_hours_short')}`;
    }

    function buildPanel(root) {
        root.innerHTML = `
            <style>
                :host { all: initial; display: block; }
                .hltb-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: "Motiva Sans", Arial, sans-serif;
                    color: #c7d5e0;
                    background: linear-gradient(90deg, #16202d 0%, #1b2838 100%);
                    border: 1px solid #2a3f5f;
                    border-radius: 3px;
                    padding: 8px 14px;
                    margin: 8px 0 12px;
                    font-size: 13px;
                    line-height: 1.3;
                    flex-wrap: wrap;
                }
                .hltb-card.is-error { opacity: 0.85; }
                .hltb-brand {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    flex: 0 0 auto;
                }
                .hltb-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 0.2px;
                    white-space: nowrap;
                }
                .hltb-stats {
                    display: flex;
                    align-items: baseline;
                    gap: 18px;
                    flex: 1 1 auto;
                    flex-wrap: wrap;
                }
                .hltb-stat {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                    white-space: nowrap;
                }
                .hltb-stat-label {
                    font-size: 11px;
                    color: #8f98a0;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                }
                .hltb-stat-value {
                    font-size: 14px;
                    font-weight: 600;
                    color: #ffffff;
                }
                .hltb-stat-value[data-slot="main"] { color: #ffcc00 !important; }
                .hltb-status {
                    font-size: 12px;
                    color: #8f98a0;
                    flex: 1 1 auto;
                    min-width: 80px;
                }
                .hltb-cta, .hltb-clear {
                    display: inline-block;
                    border-radius: 2px;
                    border: none;
                    padding: 1px;
                    cursor: pointer;
                    text-decoration: none !important;
                    flex: 0 0 auto;
                    line-height: 0;
                    font-size: 12px;
                    color: #67c1f5 !important;
                    background: rgba(103, 193, 245, 0.2);
                }
                .hltb-cta > span, .hltb-clear > span {
                    display: block;
                    padding: 4px 12px;
                    border-radius: 2px;
                    font-weight: 400;
                    line-height: 16px;
                }
                .hltb-cta:hover, .hltb-clear:hover {
                    color: #ffffff !important;
                    background: linear-gradient(to right, #67c1f5 0%, #417a9b 60%);
                }
                .hltb-cta[hidden] { display: none; }
                .hltb-clear { display: inline-block; }
                .hltb-search-input {
                    display: none;
                    padding: 4px 6px;
                    border-radius: 2px;
                    border: 1px solid #2a3f5f;
                    background: #1b2838;
                    color: #c7d5e0;
                    font-size: 12px;
                    width: 140px;
                    flex: 0 0 auto;
                }
                .hltb-search-input:focus {
                    outline: none;
                    border-color: #67c1f5;
                }
                .hltb-search-input.visible {
                    display: inline-block;
                }
            </style>
            <div class="hltb-card" part="card">
                <div class="hltb-brand">
                    <span class="hltb-title">${t('panel_title')}</span>
                </div>
                <div class="hltb-stats" data-slot="grid" hidden>
                    <div class="hltb-stat">
                        <span class="hltb-stat-label">${t('stat_all_styles')}</span>
                        <span class="hltb-stat-value" data-slot="all">—</span>
                    </div>
                    <div class="hltb-stat">
                        <span class="hltb-stat-label">${t('stat_main')}</span>
                        <span class="hltb-stat-value" data-slot="main">—</span>
                    </div>
                    <div class="hltb-stat">
                        <span class="hltb-stat-label">${t('stat_main_sides')}</span>
                        <span class="hltb-stat-value" data-slot="plus">—</span>
                    </div>
                    <div class="hltb-stat">
                        <span class="hltb-stat-label">${t('stat_completionist')}</span>
                        <span class="hltb-stat-value" data-slot="100">—</span>
                    </div>
                </div>
                <span class="hltb-status" data-slot="status"></span>
                <input class="hltb-search-input" data-slot="search-input" type="text" placeholder="${t('search_placeholder')}">
                <button class="hltb-clear" data-slot="clear-btn"><span>清</span></button>
                <a class="hltb-cta" data-slot="cta" target="_blank" rel="noopener noreferrer" hidden><span data-slot="cta-text"></span></a>
            </div>
        `;

        const card = root.querySelector('.hltb-card');
        const status = root.querySelector('[data-slot="status"]');
        const grid = root.querySelector('[data-slot="grid"]');
        const cta = root.querySelector('[data-slot="cta"]');
        const ctaText = root.querySelector('[data-slot="cta-text"]');
        const searchInput = root.querySelector('[data-slot="search-input"]');
        const clearBtn = root.querySelector('[data-slot="clear-btn"]');
        const slots = {
            main: root.querySelector('[data-slot="main"]'),
            plus: root.querySelector('[data-slot="plus"]'),
            '100': root.querySelector('[data-slot="100"]'),
            all: root.querySelector('[data-slot="all"]'),
        };

        let onSearchCallback = null;
        let onClearCallback = null;

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = searchInput.value.trim();
                if (val && onSearchCallback) {
                    status.textContent = '搜索中…';
                    onSearchCallback(val);
                }
            }
        });

        clearBtn.addEventListener('click', () => {
            if (onClearCallback) {
                onClearCallback();
            }
        });

        function setInputVisible(visible) {
            if (visible) {
                searchInput.classList.add('visible');
                searchInput.focus();
                searchInput.select();
            } else {
                searchInput.classList.remove('visible');
            }
        }

        return {
            showData(data) {
                card.classList.remove('is-error');
                status.textContent = '';
                slots.main.textContent = formatHours(data.compMain);
                slots.plus.textContent = formatHours(data.compPlus);
                slots['100'].textContent = formatHours(data.comp100);
                slots.all.textContent = formatHours(data.compAll);
                grid.hidden = false;
                if (data.hltbId) {
                    ctaText.textContent = t('view_on_hltb');
                    cta.href = `https://howlongtobeat.com/game/${encodeURIComponent(data.hltbId)}`;
                    cta.hidden = false;
                } else {
                    cta.hidden = true;
                }
                setInputVisible(false);
            },
            showError(messageKey, title, searchCallback, clearCallback) {
                card.classList.add('is-error');
                status.textContent = t(messageKey);
                grid.hidden = true;
                if (title) {
                    ctaText.textContent = t('search_on_hltb');
                    cta.href = `https://howlongtobeat.com/?q=${encodeURIComponent(title)}`;
                    cta.hidden = false;
                } else {
                    cta.hidden = true;
                }
                onSearchCallback = searchCallback;
                onClearCallback = clearCallback;
                searchInput.value = title || '';
                setInputVisible(true);
            },
            reset(title) {
                card.classList.remove('is-error');
                status.textContent = '';
                grid.hidden = true;
                cta.hidden = true;
                setInputVisible(false);
                searchInput.value = title || '';
                onSearchCallback = null;
            },
            setClearCallback(callback) {
                onClearCallback = callback;
            },
            getCurrentSearchTitle() {
                return searchInput.value.trim();
            }
        };
    }

    function mountHost(anchor) {
        const existing = document.getElementById('hltb-extension-root');
        if (existing) existing.remove();
        const host = document.createElement('div');
        host.id = 'hltb-extension-root';
        if (anchor && anchor.parentElement) {
            anchor.parentElement.insertBefore(host, anchor.nextSibling);
        } else {
            document.body.appendChild(host);
        }
        return host;
    }

    function findAnchor() {
        const candidates = ['.apphub_HomeHeaderContent', '.apphub_HeaderStandardTop', '.game_description_column', '.game_meta_data'];
        for (const sel of candidates) {
            const el = document.querySelector(sel);
            if (el) return el;
        }
        return null;
    }

    function waitForAnchor() {
        const found = findAnchor();
        if (found) return Promise.resolve(found);
        return new Promise((resolve) => {
            let resolved = false;
            const finish = (el) => {
                if (resolved) return;
                resolved = true;
                observer.disconnect();
                clearTimeout(timer);
                resolve(el);
            };
            const observer = new MutationObserver(() => {
                const el = findAnchor();
                if (el) finish(el);
            });
            observer.observe(document.body, { childList: true, subtree: true });
            const timer = setTimeout(() => finish(null), 3000);
        });
    }

    async function lookup(appid, title, opts = {}) {
        if (!appid || !title) return { ok: false, error: 'bad_request' };
        const isDlc = !!opts.isDlc;
        const fallback = opts.fallback || null;

        const cached = await HltbCache.getGame(appid);
        if (cached) {
            if (cached.matchType === 'none') {
                return { ok: false, error: 'no_match', cached: true };
            }
            return { ok: true, data: cached, cached: true };
        }

        let results, terms, attempts;
        try {
            const result = await HltbClient.search(title, isDlc ? { modifier: '' } : {});
            results = result.results;
            terms = result.terms;
            attempts = result.attempts;
        } catch (e) {
            const msg = String(e && e.message);
            if (msg.startsWith('auth_')) return { ok: false, error: 'endpoint' };
            return { ok: false, error: 'network' };
        }

        const matched = HltbMatcher.match(results, appid, title);
        if (!matched) {
            if (fallback && fallback.appid && fallback.title) {
                const base = await lookup(String(fallback.appid), String(fallback.title));
                if (base.ok) await HltbCache.setGame(appid, base.data);
                return base;
            }
            const empty = { hltbId: null, name: null, compMain: 0, compPlus: 0, comp100: 0, compAll: 0, matchType: 'none' };
            await HltbCache.setGame(appid, empty, HltbCache.NO_MATCH_TTL_MS);
            return { ok: false, error: 'no_match' };
        }

        const data = {
            hltbId: matched.entry.game_id,
            name: matched.entry.game_name,
            compMain: Number(matched.entry.comp_main) || 0,
            compPlus: Number(matched.entry.comp_plus) || 0,
            comp100: Number(matched.entry.comp_100) || 0,
            compAll: Number(matched.entry.comp_all) || 0,
            matchType: matched.matchType,
        };
        await HltbCache.setGame(appid, data);
        return { ok: true, data };
    }

    async function main() {
        const appid = getAppId();
        if (!appid) return;
        const localizedTitle = getGameTitle();
        if (!localizedTitle) return;

        const anchor = await waitForAnchor();
        const host = mountHost(anchor);
        const shadow = host.attachShadow({ mode: 'open' });
        const panel = buildPanel(shadow);

        const target = await resolveLookupTarget(appid, localizedTitle);

        async function performSearch(titleToSearch) {
            await HltbCache.removeGame(appid);
            const response = await lookup(target.appid, titleToSearch, {
                isDlc: target.isDlc,
                fallback: target.fallback,
            });
            if (response && response.ok) {
                panel.showData(response.data);
            } else {
                const errorKey = response && response.error === 'no_match' ? 'error_no_match'
                    : response && response.error === 'endpoint' ? 'error_endpoint'
                    : 'error_network';
                panel.showError(errorKey, titleToSearch, performSearch, clearCacheAndRefresh);
            }
        }

        async function clearCacheAndRefresh() {
            await HltbCache.removeGame(appid);
            panel.reset(target.title);
            const response = await lookup(target.appid, target.title, {
                isDlc: target.isDlc,
                fallback: target.fallback,
            });
            if (response && response.ok) {
                panel.showData(response.data);
            } else {
                const errorKey = response && response.error === 'no_match' ? 'error_no_match'
                    : response && response.error === 'endpoint' ? 'error_endpoint'
                    : 'error_network';
                panel.showError(errorKey, target.title, performSearch, clearCacheAndRefresh);
            }
        }

        panel.setClearCallback(clearCacheAndRefresh);

        const firstResponse = await lookup(target.appid, target.title, {
            isDlc: target.isDlc,
            fallback: target.fallback,
        });
        if (firstResponse && firstResponse.ok) {
            panel.showData(firstResponse.data);
        } else {
            const errorKey = firstResponse && firstResponse.error === 'no_match' ? 'error_no_match'
                : firstResponse && firstResponse.error === 'endpoint' ? 'error_endpoint'
                : 'error_network';
            panel.showError(errorKey, target.title, performSearch, clearCacheAndRefresh);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();

// ========== 4. PY查价助手（原脚本4） ==========
(function() {
    'use strict';

    if (window.hasCortanaRun) return;
    window.hasCortanaRun = true;

    console.log("Cortana V2.10 (油猴简化版): 引擎启动");

    const API_PY_STORE = "https://steampy.com/xboot/common/plugIn/getGame";
    const API_PY_SEARCH = "https://steampy.com/xboot/usSteamGame/saleKeyByName";
    const API_STEAM_DETAILS = "https://store.steampowered.com/api/appdetails";

    const ALLOWED_DOMAINS = ["steampy.com", "store.steampowered.com"];

    function proxyRequest(url, callback) {
        try {
            const urlObj = new URL(url);
            const isAllowed = ALLOWED_DOMAINS.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain));
            if (!isAllowed) {
                console.error(`[Cortana] 拦截非法请求: ${url}`);
                callback(null);
                return;
            }
        } catch (e) {
            callback(null);
            return;
        }

        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                try {
                    const data = JSON.parse(response.responseText);
                    callback(data);
                } catch (e) {
                    console.error('[Cortana] JSON解析失败', e);
                    callback(null);
                }
            },
            onerror: function(err) {
                console.error('[Cortana] 请求失败', err);
                callback(null);
            },
            ontimeout: function() {
                console.error('[Cortana] 请求超时');
                callback(null);
            },
            timeout: 10000
        });
    }

    function getSubIdsFromSteam(appId, callback) {
        const url = `${API_STEAM_DETAILS}?appids=${appId}&cc=cn&l=schinese`;
        proxyRequest(url, (data) => {
            if (!data || !data[appId] || !data[appId].success) {
                callback(null);
                return;
            }
            const gameData = data[appId].data;
            const subIds = [];
            const subNames = {};
            if (gameData.package_groups) {
                gameData.package_groups.forEach(group => {
                    group.subs.forEach(sub => {
                        if (sub.can_get_free_license === '0' || sub.price_in_cents_with_discount > 0) {
                            subIds.push(sub.packageid);
                            let name = sub.option_text.replace(/Purchase |Buy /gi, '').replace(/\(.*\)/, '').trim();
                            subNames[sub.packageid] = name;
                        }
                    });
                });
            }
            callback({ ids: subIds, names: subNames });
        });
    }

    function fetchPricesBySubIds(subIdList, nameMap, appId, callback) {
        if (!subIdList || subIdList.length === 0) { callback([]); return; }
        const targets = subIdList.slice(0, 3);
        let results = [];
        let completed = 0;

        targets.forEach(subId => {
            const url = `${API_PY_STORE}?subId=${subId}&appId=${appId}&type=subid`;
            proxyRequest(url, (data) => {
                if (data && data.success && data.result) {
                    const res = data.result;
                    res.versionName = nameMap[subId] || "标准版";
                    results.push(res);
                }
                completed++;
                if (completed === targets.length) callback(results);
            });
        });
    }

    function fetchPriceByName(gameName, targetAppId, callback) {
        const cleanName = gameName.replace(/[™®©]/g, '').replace(/[:：-]/g, ' ').trim();
        const url = `${API_PY_SEARCH}?pageNumber=1&pageSize=20&sort=keyTx&order=asc&gameName=${encodeURIComponent(cleanName)}`;
        proxyRequest(url, (data) => {
            if (data && data.success && data.result) {
                const list = data.result.content || (Array.isArray(data.result) ? data.result : []);
                let matches = list.filter(item => String(item.appId) === String(targetAppId));
                if (matches.length === 0) {
                    matches = list.filter(item => item.gameName.toLowerCase().includes(cleanName.toLowerCase())).slice(0, 3);
                }
                matches.forEach(m => m.versionName = m.gameName);
                callback(matches);
            } else {
                callback([]);
            }
        });
    }

    function generateHTML(results) {
        if (!results || results.length === 0) {
            return `<div class="cortana-price-box cortana-simple"><span style="color:#888;">未找到 SteamPy 货源</span></div>`;
        }

        let valid = results.filter(item => {
            const dai = Number(item.daiPrice) || 0;
            const key = Number(item.keyPrice) || 0;
            return dai > 0 || key > 0;
        });

        if (valid.length === 0) {
            return `<div class="cortana-price-box cortana-simple"><span style="color:#888;">无有效价格</span></div>`;
        }

        const item = valid[0];
        let displayName = item.versionName || item.gameName || "版本";
        displayName = displayName.replace(/[¥$€£]\s*[\d,]+(\.\d{1,2})?/g, '').trim();
        if (!displayName) displayName = "版本";

        const dai = Number(item.daiPrice) || 0;
        const key = Number(item.keyPrice) || 0;

        let html = `<div class="cortana-price-box cortana-simple" style="display:flex; justify-content:space-between; align-items:center; padding:6px 12px;">`;
        html += `<span style="font-weight:bold; color:#66c0f4; font-size:13px;">${displayName}</span>`;
        html += `<div style="display:flex; gap:8px;">`;
        if (dai > 0) {
            html += `<a href="https://steampy.com/hotGameDetail?gameId=${item.id}" target="_blank" class="buy-btn" style="background:#2a475e; color:#fff; padding:2px 8px; border-radius:2px; text-decoration:none; font-size:12px;">代购购买</a>`;
        }
        if (key > 0) {
            html += `<a href="https://steampy.com/cdkDetail?name=cn&gameId=${item.id}" target="_blank" class="buy-btn" style="background:#2a475e; color:#fff; padding:2px 8px; border-radius:2px; text-decoration:none; font-size:12px;">CDK购买</a>`;
        }
        if (dai === 0 && key === 0) {
            html += `<span style="color:#888;">无购买选项</span>`;
        }
        html += `</div></div>`;
        return html;
    }

    function handleStorePage() {
        if (!location.pathname.includes('/app/')) return;
        const appId = location.pathname.match(/\/app\/(\d+)/)?.[1];
        if (!appId) return;

        document.querySelectorAll('form[name^="add_to_cart_"]').forEach(form => {
            if (form.dataset.cortana) return;
            form.dataset.cortana = "true";
            const input = form.querySelector('input[name="subid"], input[name="bundleid"]');
            if (input) {
                const url = `${API_PY_STORE}?subId=${input.value}&appId=${appId}&type=${input.name}`;
                proxyRequest(url, (data) => {
                    if (data && data.success) {
                        const div = document.createElement('div');
                        const item = data.result;
                        item.versionName = "当前选择版本";
                        div.innerHTML = generateHTML([item]);
                        const box = div.firstElementChild;
                        if (box) form.parentElement.appendChild(box);
                    }
                });
            }
        });
    }

    function handleWishlistPage() {
        if (!location.pathname.includes('/wishlist/')) return;
        const rows = document.querySelectorAll('div[data-index]');

        rows.forEach(row => {
            if (row.dataset.cortana) return;

            const appLinks = row.querySelectorAll('a[href*="/app/"]');
            let gameName = "";
            let appId = "";
            for (const link of appLinks) {
                if (!appId) { const m = link.href.match(/\/app\/(\d+)/); if (m) appId = m[1]; }
                if (link.innerText && link.innerText.trim().length > 0) gameName = link.innerText.trim();
            }
            if (!gameName && row.querySelector('.title')) gameName = row.querySelector('.title').innerText.trim();
            if (!appId || !gameName) return;

            let targetContainer = row.querySelector('.a3nhjc9lykk-');
            if (!targetContainer) {
                const btns = row.querySelectorAll('button');
                for (let btn of btns) {
                    if (btn.innerText.match(/(车|Cart|Add)/)) { targetContainer = btn.parentElement; break; }
                }
            }
            if (!targetContainer) return;

            row.dataset.cortana = "true";

            const btn = document.createElement('div');
            btn.innerText = 'PY查价';
            btn.className = 'py-check-btn';
            btn.style.cssText = `
                align-self: center;
                order: -1;
                display: inline-block;
                background: transparent;
                color: #66c0f4;
                border: 1px solid rgba(102, 192, 244, 0.3);
                border-radius: 4px;
                padding: 0 10px;
                height: 26px;
                line-height: 24px;
                font-size: 13px;
                cursor: pointer;
                margin-right: 12px;
                white-space: nowrap;
                user-select: none;
                font-family: "Motiva Sans", Sans-serif;
                transition: none;
            `;

            btn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (btn.classList.contains('loading')) return;

                if (btn.dataset.transformed === 'true') return;

                btn.innerText = '查价中...';
                btn.classList.add('loading');
                btn.style.opacity = '0.7';
                btn.style.cursor = 'wait';

                getSubIdsFromSteam(appId, (steamData) => {
                    const handleResults = (results) => {
                        btn.innerText = '';
                        btn.classList.remove('loading');
                        btn.style.opacity = '1';
                        btn.style.cursor = 'default';

                        if (!results || results.length === 0) {
                            btn.textContent = '无价格';
                            btn.style.color = '#888';
                            btn.style.borderColor = '#888';
                            btn.style.cursor = 'default';
                            btn.onclick = null;
                            return;
                        }

                        let valid = results.filter(item => {
                            const dai = Number(item.daiPrice) || 0;
                            const key = Number(item.keyPrice) || 0;
                            return dai > 0 || key > 0;
                        });

                        if (valid.length === 0) {
                            btn.textContent = '无价格';
                            btn.style.color = '#888';
                            btn.style.borderColor = '#888';
                            btn.style.cursor = 'default';
                            btn.onclick = null;
                            return;
                        }

                        const item = valid[0];
                        const dai = Number(item.daiPrice) || 0;
                        const key = Number(item.keyPrice) || 0;

                        btn.innerHTML = '';
                        btn.style.background = 'transparent';
                        btn.style.color = '#66c0f4';
                        btn.style.borderColor = 'rgba(102, 192, 244, 0.3)';
                        btn.style.padding = '0 10px';
                        btn.style.display = 'flex';
                        btn.style.gap = '8px';
                        btn.style.alignItems = 'center';
                        btn.style.justifyContent = 'center';
                        btn.style.cursor = 'default';
                        btn.dataset.transformed = 'true';
                        btn.onclick = null;

                        if (dai > 0) {
                            const a1 = document.createElement('a');
                            a1.href = `https://steampy.com/hotGameDetail?gameId=${item.id}`;
                            a1.target = '_blank';
                            a1.textContent = '代';
                            a1.style.cssText = `
                                color: #66c0f4;
                                text-decoration: none;
                                padding: 0;
                                font-size: 13px;
                                font-weight: normal;
                            `;
                            a1.onmouseenter = () => { a1.style.color = '#fff'; };
                            a1.onmouseleave = () => { a1.style.color = '#66c0f4'; };
                            btn.appendChild(a1);
                        }
                        if (key > 0) {
                            const a2 = document.createElement('a');
                            a2.href = `https://steampy.com/cdkDetail?name=cn&gameId=${item.id}`;
                            a2.target = '_blank';
                            a2.textContent = 'K';
                            a2.style.cssText = `
                                color: #66c0f4;
                                text-decoration: none;
                                padding: 0;
                                font-size: 13px;
                                font-weight: normal;
                            `;
                            a2.onmouseenter = () => { a2.style.color = '#fff'; };
                            a2.onmouseleave = () => { a2.style.color = '#66c0f4'; };
                            btn.appendChild(a2);
                        }
                    };

                    if (steamData && steamData.ids.length > 0) {
                        fetchPricesBySubIds(steamData.ids, steamData.names, appId, (prices) => {
                            if (prices.length > 0) handleResults(prices);
                            else fetchPriceByName(gameName, appId, handleResults);
                        });
                    } else {
                        fetchPriceByName(gameName, appId, handleResults);
                    }
                });
            };

            targetContainer.style.display = 'flex';
            targetContainer.style.alignItems = 'center';
            targetContainer.insertBefore(btn, targetContainer.firstChild);
        });
    }

    let debounceTimer = null;
    const observer = new MutationObserver(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleStorePage();
            handleWishlistPage();
        }, 500);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
        handleStorePage();
        handleWishlistPage();
    }, 500);

    GM_addStyle(`
        .cortana-price-box {
            background: linear-gradient(135deg, #1b2838 0%, #101822 100%);
            border: 1px solid #4c6b22;
            border-radius: 4px;
            margin-top: 8px;
            font-family: "Motiva Sans", Sans-serif;
            color: #c6d4df;
            font-size: 13px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            animation: fadeIn 0.3s ease;
        }
        .cortana-simple {
            padding: 4px 10px !important;
            min-height: 32px;
        }
        .cortana-simple span {
            font-size: 13px;
        }
        .buy-btn {
            background: #2a475e;
            color: #fff;
            padding: 2px 8px;
            border-radius: 2px;
            text-decoration: none;
            font-size: 12px;
            transition: background 0.2s;
        }
        .buy-btn:hover {
            background: #66c0f4;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .wishlist_row .cortana-price-box {
            margin: 6px 20px 6px 20px;
            border-color: #66c0f4;
            clear: both;
        }
    `);
})();
