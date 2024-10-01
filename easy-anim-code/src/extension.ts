import * as path from 'path'
import * as vscode from 'vscode'
import { reloadWindow, enabledRestart } from './common/index'
import { getEasyAnimCodeExtensionsCss, getVsCodeInstallPath, getVsCodeWorkbenchFolderPath, getResultHtml, writeFile } from './file/index'

// 1. 拿到自带的css
// 2. 获取要注入的文件
// 3. 注入文件
// 4. 备份文件
// 5. 重启
// 6. 卸载恢复文件

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('easy-anim-code.enable', async () => {
        // enabledRestart()
        // 1. 拿到自带的css
        const cssFileText = await getEasyAnimCodeExtensionsCss()
        // 2. 获取vscode的安装路径
        const vscodeDir = getVsCodeInstallPath()
        // 3. 获取要注入的文件
        const { workbenchText, workbenchPath } = await getVsCodeWorkbenchFolderPath(vscodeDir)
        // 4. 组合最终要注入的html文件
        const htmlText = getResultHtml(workbenchText as string, cssFileText as string)
        // 5. 写入文件
        writeFile(htmlText as string, workbenchPath)
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
