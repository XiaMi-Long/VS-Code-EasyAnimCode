import * as vscode from 'vscode'
import { reloadWindow } from './common/index'

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('easy-anim-code.enable', () => {
        vscode.window.showInformationMessage('Hello World from easy-anim-code!')
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
