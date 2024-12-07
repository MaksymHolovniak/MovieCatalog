import {
	ArrayMinSize,
	IsDate, IsDateString,
	IsEnum,
	IsNumber, IsOptional,
	IsString,
	IsUrl,
	MaxLength,
	MinLength
} from 'class-validator'
import { EnumMovieType, Prisma } from '@prisma/client'

export class MovieDto {
	@IsString()
	name: string

	@IsEnum(EnumMovieType)
	type: EnumMovieType

	@IsUrl()
	@IsString()
	imagePath: string

	@IsUrl()
	@IsString()
	trailer: string

	@IsNumber()
	year: number

	@IsOptional()
	@IsNumber()
	duration?: number

	@IsNumber()
	rating: number

	@MinLength(10)
	@MaxLength(700)
	@IsString()
	description: string

	@IsString()
	country: string

	@IsString({ each: true })
	@ArrayMinSize(1)
	genres: string[];

	@IsDateString()
	releaseDate: string

	@IsString({each: true})
	@ArrayMinSize(1)
	cast: string[]

	@IsString()
	clarity: string

}
