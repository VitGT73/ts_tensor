export default class Env {
  public static readonly BASE_URL = process.env.BASE_URL;
  public static readonly API_URL = process.env.API_URL;
  public static readonly SBIS_URL = process.env.SBIS_URL;
  public static readonly TENSOR_URL = process.env.TENSOR_URL;
  public static readonly DOWNLOADS_PATH = process.env.DOWNLOADS_PATH;
  public static readonly CI = process.env.CI;
  public static readonly HOME_REGION = process.env.CI === "1" ? "г. Москва" : process.env.HOME_REGION;
}
