import * as path from 'path'
import * as vscode from 'vscode'
import { reloadWindow, enabledRestart } from './common/index'
import {
    getEasyAnimCodeExtensionsCss,
    getVsCodeInstallPath,
    getVsCodeWorkbenchFolderPath,
    getResultHtml,
    writeFile,
    backupWorkbench,
    backupWorkbenchApcExtension,
} from './file/index'

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
        backupWorkbench(workbenchFolder, workbenchPath)
        backupWorkbenchApcExtension(workbenchFolder, workbenchApcExtensionPath)
        // 6. 写入文件
        writeFile(htmlText as string, workbenchPath)
        writeFile(htmlApcText as string, workbenchApcExtensionPath)
        // 7. 重启
        enabledRestart()
    })

    // 1. 拿到备份的文件
    // 2. 恢复文件
    // 3. 重启
    const disable = vscode.commands.registerCommand('easy-anim-code.disable', async () => {})

    context.subscriptions.push(enable)
    context.subscriptions.push(disable)
}

export function deactivate() {}
