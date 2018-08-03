'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as childProcess from 'child_process';
import * as sh from 'shelljs';
import * as stripAnsi from 'strip-ansi';
import * as promisify from 'util.promisify';

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-ghq" is now active!');

    context.subscriptions.push(vscode.commands.registerCommand('extension.ghqGet', ghqGet));
    context.subscriptions.push(vscode.commands.registerCommand('extension.ghqOpen', ghqOpen));
    context.subscriptions.push(vscode.commands.registerCommand('extension.ghqOpenInNewWindow', ghqOpenInNewWindow));
}

export function deactivate() {
}

let isGhqAvailable = sh.which('ghq');

async function ghqOpen(){
    const uri = await ghqListRepositoryAndPick();
    if(uri) vscode.commands.executeCommand('vscode.openFolder', uri);
}

async function ghqOpenInNewWindow(){
    const uri = await ghqListRepositoryAndPick();
    if(uri) vscode.commands.executeCommand('vscode.openFolder', uri, true);
}

async function ghqListRepositoryAndPick() {
    if (!isGhqAvailable) {
        vscode.window.showWarningMessage('ghq is not installed.');
        return;
    }

    const ghqRoot = childProcess.execSync('ghq root').toString().trim();

    const stdout = await promisify(childProcess.exec)('ghq list').catch(err => {
        vscode.window.showInformationMessage(err.name + ': ' + err.message);
        return '';
    });
    const ghqReposList = stdout.split('\n');
    const selectedRepository = await vscode.window.showQuickPick(ghqReposList);
    if (selectedRepository === undefined || selectedRepository === '') return '';

    const uri = vscode.Uri.parse('file://' + ghqRoot + '/' + selectedRepository);
    if (fs.existsSync(uri.fsPath)) return uri;
}

function ghqGet() {
    if (!isGhqAvailable) {
        vscode.window.showWarningMessage('ghq is not installed.');
        return;
    }

    vscode.window.showInputBox().then(
        function(input){
            if (input === undefined || input === "") {
                return;
            } else {
                let ghqProcess = childProcess.spawn('ghq', ['get', input]);
                let ghqOutputChannel = vscode.window.createOutputChannel('ghq');
                ghqOutputChannel.show(true);

                ghqProcess.stdout.on('data', (data) => {
                    ghqOutputChannel.append(stripAnsi(data.toString()));
                });

                ghqProcess.stderr.on('data', (data) => {
                    ghqOutputChannel.append(stripAnsi(data.toString()));
                });

                ghqProcess.on('close', (code) => {
                    ghqOutputChannel.appendLine('ghq process finished with code ' + code);
                });
            }
        },
        function(reason) {
            vscode.window.showWarningMessage(reason.toString());
        }
    );
}
