/**
 * Error response.
 */
export declare interface ErrorResponse {
  /**
   * error code in system.
   */
  responseCode: number;

  /**
   * Readable message.
   */
  message?: string;
}

/**
 * Operation result s, hold set minion status result per minion.
 */
export declare interface OperationResult {
  /**
   * Minion Id.
   */
  minionId: string;

  /**
   * Set a minion status results. (undefined if sets successfully).
   */
  error?: ErrorResponse;
}

/** Optional status on a remote connection */
export declare type RemoteConnectionStatus =
  /** There are no remote settings.. */
  | 'notConfigured'
  /** From some reason the connection to remote server offline. */
  | 'cantReachRemoteServer'
  /** The remote server has thrown authorization of the local server. */
  | 'authorizationFail'
  /** Local server disconnected. (When using a remote server, and the local server disconnected). */
  | 'localServerDisconnected'
  /** Connection OK. */
  | 'connectionOK';

/**
 * Remote server settings.
 */
export declare interface RemoteSettings {
  /** hostname / IP of the remote server */
  host: string;
  /** Access key for authorization local server in the remote server */
  connectionKey: string;
  /** Prevent remote server from feting logs */
  blockLogsFetchByRemote?: boolean;
}

/**
 * Login schema model.
 */
export declare interface Login {
  email: string;
  password: string;
  /** Optional for remote request forwards only */
  localServerId?: string;
}

export declare interface LoginResponse {
  isRemote?: boolean;
  localAddress?: string;
}

export declare interface LoginMfa {
  email: string;
  mfa: string;
  /** Optional for remote request forwards only */
  localServerId?: string;
}

export declare interface DeviceStatus {
  /**
   * The battery power, if relevant, in %.
   */
  battery?: number;

  /**
   * Is the device in charging mode
   */
  charging?: boolean;
}

/**
 * Represents any physical device in a local network.
 */
export declare interface LocalNetworkDevice {
  /**
   * Display name.
   */
  name?: string;

  /**
   * The MAC address of the device, the value is unique to each device.
   */
  mac: string;

  /**
   * Info about device manufacturer.
   */
  vendor?: string;

  /**
   * The device IP address, if exist it should be unique in network.
   */
  ip?: string;

  /**
   * The physical devices status, such as internal temp, battery etc.
   */
  deviceStatus?: DeviceStatus;
}

/**
 * Represents a physical device kind with network info.
 */
export declare interface MinionDevice {
  /**
   * The physical network device.
   */
  pysicalDevice: LocalNetworkDevice;

  /**
   * The brand of device.
   */
  brand: string;

  /**
   *  The specific model of the device.
   */
  model: string;

  /**
   *Some devices require a token for communication API.
   */
  token?: string;

  /**
   * Some devices require id for communication API.
   */
  deviceId?: string;
}

/**
 * For each supported device, there are limitations and abilities of it.
 */
export declare interface DeviceKind {
  /**
   * The brand of the current minion type. (see device model).
   */
  brand: string;

  /**
   * The specific model of minion type. (see device model).
   */
  model: string;

  /**
   * The max minions that can be in one device, or -1 if unlimited.
   * For example, a simple smart socket can be 1 minion per device,
   * Wall switch with 3 switches can be 3 minions per device,
   * And IR transmitter can be unlimited minions per device.
   */
  minionsPerDevice: number;

  /**
   * Is the device require a token for communication API.
   */
  isTokenRequired: boolean;

  /**
   * Is device require id for communication API.
   */
  isIdRequired: boolean;

  /**
   * Supported minion type for the current device.
   */
  supportedMinionType: MinionTypes;

  /**
   * Some of the devices supported recording (for example IR transmitter).
   */
  isRecordingSupported: boolean;

  /**
   * Whenever the device and module supported fetching commands data from
   * the https://github.com/casanet/rf-commands-repo project
   */
  isFetchCommandsAvailable: boolean;
}

/**
 * Minion timeout countdown information
 */
export declare interface MinionTimeout {
  minionId: string;
  /** IS countdown active */
  active: boolean;
  /** EPOCH time when countdown started */
  countdownTimestamp: number;
}

/**
 * Scopes of authentication, right know in our system there are only 3 scopes.
 * admin and user. any API route protect by one of them.
 */
export declare type AuthScopes = 'adminAuth' | 'userAuth';

/**
 * Represents a user in the system.
 */
export declare interface User {
  /**
   *  Name
   */
  displayName?: string;

  /**
   * User email
   */
  email: string;

  /**
   * User password.
   */
  password?: string;

  /**
   * Ignore 2-step verification on login or not.
   */
  ignoreTfa: boolean;

  /**
   * User scopes.
   */
  scope: AuthScopes;

  /**
   * Whenever the user required to set new password, during default password usage, password expiration, etc.
   */
  passwordChangeRequired?: boolean;
}

