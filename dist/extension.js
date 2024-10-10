/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const index_1 = __webpack_require__(2);
const index_2 = __webpack_require__(4);
const tip_1 = __webpack_require__(3);
function activate(context) {
    // 1. 拿到自带的css
    // 2. 获取要注入的文件
    // 3. 注入文件
    // 4. 备份文件
    // 5. 重启
    // 6. 卸载恢复文件
    const enable = vscode.commands.registerCommand(tip_1.COMMANDS.enable, async () => {
        try {
            // 1. 从扩展包中提取 CSS 样式用于注入 VSCode 核心 HTML 文件
            const cssFileText = await (0, index_2.getEasyAnimCodeExtensionsCss)();
            // 2. 获取要注入的文件
            const { workbenchText, workbenchApcExtensionText } = await (0, index_2.getVSCodeWorkbenchFolderPath)();
            // 3. 组合最终要注入的html文件
            // vscode中有workbench和workbench-apc-extension两个html文件，可能在新版本的vscode中，只修改前者无效，会被后者html的加载覆盖，所以需要修改两个文件
            const htmlText = (0, index_2.getResultHtml)(workbenchText, cssFileText);
            const htmlApcText = (0, index_2.getResultHtml)(workbenchApcExtensionText, cssFileText);
            // 4. 备份文件
            const isWorkbenchBackedUp = await (0, index_2.backupWorkbench)();
            const isWorkbenchApcBackedUp = await (0, index_2.backupWorkbenchApcExtension)();
            // 检测是否已经执行过覆盖
            if (isWorkbenchBackedUp && isWorkbenchApcBackedUp) {
                // 5. 写入文件
                await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbench), htmlText);
                await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbenchApcExtension), htmlApcText);
                // 6. 弹出提示框，手动重启
                (0, index_1.enabledRestart)();
            }
            else {
                // 6. 弹出提示框，已经执行过覆盖
                (0, index_1.showIsBackUpNotification)();
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(tip_1.TIPS.errorText);
        }
    });
    // 1. 拿到备份的文件
    // 2. 恢复文件
    // 3. 重启
    const disable = vscode.commands.registerCommand(tip_1.COMMANDS.disable, async () => {
        try {
            // 1. 获取备份文件内容
            const { backupWorkbenchText, backupWorkbenchApcExtensionText } = await (0, index_2.getBackupWorkbenchFile)();
            // 2. 恢复文件
            await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbench), backupWorkbenchText);
            await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbenchApcExtension), backupWorkbenchApcExtensionText);
            // 3. 删除备份文件
            await (0, index_2.removeBackUpWorkBenchFile)();
            await (0, index_2.removeBackUpWorkBenchApcExtensionFile)();
            // 4. 还原插件配置参数
            (0, index_1.resetEasyAnimCodeConfig)();
            // 5. 弹出提示框，手动重启
            (0, index_1.enabledRestart)();
        }
        catch (error) {
            vscode.window.showErrorMessage(tip_1.TIPS.errorText);
        }
    });
    const clear = vscode.commands.registerCommand(tip_1.COMMANDS.reset, async () => {
        try {
            // 1. 写入template到核心文件中
            await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbench), tip_1.WORKBENCH_HTML_TEMPLATE);
            await (0, index_2.writeFile)((0, index_2.getPrimaryFilePath)(tip_1.PRIMARY_FILE.workbenchApcExtension), tip_1.WORKBENCH_APC_EXTENSION_HTML_TEMPLATE);
            // 2. 删除模板
            (0, index_2.removeBackUpWorkBenchFile)();
            (0, index_2.removeBackUpWorkBenchApcExtensionFile)();
            // 3. 还原插件配置参数
            (0, index_1.resetEasyAnimCodeConfig)();
            // 4. 重启
            (0, index_1.unInstallSuccess)();
        }
        catch (error) {
            vscode.window.showErrorMessage(tip_1.TIPS.errorText);
        }
    });
    context.subscriptions.push(enable);
    context.subscriptions.push(disable);
    context.subscriptions.push(clear);
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reloadWindow = reloadWindow;
exports.enabledRestart = enabledRestart;
exports.unInstallSuccess = unInstallSuccess;
exports.createHighAnimLevel = createHighAnimLevel;
exports.showIsBackUpNotification = showIsBackUpNotification;
exports.createRootValStyleTemplate = createRootValStyleTemplate;
exports.resetEasyAnimCodeConfig = resetEasyAnimCodeConfig;
const vscode = __importStar(__webpack_require__(1));
const tip_1 = __webpack_require__(3);
/**
 * 重新加载当前窗口
 * 这个函数执行一个命令来重新加载 VS Code 窗口
 */
