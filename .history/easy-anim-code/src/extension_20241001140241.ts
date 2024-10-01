import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('easy-anim-code.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from easy-anim-code!')
    })

    context.subscriptions.push(disposable)
}

export function deactivate() {}
