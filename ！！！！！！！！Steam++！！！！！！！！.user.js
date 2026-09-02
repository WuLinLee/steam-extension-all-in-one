// ==UserScript==
// @name         ！！！！！！！！Steam++！！！！！！！！
// @namespace    https://github.com/WuLinLee/steam-extension-all-in-one/
// @version      1.10
// @description  steam++
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
// @connect      store.steampowered.com
// @run-at       document-end
// ==/UserScript==
/*不会写代码没精力维护*/


/*team‑Extension‑All‑in‑One
A userscript (Tampermonkey / Violentmonkey) that adds various quality‑of‑life improvements for the Steam web store and community pages.

⚠️ Important Notice, Copyright & Disclaimer
This is a remixed, derivative work, NOT fully original code.

This project aggregates feature ideas, code snippets and implementation logic from multiple publicly released, third‑party userscripts shared online. Large‑scale restructuring, code refactoring, logic rearrangement, and partial rewriting were performed with the assistance of AI tools, followed by manual tweaks and debugging.

No global open‑source license is granted for the entire repository. I cannot verify that every segment of code contained here carries explicit, redistributable permission from its original creator. No MIT, GPL, CC0 or any other public‑license terms apply to the project as a whole.
Portions of code newly written or significantly transformed by me are shared for reference only; you may not treat the whole repository as open‑source.
This project is made available solely for non‑commercial, personal‑use and educational purposes. Commercial usage, paid distribution, bundling into paid software or services is prohibited.
The script is provided AS‑IS, without warranty of any kind, either expressed or implied. There is no guarantee of compatibility, stability, safety or compliance with Steam’s Terms of Service.
You use this userscript entirely at your own risk. I take no responsibility for, and shall not be liable for, any account restrictions, bans, data loss, page breakage, or any other direct or indirect harm caused by running this script.
If you are the original author of any source code, algorithm, or distinct functional implementation included in this work, and you do not wish your work to appear here, please open a GitHub Issue with sufficient identifying information. I will make reasonable efforts to locate and remove the relevant code segments promptly.
Forking this repository is permitted for your own private backup, but you must not re‑publish, redistribute, or apply any formal open‑source license to your forked copy, to avoid misleading others into believing all code is freely relicensable.
本油猴脚本属于衍生混改作品，并非全部为从零原创。

本项目搜集整合了互联网上多个公开第三方用户脚本的功能思路、代码片段与实现逻辑， 使用AI工具完成了大规模结构调整、代码重构、逻辑重排、改写生成，之后经过人工调整与调试。

整个仓库不存在全局开源许可证：无法核验每一段代码都拥有可二次公开发布的完整授权， 整个项目不适用 MIT、GPL、CC0 等任何标准开源协议。
仅由我新增或深度改写的部分可作为学习参考，不能视作全项目开源。
本项目仅限非商业、个人自用、学习研究，禁止商用、付费分发、打包进收费产品。
脚本按现状原样提供，不作任何稳定性、安全性、合规性担保，不保证遵守Steam平台用户协议。
所有使用风险由使用者自行承担，作者不对账号限制、封禁、页面异常、数据问题等任何后果负责。
如果您是任意一段原始代码、独有功能实现的原作者，不希望成果被收录，请提交 GitHub Issue， 附带能够定位对应代码的信息，我会尽力排查并移除相关内容。
允许Fork做私人备份，但禁止把Fork后的仓库重新公开发布、擅自套上开源协议， 避免误导他人以为全部代码可以随意再分发。
📦 Installation
Install a userscript manager: Tampermonkey, Violentmonkey, or Greasemonkey.
Open the raw link of steam‑all‑in‑one.user.js
Your userscript manager will pop up an installation prompt.
Confirm install.
Auto‑update is enabled if @updateURL is correctly set inside the script header.

📝 Changelog
Version number will be incremented on each functional update or bug fix. No compatibility is guaranteed between different versions.

📮 Feedback & Issues
Bug reports, feature suggestions are welcome via GitHub Issues.
Requests to remove copyrighted material will be prioritized.
steam-extension-all-in-one */

