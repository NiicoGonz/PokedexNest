
import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokemonResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  
  private readonly axios:AxiosInstance = axios;;

 async  executeSeed():Promise<any[]> {
   const {data } =await  this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=2')
    
   data.results.forEach(async ({name,url})=>{
    const segments :string[] = url.split('/');
    const no:number = +segments[segments.length - 2];
    console.log({name,no});
    });
   return data.results;
  }

 


}
