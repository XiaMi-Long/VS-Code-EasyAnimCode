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
const index_1 = __webpack_require__(5);
const index_2 = __webpack_require__(2);
function activate(context) {
    // 1. 拿到自带的css
    // 2. 获取要注入的文件
    // 3. 注入文件
    // 4. 备份文件
    // 5. 重启
    // 6. 卸载恢复文件
    const enable = vscode.commands.registerCommand('easy-anim-code.enable', async () => {
        // 1. 拿到自带的css
        const cssFileText = await (0, index_2.getEasyAnimCodeExtensionsCss)();
        // 2. 获取vscode的安装路径
        const vscodeDir = (0, index_2.getVsCodeInstallPath)();
        // 3. 获取要注入的文件
        const { workbenchText, workbenchPath, workbenchFolder, workbenchApcExtensionText, workbenchApcExtensionPath } = await (0, index_2.getVsCodeWorkbenchFolderPath)(vscodeDir);
        // 4. 组合最终要注入的html文件
        // vscode中有workbench和workbench-apc-extension两个html文件，可能在新版本的vscode中，只修改前者无效，会被后者html的加载覆盖，所以需要修改两个文件
        const htmlText = (0, index_2.getResultHtml)(workbenchText, cssFileText);
        const htmlApcText = (0, index_2.getResultHtml)(workbenchApcExtensionText, cssFileText);
        // 5. 备份文件
        (0, index_2.backupWorkbench)(workbenchFolder, workbenchPath);
        (0, index_2.backupWorkbenchApcExtension)(workbenchFolder, workbenchApcExtensionPath);
        // 6. 写入文件
        (0, index_2.writeFile)(htmlText, workbenchPath);
        (0, index_2.writeFile)(htmlApcText, workbenchApcExtensionPath);
        // 7. 重启
        (0, index_1.enabledRestart)();
    });
    // 1. 拿到备份的文件
    // 2. 恢复文件
    // 3. 重启
    const disable = vscode.commands.registerCommand('easy-anim-code.disable', async () => { });
    context.subscriptions.push(enable);
    context.subscriptions.push(disable);
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
exports.writeFile = writeFile;
exports.getResultHtml = getResultHtml;
exports.backupWorkbench = backupWorkbench;
exports.getVsCodeInstallPath = getVsCodeInstallPath;
exports.backupWorkbenchApcExtension = backupWorkbenchApcExtension;
exports.getEasyAnimCodeExtensionsCss = getEasyAnimCodeExtensionsCss;
exports.getVsCodeWorkbenchFolderPath = getVsCodeWorkbenchFolderPath;
const path = __importStar(__webpack_require__(3));
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(4));
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
function getVsCodeInstallPath() {
    return vscode.env.appRoot;
}
/**
 * 获取 VS Code 工作区文件夹路径
 *
 * @param {string} vscodeInstallPath - VS Code 安装路径
 * @returns {Promise<{ workbenchText: string, workbenchPath: string, workbenchApcExtensionText: string, workbenchApcExtensionPath: string }>} - 包含工作区文本、路径和 APC 扩展文本、路径的对象
 * @throws {Error} - 如果读取文件时发生错误，将显示错误消息
 */
async function getVsCodeWorkbenchFolderPath(vscodeInstallPath) {
    const installPath = path.dirname(vscodeInstallPath);
    const workbenchFolder = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench');
    const workbenchPath = path.join(workbenchFolder, 'workbench.html');
    const workbenchApcExtensionPath = path.join(workbenchFolder, 'workbench-apc-extension.html');
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    const workbenchApcExtensionText = await fs.readFile(workbenchApcExtensionPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return { workbenchText, workbenchPath, workbenchFolder, workbenchApcExtensionText, workbenchApcExtensionPath };
}
/**
 * 将 CSS 文本嵌入到 workbenchText 的 </head> 标签之前，生成新的 HTML 文本
 *
 * @param {string} workbenchText - 原始的 HTML 文本
 * @param {string} cssText - 要嵌入的 CSS 文本
 * @returns {string} - 新的 HTML 文本，其中包含了嵌入的 CSS 样式
 */
function getResultHtml(workbenchText, cssText) {
    return workbenchText?.replace(/(<\/head>)/, `\n<style>${cssText}</style>\n</head>`);
}
/**
 * 检查备份文件是否存在
 * @param folder - 文件夹路径
 * @param filePath - 文件路径
 * @param suffix - 后缀名
 * @returns 如果文件存在，返回 true，否则返回 false
 */
async function checkIfBackupFileExists(folder, filePath, suffix) {
    try {
        await fs.access(path.join(folder, suffix + path.basename(filePath)));
        return true;
    }
    catch (error) {
        return false;
    }
}
/**
 * 备份文件到指定路径
 * @param currentPath - 当前路径
 * @param source - 源文件路径
 * @param suffix - 备份文件后缀
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupFile(currentPath, source, suffix) {
    const targetFile = path.join(currentPath, suffix + path.basename(source));
    const err = (await fs.copyFile(source, targetFile));
    if (err) {
        vscode.window.showErrorMessage(`备份文件失败: ${err}`);
    }
}
/**
 * 备份工作台文件
 * @param workbenchFolder - 工作台文件夹路径
 * @param workbenchPath - 工作台文件路径
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupWorkbench(workbenchFolder, workbenchPath) {
    const suffix = 'easy-anim-code-backup-';
    if (await checkIfBackupFileExists(workbenchFolder, workbenchPath, suffix))
        return;
    backupFile(workbenchFolder, workbenchPath, suffix);
}
/**
 * 备份 APC 扩展的工作台文件
 * @param workbenchFolder - 工作台文件夹的路径
 * @param workbenchApcExtensionPath - APC 扩展工作台文件的路径
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupWorkbenchApcExtension(workbenchFolder, workbenchApcExtensionPath) {
    const suffix = 'easy-anim-code-backup-';
    if (await checkIfBackupFileExists(workbenchFolder, workbenchApcExtensionPath, suffix))
        return;
    backupFile(workbenchFolder, workbenchApcExtensionPath, suffix);
}
/**
 * 将给定的 HTML 文本写入到指定的文件路径中
 *
 * @param {string} htmlText - 要写入的 HTML 文本
 * @param {string} workbenchPath - 目标文件的路径
 * @throws {Error} - 如果写入文件时发生错误，将显示错误消息
 */
async function writeFile(htmlText, workbenchPath) {
    await fs.writeFile(workbenchPath, htmlText, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
}


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 5 */
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
const vscode = __importStar(__webpack_require__(1));
const tip_1 = __webpack_require__(6);
/**
 * 重新加载当前窗口
 * 这个函数执行一个命令来重新加载 VS Code 窗口
 */
function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow');
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


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIPS = void 0;
const TIPS = {
    enableText: '来自easy-anim-code的提示',
    restartText: 'restart',
};
exports.TIPS = TIPS;


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