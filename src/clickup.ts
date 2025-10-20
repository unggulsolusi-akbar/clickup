import Puppeteer from "./puppeteer";
import Util from "./util";

export default class ClickUp {
  public static initiated = false;

  public static async init() {
    if (this.initiated) return;
  }

  public static login() {
    return Puppeteer.page(async (page) => {
      await page.goto("https://app.clickup.com");

      if (page.url().includes("login")) {
        await page.waitForFunction(
          (old) => window.location.href !== old,
          { timeout: 0 },
          "https://app.clickup.com/login"
        );
        await page.waitForNetworkIdle({ idleTime: 1000, timeout: 0 });
      }

      console.log("Login berhasil");
    });
  }

  public static extract(id: string) {
    return Puppeteer.page(async (page) => {
      await page.goto(`https://app.clickup.com/t/3812878/${id}`);
      await page.waitForSelector(
        '[data-test="status-button__status-dropdown"]'
      );

      return page.evaluate((id) => {
        const title = document.querySelector(
          '[data-test="task-title__title-overlay"]'
        );
        const status = document.querySelector(
          '[data-test="status-button-badge__body"] span'
        );
        const link: HTMLAnchorElement | null = document.querySelector(
          '[data-test="custom-field-type-url__link"]'
        );

        return {
          id,
          title: title?.textContent,
          status: status?.textContent.trim().toUpperCase(),
          client:
            link?.href
              .trim()
              .replace(/^https?:\/\//, "")
              .split(".")[0]
              ?.toUpperCase() || "",
        };
      }, id);
    });
  }

  public static setStatus(id: string, status: string) {
    return Puppeteer.page(async (page) => {
      try {
        await page.goto(`https://app.clickup.com/t/3812878/${id}`, {
          waitUntil: "networkidle0",
          timeout: 0,
        });

        const dropdownSelector = '[data-test="status-button__status-dropdown"]';
        await page.waitForSelector(dropdownSelector);

        await page.click(dropdownSelector);

        await Util.delay(500);

        const dropdownListSelector = '[data-test="status-list__container"]';
        await page.waitForSelector(dropdownListSelector);

        await page.evaluate((status) => {
          const items = document.querySelectorAll("cu3-combo-box-item");

          for (let item of items) {
            const labelDiv: HTMLDivElement =
              item.querySelector(".menu-item-label")!;

            if (
              labelDiv &&
              labelDiv.innerText.trim().toLowerCase() === status.toLowerCase()
            ) {
              (item as HTMLButtonElement).click();
              break;
            }
          }
        }, status);

        await Util.delay(2000);

        return {
          id,
          status,
          result: true,
        };
      } catch (e) {
        return {
          id,
          status,
          result: false,
        };
      }
    });
  }
}
