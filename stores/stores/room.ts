import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { RoomRes, Participant } from "../../types/room";
import type { Question } from "../../types/quiz";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({
    //quiz id
    quizId: "",

    //question, room and score
    room: {} as RoomRes,
    currentQuestionIndex: 0,
    currentQuestion: {} as Question,
    currentScore: 0,
    currentSubmission: [] as string[][],
    questionIds: [] as string[],
    roomStarted: false,
    clockTime: 0,

    // Room participants and scores
    roomParticipants: [] as Participant[],
    participantScores: {} as { [key: string]: number },

    // Countdown and Leaderboard
    countDownBeforeStart: 5000,
    showingCountDown: false,
    showLeaderboardTime: 5000,
    showingLeaderboard: false,
    clockInterval: null as any,
  }),
  actions: {
    async createRoom(quizId: string) {
      return QuizzAppSDK.getInstance()
        .createRoom(quizId)
        .then((room) => {
          this.quizId = quizId;
          this.room = room;
        });
    },

    async getQuestionIds(quizId: string) {
      return QuizzAppSDK.getInstance()
        .getQuestionIds(quizId)
        .then((questionIds) => {
          this.quizId = quizId;
          this.questionIds = questionIds;
        });
    },

    async getRoomByCode(roomCode: string) {
      return QuizzAppSDK.getInstance()
        .getRoomByCode(roomCode)
        .then((room) => {
          console.log(room);
          this.room = room;
        });
    },

    async saveScore(username: string, score: number, roomId: string) {
      return QuizzAppSDK.getInstance().saveScore(username, score, roomId);
    },

    async getScore(roomId: string) {
      return QuizzAppSDK.getInstance()
        .getScore(roomId)
        .then((score) => {
          this.participantScores = score as any;
        });
    },

    async getParticipants(roomCode: string) {
      return QuizzAppSDK.getInstance()
        .getParticipants(roomCode)
        .then((participants) => {
          this.roomParticipants = participants as any;
          this.roomParticipants = this.roomParticipants.filter(
            (participant) => participant.isActive || !participant.isActive
          );
        });
    },

    async leaveRoom(roomId: string, roomCode: string, username: string) {
      return QuizzAppSDK.getInstance()
        .leaveRoom(roomId, roomCode, username)
        .then(() => {
          this.roomParticipants = this.roomParticipants.filter(
            (participant) => participant.username !== username
          );
        });
    },

    async handleAnswerSubmission(answer: string, question: Question) {
      const isCorrect =
        question.answers.find((ans) => ans.isCorrect)?.content === answer;

      console.log(
        answer,
        question.answers.find((ans) => ans.isCorrect)?.content === answer
      );
      if (isCorrect) {
        this.currentScore += question.point;
      }
    },

    receiveScoreMessageCallback(message: any) {
      const participants = JSON.parse(message.body);
      const username = JSON.parse(participants?.username).username;
      const score = JSON.parse(participants?.username).score;
      this.participantScores[username] = score;
      // console.log(this.participantScores);
    },

    async updateYourSoreAndGetLobbyScore(roomId: string) {
      const username = QuizzAppSDK.getInstance().config
        .current_username as string;
      QuizzAppSDK.getInstance().sendUserScoreTopic(
        roomId,
        username,
        this.currentScore
      );
    },

    /**
     * Callback function to handle the reception of a new question.
     * 
     * This function performs the following tasks:
     * 1. Sets the room as started.
     * 2. If it's the first question, shows a countdown before starting.
     * 3. Handles answer submission and updates the score for subsequent questions.
     * 4. Parses and sets the current question from the received data.
     * 5. Initializes the clock timer for the current question.
     * 6. Handles the display of the leaderboard when the clock timer runs out.
     * 7. Manages the submission and score update for the last question, and navigates to the result page.
     * 
     * @param {any} question - The received question data.
     */
    receiveQuesitonCallback(question: any) {
      this.roomStarted = true;

      if (this.currentQuestionIndex === 0) {
        this.showingCountDown = true;
        delay(this.countDownBeforeStart).then(() => {
          this.showingCountDown = false;
        }
        );
      }
      // console.log(JSON.parse(question.body));

      //handling answer submission
      if (
        this.currentQuestionIndex > 0 &&
        this.currentQuestionIndex < this.questionIds.length
      ) {
        this.handleAnswerSubmission(
          this.currentSubmission?.[0]?.[0],
          this.currentQuestion
        );

        //update score
        this.updateYourSoreAndGetLobbyScore(this.room.id);
      }

      //set current question
      const curQuestion = JSON.parse(question.body);
      this.clockTime = curQuestion.time;
      this.currentQuestion = curQuestion;
      this.currentSubmission = [];
      this.currentQuestionIndex += 1;

      // Clear any existing interval
      if (this.clockInterval) {
        clearInterval(this.clockInterval);
      }

      // Start a new interval for the clock timer
      this.clockInterval = setInterval(() => {
        if (this.clockTime > 0) {
          this.clockTime -= 1;
        } else {
          console.log("showing leaderboard");
          this.showingLeaderboard = true;

          delay(this.showLeaderboardTime).then(() => {
            this.showingLeaderboard = false;
            console.log("hiding leaderboard");
          });
          clearInterval(this.clockInterval);
        }
      }, 1000);

      //hanlding last question
      if (this.currentQuestionIndex >= this.questionIds.length) {
        const lastQuestionTimeOut = setTimeout(() => {
          this.handleAnswerSubmission(
            this.currentSubmission[0][0],
            this.currentQuestion
          );

          this.updateYourSoreAndGetLobbyScore(this.room.id);

          console.log("last question");
          this.saveScore(
            QuizzAppSDK.getInstance().config.current_username as string,
            this.currentScore,
            this.room.id
          );

          delay(2000).then(() => {
            navigateTo(`/room/${this.room.id}/result?code=${this.room.code}`);
          });

          // this.currentQuestion = {} as any;
          // this.currentSubmission = [];
          // this.currentQuestionIndex = 0;
          // clearInterval(lastQuestionInterval);
        }, this.currentQuestion.time * 1000);
      }
    },

    reset() {
      this.quizId = "";
      this.room = {} as RoomRes;
      this.currentQuestionIndex = 0;
      this.currentQuestion = {} as Question;
      this.currentScore = 0;
      this.roomStarted = false;
      this.currentSubmission = [] as string[][];
      this.questionIds = [] as string[];
      this.clockTime = 0;
      this.roomParticipants = [] as Participant[];
      this.participantScores = {} as { [key: string]: number };
      this.clockInterval = null;


      this.countDownBeforeStart = 5000;
      this.showingCountDown = false;
      this.showLeaderboardTime = 5000;
      this.showingLeaderboard = false;
    },
  },
});