(function() {
    'use strict';

    if (!location.href.includes("/wishlist/")) return;

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

(function() {
    'use strict';

    const m = location.href.match(/(app|bundle|sub)\/(\d+)/);
    if (!m) return;
    const type = m[1];
    const id = m[2];

    const SYM = { CNY: '¥', JPY: '¥', TRY: 'TL', USD: '$', HKD: 'HK$' };
    const fmt = (v, c) => (v == null || isNaN(v)) ? '?' : ((c === 'JPY' ? SYM[c] + Math.round(v) : SYM[c] + v.toFixed(2)));

    function api(apps, subs, bundles) {
        const data = { country: 'cn', apps: apps.map(Number).filter(Boolean), subs: subs.map(Number).filter(Boolean), bundles: bundles.map(Number).filter(Boolean), voucher: true, shops: [61] };
        return new Promise((ok, fail) => {
            GM_xmlhttpRequest({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                url: location.protocol + '//api.augmentedsteam.com/prices/v2',
                data: JSON.stringify(data),
                onload: r => r.status === 200 ? (() => { try { ok(JSON.parse(r.responseText)); } catch(e) { fail(e); } })() : fail(new Error(r.status)),
                onerror: fail
            });
        });
    }

    function waitTitle(cb) {
        const check = () => {
            const title = document.querySelector('h2.title') || document.querySelector('h2[id$="_title"]');
            if (title) { cb(title); return true; }
            return false;
        };
        if (check()) return;
        const iv = setInterval(() => { if (check()) clearInterval(iv); }, 300);
        setTimeout(() => clearInterval(iv), 10000);
    }

    async function insert(title) {
        const apps = type === 'app' ? [id] : [];
        const subs = type === 'sub' ? [id] : [];
        const bundles = type === 'bundle' ? [id] : [];
        try {
            const resp = await api(apps, subs, bundles);
            const info = (resp.prices || {})[type + '/' + id];
            if (!info || !info.lowest || !info.lowest.price) return;
            const l = info.lowest;
            const date = new Date(l.timestamp).toLocaleDateString();
            const price = fmt(l.price.amount, l.price.currency);
            const disc = l.cut ? '-' + l.cut + '%' : '';
            const span = document.createElement('span');
            span.style.cssText = 'display:inline-block;margin-left:15px;font-size:14px;color:#acf;white-space:nowrap;vertical-align:middle;';
            span.textContent = `史低 ${price} ${disc} (${date})`;
            title.appendChild(span);
        } catch(e) { }
    }

    waitTitle(insert);
})();

(function() {
    'use strict';

    function getAppId() {
        const match = /\/app\/(\d+)/.exec(location.pathname);
        return match ? match[1] : null;
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

    function createButton(gameName) {
        const btn = document.createElement('a');
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.href = `https://howlongtobeat.com/?q=${encodeURIComponent(gameName)}`;
        btn.id = 'hltb-jump-btn';
        btn.style.cssText = `
            display: inline-block;
            border-radius: 2px;
            border: none;
            padding: 1px;
            cursor: pointer;
            text-decoration: none !important;
            line-height: 0;
            font-size: 12px;
            color: #67c1f5 !important;
            background: rgba(103, 193, 245, 0.2);
            margin: 0 8px 0 12px;
            vertical-align: middle;
        `;
        const span = document.createElement('span');
        span.textContent = '在 HLTB 上查看';
        span.style.cssText = `
            display: block;
            padding: 4px 12px;
            border-radius: 2px;
            font-weight: 400;
            line-height: 16px;
        `;
        btn.appendChild(span);

        btn.addEventListener('mouseenter', () => {
            btn.style.color = '#ffffff !important';
            btn.style.background = 'linear-gradient(to right, #67c1f5 0%, #417a9b 60%)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.color = '#67c1f5 !important';
            btn.style.background = 'rgba(103, 193, 245, 0.2)';
        });
        return btn;
    }

    async function main() {
        const appid = getAppId();
        if (!appid) return;

        const localizedTitle = getGameTitle();
        if (!localizedTitle) return;

        const target = await resolveLookupTarget(appid, localizedTitle);
        const englishName = target.title;

        let attempts = 0;
        const maxAttempts = 20;
        const interval = setInterval(() => {
            if (document.getElementById('hltb-jump-btn')) {
                clearInterval(interval);
                return;
            }

            let communityLink = null;
            const links = document.querySelectorAll('a');
            for (const a of links) {
                const span = a.querySelector('span');
                if (span && span.textContent.trim() === '社区中心') {
                    communityLink = a;
                    break;
                }
            }
            if (!communityLink) {
                communityLink = document.querySelector('a[href*="/community/"]');
            }

            if (communityLink) {
                const btn = createButton(englishName);
                communityLink.parentNode.insertBefore(btn, communityLink);
                clearInterval(interval);
            }

            attempts++;
            if (attempts >= maxAttempts) clearInterval(interval);
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
