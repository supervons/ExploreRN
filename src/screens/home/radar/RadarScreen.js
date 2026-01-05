/**
 * Created by supervons on 2025/01/05
 * 雷达扫描动画页面
 * Radar scanning animation page
 */
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");
const RADAR_SIZE = Math.min(width, height) * 0.8;

export default function RadarScreen() {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const [targets, setTargets] = useState([]);
  const targetIdCounter = useRef(0);

  // 启动雷达旋转动画
  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };
    startRotation();
  }, []);

  // 随机生成目标点（但不立即显示）
  useEffect(() => {
    const generateTarget = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (RADAR_SIZE / 2 - 20);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const newTarget = {
        id: targetIdCounter.current++,
        x,
        y,
        size: Math.random() * 6 + 4,
        opacity: new Animated.Value(0),
        angle: ((angle * 180) / Math.PI + 360) % 360, // 目标角度
        revealed: false, // 是否已被扫描线经过
      };

      setTargets(prev => [...prev, newTarget]);
    };

    // 定期生成新目标
    const interval = setInterval(generateTarget, 2000);

    // 初始生成几个目标
    for (let i = 0; i < 3; i++) {
      setTimeout(generateTarget, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  // 监听扫描线位置，当扫描线经过目标时显示目标
  useEffect(() => {
    const checkScanlineHit = () => {
      const currentRotation = rotationAnim.__getValue() * 360; // 获取当前旋转角度

      setTargets(prev =>
        prev.map(target => {
          if (!target.revealed) {
            const scanlineAngle = currentRotation % 360;
            const targetAngle = target.angle;

            // 检查扫描线是否经过目标（允许一定误差范围）
            const angleDiff = Math.abs(scanlineAngle - targetAngle);
            const isHit = angleDiff < 10 || angleDiff > 350; // 10度误差范围

            if (isHit) {
              // 扫描线经过，开始显示目标
              Animated.timing(target.opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }).start();

              // 3-5秒后淡出并移除
              setTimeout(() => {
                Animated.timing(target.opacity, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start(() => {
                  setTargets(prev => prev.filter(t => t.id !== target.id));
                });
              }, Math.random() * 2000 + 3000);

              return { ...target, revealed: true };
            }
          }
          return target;
        }),
      );
    };

    const interval = setInterval(checkScanlineHit, 50); // 每50ms检查一次
    return () => clearInterval(interval);
  }, [rotationAnim]);

  const rotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.radarContainer}>
        {/* 雷达背景圆圈 */}
        {[1, 2, 3, 4].map(index => (
          <View
            key={index}
            style={[
              styles.radarCircle,
              {
                width: (RADAR_SIZE / 4) * index,
                height: (RADAR_SIZE / 4) * index,
                borderRadius: (RADAR_SIZE / 8) * index,
              },
            ]}
          />
        ))}

        {/* 十字线 */}
        <View style={styles.crossLines}>
          <View style={[styles.crossLine, styles.horizontalLine]} />
          <View style={[styles.crossLine, styles.verticalLine]} />
        </View>

        {/* 扫描线 */}
        <Animated.View
          style={[
            styles.scannerLine,
            {
              transform: [{ rotate }],
              width: RADAR_SIZE / 2,
              height: 2,
            },
          ]}
        />

        {/* 目标点 */}
        {targets.map(target => (
          <Animated.View
            key={target.id}
            style={[
              styles.target,
              {
                left: RADAR_SIZE / 2 + target.x - target.size / 2,
                top: RADAR_SIZE / 2 + target.y - target.size / 2,
                width: target.size,
                height: target.size,
                borderRadius: target.size / 2,
                opacity: target.opacity,
              },
            ]}
          />
        ))}
      </View>

      <Text style={styles.title}>雷达扫描系统</Text>
      <Text style={styles.subtitle}>Radar Scanning System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  radarContainer: {
    width: RADAR_SIZE,
    height: RADAR_SIZE,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 20, 0, 0.1)",
    borderRadius: RADAR_SIZE / 2,
    borderWidth: 2,
    borderColor: "#00ff00",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  radarCircle: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#00ff00",
    backgroundColor: "transparent",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  crossLines: {
    position: "absolute",
    width: RADAR_SIZE,
    height: RADAR_SIZE,
  },
  crossLine: {
    position: "absolute",
    backgroundColor: "#00ff00",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  horizontalLine: {
    width: RADAR_SIZE,
    height: 1,
    top: RADAR_SIZE / 2 - 0.5,
    left: 0,
  },
  verticalLine: {
    width: 1,
    height: RADAR_SIZE,
    left: RADAR_SIZE / 2 - 0.5,
    top: 0,
  },
  scannerLine: {
    position: "absolute",
    backgroundColor: "#00ff00",
    left: RADAR_SIZE / 2,
    top: RADAR_SIZE / 2,
    transformOrigin: "left center",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 8,
  },
  target: {
    position: "absolute",
    backgroundColor: "#ff0000",
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    opacity: 0.7,
    textAlign: "center",
  },
});
