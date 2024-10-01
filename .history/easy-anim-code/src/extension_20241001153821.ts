import * as vscode from 'vscode'
import { reloadWindow, enabledRestart } from './common/index'

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('12312', { title: '12312' })
    const disposable = vscode.commands.registerCommand('easy-anim-code.enable', () => {
        enabledRestart()
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
