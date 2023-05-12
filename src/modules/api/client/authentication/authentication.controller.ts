import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { FirebaseHelper } from 'src/common/helper/firebase/firebase.helper';
import { LoginFirebaseDto } from './dto/loginFirebase.dto';
import { auth } from 'firebase-admin';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import DecodedIdToken = auth.DecodedIdToken;

@ApiTags('Authentication')
@Controller({
  version: '1',
})
export class AuthenticationController extends FirebaseHelper {
  constructor(private _authService: AuthenticationService) {
    super();
  }

  @ApiOperation({ summary: 'LOGIN' })
  @Post('login')
  @ApiOkResponse({ description: 'login success' })
  async loginAction(@Body() body: LoginFirebaseDto, @Res() response) {
    const user: DecodedIdToken = await this.getAuth(body.firebase_token);
    response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'login success',
      data: await this._authService.getFirebaseUserInDatabase(user),
    });
  }
}
