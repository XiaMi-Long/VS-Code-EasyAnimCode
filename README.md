# EasyAnimCode

[中文文档](./README.zh.md)
This English documentation was translated by ChatGPT.

**EasyAnimCode** is an extension that adds animation transitions for daily operations in VSCode.

## Features

-   Adds animation effects to common operations in VSCode.
-   Modifies the basic style of VSCode, bringing a more visually appealing experience.
-   Currently confirmed to support Windows platform only (other platforms not yet tested).
-   **This plugin `v0.0.2` supports VSCode version `1.94`**.

## Installation

1. Run VSCode as an administrator.
2. Download and install EasyAnimCode from the VSCode extension marketplace, or manually install the `.vsix` file.
3. Enable the animation effects by running the command `easy-anim-code.enable` via the VSCode Command Palette (`Ctrl+Shift+P`). After the command executes, reload VSCode to apply the changes.

> After reloading VSCode, you may receive a "corrupt installation" message because the plugin modifies the configuration files. If you do not wish to see this notification again, click the gear icon on the right side of the notification and choose to dismiss it.

## Disabling the Extension

1. Run VSCode as an administrator.
2. Disable the animation effects by running the command `easy-anim-code.disable` via the VSCode Command Palette (`Ctrl+Shift+P`). After the command executes, reload VSCode.

> Disabling the extension will also reset its configuration.

## Reset and Uninstall

Since the plugin modifies VSCode's local configuration files, you need to reset the settings before uninstalling to restore VSCode to its initial state. If you skip the reset step, the original VSCode state will not be restored after uninstalling the extension.
**Note: Uninstalling the extension will not automatically restore VSCode's original state, so please run the reset command before uninstalling.**

1. Run VSCode as an administrator.
2. Run the command `easy-anim-code.reset` via the VSCode Command Palette (`Ctrl+Shift+P`) to reset settings to their default state. After the command executes, reload VSCode.

> **Reset Notice**: If you wish to continue using the plugin after resetting, simply run `easy-anim-code.enable` again.

> Disabling the extension will reset its configuration.

## VSCode Updates

After updating VSCode, you need to run the easy-anim-code.enable command again to enable the animation effects.

## Extension Troubleshooting Guide

If the extension causes issues and damages VSCode's configuration files, you can try the following steps to repair the local files:

#### Repair Steps for Windows Users

#### VSCode 1.94 Version Repair Process

1. Go to the VSCode installation directory.
2. Locate the `resources\app\out\vs\code\electron-sandbox\workbench` folder.
3. Find the files `workbench.esm.html` .
4. Replace the content of these files with the templates provided below. After saving the changes, restart VSCode.

#### ~~VSCode 1.93 Version Repair Process(The latest version is no longer supported)~~

1. Go to the VSCode installation directory.
2. Locate the `resources\app\out\vs\code\electron-sandbox\workbench` folder.
3. Find the files `workbench.html` and `workbench-apc-extension.html`.
4. Replace the content of these files with the templates provided below. After saving the changes, restart VSCode.

#### `workbench.esm.html` Template

```html
<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta
            http-equiv="Content-Security-Policy"
            content="
				default-src
					'none'
				;
				img-src
					'self'
					data:
					blob:
					vscode-remote-resource:
					vscode-managed-remote-resource:
					https:
				;
				media-src
					'self'
				;
				frame-src
					'self'
					vscode-webview:
				;
				script-src
					'self'
					'unsafe-eval'
					blob:
				;
				style-src
					'self'
					'unsafe-inline'
				;
				connect-src
					'self'
					https:
					ws:
				;
				font-src
					'self'
					vscode-remote-resource:
					vscode-managed-remote-resource:
					https://*.vscode-unpkg.net
				;
				require-trusted-types-for
					'script'
				;
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
					tokenizeToString
				;
		" />
    </head>

    <body aria-label=""></body>

    <!-- Startup (do not modify order of script tags!) -->
    <script
        src="./workbench.js"
        type="module"></script>
</html>
```

