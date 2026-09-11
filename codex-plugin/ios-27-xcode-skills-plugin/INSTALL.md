# iOS 27 Xcode Skills 安装说明

## 插件说明

`ios-27-xcode-skills` 是基于仓库 `skills/xcode-skills` 资源封装的 Codex 个人插件包。它按照 Codex 插件规范整理技能目录，并补充插件元信息与展示资源，方便在 Codex 插件页中安装、启用和分享。

包内关键结构：

- `.codex-plugin/plugin.json`：Codex 插件 manifest，声明插件名称、版本、展示信息、图标、默认提示词和 skills 入口。
- `skills/`：与仓库 `skills/xcode-skills` 同步的技能主体，包含 10 个 skill 定义、工作流、参考资料和辅助脚本。
- `assets/`：插件展示资源，例如 `logo` / `composerIcon` 使用的图标文件。

安装完成后，它会作为 `ios-27-xcode-skills@personal` 出现在 Codex 的个人插件中。

## 1. 保存插件

把 `ios-27-xcode-skills` 目录放到你想保存插件的位置，例如：

```bash
mkdir -p ~/Documents/CodexPlugins
cp -R ios-27-xcode-skills ~/Documents/CodexPlugins/
```

保存后应该能看到：

```text
~/Documents/CodexPlugins/ios-27-xcode-skills/
  .codex-plugin/plugin.json
  assets/
  skills/
```

## 2. 配置个人插件 marketplace

创建或更新个人插件清单：

```bash
mkdir -p ~/.agents/plugins
```

编辑 `~/.agents/plugins/marketplace.json`，加入下面内容。

如果原本没有这个文件，可以直接使用：

```json
{
  "name": "personal",
  "interface": {
    "displayName": "Personal"
  },
  "plugins": [
    {
      "name": "ios-27-xcode-skills",
      "source": {
        "source": "local",
        "path": "./Documents/CodexPlugins/ios-27-xcode-skills"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

如果插件放在其他位置，把 `source.path` 改为对应路径。以 `~` 为根时建议写成类似：

```text
./Documents/CodexPlugins/ios-27-xcode-skills
```

## 3. 安装插件

在 Codex 桌面版中打开一个新会话，或用 Codex 自带 CLI 执行：

```bash
/Applications/Codex.app/Contents/Resources/codex plugin add ios-27-xcode-skills@personal
```

## 4. 验证

```bash
/Applications/Codex.app/Contents/Resources/codex plugin list | grep ios-27-xcode-skills
```

看到 `installed, enabled` 就表示安装成功。

## 5. 使用方式

安装后，在新会话里可以直接这样问：

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
现代化 UIKit 生命周期和测试代码
```

插件包含的主要能力：

- SwiftUI SDK 27 新 API、行为变化与兼容性适配
- SwiftUI 代码最佳实践与性能审查
- App Intents 通用最佳实践，以及 iOS 26 / 27 新 API 适配
- SwiftUI 文档型应用构建与旧文档 API 迁移
- UIKit 多窗口、Scene 生命周期、`UIScreen`、方向和 Safe Area 现代化
- XCTest 到 Swift Testing 的迁移与已有测试现代化
- Xcode 安全构建设置、Enhanced Security 与 entitlements 审查
- C `-fbounds-safety` 迁移与调试
- iOS、watchOS 和 tvOS 真机/模拟器 UI 行为验证
