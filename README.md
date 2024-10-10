# EasyAnimCode

**EasyAnimCode** 是一个为 VSCode 添加日常操作动画过渡的扩展，旨在增强用户体验。

## 功能

-   为 VSCode 的常见操作添加动画效果。
-   修改 VSCode 的基础样式，带来更美观的视觉体验。
-   目前仅支持 Windows 平台（其他平台未测试）。
-   推荐 VSCode 版本 `1.93` 及以上（实际可能支持更低版本）。

## 安装

1. 以管理员身份运行 VSCode。
2. 从 VSCode 扩展市场下载并安装 EasyAnimCode，或手动安装 `.vsix` 文件。
3. 通过 VSCode 命令面板（按 `Ctrl+Shift+P`）执行 `easy-anim-code.enable` 命令启用动画效果。执行完毕后，重新加载 VSCode 以应用更改。

> **注意**：VSCode 重新加载后，可能会弹出一条通知，提示 VSCode 安装已损坏。这是正常现象，因为该插件修改了 VSCode 的配置文件。若不希望再次看到此通知，可点击右边的小齿轮，选择不再显示。

## 禁用插件

1. 以管理员身份运行 VSCode。
2. 通过 VSCode 命令面板（按 `Ctrl+Shift+P`）执行 `easy-anim-code.disable` 命令禁用动画效果。执行完毕后，重新加载 VSCode。
    > 禁用插件的同时，会重置插件的配置

## 重置和卸载

由于插件会修改本地 VSCode 的配置文件，若希望恢复 VSCode 的初始状态，可以使用以下步骤进行重置：
**注意：卸载插件不会自动恢复 VSCode 原有状态，卸载前请先执行重置命令。**

1. 以管理员身份运行 VSCode。
2. 通过 VSCode 命令面板（按 `Ctrl+Shift+P`）执行 `easy-anim-code.reset` 命令将设置重置为默认状态。执行完毕后，重新加载 VSCode。

> **重置注意**：重置后，若需卸载插件，直接卸载即可。
> 若想重新启用动画，只需再次执行 `easy-anim-code.enable` 命令。

> 禁用插件的同时，会重置插件的配置

## 插件错误修复指南

如果插件出现问题，可能会损坏 VSCode 的配置文件。你可以尝试以下步骤修复本地文件：

#### Windows 用户修复步骤

1. 进入 VSCode 安装目录。
2. 找到 `resources\app\out\vs\code\electron-sandbox\workbench` 文件夹。
3. 找到 `workbench.html` 和 `workbench-apc-extension.html` 两个文件。
4. 使用下面提供的模板替换这两个文件中的内容，保存修改后重新启动 VSCode。

##### `workbench.html` 模板

```html
<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta
            http-equiv="Content-Security-Policy"
            content="
                default-src 'none';
                img-src 'self' data: blob: vscode-remote-resource: vscode-managed-remote-resource: https:;
                media-src 'self';
                frame-src 'self' vscode-webview:;
                script-src 'self' 'unsafe-eval' blob:;
                style-src 'self' 'unsafe-inline';
                connect-src 'self' https: ws:;
                font-src 'self' vscode-remote-resource: vscode-managed-remote-resource: https://*.vscode-unpkg.net;
                require-trusted-types-for 'script';
                trusted-types
                    amdLoader
                    cellRendererEditorText
                    defaultWorkerFactory
                    diffEditorWidget
                    diffReview
                    domLineBreaksComputer
                    dompurify
                    editorGhostText
                    editorViewLayer
                    notebookRenderer
                    stickyScrollViewLayer
                    tokenizeToString;
            " />
    </head>

    <body aria-label=""></body>
    <!-- Startup (do not modify order of script tags !) -->
    <script src="workbench.js"></script>
</html>
```

##### workbench-apc-extension.html 模板

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
    </head>

    <body aria-label=""></body>
    <!-- Startup (do not modify order of script tags!) -->
    <script src="../../../patch/browser.main.js"></script>
    <script src="workbench.js"></script>
</html>
```

**如果上述方法无法解决问题，请尝试重新安装 VSCode。**

## 插件配置

> 考虑到不同用户使用的主题插件不同，如果直接使用默认插件，可能于用户的主题有颜色和样式的冲突，所以插件提供了一些配置选项，你可以在 VSCode 设置中进行修改。

![setting](./image/setting.png)

-   `Easy-anim-code.PrimaryColor`: 主色调，用于设置插件的主要颜色。
-   `Easy-anim-code.AnimLevel`: 动画级别，用于设置插件的动画效果。

> 配置选项的值，只允许 16 进制的颜色，如果需要不显示颜色，可以考虑加上透明度 100%

**每次修改配置都需要运行 `easy-anim-code.disable` 命令和 `easy-anim-code.enable` 命令，重新加载 VSCode 以应用更改。**
**请注意：每次运行 `easy-anim-code.disable` 命令之后，配置会被重置为默认值。**

## 致谢

在此特别感谢以下插件和 CSS 库对本项目的启发和帮助：

-   [Fluent UI for VSCode](https://marketplace.visualstudio.com/items?itemName=leandro-rodrigues.fluent-ui-vscode)：为部分样式和此插件的底层实现提供给了灵感。
-   [Apc Customize UI++ ](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension)：提供了本地开发测试的关键支持。
-   [CSS：Animista](https://animista.net/play)：为此插件的动画效果提供支持。

本插件的创建，离不开上述插件的贡献！

<!-- ## 界面预览 -->
