const vscode = require("vscode");
const RemoveDown = require("./RemoveDown");

function activate(context) {
  let remover = new RemoveDown();

  context.subscriptions.push(
    vscode.commands.registerCommand("remove.down", () => {
      remover.clean();
    })
  );
}

exports.activate = activate;
