import { Text, type TextProps as TamaguiTextProps } from 'tamagui';

export type ThemedTextProps = Omit<TamaguiTextProps, 'color'> & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const getTypeProps = () => {
    switch (type) {
      case 'title':
        return {
          fontSize: 32,
          fontWeight: 'bold' as const,
          lineHeight: 32,
        };
      case 'subtitle':
        return {
          fontSize: 20,
          fontWeight: 'bold' as const,
        };
      case 'defaultSemiBold':
        return {
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '600' as const,
        };
      case 'link':
        return {
          fontSize: 16,
          lineHeight: 30,
          color: '$info',
        };
      default:
        return {
          fontSize: 16,
          lineHeight: 24,
        };
    }
  };

  return (
    <Text
      color="$color"
      {...getTypeProps()}
      {...rest}
    />
  );
}

