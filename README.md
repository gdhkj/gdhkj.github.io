# ROYAL CLUB — 虚拟娱乐演示网站

纯前端静态网站，适用于 GitHub Pages。包含：
- 大厅页面
- บาคาร่า风格的百家乐模拟（随机发牌、庄/闲/和、虚拟积分）
- 1–49 随机号码模拟开奖（6个普通号 + 1个特别号）
- 游戏记录、统计及本地数据重置
- 手机及电脑自适应布局

## 重要说明
这是仅供界面与程序体验的虚拟演示项目：
- 不包含真实货币充值、提现、下注或支付接口。
- 虚拟积分没有现金价值，不可兑换商品、现金或其他利益。
- 模拟六合彩不是官方彩票，不代表真实开奖或中奖机会。
- 数据保存在当前浏览器的 LocalStorage；更换设备/浏览器不会同步，清除浏览器数据可能导致记录丢失。
- GitHub Pages 只托管静态文件，不提供安全的用户账户、数据库或服务端权限控制。

## GitHub Pages 部署（免费）
1. 登录 GitHub，点击 **New repository**。
2. 仓库名称可填写 `royal-club`，选择 **Public**，点击 Create repository。
3. 解压本 ZIP，将 `index.html`、`style.css`、`app.js`、`README.md` 上传到仓库根目录。
4. 打开仓库 **Settings → Pages**。
5. 在 **Build and deployment** 中选择 **Deploy from a branch**。
6. Branch 选择 `main`，目录选择 `/ (root)`，点击 **Save**。
7. 等待部署完成，GitHub Pages 会显示网站地址，通常为 `https://你的用户名.github.io/royal-club/`。

## 修改网站名称
在 `index.html` 中搜索 `ROYAL CLUB`，替换成你的名称。页面样式可在 `style.css` 修改。

## 常见问题
- 页面空白：确认三个文件都在仓库根目录，文件名大小写完全一致；检查 `index.html` 是否上传成功。
- 修改后没变化：等待 Pages 重新部署，再强制刷新浏览器。
- 数据消失：数据只存在本机浏览器，不是云端数据库。
