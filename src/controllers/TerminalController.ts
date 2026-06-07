import { createInterface, Interface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { PokemonResumo } from "../models/Pokemon.js";
import { BoxService } from "../services/BoxService.js";
import { PokeApiService } from "../services/PokeApiService.js";
import { separarLinha } from "../utils/textFormatters.js";

export class TerminalController {
  private readonly terminal: Interface;

  public constructor(
    private readonly pokeApiService: PokeApiService,
    private readonly boxService: BoxService
  ) {
    this.terminal = createInterface({ input, output });
  }

  public async iniciar(): Promise<void> {
    await this.boxService.carregar();

    console.log("Bem-vindo à Pokédex TypeScript Lite!");

    let executando: boolean = true;

    while (executando) {
      this.exibirMenu();
      const opcao: string = (await this.terminal.question("Escolha uma opção: ")).trim();
      separarLinha();

      switch (opcao) {
        case "1":
          await this.buscarEAdicionarPokemon();
          break;
        case "2":
          this.boxService.listar();
          break;
        case "3":
          await this.removerPokemon();
          break;
        case "4":
          await this.executarFluxoDemonstracao();
          break;
        case "0":
          executando = false;
          console.log("Programa encerrado. Até mais!");
          break;
        default:
          console.log("[AVISO] Opção inválida. Tente novamente.");
      }

      separarLinha();
    }

    this.terminal.close();
  }

  private exibirMenu(): void {
    console.log("\nMenu:");
    console.log("1 - Buscar Pokémon e adicionar ao catálogo");
    console.log("2 - Listar catálogo");
    console.log("3 - Remover Pokémon por ID");
    console.log("4 - Executar demonstração automática");
    console.log("0 - Sair");
  }

  private async buscarEAdicionarPokemon(): Promise<void> {
    const nomeOuId: string = await this.terminal.question("Digite o nome ou ID do Pokémon: ");
    const pokemon: PokemonResumo | null = await this.pokeApiService.buscarPokemon(nomeOuId);

    if (pokemon !== null) {
      await this.boxService.adicionar(pokemon);
    }
  }

  private async removerPokemon(): Promise<void> {
    const idDigitado: string = await this.terminal.question("Digite o ID do Pokémon que deseja remover: ");
    const id: number = Number(idDigitado);

    if (Number.isNaN(id) || id <= 0) {
      console.log("[ERRO] ID inválido. Digite um número maior que zero.");
      return;
    }

    await this.boxService.remover(id);
  }

  private async executarFluxoDemonstracao(): Promise<void> {
    const pikachu: PokemonResumo | null = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachu !== null) await this.boxService.adicionar(pikachu);

    const charmander: PokemonResumo | null = await this.pokeApiService.buscarPokemon("charmander");
    if (charmander !== null) await this.boxService.adicionar(charmander);

    const pikachuDuplicado: PokemonResumo | null = await this.pokeApiService.buscarPokemon("pikachu");
    if (pikachuDuplicado !== null) await this.boxService.adicionar(pikachuDuplicado);

    await this.pokeApiService.buscarPokemon("pokemon-inexistente");

    this.boxService.listar();
    await this.boxService.remover(25);
    this.boxService.listar();
  }
}
