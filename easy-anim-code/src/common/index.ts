import * as vscode from 'vscode'
import { TIPS } from '../enum/tip'
import * as fs from 'fs/promises'

/**
 * 重新加载当前窗口
 * 这个函数执行一个命令来重新加载 VS Code 窗口
 */
function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
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

export { reloadWindow, enabledRestart }
