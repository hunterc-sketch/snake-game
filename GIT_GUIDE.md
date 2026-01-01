# 📚 Git 使用指南 - 贪吃蛇游戏项目

这个指南会教你如何使用 Git 来管理你的贪吃蛇游戏代码，包括版本控制、备份和代码托管。

## 🎯 Git 是什么？

Git 是一个**版本控制系统**，可以帮你：
- ✅ **版本管理**：记录每次代码修改，可以随时回退到之前的版本
- ✅ **代码备份**：把代码保存到云端（GitHub），不怕丢失
- ✅ **协作开发**：多人可以一起开发同一个项目
- ✅ **查看历史**：查看代码的修改历史和原因

## 📋 第一步：配置 Git（只需要做一次）

在终端中运行以下命令，设置你的身份信息：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

例如：
```bash
git config --global user.name "Castle"
git config --global user.email "your-email@example.com"
```

## 🚀 第二步：在项目中初始化 Git

进入你的项目文件夹，初始化 Git 仓库：

```bash
cd ~/snake-game
git init
```

这个命令会在项目文件夹中创建一个 `.git` 文件夹（隐藏文件夹），Git 会用它来跟踪你的代码变化。

## 📝 第三步：添加文件到 Git

告诉 Git 要跟踪哪些文件：

```bash
# 添加所有文件
git add .

# 或者单独添加文件
git add index.html
git add style.css
git add game.js
```

## 💾 第四步：提交代码（创建第一个版本）

把代码保存到 Git 历史记录中：

```bash
git commit -m "初始提交：创建贪吃蛇游戏"
```

`-m` 后面的文字是这次提交的说明，描述你做了什么修改。

## 🔍 查看状态和历史

```bash
# 查看哪些文件被修改了
git status

# 查看提交历史
git log

# 查看简洁的提交历史
git log --oneline
```

## 🌐 第五步：连接 GitHub（代码托管）

### 5.1 创建 GitHub 账号（如果还没有）

1. 访问 https://github.com
2. 点击 "Sign up" 注册账号（免费）
3. 完成邮箱验证

### 5.2 在 GitHub 上创建新仓库

1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `snake-game`（或你喜欢的名字）
   - Description: "我的第一个贪吃蛇游戏"
   - 选择 **Public**（公开，免费）或 **Private**（私有）
   - **不要**勾选 "Initialize this repository with a README"（我们已经有了）
4. 点击 "Create repository"

### 5.3 连接本地代码到 GitHub

GitHub 会显示连接命令，类似这样：

```bash
# 添加远程仓库地址（把 YOUR_USERNAME 替换成你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git

# 第一次推送代码到 GitHub
git branch -M main
git push -u origin main
```

**注意**：第一次推送时，GitHub 会要求你输入用户名和密码。现在 GitHub 使用 Personal Access Token 而不是密码。

### 5.4 创建 Personal Access Token

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最下方点击 **Developer settings**
4. 点击 **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token** → **Generate new token (classic)**
6. 填写信息：
   - Note: `snake-game`（描述）
   - Expiration: 选择过期时间（建议 90 days 或 No expiration）
   - 勾选 **repo** 权限（这会自动勾选所有 repo 相关权限）
7. 点击 **Generate token**
8. **重要**：复制生成的 token（只显示一次！）

推送时：
- Username: 你的 GitHub 用户名
- Password: 粘贴刚才复制的 token

## 🔄 日常使用流程

每次修改代码后，按以下步骤操作：

```bash
# 1. 查看修改了哪些文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改（写清楚你做了什么）
git commit -m "修改游戏速度，添加新功能"

# 4. 推送到 GitHub（备份到云端）
git push
```

## 📖 常用 Git 命令速查

| 命令 | 说明 |
|------|------|
| `git init` | 初始化 Git 仓库 |
| `git status` | 查看文件状态 |
| `git add .` | 添加所有修改的文件 |
| `git commit -m "说明"` | 提交代码 |
| `git log` | 查看提交历史 |
| `git push` | 推送到 GitHub |
| `git pull` | 从 GitHub 拉取最新代码 |
| `git clone <地址>` | 克隆远程仓库到本地 |

## 🔙 回退到之前的版本

如果代码出问题了，可以回退：

```bash
# 查看提交历史，找到要回退的版本号
git log --oneline

# 回退到指定版本（把 COMMIT_ID 替换成实际的版本号）
git reset --hard COMMIT_ID
```

## 💡 最佳实践

1. **经常提交**：每完成一个小功能就提交一次
2. **写清楚的提交信息**：说明你做了什么，比如：
   - "修复蛇撞墙的bug"
   - "添加暂停功能"
   - "优化游戏速度"
3. **经常推送**：每天结束工作前推送到 GitHub，确保代码已备份
4. **不要提交大文件**：图片、视频等大文件不要用 Git 管理

## 🆘 遇到问题？

### 问题1：提示需要配置 user.name 和 user.email
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 问题2：推送时提示认证失败
- 检查 Personal Access Token 是否正确
- 确保 token 有 `repo` 权限
- 如果 token 过期了，重新生成一个

### 问题3：想撤销刚才的提交
```bash
# 撤销最后一次提交（保留文件修改）
git reset --soft HEAD~1

# 完全撤销最后一次提交（删除文件修改）
git reset --hard HEAD~1
```

## 🎉 完成！

现在你已经学会了 Git 的基本使用。Git 是一个强大的工具，刚开始可能会觉得复杂，但用多了就会很自然。

记住：**Git 就是你的代码时光机**，可以随时回到任何历史版本！

