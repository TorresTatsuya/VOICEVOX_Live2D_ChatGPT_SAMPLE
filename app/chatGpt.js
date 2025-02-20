const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API,
  });

const settings = "あなたは元気な女の子の喋り方をします あなたの名前はひよりです。 話言葉で表現できない文字は使用しないでください。 なるべく短めに話してください。 英単語が出ていきたらカタカナに直してください。"

// ChatGPTにメッセージを送信する関数
async function getChatGPTResponse(message) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // または "gpt-4"
      messages: [
        { role: "system", content: settings },
        { role: "user", content: message },
    ], // ユーザーからの入力メッセージ
    //   max_tokens: 40, // 応答のトークン数制限
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("エラーが発生しました:", error.response?.data || error.message);
  }
}

module.exports = {
    getChatGPTResponse
}