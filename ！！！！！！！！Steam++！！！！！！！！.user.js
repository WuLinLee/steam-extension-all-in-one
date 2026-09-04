// ==UserScript==
// @name        ！！！！！！！！Steam++！！！！！！！！
// @namespace   https://github.com/WuLinLee/steam-extension-all-in-one/
// @version      2.1
// @description  steam++
// @author         AI服务人类
// @license      No general license · Remixed & AI‑refactored derivative work, non‑commercial study & personal‑use only
// @match        *://store.steampowered.com/app/*
// @match        *://store.steampowered.com/wishlist/*
// @match        https://steamcommunity.com/*
// @match        *://store.steampowered.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @connect      augmentedsteam.com
// @connect      bartervg.com
// @connect      steampy.com
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
    function createButton(text, href, id, marginRight) {
        const btn = document.createElement('a');
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.href = href;
        btn.id = id;
        btn.style.cssText = `
            display: inline-block;
            border: none;
            padding: 4px 12px;
            border-radius: 2px;
            cursor: pointer;
            text-decoration: none !important;
            font-size: 13px;
            line-height: 16px;
            font-weight: 400;
            color: #acf !important;
            background: rgba(103, 193, 245, 0.2);
            margin-right: ${marginRight || '0'};
            vertical-align: middle;
            flex-shrink: 0;
        `;
        btn.textContent = text;
        btn.addEventListener('mouseenter', () => {
            btn.style.color = '#ffffff !important';
            btn.style.background = 'linear-gradient(to right, #67c1f5 0%, #417a9b 60%)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.color = '#acf !important';
            btn.style.background = 'rgba(103, 193, 245, 0.2)';
        });
        return btn;
    }
    async function main() {
        const appid = getAppId();
        if (!appid) return;
        const localizedTitle = getGameTitle();
        if (!localizedTitle) return;
        let hltbName = localizedTitle;
        const details = await fetchAppDetails(appid);
        if (details) {
            const isDlc = details.type === 'dlc';
            if (isDlc && details.fullgame) {
                hltbName = details.fullgame.name;
            } else if (details.name) {
                hltbName = details.name;
            }
        }
        // 清理商标符号，提高 HLTB 搜索匹配率
        hltbName = hltbName.replace(/[™®©]/g, '').trim();

        let attempts = 0;
        const maxAttempts = 30;
        const interval = setInterval(() => {
            if (document.getElementById('hltb-py-btn') && document.getElementById('steamdb-py-btn')) {
                clearInterval(interval);
                return;
            }
            let targetElement = document.querySelector('div.game_area_purchase_game');
            if (!targetElement) {
                targetElement = document.querySelector('div.notice_box_content');
            }
            if (targetElement) {
                const hltbBtn = createButton('HLTB', `https://howlongtobeat.com/?q=${encodeURIComponent(hltbName)}`, 'hltb-py-btn', '6px');
                const steamdbBtn = createButton('SteamDB', `https://steamdb.info/app/${appid}/`, 'steamdb-py-btn', '0');
                const container = document.createElement('div');
                container.style.cssText = 'display: block; text-align: left; margin-top: 8px;';
                container.appendChild(hltbBtn);
                container.appendChild(steamdbBtn);
                targetElement.appendChild(container);
                console.log('[合并] HLTB 和 SteamDB 按钮已插入到大框内部左下角');
                clearInterval(interval);
            }
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.log('[合并] 未找到购买框或停售框，放弃插入');
            }
        }, 300);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();

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
