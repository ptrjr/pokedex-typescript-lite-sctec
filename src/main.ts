import { TerminalController } from "./controllers/TerminalController.js";
import { BoxService } from "./services/BoxService.js";
import { PokeApiService } from "./services/PokeApiService.js";

async function main(): Promise<void> {
  const pokeApiService = new PokeApiService();
  const boxService = new BoxService("pc_box.json");
  const terminalController = new TerminalController(pokeApiService, boxService);

  await terminalController.iniciar();
}

main().catch((erro: unknown) => {
  console.log("[ERRO] Falha inesperada ao executar a aplicação.");
  console.error(erro);
});