##### ~~`workbench.html` Template(The latest version is no longer supported.)~~

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

##### ~~`workbench-apc-extension.html` Template(The latest version is no longer supported.)~~

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

**If the above methods don't work, please try reinstalling VSCode.**

## Configuration Options

To avoid conflicts with users' theme plugins, EasyAnimCode provides several configuration options that allow users to customize the plugin settings as needed.

> Since different users use different theme plugins, the default plugin may cause color and style conflicts with the user's theme.

![setting](./image/setting.png)

-   `Easy-anim-code.PrimaryColor`: Set the primary color of the extension.
-   `Easy-anim-code.AnimLevel`: Adjust the intensity level of animations.
-   `Easy-anim-code.BackgroundImage`: Set a global background image.
    > The path is an absolute path, and for the Windows platform, the path needs to be escaped, e.g., "C:\\luoqixi\\0614_11.png". Image paths do not support Chinese characters.
-   `Easy-anim-code.BackgroundImageOpacity`: Adjust the opacity of the global background image.
-   `Easy-anim-code.TerminalAnimation`: Enable or disable terminal animations.

> The configuration values must be provided as hex color codes, and transparency is supported. If you modify the configuration, first run `easy-anim-code.disable`, then run `easy-anim-code.enable` and restart VSCode to apply the changes.

**Please note: Every time you run the `easy-anim-code.disable` command, the configuration will be reset to the default value.**

## Installing Other Versions to Support Lower Versions of VSCode

| Plugin Version | Corresponding VSCode Version | Installation                                                                                                                          | Documentation                                                                      |
| -------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| v0.0.4         | 1.94                         | Latest                                                                                                                                | Latest                                                                             |
| v0.0.3         | 1.94                         | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/releases/tag/v0.0.3-vscode_1.94) - Simply drag the visx package into VSCode | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/tree/v0.0.3-vscode_1.94) |
| v0.0.2         | 1.94                         | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/releases/tag/v1.94.0) - Simply drag the visx package into VSCode            | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/tree/v1.94.0)            |
| v0.0.1         | 1.93                         | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/releases/tag/v1.93.0%2B) - Simply drag the visx package into VSCode         | [Link](https://github.com/XiaMi-Long/VS-Code-EasyAnimCode/tree/v1.93.0%2B)         |

## Acknowledgments

Special thanks to the following plugins and CSS libraries for their inspiration and help in creating this project:

-   [Fluent UI for VSCode](https://marketplace.visualstudio.com/items?itemName=leandro-rodrigues.fluent-ui-vscode)
-   [Apc Customize UI++ ](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension)
-   [Animista](https://animista.net/play)

The creation of this plugin would not have been possible without the contributions of the above projects!

## Interface Preview

![home](./image/home.png)

> Theme: [Monokai Nocturne](https://marketplace.visualstudio.com/items?itemName=wwy.monokai-nocturne)

![home2](./image/home2.png)

> Theme: [Rainglow-Absent Contrast](https://marketplace.visualstudio.com/items?itemName=daylerees.rainglow)

![home3](./image/home3.png)

> Theme: [XCode-default](https://marketplace.visualstudio.com/items?itemName=smockle.xcode-default-theme)

##### Sidebar

![Sidebar](./image/侧边栏.gif)

#### Extension Page

![Extension](./image/扩展动画.gif)

#### Editor Page

![Editor](./image/编辑动画.gif)

#### Context Menu

![Context Menu](./image/右键动画.gif)

#### Command Palette

![Command Palette](./image/命令弹窗动画.gif)

#### Search

![Search](./image/搜索动画.gif)

#### Settings

![Settings](./image/设置动画.gif)

#### Code

![Code](./image/code动画.gif)

#### Notifications

![Notifications](./image/通知动画.gif)

### Easy-anim-code.AnimLevel set to High

#### Lists

![Lists](./image/high列表动画.gif)

### BackgroundImage

![背景](./image/background1.png)

![背景](./image/background2.webp)

![背景](./image/background3.webp)
