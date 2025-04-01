import Groq from "groq-sdk/index.mjs";

const groq = new Groq({ apiKey: "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" })

async function llamaService(prompt) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "You are a precise medical diagnostician. Respond only in the hmuan readable format."
                },
                {
                    "role": "user",
                    "content": prompt
                },
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 0.3,
            "max_tokens": 1024,
            "top_p": 1.0,
            "stream": false,
            "stop": null
        })
        return chatCompletion.choices[0].message.content
    } catch (error) {
        console.error("Llama Service Error", error);
        return JSON.stringify({
            error: "Midical diagnosis service unavailable",
            details: error.message
        })
    }
}

export default llamaService