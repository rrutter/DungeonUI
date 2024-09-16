// Define interfaces for your data
export interface BaseStats {
  strength: number;
  dexterity: number;
  constitution: number;
  charisma: number;
  intelligence: number;
  wisdom: number;
}

export interface Race {
  id: number;
  name: string;
  baseStats: BaseStats;
}

export interface Gender {
  id: number;
  name: string;
}

export interface Alignment {
  id: number;
  name: string;
}
