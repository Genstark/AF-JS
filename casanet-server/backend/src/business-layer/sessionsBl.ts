import * as cryptoJs from 'crypto-js';
import { Request, Response } from 'express';
import * as randomstring from 'randomstring';
import { Configuration } from '../config';
import { SessionsDal, SessionsDalSingelton } from '../data-layer/sessionsDal';
import { Session } from '../models/backendInterfaces';
import { User } from '../models/sharedInterfaces';
import { sessionExpiresMs } from './authBl';

export class SessionsBl {
  private sessionDal: SessionsDal;

  /**
   * Init session bl. using dependecy injection pattern to allow units testings.
   * @param sessionDal Inject the dal instance.
   */
  constructor(sessionDal: SessionsDal) {
    this.sessionDal = sessionDal;
  }

  /**
   * Gets session by session key, or reject if not exist.
   * @param sessionKey session key
   * @returns session, or inject if not exist.
   */
  public async getSession(sessionKey: string): Promise<Session> {
    const hashedSession = cryptoJs.SHA512(sessionKey + Configuration.keysHandling.saltHash).toString();
    return await this.sessionDal.getSession(hashedSession); // TODO unit test?
  }

  /**
   * Get all user sessions.
   * @param user User to get session for.
   * @returns Session array.
   */
  public async getUserSessions(user: User): Promise<Session[]> {
    const sessions: Session[] = await this.sessionDal.getSessions();

    const userSessions: Session[] = [];
    for (const session of sessions) {
      if (session.email === user.email && new Date().getTime() - session.timeStamp < sessionExpiresMs) {
        userSessions.push(session);
      }
    }

    return userSessions;
  }

  /**
   * Generate session for user.
   * @param userToCreateFor User to create session for.
   * @returns The new generated session.
   */
  public async generateSession(userToCreateFor: User): Promise<string> {
    const generatedSession = randomstring.generate(64);
    const newSession: Session = {
      keyHash: cryptoJs.SHA512(generatedSession + Configuration.keysHandling.saltHash).toString(),
      timeStamp: new Date().getTime(),
      email: userToCreateFor.email,
    };

    await this.sessionDal.createSession(newSession);

    return generatedSession;
  }

  /**
   * Delete session.
   * @param session session to selete.
   */
  public async deleteSession(session: Session): Promise<void> {
    return this.sessionDal.deleteSession(session);
  }

  /**
   * Delete all user session .
   * @param user user to delete all activated sessions.
   */
  public async deleteUserSessions(user: User): Promise<void> {
    const sessions = await this.getUserSessions(user);
    for (const session of sessions) {
      await this.deleteSession(session);
    }
  }
}

export const SessionsBlSingleton = new SessionsBl(SessionsDalSingelton);
