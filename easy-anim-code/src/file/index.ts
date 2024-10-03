import * as path from 'path'
import * as vscode from 'vscode'
import * as fs from 'fs/promises'
import { BACKUP_FILE_SUFFIX } from '../enum/tip'

/**
 * 异步获取 Easy Anim Code 扩展的 CSS 文件内容
 *
 * @returns {string} 一个 Promise，成功时解析为包含 CSS 文件内容的字符串
 */
async function getEasyAnimCodeExtensionsCss() {
    const path = __dirname + '/index.css'
    const text = await fs.readFile(path, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return text
}

/**
 * 异步获取 VS Code 安装路径
 *
 * @returns {string} 一个 Promise，成功时解析为 VS Code 安装路径的字符串
 */
function getVsCodeInstallPath(): string {
    return vscode.env.appRoot
}

/**
 * 获取 VS Code 工作区文件夹路径
 *
 * @param {string} vscodeInstallPath - VS Code 安装路径
 * @returns {Promise<{ workbenchText: string, workbenchPath: string, workbenchApcExtensionText: string, workbenchApcExtensionPath: string }>} - 包含工作区文本、路径和 APC 扩展文本、路径的对象
 * @throws {Error} - 如果读取文件时发生错误，将显示错误消息
 */
async function getVsCodeWorkbenchFolderPath(vscodeInstallPath: string) {
    const installPath = path.dirname(vscodeInstallPath)
    const workbenchFolder = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench')
    const workbenchPath = path.join(workbenchFolder, 'workbench.html')
    const workbenchApcExtensionPath = path.join(workbenchFolder, 'workbench-apc-extension.html')
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    const workbenchApcExtensionText = await fs.readFile(workbenchApcExtensionPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return { workbenchText, workbenchPath, workbenchFolder, workbenchApcExtensionText, workbenchApcExtensionPath }
}

/**
 * 将 CSS 文本嵌入到 workbenchText 的 </head> 标签之前，生成新的 HTML 文本
 *
 * @param {string} workbenchText - 原始的 HTML 文本
 * @param {string} cssText - 要嵌入的 CSS 文本
 * @returns {string} - 新的 HTML 文本，其中包含了嵌入的 CSS 样式
 */
function getResultHtml(workbenchText: string, cssText: string) {
    return workbenchText?.replace(/(<\/head>)/, `\n<style>${cssText}</style>\n</head>`)
}

/**
 * 检查备份文件是否存在
 * @param folder - 文件夹路径
 * @param filePath - 文件路径
 * @param suffix - 后缀名
 * @returns 如果文件存在，返回 true，否则返回 false
 */
async function checkIfBackupFileExists(folder: string, filePath: string, suffix: string) {
    try {
        await fs.access(path.join(folder, suffix + path.basename(filePath)))
        return true
    } catch (error) {
        return false
    }
}

/**
 * 备份文件到指定路径
 * @param currentPath - 当前路径
 * @param source - 源文件路径
 * @param suffix - 备份文件后缀
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupFile(currentPath: string, source: string, suffix: string) {
    const targetFile = path.join(currentPath, suffix + path.basename(source))
    const err = (await fs.copyFile(source, targetFile)) as void | object
    if (err) {
        vscode.window.showErrorMessage(`备份文件失败: ${err}`)
    }
}

/**
 * 备份工作台文件
 * @param workbenchFolder - 工作台文件夹路径
 * @param workbenchPath - 工作台文件路径
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupWorkbench(workbenchFolder: string, workbenchPath: string) {
    if (await checkIfBackupFileExists(workbenchFolder, workbenchPath, BACKUP_FILE_SUFFIX)) return false
    backupFile(workbenchFolder, workbenchPath, BACKUP_FILE_SUFFIX)
    return true
}

/**
 * 备份 APC 扩展的工作台文件
 * @param workbenchFolder - 工作台文件夹的路径
 * @param workbenchApcExtensionPath - APC 扩展工作台文件的路径
 * @returns 如果备份成功，返回 undefined，否则返回错误对象
 */
async function backupWorkbenchApcExtension(workbenchFolder: string, workbenchApcExtensionPath: string) {
    if (await checkIfBackupFileExists(workbenchFolder, workbenchApcExtensionPath, BACKUP_FILE_SUFFIX)) return false
    backupFile(workbenchFolder, workbenchApcExtensionPath, BACKUP_FILE_SUFFIX)
    return true
}

/**
 * 获取备份的工作台文件
 *
 * @param {string} vscodeInstallPath - Visual Studio Code 的安装路径
 * @returns {Promise<Object>} - 包含备份文件路径和内容的对象
 * @throws {Error} - 如果读取文件时发生错误，将显示错误消息
 */
async function getBackupWorkbenchFile(vscodeInstallPath: string) {
    const installPath = path.dirname(vscodeInstallPath)
    const workbenchFolder = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench')
    const workbenchPath = path.join(workbenchFolder, 'workbench.html')
    const workbenchApcExtensionPath = path.join(workbenchFolder, 'workbench-apc-extension.html')
    const backupWorkbenchPath = path.join(workbenchFolder, BACKUP_FILE_SUFFIX + 'workbench.html')
    const backupWorkbenchApcExtensionPath = path.join(workbenchFolder, BACKUP_FILE_SUFFIX + 'workbench-apc-extension.html')

    const backupWorkbenchText = await fs.readFile(backupWorkbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })

    const backupWorkbenchApcExtensionText = await fs.readFile(backupWorkbenchApcExtensionPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })

    return {
        workbenchPath,
        workbenchApcExtensionPath,
        workbenchFolder,
        backupWorkbenchPath,
        backupWorkbenchText,
        backupWorkbenchApcExtensionPath,
        backupWorkbenchApcExtensionText,
    }
}

/**
 * 删除备份的工作台文件
 *
 * @param {string} backupWorkbenchPath - 备份工作台文件的路径
 * @returns {Promise<void>} - 当文件成功删除时解析的 Promise
 * @throws {Error} - 如果删除文件时发生错误，将显示错误消息
 */
async function removeBackUpWorkBenchFile(backupWorkbenchPath: string) {
    await fs.unlink(backupWorkbenchPath).catch((err) => {
        vscode.window.showErrorMessage(err)
    })
}

/**
 * 删除备份的工作台 APC 扩展文件
 *
 * @param {string} backupWorkbenchApcExtensionPath - 备份的工作台 APC 扩展文件的路径
 * @returns {Promise<void>} - 当文件成功删除时解析的 Promise
 * @throws {Error} - 如果删除文件时发生错误，将显示错误消息
 */
async function removeBackUpWorkBenchApcExtensionFile(backupWorkbenchApcExtensionPath: string) {
    await fs.unlink(backupWorkbenchApcExtensionPath).catch((err) => {
        vscode.window.showErrorMessage(err)
    })
}

/**
 * 将给定的 HTML 文本写入到指定的文件路径中
 *
 * @param {string} workbenchPath - 目标文件的路径
 * @param {string} htmlText - 要写入的 HTML 文本
 * @throws {Error} - 如果写入文件时发生错误，将显示错误消息
 */
async function writeFile(workbenchPath: string, htmlText: string) {
    await fs.writeFile(workbenchPath, htmlText, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return true
}

export {
    writeFile,
    getResultHtml,
    backupWorkbench,
    getVsCodeInstallPath,
    getBackupWorkbenchFile,
    removeBackUpWorkBenchFile,
    backupWorkbenchApcExtension,
    getEasyAnimCodeExtensionsCss,
    getVsCodeWorkbenchFolderPath,
    removeBackUpWorkBenchApcExtensionFile,
}
