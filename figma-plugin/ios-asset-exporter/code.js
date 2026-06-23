function sanitizeFileName(name) {
  const cleaned = String(name || "icon")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "icon";
}

function uniqueBaseNames(nodes) {
  const counts = new Map();

  return nodes.map((node) => {
    const base = sanitizeFileName(node.name);
    const previous = counts.get(base) || 0;
    counts.set(base, previous + 1);

    if (previous === 0) {
      return base;
    }

    return `${base}-${previous + 1}`;
  });
}

function openPluginUI(visible) {
  try {
    figma.showUI(__html__, {
      width: 360,
      height: 260,
      title: "iOS Asset Exporter",
      visible,
      themeColors: true
    });
    return true;
  } catch (error) {
    figma.closePlugin(`无法打开插件窗口：${error && error.message ? error.message : String(error)}`);
    return false;
  }
}

function selectionPayload() {
  const nodes = figma.currentPage.selection;

  return {
    type: "selection",
    count: nodes.length,
    names: nodes.slice(0, 6).map((node) => node.name)
  };
}

function postStatus(message) {
  figma.ui.postMessage({
    type: "progress",
    message
  });
}

function withTimeout(promise, label) {
  let timer = null;
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`${label} 超时，请尝试选中更小的图层或切回设计模式后导出。`));
    }, 30000);
  });

  return Promise.race([promise, timeout]).then((value) => {
    clearTimeout(timer);
    return value;
  }, (error) => {
    clearTimeout(timer);
    throw error;
  });
}

async function exportSelection() {
  const nodes = figma.currentPage.selection;

  if (!nodes.length) {
    throw new Error("请先选中至少一个图标或 Frame。");
  }

  const baseNames = uniqueBaseNames(nodes);
  const files = [];

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    const baseName = baseNames[index];

    if (typeof node.exportAsync !== "function") {
      throw new Error(`「${node.name}」不支持导出。`);
    }

    postStatus(`正在导出 ${baseName}@2x.png...`);
    const png2x = await withTimeout(node.exportAsync({
      format: "PNG",
      constraint: { type: "SCALE", value: 2 }
    }), `${baseName}@2x`);
    postStatus(`正在导出 ${baseName}@3x.png...`);
    const png3x = await withTimeout(node.exportAsync({
      format: "PNG",
      constraint: { type: "SCALE", value: 3 }
    }), `${baseName}@3x`);

    files.push({
      name: `${baseName}@2x.png`,
      bytes: png2x
    });
    files.push({
      name: `${baseName}@3x.png`,
      bytes: png3x
    });
  }

  postStatus("正在发送 PNG 到打包器...");
  return {
    type: "export-result",
    files,
    count: nodes.length
  };
}

function postSelection() {
  figma.ui.postMessage(selectionPayload());
}

if (figma.command === "diagnose") {
  figma.closePlugin(`插件已启动。editorType=${figma.editorType}, mode=${figma.mode}`);
} else {
  const isAutoExport = figma.command === "export-now";

  if (openPluginUI(!isAutoExport)) {
    if (isAutoExport) {
      exportSelection()
        .then((result) => {
          result.autoClose = true;
          figma.ui.postMessage(result);
        })
        .catch((error) => {
          figma.closePlugin(error && error.message ? error.message : String(error));
        });
    }

    figma.on("selectionchange", postSelection);
    postSelection();

    figma.ui.onmessage = async (message) => {
      if (message && message.type === "download-complete") {
        figma.closePlugin("已下载 iOS @2x/@3x ZIP");
        return;
      }

      if (!message || message.type !== "export-ios-assets") {
        return;
      }

      try {
        figma.ui.postMessage(await exportSelection());
      } catch (error) {
        figma.ui.postMessage({
          type: "error",
          message: error && error.message ? error.message : String(error)
        });
      }
    };
  }
}
