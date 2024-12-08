import { Base } from "./base";
import type { Config } from "./base";
import { Topic } from "./topic";
import { Auth } from "./auth";
import { Room } from "./room";
import { Quizz } from "./quizz";
import { Note } from "./note";
import { ChatBot } from "./chatbot";
import { applyMixins } from "./utils/utils";

class QuizzAppSDK extends Base {
  constructor(config?: null | Config) {
    super(config!);
  }

  private static _instance: QuizzAppSDK;

  public static getInstance(config?: null | Config): QuizzAppSDK {
    const result = this._instance || (this._instance = new this(config));
    return result;
  }
}

interface QuizzAppSDK extends Topic, Auth, Quizz, Room, Note, ChatBot {}

applyMixins(QuizzAppSDK, [
  Topic, Auth, Quizz, Room, Note, ChatBot
]);

export default QuizzAppSDK;
