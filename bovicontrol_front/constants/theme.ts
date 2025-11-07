/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Paleta inspirada no mockup do BoviControl
export const Colors = {
  light: {
    text: '#1F2937',
    background: '#F8F5E9', // creamBg
    tint: '#2B7A0B', // primary
    icon: '#6B4A2E', // brown for icons where needed
    tabIconDefault: '#687076',
    tabIconSelected: '#2B7A0B',
    surface: '#FAF8EF',
    card: '#F3EFD9',
    primary: '#2B7A0B',
    primaryDark: '#1E5A06',
    onPrimary: '#FFFFFF',
    success: '#16A34A',
    danger: '#DC2626',
    warning: '#D97706',
    brown: '#6B4A2E',
    tan: '#B49A6A',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#2B7A0B',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#2B7A0B',
    surface: '#1A1C1D',
    card: '#222425',
    primary: '#2B7A0B',
    primaryDark: '#1E5A06',
    onPrimary: '#FFFFFF',
    success: '#16A34A',
    danger: '#DC2626',
    warning: '#D97706',
    brown: '#6B4A2E',
    tan: '#B49A6A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
