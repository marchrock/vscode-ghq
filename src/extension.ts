'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as childProcess from 'child_process';
import * as sh from 'shelljs';

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-ghq" is now active!');

    context.subscriptions.push(vscode.commands.registerCommand('extension.ghqMove', ghqMove));
}

export function deactivate() {
}

let isGhqAvailable = sh.which('ghq');

function ghqMove() {
    if (!isGhqAvailable) {
        vscode.window.showWarningMessage('ghq is not installed.');
        return;
    }

    let ghqRoot = childProcess.execSync('ghq root').toString().trim();

    childProcess.exec('ghq list', (err, stdout, stderr) => {
        if (err) {
            vscode.window.showInformationMessage(err.name + ': ' + err.message);
        }

        let ghqReposList = stdout.split("\n");
        vscode.window.showQuickPick(ghqReposList).then(
            function(selectedRepository) {
                if (selectedRepository === undefined || selectedRepository === "") {
                    return;
                } else {
                    let uri = vscode.Uri.parse('file://' + ghqRoot + '/' + selectedRepository);
                    if (fs.existsSync(uri.fsPath)){
                        let success = vscode.commands.executeCommand('vscode.openFolder', uri);
                    }
                }
            },
            function(reason) {
                vscode.window.showWarningMessage(reason.toString())
            });
    });
}
