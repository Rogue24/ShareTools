# ShareTools

个人分享的一些工具。

## xcode-skills

从 Xcode 27 导出的官方 Skills。

| 技能 | 用途 |
|---|---|
| [audit-xcode-security-settings](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/audit-xcode-security-settings/SKILL.md) | 审计并加强 Xcode 项目的安全构建配置，包括编译器警告、静态分析、Enhanced Security 和相关 entitlements。不负责 ATS/TLS、代码签名和隐私 API。 |
| [c-bounds-safety](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/c-bounds-safety/SKILL.md) | 帮助 C 项目采用和调试 `-fbounds-safety`：添加指针边界注解、配置编译选项、处理编译错误，以及排查越界运行时崩溃。 |
| [device-interaction](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/device-interaction/SKILL.md) | 在真机或模拟器上启动应用，通过截图、UI 层级和点击操作验证功能，适合检查页面显示、按钮交互、布局和触摸问题。 |
| [swiftui-specialist](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/swiftui-specialist/SKILL.md) | 通用 SwiftUI 专家指南。用于编写、重构和审查 SwiftUI，覆盖视图拆分、数据流、Environment、Modifier、本地化、动画、`ForEach` 和过时 API。 |
| [swiftui-whats-new-27](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/swiftui-whats-new-27/SKILL.md) | 专门处理 SDK 27 的 SwiftUI 新 API和兼容性变化，例如 `@State` 宏迁移、拖拽排序、任意容器侧滑操作、工具栏、图片缓存、文档应用及废弃 API。 |
| [test-modernizer](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/test-modernizer/SKILL.md) | 把现有 XCTest 迁移到 Swift Testing，或改进已有 Swift Testing 测试，包括断言、异步测试、参数化测试、跳过条件、并发和附件。不适用于 XCUI UI 自动化测试。 |
| [uikit-app-modernization](/Users/aa/Desktop/JPKit/ShareTools/skills/xcode-skills/uikit-app-modernization/SKILL.md) | 现代化 UIKit 项目，使其适配多窗口和动态尺寸。重点替换 `UIScreen.main`、旧方向判断、AppDelegate 生命周期和不正确的 Safe Area 假设，支持 Swift 与 Objective-C。 |

## ios-27-xcode-skills-plugin

这是基于 `xcode-skills` 中的 skills 资源封装而成的 Codex 个人插件包，把里面的技能内容整理为 Codex 插件规范所需的目录结构，并补充插件元信息与展示资源，方便在 Codex 插件页中安装、启用和分享。

包内关键结构：

- `.codex-plugin/plugin.json`：Codex 插件 manifest，声明插件名称、版本、展示信息、图标、默认提示词，以及 skills 入口。
- `skills/`：属于 `xcode-skills` 的技能主体内容，包含 iOS 27 / Xcode beta 适配相关的 skill 定义、工作流和参考资料。
- `assets/`：插件展示资源，例如 `logo` / `composerIcon` 使用的图标文件。

安装完成后，它会作为 `ios-27-xcode-skills@personal` 出现在 Codex 的个人插件中。

### 1. 保存插件

把 `ios-27-xcode-skills-plugin` 放到你想保存插件的位置，例如放到`~/Documents/CodexPlugins/`，能看到插件文件：

```text
~/Documents/CodexPlugins/ios-27-xcode-skills/
  .codex-plugin/plugin.json
  assets/
  skills/
```

### 2. 配置个人插件 marketplace

创建或更新个人插件清单：

```bash
mkdir -p ~/.agents/plugins
```

编辑 `~/.agents/plugins/marketplace.json`，加入下面内容。

如果你原本没有这个文件，可以直接使用：

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

如果你解压到了别的位置，把 `source.path` 改成对应路径。以 `~` 为根时建议写成类似：

```text
./Documents/CodexPlugins/ios-27-xcode-skills
```

### 3. 安装插件

在 Codex 桌面版中打开一个新会话，或用 Codex 自带 CLI 执行：

```bash
/Applications/Codex.app/Contents/Resources/codex plugin add ios-27-xcode-skills@personal
```

### 4. 验证

```bash
/Applications/Codex.app/Contents/Resources/codex plugin list | grep ios-27-xcode-skills
```

看到 `installed, enabled` 就表示安装成功。

### 5. 使用方式

安装后，在新会话里可以直接这样问：

```text
帮我适配 iOS 27 的 SwiftUI API 变化
```

```text
审查这个项目的 Xcode 安全设置
```

```text
现代化 UIKit 生命周期和测试代码
```

插件包含的主要能力：

- SwiftUI iOS 27 新 API / 行为变化 / 废弃项适配
- SwiftUI 代码最佳实践审查
- UIKit 多窗口、Scene 生命周期、UIScreen / orientation / safe area 现代化
- XCTest 到 Swift Testing 的迁移
- Xcode 安全构建设置审查
- C `-fbounds-safety` 迁移与调试
- iOS 真机/模拟器 UI 行为验证

## ios-asset-exporter-plugin

Figma 本地插件包，用于把选中的图标、组件实例或 Frame 一键导出为 iOS 使用的 `@2x` / `@3x` PNG，并在本地打包成 ZIP 下载。适合从 Figma 快速交付 iOS 工程里的切图资源。

<img src="https://github.com/Rogue24/JPCover/raw/master/ShareTools/example.jpeg" width="60%">

包内关键结构：

- `manifest.json`：Figma 插件 manifest，声明插件名称、入口文件、菜单命令、编辑器类型和网络访问策略。
- `code.js`：插件主逻辑，负责读取当前选中图层、按图层名生成文件名，并调用 Figma 导出 API 生成 `@2x` / `@3x` PNG。
- `ui.html`：插件窗口 UI，负责展示当前选中状态、触发导出，以及在本地生成 ZIP 下载。
- `README.md`：插件自身的安装和使用说明。

安装后，它会作为 `iOS Asset Exporter` 出现在 Figma 的本地开发插件中。

### 1. 保存插件

把 `ios-asset-exporter-plugin` 放到你想保存插件的位置，例如放到`~/Documents/FigmaPlugins/`，能看到插件文件：

```text
~/Documents/FigmaPlugins/ios-asset-exporter/
  manifest.json
  code.js
  ui.html
  README.md
```

### 2. 导入 Figma 本地插件

打开 Figma 桌面端，进入：

```text
Plugins -> Development -> Import plugin from manifest...
```

选择解压目录下的：

```text
~/Documents/FigmaPlugins/ios-asset-exporter/manifest.json
```

### 3. 使用方式

在 Figma 画布中选中一个或多个图标、组件实例或 Frame，然后运行：

```text
iOS Asset Exporter -> Export selected ZIP
```

也可以运行：

```text
iOS Asset Exporter -> Open exporter window
```

打开窗口后点击 `导出 ZIP`。

单个图标会按图层名导出。假设图层名是 `切换身份icon`，会导出：

```text
切换身份icon@2x.png
切换身份icon@3x.png
```

选中多个图标时，会按图层名分别导出。文件名中的 `/ \ : * ? " < > |` 会自动替换成 `_`，同名图层会自动追加序号避免覆盖。

插件包含的主要能力：

- 一次选中多个 Figma 图层并批量导出
- 自动生成 iOS 常用的 `@2x` / `@3x` PNG 文件
- 按图层名命名导出资源，并清理不适合作为文件名的字符
- 在插件 UI 内生成 ZIP，不依赖外部网络服务