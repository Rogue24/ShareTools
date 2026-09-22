# iOS 27 Xcode Skills for Claude Code 安装说明

## 插件说明

`ios-27-xcode-skills` 是提供给 Claude Code 使用的 Xcode 官方技能集合。插件主体位于 `ios-27-xcode-skills/`，本目录同时提供本地 marketplace 清单，既可以临时加载，也可以持久安装。

目录结构：

```text
ios-27-xcode-skills-plugin/
  .claude-plugin/
    marketplace.json
  ios-27-xcode-skills/
    .claude-plugin/
      plugin.json
    skills/
    README.md
  INSTALL.md
```

## 方式一：临时加载

适合开发和测试，不会写入已安装插件列表。把下面的路径替换为实际保存位置：

```bash
claude --plugin-dir ~/Documents/ClaudeCodePlugins/ios-27-xcode-skills-plugin/ios-27-xcode-skills
```

进入 Claude Code 后，可执行：

```text
/help
```

确认自定义技能列表中出现 `ios-27-xcode-skills` 命名空间。也可以显式调用：

```text
/ios-27-xcode-skills:swiftui-specialist
```

插件内容变更后，可以在当前会话执行：

```text
/reload-plugins
```

## 方式二：通过本地 marketplace 持久安装

### 1. 保存插件包

把整个 `ios-27-xcode-skills-plugin` 目录放到固定位置，例如：

```bash
mkdir -p ~/Documents/ClaudeCodePlugins
cp -R ios-27-xcode-skills-plugin ~/Documents/ClaudeCodePlugins/
```

### 2. 添加本地 marketplace

```bash
claude plugin marketplace add ~/Documents/ClaudeCodePlugins/ios-27-xcode-skills-plugin
```

也可以在 Claude Code 会话中执行：

```text
/plugin marketplace add ~/Documents/ClaudeCodePlugins/ios-27-xcode-skills-plugin
```

### 3. 安装插件

```bash
claude plugin install ios-27-xcode-skills@ios-27-xcode-skills-marketplace
```

也可以在 Claude Code 会话中执行：

```text
/plugin install ios-27-xcode-skills@ios-27-xcode-skills-marketplace
```

### 4. 验证

列出已经添加的 marketplace：

```bash
claude plugin marketplace list
```

查看插件是否已安装：

```bash
claude plugin list | grep ios-27-xcode-skills
```

也可以打开 Claude Code 的插件管理界面：

```text
/plugin
```

安装完成后，如果提示需要重新加载，在当前会话执行：

```text
/reload-plugins
```

## 使用示例

```text
帮我适配 iOS 27 的 SwiftUI API 变化
```

```text
帮我使用 iOS 27 的 App Intents 新 API
```

```text
迁移这个 SwiftUI 文档型应用
```

```text
审查这个项目的 Xcode 安全设置
```

```text
让 UIKit 应用适配 iPhone Duo、分屏和动态窗口尺寸
```
