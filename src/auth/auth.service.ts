import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { LoginDTO } from './dto/login.dto';
import {
  AuthenticationDetails,
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
import { RegisterUser } from './entities/register.entity';
import { ConfirmRegisterUser } from './entities/confirmRegisterUser.entity';
import { RegisterDTO } from './dto/register.dto';
import { ConfirmRegisterUserDTO } from './dto/confirmRegisterUser.dto';
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DbClientsProvider } from "../dynamoDB/db-clients.provider";
import { getPaginatedResult, decodeCursor } from 'dynamodb-paginator';

const PK = 'PRODUCT#MERCHANT#';
const SK = '#PRODUCT#';
const entity = 'FOOD_PRODUCT'
const IndexName = 'entity-sk-index';
const TableName = "sakada.merchant.staging" //process.env.TABLE_NAME; //

@Injectable()
export class AuthService {
   
  private userPool
  private poolData

  constructor(
    private readonly dbClientsProvider: DbClientsProvider,
    ) {
    this.poolData = {
      UserPoolId: process.env.AWS_COGNITO_USERPOOL_ID, // Your user pool id here
      ClientId: process.env.AWS_COGNITO_CLIENTID, // Your client id here
    };
    this.userPool = new CognitoUserPool(this.poolData);
  }
  async findAll(){
      try {
        const Limit = 10;
        const standardQueryParams = {
          TableName,
          Limit,
          IndexName,
          KeyConditionExpression: 'entity = :entity',
          ExpressionAttributeValues: {':entity': 'FOOD_PRODUCT'},
        };
        const paginationParams = decodeCursor(null) || standardQueryParams;
        const result = await this.dbClientsProvider.dbDocumentClient.send(new QueryCommand(paginationParams));
        const paginatedResult = getPaginatedResult(paginationParams, Limit, result);
        return paginatedResult
      } catch(error){
        console.log(error)
        throw new InternalServerErrorException(error)
      }
    }

    async login(login: LoginDTO){
        const authDetails = new AuthenticationDetails({Username: login.username,Password: login.password})

        const userData = { Username: login.username, Pool: this.userPool}

        const cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            return cognitoUser.authenticateUser(authDetails, {
              onSuccess: result => {
                console.log(result)

                resolve(result);
              },
              onFailure: err => {
                reject(err);
              },
            });
          }).then((result: any) => {
            return {
              accessToken: result.accessToken.getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
              exp: result.accessToken.getExpiration()
            };
          });

    }

    async registerUser(registerDTO: RegisterDTO) {
        var attributeList = [];
        attributeList.push(new CognitoUserAttribute({Name:"name",Value:"Anton Fernando"}));
        attributeList.push(new CognitoUserAttribute({Name:"preferred_username",Value:"Anton"}));
        attributeList.push(new CognitoUserAttribute({Name:"gender",Value:"male"}));
        attributeList.push(new CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
        attributeList.push(new CognitoUserAttribute({Name:"address",Value:"CMB"}));
        attributeList.push(new CognitoUserAttribute({Name:"email",Value:"raymundcuizon07@gmail.com"}));
        attributeList.push(new CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
        attributeList.push(new CognitoUserAttribute({Name:"custom:scope",Value:"merchant"}));
       
        
        await this.userPool.signUp('raymundcuizon07@gmail.com', 'raymundcuizon07', attributeList, null, function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            const cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
    }

    async confirmRegistration(confirmRegisterUserDTO: ConfirmRegisterUserDTO){

        
        // var userPool = new CognitoUserPool(this.poolData);
        var userData = {
            Username: 'raymundcuizon07@gmail.com',
            Pool: this.poolData,
        };
        
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration('521582', true, function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }


}
