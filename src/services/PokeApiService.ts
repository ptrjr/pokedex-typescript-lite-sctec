import { APIError } from "../models/CustomErrors.js";
import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon.js";
import { normalizarBusca } from "../utils/textFormatters.js";

export class PokeApiService {
  private readonly baseUrl: string;

  public constructor(baseUrl: string = "https://pokeapi.co/api/v2/pokemon") {
    this.baseUrl = baseUrl;
  }

  public async buscarPokemon(nomeOuId: string | number): Promise<PokemonResumo | null> {
    const termoBusca: string = normalizarBusca(String(nomeOuId));

    if (termoBusca.length === 0) {
      console.log("[ERRO] Informe um nome ou ID válido.");
      return null;
    }

    try {
      const resposta: Response = await fetch(`${this.baseUrl}/${termoBusca}`);

      if (resposta.status === 404) {
        throw new APIError(`Pokémon não encontrado: ${termoBusca}`);
      }

      if (!resposta.ok) {
        throw new APIError(`Erro ao consultar a PokeAPI. Status: ${resposta.status}`);
      }

      const dados: PokemonApiResponse = (await resposta.json()) as PokemonApiResponse;
      const pokemon: PokemonResumo = this.mapearPokemon(dados);

      console.log(`[OK] Pokémon encontrado: ${pokemon.nome}`);
      return pokemon;
    } catch (erro: unknown) {
      if (erro instanceof APIError) {
        console.log(`[ERRO] ${erro.message}`);
        return null;
      }

      console.log("[ERRO] Não foi possível buscar o Pokémon.");
      return null;
    }
  }

  private mapearPokemon(dados: PokemonApiResponse): PokemonResumo {
    const tipos: string[] = dados.types.map((item) => item.type.name);

    const hp: number = this.buscarStat(dados, "hp");
    const ataque: number = this.buscarStat(dados, "attack");
    const defesa: number = this.buscarStat(dados, "defense");

    return {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
      hp,
      ataque,
      defesa
    };
  }

  private buscarStat(dados: PokemonApiResponse, nomeStat: string): number {
    const statEncontrado = dados.stats.find((item) => item.stat.name === nomeStat);
    return statEncontrado?.base_stat ?? 0;
  }
}
