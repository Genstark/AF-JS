import * as express from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Path,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { MinionsBlSingleton } from '../business-layer/minionsBl';
import { TimingsBlSingleton } from '../business-layer/timingsBl';
import { ErrorResponse, Login, MinionFeed, Timing, TimingFeed } from '../models/sharedInterfaces';

/**
 * Because that swagger does not fully support SSE.
 * Use the TSOA routing is for documentation only.
 */
@Tags('Feeds')
@Route('feed')
export class FeedController extends Controller {
  /**
   * minions sse feed object.
   */
  private minionsSse: any;

  /**
   * timings sse feed object.
   */
  private timingsSse: any;

  /**
   * Init minions feed.
   * @param minionsSse minion sse object.
   */
  public initMinionsFeed(minionsSse: any): void {
    this.minionsSse = minionsSse;

    MinionsBlSingleton.minionFeed.attach(minionFeed => {
      this.minionsSse.send(minionFeed);
    });
  }

  /**
   * Init timings feed.
   * @param timingsSse timing sse object.
   */
  public initTimingsFeed(timingsSse: any): void {
    this.timingsSse = timingsSse;

    TimingsBlSingleton.timingFeed.attach(timingFeed => {
      this.timingsSse.send(timingFeed);
    });
  }

  //////////////////////////////////////////////////
  /////// SWAGGER DOCUMENTATION ONLY METHODS ///////
  //////////////////////////////////////////////////

  /**
   * Minions feed.
   * when minion status changed minion created etc.
   */
  @Security('userAuth')
  @Security('adminAuth')
  @Response<ErrorResponse>(501, 'Server error')
  @Get('minions')
  public async getMinionsFeed(): Promise<MinionFeed> {
    throw new Error('Request never should be here. it is a documentation only route.');
  }

  /**
   * Timing feed.
   * when timing activated.
   */
  @Security('userAuth')
  @Security('adminAuth')
  @Response<ErrorResponse>(501, 'Server error')
  @Get('timings')
  public async getTimingFeed(): Promise<TimingFeed> {
    throw new Error('Request never should be here. it is a documentation only route.');
  }
}
