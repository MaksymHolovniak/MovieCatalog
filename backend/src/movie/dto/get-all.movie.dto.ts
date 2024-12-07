import { PaginationDto } from '../../pagination/pagination.dto'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { EnumMovieType } from '@prisma/client'

export enum EnumMovieSort {
	NEWEST= 'newest',
	OLDEST='oldest',
	LONGER='longer',
	SHORTER='shorter'
}

export class GetAllMovieDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumMovieSort)
	sort?: EnumMovieSort

	@IsOptional()
	@IsString()
	searchTerm?: string

	@IsOptional()
	@IsEnum(EnumMovieType)
	type?: EnumMovieType
}
