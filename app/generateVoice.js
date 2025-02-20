require("dotenv").config();
const fs = require('fs');
const axios = require('axios');
const url = process.env.VOICEVOX_URL;
const speakerID = 8;


const makeRequest = async (text) => {
    try {

        // URLパラメータをエンコード
        const params = new URLSearchParams({
            text: text,
            speaker: speakerID
        });

        // POSTリクエストを送信
        const response = await axios({
            method: 'post',
            url: `${url}/audio_query?${params.toString()}`
        });

        //出力
        return JSON.stringify(response.data, null, 2);

    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

const synthesizeAudio = async (text) => {
    try {
        const queryData = await makeRequest(text);


        // POSTリクエストの実行
        const response = await axios({
            method: 'post',
            url: `${url}/synthesis`,
            params: {
                speaker: speakerID
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data: queryData,
            responseType: 'arraybuffer'
        });

        // レスポンスをファイルに保存
        fs.writeFileSync('./public/audio.wav', response.data);
        console.log('音声ファイルが生成されました');

    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

module.exports = synthesizeAudio;