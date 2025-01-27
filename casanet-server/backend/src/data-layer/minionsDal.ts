import { IDataIO } from '../models/backendInterfaces';
import {
  ErrorResponse,
  LocalNetworkDevice,
  Minion,
  MinionCalibrate,
  RestrictionItem,
} from '../models/sharedInterfaces';
import { DataIO } from './dataIO';

const MINIONS_FILE_NAME = 'minions.json';

export class MinionsDal {
  private dataIo: IDataIO;

  /**
   * minions.
   */
  private minions: Minion[] = [];

  constructor(dataIo: IDataIO) {
    this.dataIo = dataIo;

    this.minions = dataIo.getDataSync();
  }

  /**
   * Get all minions as array.
   */
  public async getMinions(): Promise<Minion[]> {
    return this.minions;
  }

  /**
   * Get minion by id.
   * @param minionId minion id.
   */
  public async getMinionById(minionId: string): Promise<Minion> {
    const minion = this.findMinion(minionId);

    if (!minion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }
    return minion;
  }

  /**
   * Save new minion.
   * @param newMinion minoin to create.
   */
  public async createMinion(newMinion: Minion): Promise<void> {
    this.minions.push(newMinion);

    await this.dataIo.setData(this.minions).catch(() => {
      this.minions.splice(this.minions.indexOf(newMinion), 1);
      throw new Error('fail to save minion');
    });
  }

  /**
   * Delete minion.
   * @param minion minion to delete.
   */
  public async deleteMinion(minion: Minion): Promise<void> {
    const originalMinion = this.findMinion(minion.minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    this.minions.splice(this.minions.indexOf(originalMinion), 1);
    await this.dataIo.setData(this.minions).catch(() => {
      this.minions.push(originalMinion);
      throw new Error('fail to save minion delete request');
    });
  }

  /**
   * Rename minion.
   * @param minionId minion id.
   * @param nameToSet the new name to set.
   */
  public async renameMinion(minionId: string, nameToSet: string): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.name = nameToSet;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion new name update request');
    });
  }

  /**
   * Set minion a new room.
   * @param minionId minion id.
   * @param nameToSet the new room name to set.
   */
  public async setMinionRoom(minionId: string, nameToSet: string): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.room = nameToSet;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion new room name update request');
    });
  }

  /**
   * Update minion auto turn off timeout.
   * @param minionId minion to timeout.
   * @param setAutoTurnOffMS ms to set (or -1/undefined to disable).
   */
  public async updateMinionAutoTurnOff(minionId: string, setAutoTurnOffMS: number): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.minionAutoTurnOffMS = setAutoTurnOffMS;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion timeout update request');
    });
  }

  /**
   * Update minion restriction collection.
   * @param minionId minion to timeout.
   * @param restrictions The restriction collection
   */
  public async updateMinionRestriction(minionId: string, restrictions: RestrictionItem[]): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.restrictions = restrictions;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion restrictions update request');
    });
  }

  /**
   * Update minion calibration property.
   * @param minionId minion to edit.
   * @param minionCalibrate seconds to set (or 0 to disable).
   */
  public async updateMinionCalibrate(minionId: string, minionCalibrate: MinionCalibrate): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.calibration = minionCalibrate;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion calibrate update request');
    });
  }

  /**
   * Update minion networkDevice property.
   * @param minionId minion to edit.
   * @param networkDevice networkDevice to set.
   */
  public async updateMinionDevice(minionId: string, networkDevice: LocalNetworkDevice): Promise<void> {
    const originalMinion = this.findMinion(minionId);

    if (!originalMinion) {
      throw {
        responseCode: 1404,
        message: 'minion not exist',
      } as ErrorResponse;
    }

    originalMinion.device.pysicalDevice = networkDevice;

    await this.dataIo.setData(this.minions).catch(() => {
      throw new Error('fail to save minion networkDevice update request');
    });
  }

  /**
   * Find minion in minions array
   */
  private findMinion(minionId: string): Minion {
    for (const minion of this.minions) {
      if (minion.minionId === minionId) {
        return minion;
      }
    }
  }
}

export const MinionsDalSingleton = new MinionsDal(new DataIO(MINIONS_FILE_NAME));
