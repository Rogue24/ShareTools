# ShareTools

个人分享的一些工具。

## xcode-skills.zip

从 Xcode 27 导出的 Skills。

## ios-27-xcode-skills-plugin.zip

这是基于 `xcode-skills.zip` 中的 skills 资源封装而成的 Codex 个人插件包，把里面的技能内容整理为 Codex 插件规范所需的目录结构，并补充插件元信息与展示资源，方便在 Codex 插件页中安装、启用和分享。

包内关键结构：

- `.codex-plugin/plugin.json`：Codex 插件 manifest，声明插件名称、版本、展示信息、图标、默认提示词，以及 skills 入口。
- `skills/`：从 `xcode-skills.zip` 归档进来的技能主体内容，包含 iOS 27 / Xcode beta 适配相关的 skill 定义、工作流和参考资料。
- `assets/`：插件展示资源，例如 `logo` / `composerIcon` 使用的图标文件。

安装完成后，它会作为 `ios-27-xcode-skills@personal` 出现在 Codex 的个人插件中。

### 1. 解压插件

把 `ios-27-xcode-skills-plugin.zip` 解压到你想保存插件的位置，例如：

```bash
mkdir -p ~/Documents/CodexPlugins
unzip ios-27-xcode-skills-plugin.zip -d ~/Documents/CodexPlugins
```

解压后应该能看到：

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
