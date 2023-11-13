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

const projects: KeyValues = {
  auth: "../libs/auth/src/lib/locale",
};

const translation_source = (lang: string, project: string) => {
  try {
    return fs.readFileSync(`${project}/prompt/${lang}.json`, "utf8");
  } catch {}
  try {
    return fs.readFileSync(`${project}/prompt/en.json`, "utf8");
  } catch (e) {
    console.log(e);
  }
};

async function main() {
  console.log(process.argv);
  if (process.argv.length < 3)
    throw new Error("expected 2 arguments, project and language");
  const lang = process.argv[3];
  const language = languages[lang];
  if (!language) throw new Error(`Language ${lang} not found`);
  const project = projects[process.argv[2]];
  if (!project) throw new Error(`Project ${process.argv[2]} not found`);
  const data = translation_source(lang, project);

  console.log(`generating project: ${project}, language: ${language}`);

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
    `${project}/latest/${lang}.json`,
    completion.choices[0].message.content!,
    "utf8"
  );
}

main();
