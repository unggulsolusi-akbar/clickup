import { input } from "@inquirer/prompts";
import { Command } from "commander";
import ClickUp from "./src/clickup";
import Puppeteer from "./src/puppeteer";

const program = new Command();

program
  .name("clickup")
  .description("Tool CLI yang akan memudahkan penggunaan ClickUp")
  .version("0.0.2");

program
  .command("auth")
  .description("Login akun ClickUp")
  .action(async () => {
    await Puppeteer.init(false);
    await ClickUp.init();
    await ClickUp.login();
    await Puppeteer.end();
  });

program
  .command("status")
  .description("Mengambil status laporan")
  .action(async () => {
    await Puppeteer.init();
    await ClickUp.init();

    const ids = (
      await input({
        message: "Masukkan nomor laporan yang ingin diperiksa:",
      })
    ).split(",");

    let result: {
      id: string;
      title: string | undefined;
      status: string | undefined;
      client: string;
    }[] = [];

    for (let i = 0; i < ids.length; i += 4) {
      result = result.concat(
        await Promise.all(ids.slice(i, i + 4).map((id) => ClickUp.extract(id)))
      );
    }

    console.clear();
    for (const [index, info] of result.entries()) {
      console.log(
        `${index + 1}. *${info.status}* | ${
          info.id
        } | ${info.client.toUpperCase()} | ${info.title}`
      );
    }

    await Puppeteer.end();
  });

program
  .command("set")
  .description("Set status laporan")
  .argument("<status>", "Status yang ingin di set")
  .action(async (status) => {
    await Puppeteer.init();
    await ClickUp.init();

    const ids = (
      await input({
        message: "Masukkan nomor laporan yang ingin di set status:",
      })
    ).split(",");

    let result: {
      id: string;
      status: string;
      result: boolean;
    }[] = [];

    for (let i = 0; i < ids.length; i += 4) {
      result = result.concat(
        await Promise.all(
          ids.slice(i, i + 4).map((id) => ClickUp.setStatus(id, status))
        )
      );
    }

    console.clear();
    for (const info of result) {
      console.log(
        `${info.id} -> ${info.status.toUpperCase()} | ${
          info.result ? "Berhasil" : "Gagal"
        }`
      );
    }

    await Puppeteer.end();
  });

await program.parseAsync();