/**
 * Supported minions types.
 */
export declare type MinionTypes =
  | 'toggle'
  | 'switch'
  | 'temperatureSensor'
  | 'roller'
  | 'cleaner'
  | 'airConditioning'
  | 'light'
  | 'temperatureLight'
  | 'colorLight';

/**
 * Supported timings types.
 */
export declare type TimingTypes = 'dailySunTrigger' | 'dailyTimeTrigger' | 'once' | 'timeout';

/**
 * Days in week.
 */
export declare type DaysOptions = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

/**
 * Sun triggers.
 */
export declare type SunTriggerOptions = 'sunrise' | 'sunset';

/**
 * Valid AC mode.
 */
export declare type ACModeOptions = 'hot' | 'cold' | 'dry' | 'auto';

/**
 * Valid fan strength.
 */
export declare type FanStrengthOptions = 'low' | 'med' | 'high' | 'auto';

/**
 * Switches option
 */
export declare type SwitchOptions = 'on' | 'off';

/**
 * Roller direction
 */
export declare type RollerDirection = 'up' | 'down';

/**
 * Cleaner mode
 */
export declare type CleanerMode = 'dock' | 'clean';

/**
 * A toggle value, the toggle is on way communicated device,
 * For example wall light switches with 433 RF that can turn on or off
 * but there is no way to know the real light status if someone changes the light status using physical switch.
 */
export declare interface Toggle {
  status: SwitchOptions;
}

/**
 * A switch status.
 *  Used for simple devices that can be turned on or off. *and minion status is readable*
 * The properties same as a toggle, and the difference is logic only (if that status is readable or not).
 */
export declare interface Switch extends Toggle {}

export declare interface TemperatureSensor extends Toggle {
  /** Temperature in celsius (X°) */
  temperature: number;
}

/**
 * A roller switch status.
 * A roller is a switch for curtains or blinds (or for any other needs) that can drag up/down or stop.
 */
export declare interface Roller extends Switch {
  /** drag direction */
  direction: RollerDirection;
}

/**
 * A Cleaner (robot) status.
 * Cleaner is a smart robot for cleaning home.
 */
export declare interface Cleaner extends Switch {
  /** Cleaner mode */
  mode: CleanerMode;
  /** Suction strength */
  fanSpeed: FanStrengthOptions;
}

/**
 * An AC status.
 */
export declare interface AirConditioning extends Switch {
  /**
   * Valid AC temperature. (minimum 16° maximum 30°).
   * @minimum 16
   * @maximum 30
   * @isInt true
   */
  temperature: number;
  mode: ACModeOptions;
  fanStrength: FanStrengthOptions;
}

/**
 * A simple light status.
 * Used to devices that can chang it's brightness.
 */
export declare interface Light extends Switch {
  /**
   * Minimum 1% maximum 100% of light brightness.
   * @minimum 1
   * @maximum 100
   * @isInt true
   */
  brightness: number;
}

/**
 * A light simple light status.
 * Used to devices that can chang also light temperature (warm or cold light).
 */
export declare interface TemperatureLight extends Light {
  /**
   * Spectrum is 1% to warm light and 100% to cold light.
   * @minimum 1
   * @maximum 100
   * @isInt true
   */
  temperature: number;
}

/**
 * A light simple light status.
 * Used to devices that can change also light color (RGB).
 */
export declare interface ColorLight extends TemperatureLight {
  /**
   * Minimum 0 maximum 255 from red color.
   * Valid color value. (8 bits number, minimum 0 maximum 255).
   * @minimum 0
   * @maximum 255
   * @isInt true
   */
  red: number;
  /**
   * Minimum 0 maximum 255 from green color.
   * Valid color value. (8 bits number, minimum 0 maximum 255).
   * @minimum 0
   * @maximum 255
   * @isInt true
   */
  green: number;
  /**
   * Minimum 0 maximum 255 from blue color.
   * Valid color value. (8 bits number, minimum 0 maximum 255).
   * @minimum 0
   * @maximum 255
   * @isInt true
   */
  blue: number;
}

/**
 * Once timing structure.
 */
export declare interface OnceTiming {
  /**
   * UTC time.
   */
  date: number;
}

/**
 * Timeout timing structure.
 */
export declare interface TimeoutTiming {
  /**
   * UTC time.
   */
  startDate: number;

  /**
   *  Duration to activate timing from the start timeout time in minutes.
   */
  durationInMinutes: number;
}

/**
 * Daily timing structure.
 */
export declare interface DailyTiming {
  /**
   * Selected days in a week.
   */
  days: DaysOptions[];
}

/**
 * Daily timing based on sun triggers.
 */
