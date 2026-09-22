# 项目说明

## xcode-skills 更新规范

`skills/xcode-skills/` 是 Xcode Skills 的唯一源目录。以后只要新增、删除、重命名或修改其中任何技能，都必须在同一次任务中完成下面全部工作，不能只更新源技能目录。

### 必须同步的内容

1. 更新根目录 `README.md`：
   - 技能表必须与 `skills/xcode-skills/*/SKILL.md` 的实际目录名和 frontmatter 保持一致。
   - 新增、删除、重命名技能时，同步调整技能用途说明和主要能力列表。
   - Codex 与 Claude Code 插件章节中的技能数量、使用示例、安装说明必须保持准确。

2. 同步 Codex 插件：
   - 将 `skills/xcode-skills/` 完整镜像到 `codex-plugin/ios-27-xcode-skills-plugin/ios-27-xcode-skills/skills/`。
   - 同步时必须删除目标中源目录已不存在的旧技能、旧目录名和孤立文件，不能只增量覆盖。
   - 根据变化更新 `.codex-plugin/plugin.json` 的版本、描述、关键词、长说明和默认提示词。
   - 更新 `codex-plugin/ios-27-xcode-skills-plugin/INSTALL.md` 中的技能数量、能力和示例。

3. 同步 Claude Code 插件：
   - 将 `skills/xcode-skills/` 完整镜像到 `claude-code-plugin/ios-27-xcode-skills-plugin/ios-27-xcode-skills/skills/`。
   - 同步时必须删除目标中源目录已不存在的旧技能、旧目录名和孤立文件。
   - 根据变化提升 `ios-27-xcode-skills/.claude-plugin/plugin.json` 的语义化版本，并更新描述与关键词。
   - 如技能清单或使用方式有变化，同步更新插件 `README.md`、外层 `INSTALL.md` 和 `.claude-plugin/marketplace.json` 中的相关说明。

4. 更新本机已安装的 Claude Code 插件：
   - 本地 marketplace 名称固定为 `ios-27-xcode-skills-marketplace`。
   - 插件标识固定为 `ios-27-xcode-skills@ios-27-xcode-skills-marketplace`。
   - 仓库内插件更新并通过校验后，执行：

     ```bash
     claude plugin marketplace update ios-27-xcode-skills-marketplace
     claude plugin update ios-27-xcode-skills@ios-27-xcode-skills-marketplace
     ```

   - 确认 `claude plugin list --json` 中该插件已启用且版本等于仓库 manifest。
   - 使用 `claude plugin details ios-27-xcode-skills@ios-27-xcode-skills-marketplace` 确认技能数量和名称与源目录一致。
   - 如果当前会话尚未加载新版本，提醒用户执行 `/reload-plugins`；不要擅自卸载插件或删除 marketplace。

### 每次更新后的验证

- 递归比较以下三处技能树，要求内容完全一致：
  - `skills/xcode-skills/`
  - `codex-plugin/ios-27-xcode-skills-plugin/ios-27-xcode-skills/skills/`
  - `claude-code-plugin/ios-27-xcode-skills-plugin/ios-27-xcode-skills/skills/`
- 三处 `SKILL.md` 数量、目录名集合和 frontmatter `name` 必须完全一致。
- 校验 Codex manifest、Claude Code manifest 和 marketplace JSON 语法。
- 执行：

  ```bash
  claude plugin validate claude-code-plugin/ios-27-xcode-skills-plugin/ios-27-xcode-skills --strict
  claude plugin validate claude-code-plugin/ios-27-xcode-skills-plugin --strict
  ```

- 检查 README、INSTALL 和各技能 Markdown 的仓库内相对链接。
- 执行 `git diff --check`。
- 不创建 zip；保留目录式分发。
- 除非用户另行明确要求，否则不提交、不推送。
