# 🔗 连接 GitHub 快速指南

## 步骤 1：在 GitHub 上创建仓库

1. 访问 https://github.com 并登录（如果没有账号，先注册）

2. 点击右上角的 **"+"** 号 → 选择 **"New repository"**

3. 填写仓库信息：
   - **Repository name**: `snake-game`（或你喜欢的名字）
   - **Description**: `我的第一个贪吃蛇游戏`
   - 选择 **Public**（公开，免费）
   - **重要**：不要勾选任何初始化选项（README、.gitignore、license 都不要选，因为我们已经有代码了）

4. 点击 **"Create repository"**

## 步骤 2：复制仓库地址

创建成功后，GitHub 会显示仓库页面。你会看到类似这样的地址：
```
https://github.com/hunterc-sketch/snake-game.git
```

复制这个地址。

## 步骤 3：在终端中连接

在终端中运行以下命令（把 `hunterc-sketch` 替换成你的实际 GitHub 用户名，如果仓库名不是 `snake-game` 也要替换）：

```bash
cd ~/snake-game
git remote add origin https://github.com/hunterc-sketch/snake-game.git
git branch -M main
git push -u origin main
```

## 步骤 4：输入认证信息

当运行 `git push` 时，会要求输入：
- **Username**: `hunterc-sketch`（你的 GitHub 用户名）
- **Password**: 这里要输入 **Personal Access Token**，不是密码！

### 如何创建 Personal Access Token：

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最下方点击 **Developer settings**
4. 点击 **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token** → **Generate new token (classic)**
6. 填写信息：
   - **Note**: `snake-game`（描述）
   - **Expiration**: 选择 `90 days` 或 `No expiration`
   - 勾选 **repo** 权限（会自动勾选所有 repo 相关权限）
7. 点击 **Generate token**
8. **重要**：复制生成的 token（只显示一次！类似 `ghp_xxxxxxxxxxxxxxxxxxxx`）

9. 在终端输入密码时，粘贴这个 token

## ✅ 完成！

推送成功后，你的代码就备份到 GitHub 了！以后可以在 https://github.com/hunterc-sketch/snake-game 查看你的代码。

