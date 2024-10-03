import * as path from 'path'
import * as vscode from 'vscode'
import { reloadWindow, enabledRestart, showIsBackUpNotification, unInstallSuccess } from './common/index'
import {
    getEasyAnimCodeExtensionsCss,
    getVsCodeInstallPath,
    getVsCodeWorkbenchFolderPath,
    getResultHtml,
    writeFile,
    backupWorkbench,
    backupWorkbenchApcExtension,
    getBackupWorkbenchFile,
    removeBackUpWorkBenchFile,
    removeBackUpWorkBenchApcExtensionFile,
} from './file/index'
import { workbenchApcExtensionHtmlTemplate, workbenchHtmlTemplate } from './enum/tip'

export function activate(context: vscode.ExtensionContext) {
    // 1. 拿到自带的css
    // 2. 获取要注入的文件
    // 3. 注入文件
    // 4. 备份文件
    // 5. 重启
    // 6. 卸载恢复文件
    const enable = vscode.commands.registerCommand('easy-anim-code.enable', async () => {
        // 1. 拿到自带的css
        const cssFileText = await getEasyAnimCodeExtensionsCss()
        // 2. 获取vscode的安装路径
        const vscodeDir = getVsCodeInstallPath()
        // 3. 获取要注入的文件
        const { workbenchText, workbenchPath, workbenchFolder, workbenchApcExtensionText, workbenchApcExtensionPath } =
            await getVsCodeWorkbenchFolderPath(vscodeDir)
        // 4. 组合最终要注入的html文件
        // vscode中有workbench和workbench-apc-extension两个html文件，可能在新版本的vscode中，只修改前者无效，会被后者html的加载覆盖，所以需要修改两个文件
        const htmlText = getResultHtml(workbenchText as string, cssFileText as string)
        const htmlApcText = getResultHtml(workbenchApcExtensionText as string, cssFileText as string)
        // 5. 备份文件
        const isWorkbenchBackedUp = await backupWorkbench(workbenchFolder, workbenchPath)
        const isWorkbenchApcBackedUp = await backupWorkbenchApcExtension(workbenchFolder, workbenchApcExtensionPath)

        // 检测是否已经执行过覆盖
        if (isWorkbenchBackedUp && isWorkbenchApcBackedUp) {
            // 6. 写入文件
            await writeFile(workbenchPath, htmlText as string)
            await writeFile(workbenchApcExtensionPath, htmlApcText as string)
            // 7. 弹出提示框，手动重启
            enabledRestart()
        } else {
            // 8. 弹出提示框，已经执行过覆盖
            showIsBackUpNotification()
        }
    })

    // 1. 拿到备份的文件
    // 2. 恢复文件
    // 3. 重启
    const disable = vscode.commands.registerCommand('easy-anim-code.disable', async () => {
        // 1. 获取vscode的安装路径
        const vscodeDir = getVsCodeInstallPath()
        // 2. 获取备份文件内容
        const {
            workbenchPath,
            workbenchApcExtensionPath,
            backupWorkbenchPath,
            backupWorkbenchApcExtensionPath,
            backupWorkbenchText,
            backupWorkbenchApcExtensionText,
        } = await getBackupWorkbenchFile(vscodeDir)
        // 3. 恢复文件
        await writeFile(workbenchPath as string, backupWorkbenchText as string)
        await writeFile(workbenchApcExtensionPath as string, backupWorkbenchApcExtensionText as string)
        // 4. 删除备份文件
        await removeBackUpWorkBenchFile(backupWorkbenchPath)
        await removeBackUpWorkBenchApcExtensionFile(backupWorkbenchApcExtensionPath)

        // 5. 弹出提示框，手动重启
        enabledRestart()
    })

    context.subscriptions.push(enable)
    context.subscriptions.push(disable)
}

export async function deactivate() {
    // 1. 获取vscode的安装路径
    const vscodeDir = getVsCodeInstallPath()
    // 2. 获取核心文件路径
    const { workbenchPath, workbenchApcExtensionPath } = await getVsCodeWorkbenchFolderPath(vscodeDir)
    // 3. 写入template到核心文件中
    await writeFile(workbenchPath as string, workbenchHtmlTemplate as string)
    await writeFile(workbenchApcExtensionPath as string, workbenchApcExtensionHtmlTemplate as string)
    // 4. 重启
    unInstallSuccess()
    return true
}
