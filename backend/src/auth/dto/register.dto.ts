import { IsEmail, IsString, IsUrl, MinLength } from 'class-validator'

export class RegisterDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string

	@MinLength(2, {
		message: 'Name must be at least 2 characters long'
	})
	@IsString()
	name: string

	@IsUrl()
	avatarPath: string
}