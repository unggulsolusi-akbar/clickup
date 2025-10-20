export default class Util {
  public static delay(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
