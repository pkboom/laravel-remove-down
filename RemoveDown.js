const vscode = require("vscode");

module.exports = class RemoveComments {
  async clean() {
    if (this.activeEditor() === undefined) {
      return;
    }

    let activeDocument = this.activeDocument().uri;

    if (activeDocument === undefined) {
      return;
    }

    await this.removeComments(activeDocument);
  }

  async removeComments(activeDocument) {
    let startLine, endLine;

    let doc = await vscode.workspace.openTextDocument(activeDocument);

    for (let line = doc.lineCount - 1; line > 0; line--) {
      let textLine = doc.lineAt(line).text.trim();

      if (/^\*\//.test(textLine)) {
        endLine = line + 1;

        console.log(endLine);

        continue;
      }

      if (/^\/\*/.test(textLine)) {
        startLine = line;
        console.log(startLine);

        this.activeEditor().insertSnippet(
          new vscode.SnippetString(),
          this.range(startLine, endLine)
        );
      }

      if (/\/\//.test(textLine)) {
        this.activeEditor().insertSnippet(
          new vscode.SnippetString("\t\t\t\n"),
          this.range(line, line + 1)
        );
      }
    }
  }

  range(startLine, endLine) {
    return new vscode.Range(
      new vscode.Position(startLine, 0),
      new vscode.Position(endLine, 0)
    );
  }

  activeEditor() {
    return vscode.window.activeTextEditor;
  }

  activeDocument() {
    return this.activeEditor().document;
  }
};
