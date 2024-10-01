import * as vscode from 'vscode'
import { TIPS } from '../enum/tip'

function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
}

function enabledRestart() {
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.restartText }).then(reloadWindow)
}

export { reloadWindow }
