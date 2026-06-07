import { readFile, writeFile } from "node:fs/promises";
import { LocalBoxError } from "../models/CustomErrors.js";
import { PokemonResumo } from "../models/Pokemon.js";
import { formatarExibicaoPokemon, formatarListaPokemon, somarPeso, todosComNome } from "../utils/textFormatters.js";

export class BoxService {
  private pokemons: PokemonResumo[] = [];

  public constructor(private readonly caminhoArquivo: string = "pc_box.json") {}

  public async carregar(): Promise<void> {
    try {
      const conteudo: string = await readFile(this.caminhoArquivo, "utf-8");
      const dados: unknown = JSON.parse(conteudo);

      if (!Array.isArray(dados)) {
        throw new LocalBoxError("O arquivo pc_box.json não contém um array válido.");
      }

      this.pokemons = dados as PokemonResumo[];
    } catch (erro: unknown) {
      if (erro instanceof LocalBoxError) {
        console.log(`[ERRO] ${erro.message}`);
        this.pokemons = [];
        await this.salvar();
        return;
      }

      this.pokemons = [];
      await this.salvar();
    }
  }

  public async adicionar(pokemon: PokemonResumo): Promise<void> {
    const jaExiste: boolean = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    await this.salvar();
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  public listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("Catálogo atual:");
    const linhas: string[] = formatarListaPokemon(this.pokemons);
    linhas.forEach((linha: string) => console.log(linha));

    const valido: boolean = todosComNome(this.pokemons);
    const pesoTotal: number = somarPeso(this.pokemons);

    console.log(`[INFO] Todos possuem nome válido? ${valido ? "Sim" : "Não"}`);
    console.log(`[INFO] Peso total do catálogo: ${pesoTotal}`);
  }

  public async remover(id: number): Promise<void> {
    const pokemonEncontrado: PokemonResumo | undefined = this.pokemons.find((pokemon) => pokemon.id === id);

    if (pokemonEncontrado === undefined) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    await this.salvar();
    console.log(`[OK] Pokémon removido do catálogo: ${formatarExibicaoPokemon(pokemonEncontrado)}`);
  }

  public obterTodos(): PokemonResumo[] {
    return [...this.pokemons];
  }

  private async salvar(): Promise<void> {
    const conteudo: string = JSON.stringify(this.pokemons, null, 2);
    await writeFile(this.caminhoArquivo, `${conteudo}\n`, "utf-8");
  }
}
