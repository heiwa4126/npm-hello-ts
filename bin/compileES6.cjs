#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const recast = require("recast");

/**
 * 指定されたファイルをトランスパイルし、import/export文のパスを変更したうえで保存する。
 * 変更されたimport文,export文を表示する。
 *
 * @param {string} inputFilename - トランスパイルするファイルのパス。
 * @param {string} outputFilename - トランスパイルしたファイルを保存するパス。
 * @param {(sourceValue: string) => string} transformFn - ファイルのパスを変更する関数。
 * @returns {void}
 */
function transformModule(inputFilename, outputFilename, transformFn) {
  // ファイルからソースコードを読み込む
  const code = fs.readFileSync(inputFilename, "utf8");

  // ソースコードをパースする
  const ast = recast.parse(code);

  function handleImportExportDeclaration(path, self) {
    // export元がローカルファイルである場合、拡張子.mjsを追加する
    const sourceValue = path.node.source ? path.node.source.value : null;
    if (sourceValue && (sourceValue.startsWith("./") || sourceValue.startsWith("../"))) {
      path.node.source.value = transformFn(sourceValue);
      console.log(`${inputFilename}: ${sourceValue} -> ${path.node.source.value}`); // 変更されたexport文をログに出力する
    }
    self.traverse(path); // トラバースを継続する
  }

  // ASTをトラバースしてimport/export文を探す
  recast.visit(ast, {
    visitImportSpecifier(path) {
      // import { foo } from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitImportDefaultSpecifier(path) {
      // import foo from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitImportNamespaceSpecifier(path) {
      // import * as foo from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitImportDeclaration(path) {
      // import { foo } from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitImportExpression(path) {
      // import('module');
      handleImportExportDeclaration(path, this);
    },
    visitImport(path) {
      // import 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportNamedDeclaration(path) {
      // export { foo } from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportAllDeclaration(path) {
      // export * from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportBatchSpecifier(path) {
      // export { foo, bar } from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportDeclaration(path) {
      // export { foo } from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportNamespaceSpecifier(path) {
      // export * as foo from 'module';
      handleImportExportDeclaration(path, this);
    },
    visitExportDefaultSpecifier(path) {
      // export { default as foo } from 'module';
      handleImportExportDeclaration(path, this);
    },
    // まだ必要なvisitImport...(path), visitExport...(path) があるかもしれない。
    // https://github.com/benjamn/ast-types/blob/master/src/gen/visitor.ts みて追加。
  });

  // トランスパイルされたコードを生成する
  const output = recast.print(ast, { parser: require("recast/parsers/babel") });

  // 変更されたコードをファイルに書き込む
  fs.writeFileSync(outputFilename, output.code);
}

/**
 * 指定されたフォルダ以下のすべての.jsファイルをモジュール変換して同名の.mjsファイルに書き出す。
 * 元の.jsファイルは削除する。
 *
 * @param {string} folderPath - 検索対象のフォルダパス
 * @param {(sourceValue: string) => string} transformFn - 変換関数
 * @returns {Promise<void>}
 */
async function transformFolder(folderPath, transformFn) {
  // フォルダ内の.jsファイルを再帰的に検索する
  const walk = async (dir) => {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stat = await fs.promises.stat(filepath);
      if (stat.isDirectory()) {
        await walk(filepath);
      } else if (stat.isFile() && path.extname(filepath) === ".js") {
        // .jsファイルを処理する
        const outputFilename = filepath.replace(/\.js$/, ".mjs");
        await transformModule(filepath, outputFilename, transformFn);
        await fs.promises.unlink(filepath); // 元の.jsファイルを削除する
      }
    }
  };
  await walk(folderPath);
}

/**
 * メイン関数。指定されたフォルダ内の.jsファイルを全て処理し、
 * 同名の.mjsファイルに変換して、元の.jsファイルを削除する。
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function main() {
  const folderPath = "./dist/mjs";
  const transformFn = (sourceValue) => `${sourceValue}.mjs`;
  await transformFolder(folderPath, transformFn);
}

main();
