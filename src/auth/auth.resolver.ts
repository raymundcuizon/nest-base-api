import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ConfirmRegisterUserDTO } from './dto/confirmRegisterUser.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from './entities/auth.entity';
import { ConfirmRegisterUser } from './entities/confirmRegisterUser.entity';
import { Login } from './entities/login.entity';
import { RegisterUser } from './entities/register.entity';
import { UseGuards } from '@nestjs/common';
import { User } from './user.type';
import { CongnitoAuthGuard } from './congito.guard';
import { CurrentUser } from './currentUser.decorator';


@Resolver(() => Auth)
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}


    @Query(() => User)
    @UseGuards(CongnitoAuthGuard)
    whoAmI(@CurrentUser() user:User){
        return user;
    }

    @Query(() => Auth)
    // @UseGuards(CongnitoAuthGuard)
    findAll(){

        // return { username: "sample", email: "res"  }
        return this.authService.findAll()
    }

    @Mutation(() => Login, { name: 'Login' })
    login(@Args('login') login: LoginDTO){
        return this.authService.login(login);
    }

    @Mutation(() => RegisterUser, {name: 'registerUser'})
    registerUser(@Args('registerUser') registerUser: RegisterDTO){
        return this.authService.registerUser(registerUser)
    }

    @Mutation(() => ConfirmRegisterUser, {name: 'confirmRegisterUser'})
    confirmRegisterUser(@Args('confirmRegisterUser') confirmRegisterUserDTO: ConfirmRegisterUserDTO){
        return this.authService.confirmRegistration(confirmRegisterUserDTO)
    }
    

}
