import * as path from 'path'
import * as vscode from 'vscode'
import * as fs from 'fs/promises'
import { PRIMARY_FILE } from '../enum/tip'
import {
    createBackgroundImage,
    createVSCodeBackgroundOpacity,
    createRootValStyleTemplate,
    createCursorBackgroundColor,
    createCursorWidth,
} from '../common'

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
function getVSCodeInstallPath(): string {
    return vscode.env.appRoot
}

/**
 * 获取主文件路径
 * @since v10.0.0
 * @param fileName - 要获取路径的文件名
 * @returns 文件的完整路径，如果文件名不存在于记录中，则返回工作区文件夹路径
 */
function getPrimaryFilePath(fileName: string) {
    const installPath = path.dirname(getVSCodeInstallPath())
    const workbenchFolder = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench')

    const filePaths: Record<string, string> = {
        [PRIMARY_FILE.workbench]: PRIMARY_FILE.workbench,
        [PRIMARY_FILE.backupWorkbench]: PRIMARY_FILE.backupWorkbench,
    }
    return filePaths[fileName] ? path.join(workbenchFolder, filePaths[fileName]) : workbenchFolder
}

/**
 * 获取 VSCode 工作区文件夹路径
 * @since v10.0.0
 * @returns 包含工作区文件和工作区 APC 扩展文件内容的对象
 */
async function getVSCodeWorkbenchFolderPath() {
    const workbenchPath = getPrimaryFilePath(PRIMARY_FILE.workbench)
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return { workbenchText }
}

/**
 * 将 CSS 文本嵌入到 workbenchText 的 </head> 标签之前，生成新的 HTML 文本
 *
 * @param {string} workbenchText - 原始的 HTML 文本
 * @param {string} cssText - 要嵌入的 CSS 文本
 * @returns {string} - 新的 HTML 文本，其中包含了嵌入的 CSS 样式
 */
async function getResultHtml(workbenchText: string, cssText: string) {
    const rootVal = createRootValStyleTemplate()
    const backgroundImage = await createBackgroundImage()
    let backgroundOpacityStyle = ''
    if (backgroundImage.length > 0) {
        backgroundOpacityStyle = createVSCodeBackgroundOpacity()
    }

    const cursorWidth = createCursorWidth()
    const cursorBackgroundColor = createCursorBackgroundColor()

    return workbenchText?.replace(
        /(<\/head>)/,
        `\n<style>
        body{background-image: url(${backgroundImage});background-repeat: no-repeat;background-size: cover;}
        ${rootVal}
        ${cssText}
        ${backgroundOpacityStyle}
        ${cursorWidth}
        ${cursorBackgroundColor}
        </style>\n</head>`
    )
}

/**
 * 检查备份文件是否存在
 * @since v10.0.0
 * @param filePath - 要检查的文件路径
 * @returns 如果文件存在，返回 true，否则返回 false
 */
async function checkIfBackupFileExists(filePath: string) {
    try {
        await fs.access(filePath)
        return true
    } catch (error) {
        return false
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
async function backupFile(src: string, source: string) {
    await fs.copyFile(src, source).catch((err) => {
        vscode.window.showErrorMessage(`备份文件失败: ${err}`)
    })
    return true
}

/**
 * 备份当前工作区文件。
 * 如果备份文件已存在，则不进行备份。
 *
 * @returns {Promise<boolean>} 如果备份成功，返回 true；如果备份文件已存在，返回 false。
 */
async function backupWorkbench() {
    const workbench = getPrimaryFilePath(PRIMARY_FILE.workbench)
    const backUpWorkbench = getPrimaryFilePath(PRIMARY_FILE.backupWorkbench)

    if (await checkIfBackupFileExists(backUpWorkbench)) return false
    await backupFile(workbench, backUpWorkbench)
    return true
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
    const backupWorkbenchPath = getPrimaryFilePath(PRIMARY_FILE.backupWorkbench)

    const backupWorkbenchText = await fs.readFile(backupWorkbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })

    return {
        backupWorkbenchText,
    }
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
    await fs.unlink(getPrimaryFilePath(PRIMARY_FILE.backupWorkbench)).catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return true
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
    getPrimaryFilePath,
    getBackupWorkbenchFile,
    removeBackUpWorkBenchFile,
    getEasyAnimCodeExtensionsCss,
    getVSCodeWorkbenchFolderPath,
}
