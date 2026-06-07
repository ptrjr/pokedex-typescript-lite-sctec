import { PokemonResumo } from "../models/Pokemon.js";

export function normalizarBusca(valor: string): string {
  return valor.trim().toLowerCase();
}

export function formatarExibicaoPokemon(pokemon: PokemonResumo): string {
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`;
}

export function formatarListaPokemon(pokemons: PokemonResumo[]): string[] {
  return pokemons.map((pokemon: PokemonResumo) => formatarExibicaoPokemon(pokemon));
}

export function todosComNome(pokemons: PokemonResumo[]): boolean {
  return pokemons.every((pokemon: PokemonResumo) => pokemon.nome.trim().length > 0);
}

export function somarPeso(pokemons: PokemonResumo[]): number {
  return pokemons.reduce((total: number, pokemon: PokemonResumo) => total + pokemon.peso, 0);
}

export function separarLinha(): void {
  console.log("--------------------------------------------------");
}
