export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
  hp: number;
  ataque: number;
  defesa: number;
}

export interface PokemonApiTypeItem {
  type: {
    name: string;
  };
}

export interface PokemonApiStatItem {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonApiTypeItem[];
  stats: PokemonApiStatItem[];
}
