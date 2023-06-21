import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { Trainers } from 'src/pokemon/entities/trainers.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemmonModel: Model<Pokemon>,
    @InjectModel(Trainers.name)
    private readonly trainerModule: Model<Trainers>,

    private readonly http: AxiosAdapter,

  ) {}


  async construirPokemon(pokemonsUrl: any[]) {
    const pokemons = await Promise.all(
      pokemonsUrl.map(async (url) => {
        const data  = await this.http.get<any>(url);
        const { name, order } = data;
        const types = data.types.map((type) => {
          return type.type.name;
        });
        const typesString = types.join('/');
  
        return { name, type: typesString, pokedex:order, region: 'Kanto', no:order };
      }),
    );
  
    await this.pokemmonModel.insertMany(pokemons);

    return pokemons;
  }
  


  async executeSeed(): Promise<any[]> {
    await this.pokemmonModel.deleteMany({});
    await this.trainerModule.deleteMany({});
    const data  = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0',
    );
  
    const pokemonsUrl = await Promise.all(
      data.results.map(async ({ name, url }) => {
        return url;
      }),
    );
  
    const createPokemon = await this.construirPokemon(pokemonsUrl);
    const trainers = [
      { name: 'Ash', region: 'Kanto', status: 'active' },
      { name: 'Misty', region: 'Kanto', status: 'active' },
      { name: 'Brock', region: 'Kanto', status: 'active' },
      { name: 'Gary', region: 'Kanto', status: 'active' },
      { name: 'Jessie', region: 'Kanto', status: 'active' },
      { name: 'James', region: 'Kanto', status: 'active' },
      { name: 'Professor Oak', region: 'Kanto', status: 'active' },
      { name: 'Delia Ketchum', region: 'Kanto', status: 'active' },
      { name: 'Tracey Sketchit', region: 'Kanto', status: 'active' },
      { name: 'May', region: 'Hoenn', status: 'active' },
      { name: 'Max', region: 'Hoenn', status: 'active' },
      { name: 'Dawn', region: 'Sinnoh', status: 'active' },
      { name: 'Iris', region: 'Unova', status: 'active' },
      { name: 'Cilan', region: 'Unova', status: 'active' },
      { name: 'Serena', region: 'Kalos', status: 'active' },
      { name: 'Clemont', region: 'Kalos', status: 'active' },
      { name: 'Bonnie', region: 'Kalos', status: 'active' },
      { name: 'Lana', region: 'Alola', status: 'active' },
      { name: 'Mallow', region: 'Alola', status: 'active' },
      { name: 'Lillie', region: 'Alola', status: 'active' },
    ];
    await this.trainerModule.insertMany(trainers);
    return createPokemon;
  }
  
}