export declare interface DailySunTrigger extends DailyTiming {
  /**
   * Minutes from the sun trigger.
   * can be before or after the sun triggers.
   * For example, to invoke 40 minutes before sunset set -40 and to invoke 40 minutes after sunset set 40.
   *
   * NOTE! if the duration is more then minutes available in the day from the sun trigger time, the timing will not activate.
   * for example if the sunset is in 18:00 and the duration set to 7*60 minutes,
   * the activate time is not on the same day, so it will not activate at all.
   */
  durationMinutes: number;

  /**
   * Sun trigger.
   */
  sunTrigger: SunTriggerOptions;
}

/**
 * Daily timing based on time in a day.
 */
export declare interface DailyTimeTrigger extends DailyTiming {
  /**
   * The hour in a day.
   * @minimum 0
   * @maximum 23
   * @isInt true
   */
  hour: number;

  /**
   * Minutes in an hour.
   * @minimum 0
   * @maximum 59
   * @isInt true
   */
  minutes: number;
}

/**
 *  Minion status, the available values depend on the minion type.
 */
export declare interface MinionStatus {
  toggle?: Toggle;
  switch?: Switch;
  roller?: Roller;
  cleaner?: Cleaner;
  airConditioning?: AirConditioning;
  light?: Light;
  temperatureLight?: TemperatureLight;
  colorLight?: ColorLight;
  temperatureSensor?: TemperatureSensor;
}

/**
 * Feed update type enum.
 */
export declare type FeedEvent = 'created' | 'update' | 'removed';

/**
 * The minion status change triggers
 */
export declare type MinionChangeTrigger =
  | 'user'
  | 'device'
  | 'timeout'
  | 'timing'
  | 'action'
  | 'lock'
  | 'sync'
  | 'rotation'
  | 'external';

/**
 * Minion feed object.
 */
export declare interface MinionFeed {
  event: FeedEvent;
  minion: Minion;
  oldMinion: Minion;
  trigger?: MinionChangeTrigger;
  user?: User;
}

/**
 * Used to change the minion auto turn off the timeout value.
 */
export declare interface SetMinionAutoTurnOff {
  /** The timeout duration in ms, to turn off set 0 as valse. */
  setAutoTurnOffMS: number;
}

export declare type CalibrationMode =
  /** Lock device to 'on' mode even if its will changed by the physical interface */
  | 'LOCK_ON'
  /** Lock device to 'off' mode even if its will changed by the physical interface */
  | 'LOCK_OFF'
  /** Shabbat mode used to turn off/on in interval, so the Sabbat keepers can wait to the wanted state */
  | 'SHABBAT'
  /**
   * Just make sure that casanet and the physical device have the same status
   * By sending the last casanet status to the device.
   */
  | 'AUTO'
  /**
   * Allow modify a device only from the dashboard, and reject any attempt to modify status by changing status by physical action.
   */
  | 'LOCK_DASHBOARD';

/**
 * Used to change the minion calibration property value.
 */
export declare interface MinionCalibrate {
  /**
   * Minutes to calibrate status, set 0 to turn off calibration
   * @minimum 0
   * @isInt true
   */
  calibrationCycleMinutes: number;

  /**
   * The calibration mode to calibrate
   */
  calibrationMode: CalibrationMode;
}

/**
 * Used to rename minion.
 */
export declare interface MinionRename {
  /** The new name to set. */
  name: string;
}

/**
 * Used to set minion room name.
 */
export declare interface MinionSetRoomName {
  /** The new room name to set. */
  room: string;
}

/**
 * Used to set minion physical device.
 */
export declare interface MinionSetDevice {
  /** The device mac to set. */
  mac: string;
}

/**
 * Type of resection of access
 */
export declare type RestrictionType = 'BLOCK' | 'READ' | 'WRITE';

export declare interface RestrictionItem {
  /** The use to restrict */
  userEmail: string;
  /** The limited access type to grant user */
  restrictionType: RestrictionType;
}

/**
 * Represents a minion in system.
 * Minion is a logic device in the system, meaning that a device is a physical device and minion is a logic device
 * that uses a physical device to switch home kit status. For example, an IR transmitter can be one physical device
 * for a few minions, one to central AC control and second for secondary AC control
 * so in it will be two totally different minions that use one physical device.
 */
export declare interface Minion {
  /**
   * Minion unique id.
   */
  minionId?: string;

  /**
   * The display name for a minion.
   */
  name: string;

  /**
   * Physical device of minion.
   */
  device: MinionDevice;

  /**
   * Is communication with device status ok.
   */
  isProperlyCommunicated?: boolean;

  /**
   * Status of minion (based on minion type).
   */
  minionStatus: MinionStatus;

  /**
   * Minion type.
   */
  minionType: MinionTypes;

  /**
   * Auto turns  off duration, *if* set member value then the minion will turn off in X ms after turning it on,
   * Used for example in boiler minion etc.
   */
  minionAutoTurnOffMS?: number;

