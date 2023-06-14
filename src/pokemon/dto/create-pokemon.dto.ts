import { IsString, MinLength, MaxLength, IsNumber ,IsPositive} from "class-validator";

export class CreatePokemonDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    type: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    pokedex: string;
    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    region: string;
    
    @IsNumber()
    @IsPositive()
    @MinLength(3)
    @MaxLength(20)
    no: number; 
}
