# 个人信息展示网页

一个简洁优雅的单页个人作品集网站，采用 HTML5、CSS3 和原生 JavaScript 实现。

## 文件结构

```
portfolio/
├── index.html    # 主页面
├── styles.css    # 样式文件
└── script.js     # 交互脚本
```

## 功能特性

- 🎨 现代简约的视觉设计
- 📱 完全响应式布局（支持手机/平板/桌面）
- 🔥 平滑滚动导航
- ⚡ 技能进度条动画效果
- 📊 数字统计增长动画
- 📝 前端表单验证
- 🌗 优雅的悬停过渡效果

## 快速开始

直接在浏览器中打开 `index.html` 文件即可查看网页效果。

```bash
cd portfolio
open index.html  # macOS
# 或直接双击 index.html 文件
```

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 自定义修改

编辑 `index.html` 中的内容以替换为个人真实信息：

- 修改 Hero 区域的姓名、头像链接
- 更新"关于我"部分的个人介绍
- 调整技能项的熟练度百分比
- 替换项目作品的信息和截图
- 更新联系方式（邮箱、地址等）

样式配色可在 `styles.css` 顶部的 CSS 变量中修改：

```css
:root {
  --primary: #2c3e50;    /* 主色调 */
  --accent: #3498db;     /* 强调色 */
  --bg-light: #f8f9fa;   /* 浅色背景 */
  /* ... */
}
```

## License

MIT License - 可自由用于个人或商业项目。
