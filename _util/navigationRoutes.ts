/**
 * Navigation Routes
 * Centralized route definitions for User and Helper apps
 */

export const USER_ROUTES = {
  // Main navigation
  HOME: '/user',
  SCHEDULES: '/user/schedules',
  NOTIFICATIONS: '/user/notifications',
  SHARE: '/user/share',
  SETTINGS: '/user/settings',

  // Settings sub-routes
  SETTINGS_NOTIFICATIONS: '/user/settings/notifications',
  SETTINGS_PROFILE: '/user/settings/profile',
  SETTINGS_HEALTH_PROFILE: '/user/settings/health-profile',
  SETTINGS_CAREGIVER: '/user/settings/caregiver',
  SETTINGS_TOILET_TIMING: '/user/settings/toilet-timing',
  SETTINGS_ALARM_VALUE: '/user/settings/alarm-value',
  SETTINGS_EMERGENCY_CONTACT: '/user/settings/emergency-contact',
  SETTINGS_CONNECTED_DEVICES: '/user/settings/connected-devices',
  SETTINGS_PRIVACY: '/user/settings/privacy',
} as const;

export const HELPER_ROUTES = {
  // Main navigation
  HOME: '/helper',
  SCHEDULES: '/helper/schedules',
  NOTIFICATIONS: '/helper/notifications',
  SHARE: '/helper/share',
  SETTINGS: '/helper/settings',

  // Settings sub-routes
  SETTINGS_NOTIFICATIONS: '/helper/settings/notifications',
  SETTINGS_PROFILE: '/helper/settings/profile',
  SETTINGS_HEALTH_PROFILE: '/helper/settings/health-profile',
  SETTINGS_EMERGENCY_CONTACT: '/helper/settings/emergency-contact',
  SETTINGS_PRIVACY: '/helper/settings/privacy',
  SETTINGS_CONNECTION_TEST: '/helper/settings/connection-test',
} as const;

export type UserRoute = (typeof USER_ROUTES)[keyof typeof USER_ROUTES];
export type HelperRoute = (typeof HELPER_ROUTES)[keyof typeof HELPER_ROUTES];
export type AppRoute = UserRoute | HelperRoute;
