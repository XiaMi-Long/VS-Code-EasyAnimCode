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
// 1. 拿到自带的css
// 2. 获取要注入的文件
// 3. 注入文件
// 4. 备份文件
// 5. 重启
// 6. 卸载恢复文件
function activate(context) {
    const disposable = vscode.commands.registerCommand('easy-anim-code.enable', async () => {
        // enabledRestart()
        // 1. 拿到自带的css
        const cssFileText = await (0, index_1.getEasyAnimCodeExtensionsCss)();
        // 2. 获取vscode的安装路径
        const vscodeDir = (0, index_1.getVsCodeInstallPath)();
        // 3. 获取要注入的文件
        const { workbenchText, workbenchPath } = await (0, index_1.getVsCodeWorkbenchFolderPath)(vscodeDir);
        // 4. 组合最终要注入的html文件
        const htmlText = (0, index_1.getResultHtml)(workbenchText, cssFileText);
        // 5. 写入文件
        (0, index_1.writeFile)(htmlText, workbenchPath);
    });
    context.subscriptions.push(disposable);
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
exports.getEasyAnimCodeExtensionsCss = getEasyAnimCodeExtensionsCss;
exports.getVsCodeInstallPath = getVsCodeInstallPath;
exports.getVsCodeWorkbenchFolderPath = getVsCodeWorkbenchFolderPath;
exports.getResultHtml = getResultHtml;
exports.writeFile = writeFile;
const path = __importStar(__webpack_require__(4));
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(3));
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
 * 异步获取 VS Code 工作区文件夹路径
 *
 * @param {string} vscodeInstallPath - VS Code 安装路径
 * @returns {Promise<{ workbenchText: string, workbenchPath: string }>} - 一个 Promise，成功时解析为包含工作区文本和路径的对象
 * @throws {Error} - 如果读取文件时发生错误，将显示错误消息
 */
async function getVsCodeWorkbenchFolderPath(vscodeInstallPath) {
    const installPath = path.dirname(vscodeInstallPath);
    const workbenchPath = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench', 'workbench.html');
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
    return { workbenchText, workbenchPath };
}
function getResultHtml(workbenchText, cssText) {
    return workbenchText?.replace(/(<\/head>)/, `\n <style>${cssText}<style> \n</head>`);
}
async function writeFile(htmlText, workbenchPath) {
    await fs.writeFile(workbenchPath, htmlText, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err);
    });
}


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

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