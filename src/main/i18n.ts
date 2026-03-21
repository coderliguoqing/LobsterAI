/**
 * Lightweight i18n module for the Electron main process.
 *
 * Mirrors the renderer's i18nService pattern but runs in Node (no DOM/window).
 * Keeps only the small subset of keys needed by main-process code
 * (tray menu, session titles, etc.).
 *
 * Usage:
 *   import { t, setLanguage } from './i18n';
 *   setLanguage('en');
 *   const label = t('trayShowWindow'); // "Open LobsterAI"
 */

export type LanguageType = 'zh' | 'en';

const translations: Record<LanguageType, Record<string, string>> = {
  zh: {
    // Tray menu
    trayShowWindow: '打开 LobsterAI',
    trayNewTask: '新建任务',
    traySettings: '设置',
    trayQuit: '退出',

    // Session titles (created by ChannelSessionSync)
    cronSessionPrefix: '定时',

    // Timeout hint
    taskTimedOut: '[任务超时] 任务因超过最大允许时长而被自动停止。你可以继续对话以从中断处继续。',

    // Feishu bot install
    feishuVerifyCredentialsFailed: '凭证验证失败，请检查 App ID 和 App Secret 是否正确',
    feishuVerifyFailed: '验证失败',

    // Skill manager errors
    skillErrNoSkillMd: '来源中未找到 SKILL.md',
  },
  en: {
    // Tray menu
    trayShowWindow: 'Open LobsterAI',
    trayNewTask: 'New Task',
    traySettings: 'Settings',
    trayQuit: 'Quit',

    // Session titles
    cronSessionPrefix: 'Cron',

    // Timeout hint
    taskTimedOut: '[Task timed out] The task was automatically stopped because it exceeded the maximum allowed duration. You can continue the conversation to pick up where it left off.',

    // Feishu bot install
    feishuVerifyCredentialsFailed: 'Credential validation failed. Please check your App ID and App Secret.',
    feishuVerifyFailed: 'Verification failed',

    // Skill manager errors
    skillErrNoSkillMd: 'No SKILL.md found in source',
  },
};

let currentLanguage: LanguageType = 'zh';

/** Set the active language. Call this when app_config.language changes. */
export function setLanguage(language: LanguageType): void {
  currentLanguage = language;
}

export function getLanguage(): LanguageType {
  return currentLanguage;
}

/** Look up a translation key. Returns the key itself if no translation exists. */
export function t(key: string): string {
  return translations[currentLanguage][key]
    ?? translations[currentLanguage === 'zh' ? 'en' : 'zh'][key]
    ?? key;
}
