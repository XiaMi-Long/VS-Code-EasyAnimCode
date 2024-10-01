import * as path from 'path'
import * as vscode from 'vscode'
import * as fs from 'fs/promises'

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
 * 异步获取 VS Code 工作区文件夹路径
 *
 * @param {string} vscodeInstallPath - VS Code 安装路径
 * @returns {Promise<{ workbenchText: string, workbenchPath: string }>} - 一个 Promise，成功时解析为包含工作区文本和路径的对象
 * @throws {Error} - 如果读取文件时发生错误，将显示错误消息
 */
async function getVsCodeWorkbenchFolderPath(vscodeInstallPath: string) {
    const installPath = path.dirname(vscodeInstallPath)
    const workbenchPath = path.join(installPath, 'app', 'out', 'vs', 'code', 'electron-sandbox', 'workbench', 'workbench.html')
    const workbenchText = await fs.readFile(workbenchPath, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
    return { workbenchText, workbenchPath }
}

function getResultHtml(workbenchText: string, cssText: string) {
    return workbenchText?.replace(/(<\/head>)/, `\n <style>${cssText}<style> \n</head>`)
}

async function writeFile(htmlText: string, workbenchPath: string) {
    await fs.writeFile(workbenchPath, htmlText, 'utf8').catch((err) => {
        vscode.window.showErrorMessage(err)
    })
}

export { getEasyAnimCodeExtensionsCss, getVsCodeInstallPath, getVsCodeWorkbenchFolderPath, getResultHtml, writeFile }
