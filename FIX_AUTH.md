# 🔐 修复 GitHub 认证问题

## 步骤 1：重新生成 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 如果之前创建过 token，可以删除旧的（点击 token 右侧的删除按钮）
3. 点击 **"Generate new token"** → **"Generate new token (classic)"**

4. 填写信息：
   - **Note**: `snake-game-push`（描述）
   - **Expiration**: 选择 `90 days` 或 `No expiration`
   - **权限**：必须勾选以下权限：
     - ✅ **repo**（这会自动勾选所有 repo 相关权限）
       - repo:status
       - repo_deployment
       - public_repo
       - repo:invite
       - security_events

5. 点击 **"Generate token"**

6. **重要**：立即复制 token（只显示一次！）
   - Token 格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - 复制完整的 token

## 步骤 2：重新推送代码

在终端中运行：

```bash
cd ~/snake-game
git push -u origin main
```

### 输入认证信息：

1. **Username**: `hunterc-sketch`（直接输入或回车使用默认值）

2. **Password**: 
   - 先复制你的 token
   - 在密码提示处，**直接按 Command + V 粘贴**
   - 虽然看不到字符，但已经粘贴了
   - **按回车确认**

## 步骤 3：验证是否成功

如果成功，你会看到类似这样的输出：

```
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 9.45 KiB | 9.45 MiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/hunterc-sketch/snake-game.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 如果还是失败

### 检查 Token 权限
确保 token 有 **repo** 权限，特别是：
- ✅ repo（完整权限）
- ✅ public_repo（如果是公开仓库）

### 尝试手动输入
如果粘贴不行，可以手动输入 token（虽然看不到，但输入是有效的）

### 使用 SSH（更安全的方式）
如果经常使用，可以配置 SSH 密钥，之后不需要每次输入 token。

