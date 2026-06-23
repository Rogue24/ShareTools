# iOS Asset Exporter

Figma 本地插件：选中一个或多个图标后，一键导出 iOS 使用的 `@2x` / `@3x` PNG，并打包成 ZIP 下载。

## 安装

1. 打开 Figma 桌面端。
2. 进入 `Plugins` → `Development` → `Import plugin from manifest...`。
3. 选择本目录下的 `manifest.json`。

## 使用

1. 在 Figma 画布中选中图标、组件实例或 Frame。
2. 运行 `iOS Asset Exporter` → `Export selected ZIP`。

也可以运行 `Open exporter window` 打开窗口后点击 `导出 ZIP`。

单个图标也会按图层名导出。假设图层名是 `切换身份icon`，会导出：

```text
切换身份icon@2x.png
切换身份icon@3x.png
```

选中多个图标时，同样会按图层名分别导出。文件名中的 `/ \ : * ? " < > |` 会自动替换成 `_`。