function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow');
}
/**
 * 显示一个信息通知，提示用户当前的备份状态
 *
 * @remarks
 * 这个函数会调用 vscode.window.showInformationMessage 方法来显示一个信息通知
 * 通知的内容是 TIPS.enableText，标题是 TIPS.isBackUpText
 *
 * @param {void} - 这个函数不接受任何参数
 * @returns {void} - 这个函数不返回任何值
 */
function showIsBackUpNotification() {
    vscode.window.showInformationMessage(tip_1.TIPS.enableText, { title: tip_1.TIPS.isBackUpText });
}
/**
 * 启用重启功能
 * 这个函数会显示一个信息消息，提示用户需要重启应用以使更改生效，然后执行重启操作
 * @param {string} TIPS.enableText - 显示给用户的提示信息
 * @param {string} TIPS.restartText - 重启操作的标题
 */
function enabledRestart() {
    vscode.window.showInformationMessage(tip_1.TIPS.enableText, { title: tip_1.TIPS.restartText }).then(reloadWindow);
}
/**
 * 显示卸载成功的提示信息，并在用户确认后重新加载窗口
 *
 * @remarks
 * 这个函数用于在插件卸载成功后，向用户显示一条信息提示，并提供一个选项让用户重新加载窗口。
 *
 * @param {string} TIPS.enableText - 要显示的提示信息文本。
 * @param {string} TIPS.restartText - 重新加载窗口的按钮标题。
 *
 * @returns {Promise<void>} - 当用户点击重新加载窗口的按钮时，返回一个 Promise，表示窗口正在重新加载。
 */
function unInstallSuccess() {
    vscode.window.showInformationMessage(tip_1.TIPS.enableText, { title: tip_1.TIPS.restartText }).then(reloadWindow);
}
function getEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code');
    const primaryColor = config.get(tip_1.EXTENSION_CONFIG.PrimaryColor.key);
    const animLevel = config.get(tip_1.EXTENSION_CONFIG.AnimLevel.key);
    return {
        primaryColor,
        animLevel,
    };
}
function createRootValStyleTemplate() {
    const { primaryColor } = getEasyAnimCodeConfig();
    return `
        :root {
            --vscode-style-easy-anim-red-color: ${primaryColor};
        }
    `;
}
function createHighAnimLevel() {
    const { animLevel } = getEasyAnimCodeConfig();
    const highLevel = tip_1.ANIM_LEVEL[animLevel];
    return `${highLevel}`;
}
function resetEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code');
    config.update(tip_1.EXTENSION_CONFIG.PrimaryColor.key, tip_1.EXTENSION_CONFIG.PrimaryColor.default, true);
    config.update(tip_1.EXTENSION_CONFIG.AnimLevel.key, tip_1.EXTENSION_CONFIG.AnimLevel.default, true);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EXTENSION_CONFIG = exports.WORKBENCH_APC_EXTENSION_HTML_TEMPLATE = exports.WORKBENCH_HTML_TEMPLATE = exports.COMMANDS = exports.PRIMARY_FILE = exports.BACKUP_FILE_SUFFIX = exports.ANIM_LEVEL = exports.TIPS = void 0;
// 消息弹窗的文字枚举
const TIPS = {
    enableText: '来自easy-anim-code的提示',
    restartText: 'restart',
    isBackUpText: '插件已执行过，本次中止执行',
    errorText: '执行出现异常',
};
exports.TIPS = TIPS;
// 命令枚举
const COMMANDS = {
    enable: 'easy-anim-code.enable',
    disable: 'easy-anim-code.disable',
    reset: 'easy-anim-code.reset',
};
exports.COMMANDS = COMMANDS;
// 备份文件的后缀
const BACKUP_FILE_SUFFIX = 'easy-anim-code-backup-';
exports.BACKUP_FILE_SUFFIX = BACKUP_FILE_SUFFIX;
// 主文件枚举
const PRIMARY_FILE = {
    workbench: 'workbench.html',
    workbenchApcExtension: 'workbench-apc-extension.html',
    backupWorkbench: BACKUP_FILE_SUFFIX + 'workbench.html',
    backupWorkbenchApcExtension: BACKUP_FILE_SUFFIX + 'workbench-apc-extension.html',
};
exports.PRIMARY_FILE = PRIMARY_FILE;
// 扩展配置枚举
const EXTENSION_CONFIG = {
    PrimaryColor: {
        key: 'PrimaryColor',
        default: '#2aaaff',
    },
    AnimLevel: {
        key: 'AnimLevel',
        default: 'low',
    },
};
exports.EXTENSION_CONFIG = EXTENSION_CONFIG;
const ANIM_LEVEL = {
    low: ``,
    high: `.part.sidebar.pane-composite-part {
	    .pane-body {
            .monaco-list-row {
                .monaco-tl-row {
                    .monaco-tl-twistie {
                        transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    animation: easy-anim-slide-right 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            }

            .monaco-tree-sticky-container {
                .monaco-tl-row {
                    animation: none;
                }
            }
        }
		}`,
};
exports.ANIM_LEVEL = ANIM_LEVEL;
const WORKBENCH_HTML_TEMPLATE = `<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="Content-Security-Policy" content="
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
<!-- Startup (do not modify order of script tags !) -->
<script src="workbench.js"></script>

</html>`;
exports.WORKBENCH_HTML_TEMPLATE = WORKBENCH_HTML_TEMPLATE;
const WORKBENCH_APC_EXTENSION_HTML_TEMPLATE = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />

