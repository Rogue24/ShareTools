# iOS 27 Xcode Skills

提供给 Claude Code 使用的 Xcode 官方技能集合，内容与仓库的 `skills/xcode-skills` 保持同步。

## 包含技能

| 技能 | 用途 |
|---|---|
| `adopt-c-bounds-safety` | 采用和调试 C `-fbounds-safety`。 |
| `app-intents-specialist` | 编写、重构和审查 App Intents 代码。 |
| `app-intents-whats-new-27` | 适配 iOS 26 / 27 的 App Intents 新 API。 |
| `audit-xcode-security-settings` | 审计并加强 Xcode 安全构建设置和 entitlements。 |
| `building-document-based-swiftui-applications` | 构建或迁移 SDK 27 SwiftUI 文档型应用。 |
| `device-interaction` | 在真机或模拟器上验证应用界面和交互。 |
| `modernize-tests` | 从 XCTest 迁移到 Swift Testing，或改进已有测试。 |
| `swiftui-specialist` | 提供 SwiftUI 最佳实践与性能指导。 |
| `swiftui-whats-new-27` | 处理 SDK 27 SwiftUI 新 API 和兼容性变化。 |
| `uikit-app-modernization` | 现代化 UIKit 生命周期、多窗口、方向和 Safe Area 代码。 |

## 使用方式

安装后，Claude Code 会根据任务内容自动使用匹配的技能，也可以通过插件命名空间显式调用：

```text
/ios-27-xcode-skills:swiftui-specialist
```

```text
/ios-27-xcode-skills:app-intents-whats-new-27
```

```text
/ios-27-xcode-skills:audit-xcode-security-settings
```

也可以直接描述需求，例如：

```text
帮我适配 iOS 27 的 SwiftUI API 变化
```

```text
帮我使用 iOS 27 的 App Intents 新 API
```

```text
审查这个项目的 Xcode 安全设置
```

安装方式请参阅上一级的 [INSTALL.md](../INSTALL.md)。
