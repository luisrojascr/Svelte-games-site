import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

type KeyValues = {
  [key: string]: string;
};

const languages: KeyValues = {
  cs: "Czech",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  ja: "Japanese",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
};

const translation_source = (lang: string, path: string): string | undefined => {
  try {
    return fs.readFileSync(
      `../${path}/src/lib/locale/prompt/${lang}.json`,
      "utf8"
    );
  } catch {}
  try {
    return fs.readFileSync(`../${path}/src/lib/locale/prompt/en.json`, "utf8");
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

async function main() {
  if (process.argv.length < 2)
    throw new Error("expected two arguments: path and language");
  const langs =
    process.argv.length >= 4 ? [process.argv[3]] : Object.keys(languages);

  for (const lang of langs) {
    const language = languages[lang];
    if (!language) throw new Error(`Language ${lang} not found`);
    const path = process.argv[2];
    const data = translation_source(lang, path);
    if (!data) throw new Error(`Translation source not found`);

    console.log(`generating [${path}], language: ${language}`);

    const prompt: OpenAI.ChatCompletionCreateParams = {
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to output JSON and you are experienced with casino, betting and cryptocurrency terminology and concepts.",
        },
        {
          role: "user",
          content: `Translate this from English to ${language} preserving the key values:\n${JSON.stringify(
            data
          )}`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    };

    const completion = await openai.chat.completions.create(prompt);
    fs.writeFileSync(
      `../${path}/src/lib/locale/generated/${lang}.json`,
      completion.choices[0].message.content!,
      "utf8"
    );
    fs.writeFileSync(
      `../${path}/src/lib/locale/edited/${lang}.json`,
      completion.choices[0].message.content!,
      "utf8"
    );
  }
}

main();
