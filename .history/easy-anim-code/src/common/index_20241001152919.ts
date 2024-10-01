import * as vscode from 'vscode'
import { TIPS } from '../enum/tip'

function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
}

export { reloadWindow }
