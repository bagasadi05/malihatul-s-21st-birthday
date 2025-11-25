import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (mood: 'romantic' | 'funny' | 'poetic'): Promise<string> => {
  try {
    const prompt = `
      Buatkan ucapan ulang tahun yang singkat, tulus, dan ${mood} (dalam Bahasa Indonesia) untuk Malihatul Quswa yang berulang tahun ke-21 hari ini.
      
      Persyaratan nada bicara:
      - Gunakan nama panggilan "Malihatul" atau "Quswa".
      - Sebutkan usianya 21 tahun.
      - Jika 'romantic': buat manis, memuji, dan penuh kasih sayang.
      - Jika 'funny': buat lelucon santai tentang menjadi dewasa atau makin tua tapi tetap imut.
      - Jika 'poetic': gunakan metafora seperti bunga, bintang, atau senja.
      - Panjang maksimal 50 kata.
      - Jangan gunakan format markdown (seperti bold/italic).
      - Bahasa: BAHASA INDONESIA gaul/santai tapi sopan.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Selamat Ulang Tahun Malihatul!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Selamat Ulang Tahun ke-21, Malihatul! Semoga harimu seindah senyumanmu.";
  }
};