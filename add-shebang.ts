const content = await Bun.file("./dist/clickup.js").text();
if (!content.startsWith("#!/usr/bin/env node")) {
  await Bun.write("./dist/clickup.js", "#!/usr/bin/env node\n" + content);
  console.log("✅ Shebang berhasil ditambahkan.");
} else {
  console.log("ℹ️ Shebang sudah ada.");
}
export {};
