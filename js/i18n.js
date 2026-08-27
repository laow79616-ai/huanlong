(function () {
  var KEY = 'nothosaur_lang';
  var map = {
    'Shop All': '全部商品', 'SHOP ALL': '全部商品',
    'Community': '社区', 'COMMUNITY': '社区',
    'Dildos': '玩具系列', 'DILDOS': '玩具系列',
    'New Releases': '新品', 'NEW RELEASES': '新品',
    'Available Now': '现货', 'AVAILABLE NOW': '现货',
    'Info & Rewards': '资讯与奖励', 'INFO & REWARDS': '资讯与奖励',
    'View Community': '进入社区', 'VIEW COMMUNITY': '进入社区',
    'Community Feed': '社区动态', 'See all →': '查看全部 →', 'See all': '查看全部',
    'Top Picks': '精选商品', 'View all →': '查看全部 →', 'View all': '查看全部',
    'Shop Now': '立即选购', 'SHOP NOW': '立即选购',
    'Explore the Collection': '浏览系列', 'EXPLORE THE COLLECTION': '浏览系列',
    'Add to Cart': '加入购物车', 'ADD TO CART': '加入购物车',
    'Checkout': '去结算', 'Continue shopping': '继续购物',
    'Your Cart': '购物车', 'Total': '合计',
    'Sign In': '登录', 'Register': '注册', 'My Account': '我的账户', 'Sign Out': '退出登录',
    'Create Account': '创建账户', 'Welcome back': '欢迎回来',
    'Order Summary': '订单摘要', 'Shipping Address': '收货地址', 'Payment': '支付',
    'Pay with imToken': '使用 imToken 支付', 'I Have Paid': '我已支付',
    'Copy Address': '复制地址', 'Copy': '复制',
    'Size': '尺寸', 'Firmness': '软硬度', 'Quantity': '数量',
    'Discreet Shipping': '隐秘发货', 'Body Safe': '安全材质',
    'Custom Colors': '定制配色', 'Support': '客服支持',
    '100% Platinum Silicone': '100% 铂金硅胶',
    '100% platinum silicone': '100% 铂金硅胶',
    'Discreet shipping': '隐秘发货',
    'Custom colors available on request': '可按需定制颜色',
    'Plain packaging worldwide. Privacy guaranteed.': '全球素包发货，保护隐私。',
    '100% platinum silicone. Hypoallergenic & non-porous.': '100% 铂金硅胶，低敏无孔。',
    'Every piece hand-poured. Choose your own scheme.': '每件手工浇注，可自选配色。',
    'Fast, friendly help via chat & email.': '聊天与邮件快速客服。',
    'Welcome to Nothosaur Mainland': '欢迎来到 Nothosaur',
    'A fantasy world between dreams and the fourth realm. Every creature has a story. Every piece is unique.': '梦境与第四界之间的幻想世界。每只生物都有故事，每件作品都独一无二。',
    'Latest from the community': '社区最新内容',
    'Photos, videos & reviews from our members': '会员分享的照片、视频与评价',
    'Handcrafted platinum silicone. Fantasy made personal. Custom colors & firmness available.': '手工铂金硅胶，把幻想做成专属。可定制颜色与软硬度。',
    'The Boss': '首领',
    'Tentacle Muse': '触须缪斯',
    'Scale Guardian': '鳞甲守护',
    'Coiled Majesty': '盘绕之威',
    'Flame Spirit': '焰灵',
    'Inspired by deep-sea mythology, this multi-tentacle design features intricate suction details and a fluid, organic silhouette. Perfect for those seeking immersive fantasy experiences.': '灵感来自深海神话。多触须造型，吸盘细节丰富，线条流畅。适合追求沉浸式幻想体验的用户。',

    'Continue shopping': '继续购物',
    '← Continue shopping': '← 继续购物',
    'Checkout': '结算',
    'Order Summary': '订单摘要',
    'Shipping Address': '收货地址',
    'Payment': '支付',
    'Country / Region *': '国家 / 地区 *',
    'Country / Region': '国家 / 地区',
    'Select country': '选择国家',
    'City *': '城市 *',
    'City': '城市',
    'State / Province / Region': '省 / 州 / 地区',
    'State / Region': '省 / 地区',
    'Street Address *': '详细地址 *',
    'Street Address': '详细地址',
    'Street, building, apartment': '街道、楼栋、门牌',
    'Recipient Name *': '收货人姓名 *',
    'Recipient Name': '收货人姓名',
    'Full name': '姓名',
    'Phone *': '电话 *',
    'Phone': '电话',
    'Postal Code *': '邮政编码 *',
    'Postal Code': '邮政编码',
    'Postal / ZIP code': '邮政编码',
    'Pay with imToken': '使用 imToken 支付',
    'I Have Paid': '我已支付',
    'Copy Address': '复制地址',
    'Cart is empty.': '购物车是空的。',
    'Go shopping': '去逛逛',
    'Saved addresses (tap to fill)': '已保存地址（点击自动填入）',
    'Malaysia': '马来西亚',
    'Singapore': '新加坡',
    'United States': '美国',
    'United Kingdom': '英国',
    'Australia': '澳大利亚',
    'Canada': '加拿大',
    'Germany': '德国',
    'France': '法国',
    'Japan': '日本',
    'South Korea': '韩国',
    'Thailand': '泰国',
    'Indonesia': '印度尼西亚',
    'Philippines': '菲律宾',
    'Vietnam': '越南',
    'China': '中国',
    'Hong Kong': '中国香港',
    'Taiwan': '中国台湾',
    'Other': '其他',
    'Please include your order number in the memo': '转账备注请填写订单号',
    'After payment, keep your transaction hash.': '付款后请保存交易哈希。',
    'Loading...': '加载中...',
    'Soft': '柔软',
    'Medium': '中等',
    'Firm': '偏硬',
    'From ': '售价 '
  };

  function getLang() {
    return localStorage.getItem(KEY) === 'zh' ? 'zh' : 'en';
  }

  function translateString(text) {
    if (!text || !text.trim()) return text;
    var out = text;
    Object.keys(map).sort(function (a, b) { return b.length - a.length; }).forEach(function (en) {
      if (out.indexOf(en) !== -1) out = out.split(en).join(map[en]);
    });
    return out;
  }

  function walk(node) {
    if (node.nodeType === 3) {
      node.nodeValue = translateString(node.nodeValue);
    } else if (node.nodeType === 1) {
      var tag = node.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || node.id === 'lang-toggle') return;
      if (node.getAttribute && node.getAttribute('placeholder')) {
        node.setAttribute('placeholder', translateString(node.getAttribute('placeholder')));
      }
      if (tag === 'OPTION' || tag === 'BUTTON' || tag === 'A' || tag === 'LABEL' || tag === 'H1' || tag === 'H2') {
        if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
          node.childNodes[0].nodeValue = translateString(node.childNodes[0].nodeValue);
        }
      }
      Array.prototype.slice.call(node.childNodes).forEach(walk);
    }
  }

  function applyZh() {
    if (getLang() !== 'zh') return;
    document.documentElement.lang = 'zh-CN';
    walk(document.body);
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = 'EN';
  }

  function inject() {
    var existing = document.getElementById('lang-toggle');
    if (existing) {
      existing.onclick = function () {
        localStorage.setItem(KEY, getLang() === 'zh' ? 'en' : 'zh');
        location.reload();
      };
      existing.textContent = getLang() === 'zh' ? 'EN' : '中文';
      return;
    }
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.type = 'button';
    btn.textContent = getLang() === 'zh' ? 'EN' : '中文';
    btn.style.cssText = 'background:transparent;border:1px solid #ff1493;color:#ff1493;border-radius:8px;padding:6px 10px;font-size:0.8rem;font-weight:700;cursor:pointer;min-height:36px;';
    btn.onclick = function () {
      localStorage.setItem(KEY, getLang() === 'zh' ? 'en' : 'zh');
      location.reload();
    };
    var actions = document.querySelector('.header-actions');
    if (actions) actions.insertBefore(btn, actions.firstChild);
    else document.body.appendChild(btn);
  }

  function boot() {
    inject();
    applyZh();
    // 详情页商品是后插入的，延迟再译一次
    setTimeout(applyZh, 200);
    setTimeout(applyZh, 800);
    var main = document.querySelector('main') || document.getElementById('product') || document.body;
    if (window.MutationObserver) {
      var t = null;
      new MutationObserver(function () {
        if (getLang() !== 'zh') return;
        clearTimeout(t);
        t = setTimeout(applyZh, 80);
      }).observe(main, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
