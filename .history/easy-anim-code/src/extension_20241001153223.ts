import * as vscode from 'vscode'
import { reloadWindow, enabledRestart } from './common/index'

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('easy-anim-code.enable', () => {
        enabledRestart()
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
