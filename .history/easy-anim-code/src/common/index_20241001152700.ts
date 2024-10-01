import * as vscode from 'vscode'

function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
}

export { reloadWindow }
