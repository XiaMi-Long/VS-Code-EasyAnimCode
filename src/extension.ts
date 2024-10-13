import * as vscode from 'vscode'
import { enabledRestart, resetEasyAnimCodeConfig, showIsBackUpNotification, unInstallSuccess } from './common/index'
import {
    writeFile,
    getResultHtml,
    backupWorkbench,
    getPrimaryFilePath,
    getBackupWorkbenchFile,
    removeBackUpWorkBenchFile,
    getEasyAnimCodeExtensionsCss,
    getVSCodeWorkbenchFolderPath,
} from './file/index'
import { COMMANDS, PRIMARY_FILE, TIPS, WORKBENCH_HTML_TEMPLATE } from './enum/tip'

export function activate(context: vscode.ExtensionContext) {
    // 1. 拿到自带的css
    // 2. 获取要注入的文件
    // 3. 注入文件
    // 4. 备份文件
    // 5. 重启
    // 6. 卸载恢复文件
    const enable = vscode.commands.registerCommand(COMMANDS.enable, async () => {
        try {
            // 1. 从扩展包中提取 CSS 样式用于注入 VSCode 核心 HTML 文件
            const cssFileText = await getEasyAnimCodeExtensionsCss()
            // 2. 获取要注入的文件
            const { workbenchText } = await getVSCodeWorkbenchFolderPath()
            // 3. 组合最终要注入的html文件
            const htmlText = await getResultHtml(workbenchText as string, cssFileText as string)
            // 4. 备份文件
            const isWorkbenchBackedUp = await backupWorkbench()
            // 检测是否已经执行过覆盖
            if (isWorkbenchBackedUp) {
                // 5. 写入文件
                await writeFile(getPrimaryFilePath(PRIMARY_FILE.workbench), htmlText as string)
                // 6. 弹出提示框，手动重启
                enabledRestart()
            } else {
                // 6. 弹出提示框，已经执行过覆盖
                showIsBackUpNotification()
            }
        } catch (error) {
            console.log(error)

            vscode.window.showErrorMessage(TIPS.errorText)
        }
    })

    // 1. 拿到备份的文件
    // 2. 恢复文件
    // 3. 重启
    const disable = vscode.commands.registerCommand(COMMANDS.disable, async () => {
        try {
            // 1. 获取备份文件内容
            const { backupWorkbenchText } = await getBackupWorkbenchFile()
            // 2. 恢复文件
            await writeFile(getPrimaryFilePath(PRIMARY_FILE.workbench), backupWorkbenchText as string)
            // 3. 删除备份文件
            await removeBackUpWorkBenchFile()
            // 4. 还原插件配置参数
            resetEasyAnimCodeConfig()
            // 5. 弹出提示框，手动重启
            enabledRestart()
        } catch (error) {
            vscode.window.showErrorMessage(TIPS.errorText)
        }
    })

    const clear = vscode.commands.registerCommand(COMMANDS.reset, async () => {
        try {
            // 1. 写入template到核心文件中
            await writeFile(getPrimaryFilePath(PRIMARY_FILE.workbench), WORKBENCH_HTML_TEMPLATE)
            // 2. 删除备份文件
            removeBackUpWorkBenchFile()
            // 3. 还原插件配置参数
            resetEasyAnimCodeConfig()
            // 4. 重启
            unInstallSuccess()
        } catch (error) {
            vscode.window.showErrorMessage(TIPS.errorText)
        }
    })

    context.subscriptions.push(enable)
    context.subscriptions.push(disable)
    context.subscriptions.push(clear)
}

export function deactivate() {}
