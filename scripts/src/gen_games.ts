import { createHash } from "crypto";
import fs from "fs";
import Categories from "../../landing/src/lib/game_category/categories";
import type { GameData } from "../../landing/src/lib/games/game";
import type { ProviderData } from "../../landing/src/lib/games/provider";
import getDb from "./getDb";

type GameOrdering = {
  newGames?: string[];
  popularGames?: string[];
  featuredSlots?: string[];
  gameShows?: string[];
  liveSlots?: string[];
  featureBuyInGames?: string[];
  tableGames?: string[];
  disabledGames?: string[];
  bonusExcludedGames?: string[];
};

const build_path = "../landing/src/routes/game/";

const toAscii = (str: string) =>
  str
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const providerGameToCode = (providerName: string, gameName: string) =>
  `${toAscii(providerName).replace(/-/g, "")}/${toAscii(gameName)}`;

const providerToCode = (providerName: string) =>
  `${toAscii(providerName).replace(/-/g, "")}`;

const gameToCode = (gameName: string) => `${toAscii(gameName)}`;

const generate = async () => {
  const db = await getDb();
  const savedOrder = await db
    .collection<GameOrdering>("sg-games-ordering")
    .findOne({});

  const build_data = JSON.parse(fs.readFileSync("./build.json", "utf8"));
  const game_template = fs.readFileSync(
    `${build_path}_provider/_game/+page.svelte`,
    "utf8"
  );
  const game_template_hash = createHash("sha256")
    .update(game_template, "utf8")
    .digest();
  const provider_template = fs.readFileSync(
    `${build_path}_provider/+page.svelte`,
    "utf8"
  );
  const provider_template_hash = createHash("sha256")
    .update(provider_template, "utf8")
    .digest();

  const providers: string[] = [];
  const providersData: ProviderData[] = [];
  const games = await db
    .collection("sg-games-list")
    .find({
      slug: {
        $exists: true,
        $ne: null,
        $nin: savedOrder!.disabledGames ?? [],
      },
      MerchantNameOriginal: "Pragmatic Play",
    })
    .project({
      slug: 1,
      MerchantNameOriginal: 1,
      gameName: 1,
      ImageFullPath: 1,
      System: 1,
      PageCode: 1,
    })
    .sort({ sgOrder: 1 })
    .limit(100)
    .toArray();

  const data = JSON.stringify(games);
  const games_hash = createHash("sha256").update(data, "utf8").digest();

  if (build_data.games_hash === games_hash.toString("hex")) {
    console.log(`Games data has not changed`);
    if (process.argv.indexOf("--force") === -1) {
      console.log(`to force a re-build run with --force`);
      return;
    }
  }

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const {
      slug,
      MerchantNameOriginal: provider,
      gameName: name,
      ImageFullPath: image,
      System: system,
    } = game;
    let gameData: GameData = {
      name,
      provider,
      image,
    };
    let path = `${build_path}${providerToCode(provider)}`;
    fs.mkdirSync(path, {
      recursive: true,
    });
    let providerIndex = providers.indexOf(provider);
    let providerData: ProviderData;
    if (providerIndex === -1) {
      fs.writeFileSync(`${path}/+page.svelte`, provider_template);
      providers.push(provider);
      providersData.push({
        name: provider,
      });
      providerData = providersData[providersData.length - 1];
    } else {
      providerData = providersData[providerIndex];
    }
    path = `${build_path}${providerToCode(provider)}/${gameToCode(name)}`;
    fs.mkdirSync(path, {
      recursive: true,
    });
    fs.writeFileSync(`${path}/+page.svelte`, game_template);
    fs.writeFileSync(
      `${path}/game.ts`,
      `export default ${JSON.stringify(gameData)};`
    );
  }

  const categoryGames = {
    newGames:
      savedOrder && savedOrder.newGames
        ? savedOrder.newGames
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
    popularGames:
      savedOrder && savedOrder.popularGames
        ? savedOrder.popularGames
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
    featuredSlots:
      savedOrder && savedOrder.featuredSlots
        ? savedOrder.featuredSlots
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
    gameShows:
      savedOrder && savedOrder.gameShows
        ? savedOrder.gameShows
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
    liveSlots:
      savedOrder && savedOrder.liveSlots
        ? savedOrder.liveSlots
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
    featureBuyInGames:
      savedOrder && savedOrder.featureBuyInGames
        ? savedOrder.featureBuyInGames
            .map((slug) => games!.find((game) => game.slug === slug))
            .filter((item) => item != null)
            .map((game) => ({
              name: game?.gameName,
              image: game?.ImageFullPath,
              provider: game?.MerchantNameOriginal,
            }))
        : [],
  };

  console.log(JSON.stringify(categoryGames, null, 2));

  build_data.games_hash = games_hash.toString("hex");
  build_data.provider_template_hash = provider_template_hash.toString("hex");
  build_data.game_template_hash = game_template_hash.toString("hex");
  build_data.build_date = new Date().toISOString();
  fs.writeFileSync("./build.json", JSON.stringify(build_data, null, 2));
};

generate()
  .then(() => {
    console.log(`done`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