  /**
   * Calibrate the physical device with the server known status, in a periodic cycle,
   * and allow locking the status.
   */
  calibration?: MinionCalibrate;

  /**
   * Represents the room where the minion is located at.
   */
  room?: string;

  /**
   * Last status change timestamp in UTC MS
   */
  statusChangedTime?: number;

  /**
   * The restriction of access on this minion
   */
  restrictions?: RestrictionItem[];
}

/**
 * Represents activity.
 */
export declare interface OperationActivity {
  /** Minion id to set */
  minionId: string;

  /**
   * Status to set to minion.
   */
  minionStatus: MinionStatus;
}

/**
 * Represents an operation in the system.
 * An operation is a set of activities to do.
 * For example, to turn on all home light operation
 * sets an array of activity for each light in the home to set light status 'on'.
 */
export declare interface Operation {
  /**
   * Operation unique id.
   */
  operationId: string;

  /**
   * Operation display name.
   */
  operationName: string;

  /**
   * Activities array.
   */
  activities: OperationActivity[];
}

/**
 * Timing properties, values depend on timing type.
 */
export declare interface TimingProperties {
  dailySunTrigger?: DailySunTrigger;
  dailyTimeTrigger?: DailyTimeTrigger;
  once?: OnceTiming;
  timeout?: TimeoutTiming;
}

/**
 * Timing feed object.
 */
export declare interface TimingFeed {
  timing: Timing;
  results: OperationResult[];
}

/**
 * Represents a timing in the system.
 */
export declare interface Timing {
  /**
   * Timing unique id.
   */
  timingId: string;

  /**
   * Timing display name.
   */
  timingName?: string;

  /**
   * Operation id to invoke (optional).
   */
  triggerOperationId?: string;

  /**
   * Allow (optional) to trigger (only) one minion directly
   */
  triggerDirectAction?: OperationActivity;

  /**
   * Is timing active or not.
   */
  isActive: boolean;

  /**
   * The timing type.
   */
  timingType: TimingTypes;

  /**
   * The timing properties.
   */
  timingProperties: TimingProperties;

  /**
   * Lock the status that changed by the timing (default false)
   */
  setLock?: CalibrationMode;
  /**
   * Override lock, if exists (default false)
   */
  overrideLock?: boolean;
}

/** Update version results */
export declare interface UpdateResults {
  /** Application already in the latest version  */
  alreadyUpToDate: boolean;
}

/** Version info */
export declare interface VersionInfo {
  /** Latest version (Git Tag) name */
  version: string;
  /** Current local master/HEAD commit hash */
  commitHash: string;
  /** Time stamp of HEAD commit in UTC format */
  timestamp: number;
}

/** Long-time job status */
export declare type ProgressStatus = 'inProgress' | 'finished' | 'fail';

/** Scanning progress status */
export declare interface ScanningStatus {
  scanningStatus: ProgressStatus;
}

/** Version update progress status */
export declare interface VersionUpdateStatus {
  updateStatus: ProgressStatus;
}

/** Minion timeline node */
export declare interface MinionTimeline {
  minionId: string;
  timestamp: number;
  status: MinionStatus;
  trigger: MinionChangeTrigger;
  user?: {
    name: string;
    email: string;
  };
}

/** Device in commands repo project. see https://github.com/casanet/rf-commands-repo. API section */
export declare interface CommandsRepoDevice {
  brand: string;
  model: string;
  category: MinionTypes;
}

/**
 * The triggers types.
 * - 'statusChange' to invoke only on status change, but allow change later the status
 * - 'permanent' at while the status of the minion of action trigger still on the triggered status, force the action, always.
 */
export declare type ActionApply = 'statusChange' | 'permanent';

/**
 * The action set to do on an action trigger
 */
export declare interface ActionSet {
  /** The minion to set  */
  minionId: string;
  /** The status to set to the minion */
  setStatus: MinionStatus;
}

/**
 * An action to trigger some minion/s status in case minion has some status
 */
export declare interface Action {
  /** The action id */
  actionId: string;
  /** The minion where his status will trigger this action set */
  minionId: string;
  /** Whenever the action is active */
  active: boolean;
  /** Free text, as the action name */
  name?: string;
  /** The minion status that will trigger this action set */
  ifStatus: MinionStatus;
  /** The actions set to invoke in case of this action trigger */
  thenSet: ActionSet[];
  /** The trigger to apply the action */
  apply: ActionApply;
}

export declare interface CollectionItem {
  /** The item id, can be minion, timing, device etc */
  itemId: string;
}

/**
 * An collection of items, can be used for view aggregation of any item/s in the system
 */
export declare interface Collection {
  /** The action id */
  collectionId: string;
  /** The trigger to apply the action */
  collectionName: string;
  /** The collection items */
  items: CollectionItem[];
}
