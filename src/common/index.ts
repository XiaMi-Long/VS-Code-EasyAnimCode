import * as vscode from 'vscode'
import { TIPS, EXTENSION_CONFIG } from '../enum/tip'

/**
 * 重新加载当前窗口
 * 这个函数执行一个命令来重新加载 VS Code 窗口
 */
function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
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
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.isBackUpText })
}

/**
 * 启用重启功能
 * 这个函数会显示一个信息消息，提示用户需要重启应用以使更改生效，然后执行重启操作
 * @param {string} TIPS.enableText - 显示给用户的提示信息
 * @param {string} TIPS.restartText - 重启操作的标题
 */
function enabledRestart() {
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.restartText }).then(reloadWindow)
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
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.restartText }).then(reloadWindow)
}

function getEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code')
    let primaryColor = config.get(EXTENSION_CONFIG.PrimaryColor.key)

    return {
        primaryColor,
    }
}

function createRootValStyleTemplate() {
    const { primaryColor } = getEasyAnimCodeConfig()
    return `
        :root {
            --vscode-style-easy-anim-red-color: ${primaryColor};
        }
    `
}

function resetEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code')
    config.update(EXTENSION_CONFIG.PrimaryColor.key, EXTENSION_CONFIG.PrimaryColor.default, true)
}

export { reloadWindow, enabledRestart, unInstallSuccess, showIsBackUpNotification, createRootValStyleTemplate, resetEasyAnimCodeConfig }
