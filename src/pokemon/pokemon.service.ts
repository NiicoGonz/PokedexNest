import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()

export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
    const pokemon = await  this.pokemonModel.create(createPokemonDto);
    return {
      message: 'This action create the pokemon',
      data: pokemon,
    };
      
    } catch (error) {
      if (error.code === 11000) {
          throw new BadRequestException (`This pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {
    let pokemon: Pokemon;
   if (!isNaN(+id)){
    pokemon = await this.pokemonModel.findOne({no:id});
   }

   //MongoId
   if(!pokemon && isValidObjectId(id)){
    pokemon = await this.pokemonModel.findById(id);
    }

    //Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name:id.toLocaleLowerCase().trim()});

        }    
      

    if(!pokemon){
      throw new NotFoundException(`Pokemon with id/name or no  ${id} not found`);
    }    
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(id);
    console.log(pokemon);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    await pokemon.updateOne(updatePokemonDto);
    }


      return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
