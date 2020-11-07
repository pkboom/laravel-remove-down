const vscode = require("vscode");
const RemoveComments = require("./RemoveComments");

function activate(context) {
  let cleaner = new RemoveComments();

  context.subscriptions.push(
    vscode.commands.registerCommand("remove.comments", () => {
      cleaner.clean();
    })
  );
}

exports.activate = activate;
