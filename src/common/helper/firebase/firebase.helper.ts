import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseConfig from './firebase.config';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}
@Injectable()
export class FirebaseHelper {
  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({ ...firebaseConfig }),
      databaseURL: firebaseConfig.databaseUrl,
    });
  }

  getAuth = async (token: any): Promise<DecodedIdToken> => {
    try {
      return await this.firebaseApp.auth().verifyIdToken(token, true);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  };

  firestore = (): firebase.firestore.Firestore => {
    return this.firebaseApp.firestore();
  };

  getUser = async (uid: string) => {
    return uid;
    // return await this.getAuth()
    //   .getUser(uid)
    //   .catch((e) => {
    //     throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    //   });
  };
  //   async sendNotification(
  //     userIds,
  //     message: string,
  //     action: string,
  //     options = {
  //       priority: 'high',
  //       timeToLive: 2419200, // 28 days
  //     },
  //   ) {
  //     if (!userIds || userIds.length === 0) {
  //       return;
  //     }
  //     let condition = `'${userIds[0] || 'MAIN'}' in topics`;
  //     userIds.forEach((id: any, index: number) => {
  //       if (index > 0) {
  //         condition += ` || '${id}' in topics`;
  //       }
  //     });
  //     const payloadBackground: Message = {
  //       apns: {
  //         headers: {
  //           'apns-priority': '10',
  //           'apns-expiration': '1604750400', // 11/07/2020, unixTimestamp
  //         },
  //         payload: {
  //           aps: {
  //             alert: {
  //               title: 'Kicks',
  //               body: message,
  //             },

  //             category: action,
  //             sound: 'default',
  //           },
  //           message,
  //           action,
  //         },
  //       },
  //       android: {
  //         ttl: 2419200, // 28 days
  //         notification: {
  //           title: 'Kicks',
  //           body: message,
  //           sound: 'default',
  //         },
  //         data: {
  //           message,
  //           action,
  //         },
  //         priority: 'high',
  //       },
  //       condition,
  //     };
  //     try {
  //       firebase.messaging().send(payloadBackground);
  //     } catch (error) {
  //       console.log('send notification failed', error);
  //     }
  //   }
}
