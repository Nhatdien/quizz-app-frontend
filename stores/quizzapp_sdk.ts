import { Base } from "./base";
import type { Config } from "./base";
import { Topic } from "./topic";
import { Auth } from "./auth";
import { applyMixins } from "./utils/utils";

class QuizzAppSDK extends Base {
  constructor(config?: null | Config) {
    super(config!);
  }

  private static _instance: QuizzAppSDK;

  public static getInstance(config?: null | Config): QuizzAppSDK {
    return this._instance || (this._instance = new this(config));
  }
}

interface QuizzAppSDK extends Topic, Auth {}

applyMixins(QuizzAppSDK, [
  Topic, Auth
]);

export default QuizzAppSDK;
