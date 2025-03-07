import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

interface WatermarkProps {
  text?: string;
  opacity?: number;
  rotate?: string;
  colors?: string[];
}
/**
 * A component used to add watermark effects to the application.
 * @param {WatermarkProps} props - Properties for the watermark component
 * @param {string} props.text
 * @param {number} props.opacity
 * @param {string} props.rotate
 */
const Watermark: React.FC<WatermarkProps> = (props) => {
  // 从Redux状态中获取水印设置
  const { text, opacity, rotate, colors } = useSelector((state: { WatermarkReducer: WatermarkProps }) => state.WatermarkReducer);
  const { width, height } = Dimensions.get('window');
  const rows = Math.ceil(height / 100);
  const cols = Math.ceil(width / 200);

  return (
    <View style={styles.container}>
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((_, colIndex) => (
          <View
            key={`${rowIndex}-${colIndex}`}
            style={[
              styles.watermarkItem,
              {
                top: rowIndex * 100,
                left: colIndex * 200,
                opacity: opacity,
                // 修复transform类型错误，确保rotate值为AnimatableStringValue类型
                transform: rotate ? [{ rotate: rotate as string }] : undefined,
              },
            ]}>
            <Text>
              {text}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  watermarkItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
});

export default Watermark;