</head>

<body aria-label=""></body>
<!-- Startup (do not modify order of script tags!) -->
<script src="../../../patch/browser.main.js"></script>
<script src="workbench.js"></script>

</html>`;
exports.WORKBENCH_APC_EXTENSION_HTML_TEMPLATE = WORKBENCH_APC_EXTENSION_HTML_TEMPLATE;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.writeFile = writeFile;
exports.getResultHtml = getResultHtml;
exports.backupWorkbench = backupWorkbench;
exports.getPrimaryFilePath = getPrimaryFilePath;
exports.getBackupWorkbenchFile = getBackupWorkbenchFile;
exports.removeBackUpWorkBenchFile = removeBackUpWorkBenchFile;
exports.backupWorkbenchApcExtension = backupWorkbenchApcExtension;
exports.getEasyAnimCodeExtensionsCss = getEasyAnimCodeExtensionsCss;
exports.getVSCodeWorkbenchFolderPath = getVSCodeWorkbenchFolderPath;
exports.removeBackUpWorkBenchApcExtensionFile = removeBackUpWorkBenchApcExtensionFile;
const path = __importStar(__webpack_require__(5));
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(6));
const tip_1 = __webpack_require__(3);
const common_1 = __webpack_require__(2);
/**
 * 异步获取 Easy Anim Code 扩展的 CSS 文件内容
 *
 * @returns {string} 一个 Promise，成功时解析为包含 CSS 文件内容的字符串
 */
async function getEasyAnimCodeExtensionsCss() {
    const path = __dirname + '/index.css';
    const text = await fs.readFile(path, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return text;
}
/**
 * 异步获取 VS Code 安装路径
 *
 * @returns {string} 一个 Promise，成功时解析为 VS Code 安装路径的字符串
 */
function getVSCodeInstallPath() {
    return vscode.env.appRoot;
}
/**
 * 获取主文件路径
 * @since v10.0.0
 * @param fileName - 要获取路径的文件名
 * @returns 文件的完整路径，如果文件名不存在于记录中，则返回工作区文件夹路径
 */
function getPrimaryFilePath(fileName) {
    const installPath = path.dirname(getVSCodeInstallPath());
    const workbenchFolder = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench');
    const filePaths = {
        [tip_1.PRIMARY_FILE.workbench]: tip_1.PRIMARY_FILE.workbench,
        [tip_1.PRIMARY_FILE.workbenchApcExtension]: tip_1.PRIMARY_FILE.workbenchApcExtension,
        [tip_1.PRIMARY_FILE.backupWorkbench]: tip_1.PRIMARY_FILE.backupWorkbench,
        [tip_1.PRIMARY_FILE.backupWorkbenchApcExtension]: tip_1.PRIMARY_FILE.backupWorkbenchApcExtension,
    };
    return filePaths[fileName] ? path.join(workbenchFolder, filePaths[fileName]) : workbenchFolder;
}
/**
 * 获取 VSCode 工作区文件夹路径
 * @since v10.0.0
 * @returns 包含工作区文件和工作区 APC 扩展文件内容的对象
 */
async function getVSCodeWorkbenchFolderPath() {
    const workbenchPath = getPrimaryFilePath(tip_1.PRIMARY_FILE.workbench);
    const workbenchApcExtensionPath = getPrimaryFilePath(tip_1.PRIMARY_FILE.workbenchApcExtension);
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    const workbenchApcExtensionText = await fs.readFile(workbenchApcExtensionPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return { workbenchText, workbenchApcExtensionText };
}
/**
 * 将 CSS 文本嵌入到 workbenchText 的 </head> 标签之前，生成新的 HTML 文本
 *
 * @param {string} workbenchText - 原始的 HTML 文本
 * @param {string} cssText - 要嵌入的 CSS 文本
 * @returns {string} - 新的 HTML 文本，其中包含了嵌入的 CSS 样式
 */
function getResultHtml(workbenchText, cssText) {
    const rootVal = (0, common_1.createRootValStyleTemplate)();
    const isHighLevel = (0, common_1.createHighAnimLevel)();
    return workbenchText?.replace(/(<\/head>)/, `\n<style>${rootVal} ${cssText} ${isHighLevel}</style>\n</head>`);
}
/**
 * 检查备份文件是否存在
 * @since v10.0.0
 * @param filePath - 要检查的文件路径
 * @returns 如果文件存在，返回 true，否则返回 false
 */
async function checkIfBackupFileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
/**
 * 备份文件函数。
 * 这个函数尝试将文件从源路径复制到目标路径。
 * 如果复制成功，函数将不会返回任何内容。
 * 如果复制失败，函数将显示一个错误消息。
 *
 * @param src - 源文件的路径。
 * @param source - 目标文件的路径。
 * @returns 如果文件复制成功，返回 undefined。如果文件复制失败，返回错误对象。
 */
async function backupFile(src, source) {
    const err = (await fs.copyFile(src, source));
    if (err) {
        vscode.window.showErrorMessage(`备份文件失败: ${err}`);
    }
}
/**
 * 备份当前工作区文件。
 * 如果备份文件已存在，则不进行备份。
 *
 * @returns {Promise<boolean>} 如果备份成功，返回 true；如果备份文件已存在，返回 false。
 */
async function backupWorkbench() {
    const workbench = getPrimaryFilePath(tip_1.PRIMARY_FILE.workbench);
    const backUpWorkbench = getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbench);
    if (await checkIfBackupFileExists(backUpWorkbench))
        return false;
    backupFile(workbench, backUpWorkbench);
    return true;
}
/**
 * 备份当前工作区的 APC 扩展文件。
 * 如果备份文件已存在，则不进行备份。
 *
 * @returns {Promise<boolean>} 如果备份成功，返回 true；如果备份文件已存在，返回 false。
 */
async function backupWorkbenchApcExtension() {
    const apiExtensionWorkbench = getPrimaryFilePath(tip_1.PRIMARY_FILE.workbenchApcExtension);
    const backUpApcExtensionWorkbench = getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbenchApcExtension);
    if (await checkIfBackupFileExists(backUpApcExtensionWorkbench))
        return false;
    backupFile(apiExtensionWorkbench, backUpApcExtensionWorkbench);
    return true;
}
/**
 * 获取备份的工作区文件和 APC 扩展文件的内容。
 * 这个函数会读取指定的备份文件路径，并返回文件的内容。
 * 如果文件读取失败，会显示错误信息。
 *
 * @returns {Promise<Object>} 包含备份工作区文件和 APC 扩展文件内容的对象。
 * @throws {Error} 如果读取文件时发生错误，会抛出错误并显示错误信息。
 */
async function getBackupWorkbenchFile() {
    const backupWorkbenchPath = getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbench);
    const backupWorkbenchApcExtensionPath = getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbenchApcExtension);
    const backupWorkbenchText = await fs.readFile(backupWorkbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    const backupWorkbenchApcExtensionText = await fs.readFile(backupWorkbenchApcExtensionPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return {
        backupWorkbenchText,
        backupWorkbenchApcExtensionText,
    };
}
/**
 * 删除备份的工作区文件。
 * 这个函数会尝试删除指定的备份文件路径。
 * 如果文件删除成功，函数将不会返回任何内容。
 * 如果文件删除失败，函数将显示一个错误消息。
 *
 * @returns {Promise<void>} 如果文件删除成功，返回 undefined。如果文件删除失败，返回错误对象。
 */
async function removeBackUpWorkBenchFile() {
    await fs.unlink(getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbench)).catch((err) => {
        vscode.window.showErrorMessage(err);
    });
}
/**
 * 删除备份的工作区 APC 扩展文件。
 * 这个函数会尝试删除指定的备份文件路径。
 * 如果文件删除成功，函数将不会返回任何内容。
 * 如果文件删除失败，函数将显示一个错误消息。
 *
 * @returns {Promise<void>} 如果文件删除成功，返回 undefined。如果文件删除失败，返回错误对象。
 */
async function removeBackUpWorkBenchApcExtensionFile() {
    await fs.unlink(getPrimaryFilePath(tip_1.PRIMARY_FILE.backupWorkbenchApcExtension)).catch((err) => {
        vscode.window.showErrorMessage(err);
    });
}
/**
 * 将给定的 HTML 文本写入到指定的文件路径中
 *
 * @param {string} workbenchPath - 目标文件的路径
 * @param {string} htmlText - 要写入的 HTML 文本
 * @throws {Error} - 如果写入文件时发生错误，将显示错误消息
 */
async function writeFile(workbenchPath, htmlText) {
    await fs.writeFile(workbenchPath, htmlText, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return true;
}


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map