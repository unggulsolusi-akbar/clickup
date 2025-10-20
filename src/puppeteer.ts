import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

export default class Puppeteer {
  private static intiated = false;
  private static browser: Browser;

  public static async init(headless: boolean = true) {
    if (this.intiated) return;
    this.browser = await puppeteer.launch({
      headless,
      userDataDir: "./profile",
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    this.intiated = true;
  }

  public static async page<T>(action: (page: Page) => Promise<T> | T) {
    const page = await this.browser.newPage();
    const returned = await action(page);
    await page.close();

    return returned;
  }

  public static async end() {
    this.browser.close();
  }
}
