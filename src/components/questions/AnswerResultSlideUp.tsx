import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles";
import Svg, { Path, G } from 'react-native-svg';

const AnswerResultSlideUp = ({
  isVisible,
  isRight,
  rightText,
  wrongText,
  isFinished,
  setShowExplainModal,
  setShowComplainModal,
}: {
  isVisible: boolean;
  isRight: boolean;
  isFinished: boolean;
  rightText: string;
  wrongText: string;
  setShowExplainModal: Function;
  setShowComplainModal: Function;
}) => {
  const [slideAnim] = useState(new Animated.Value(180)); // Initial position off-screen

  useEffect(() => {
    if (isVisible) {
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: 180,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.slideUpContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.answerContainer}>
        {isRight ? (    
            <Text style={styles.rightStyle}>
              {isFinished ? "Добив!" : rightText}
            </Text>
        ) : (
          <Text style={styles.wrongStyle}>
            {isFinished ? "Танцював та не вклонився(" : wrongText}
          </Text>
        )}
        <TouchableOpacity onPress={() => setShowComplainModal(true)}>
          <Svg fill={colors.red} viewBox="0 0 24 24" width={28} height={28}>
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></G>
            <G id="SVGRepo_iconCarrier">
              <Path
                fill-rule="evenodd"
                d="M16,2 C16.2652165,2 16.5195704,2.10535684 16.7071068,2.29289322 L21.7071068,7.29289322 C21.8946432,7.4804296 22,7.73478351 22,8 L22,15 C22,15.2339365 21.9179838,15.4604694 21.7682213,15.6401844 L16.7682213,21.6401844 C16.5782275,21.868177 16.2967798,22 16,22 L8,22 C7.73478351,22 7.4804296,21.8946432 7.29289322,21.7071068 L2.29289322,16.7071068 C2.10535684,16.5195704 2,16.2652165 2,16 L2,8 C2,7.73478351 2.10535684,7.4804296 2.29289322,7.29289322 L7.29289322,2.29289322 C7.4804296,2.10535684 7.73478351,2 8,2 L16,2 Z M15.5857864,4 L8.41421356,4 L4,8.41421356 L4,15.5857864 L8.41421356,20 L15.5316251,20 L20,14.6379501 L20,8.41421356 L15.5857864,4 Z M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,13 C13,13.5522847 12.5522847,14 12,14 C11.4477153,14 11,13.5522847 11,13 L11,7 C11,6.44771525 11.4477153,6 12,6 Z"
              ></Path>
            </G>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowExplainModal(true)}>
          <Svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></G>
            <G id="SVGRepo_iconCarrier">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2.75C8.27208 2.75 5.25 5.77208 5.25 9.5C5.25 11.4985 6.11758 13.2934 7.49907 14.5304L7.50342 14.5343C8.06008 15.0328 8.48295 15.4114 8.78527 15.6886C9.06989 15.9495 9.29537 16.1628 9.41353 16.3086L9.42636 16.3244C9.64763 16.5974 9.84045 16.8353 9.9676 17.1199C10.0948 17.4044 10.1434 17.7067 10.1992 18.0537L10.2024 18.0738C10.231 18.2517 10.2425 18.4701 10.247 18.75H13.753C13.7575 18.4701 13.769 18.2517 13.7976 18.0738L13.8008 18.0537C13.8566 17.7067 13.9052 17.4044 14.0324 17.1199C14.1596 16.8353 14.3524 16.5974 14.5736 16.3244L14.5865 16.3086C14.7046 16.1628 14.9301 15.9495 15.2147 15.6886C15.5171 15.4114 15.94 15.0327 16.4966 14.5343L16.5009 14.5304C17.8824 13.2934 18.75 11.4985 18.75 9.5C18.75 5.77208 15.7279 2.75 12 2.75ZM13.7436 20.25H10.2564C10.2597 20.3542 10.2646 20.4453 10.2721 20.5273C10.2925 20.7524 10.3269 20.8341 10.3505 20.875C10.4163 20.989 10.511 21.0837 10.625 21.1495C10.6659 21.1731 10.7476 21.2075 10.9727 21.2279C11.2082 21.2493 11.5189 21.25 12 21.25C12.4811 21.25 12.7918 21.2493 13.0273 21.2279C13.2524 21.2075 13.3341 21.1731 13.375 21.1495C13.489 21.0837 13.5837 20.989 13.6495 20.875C13.6731 20.8341 13.7075 20.7524 13.7279 20.5273C13.7354 20.4453 13.7403 20.3542 13.7436 20.25ZM3.75 9.5C3.75 4.94365 7.44365 1.25 12 1.25C16.5563 1.25 20.25 4.94365 20.25 9.5C20.25 11.9428 19.1874 14.1384 17.5016 15.6479C16.9397 16.151 16.5234 16.5238 16.2284 16.7942C16.0809 16.9295 15.9681 17.0351 15.8849 17.1162C15.8434 17.1566 15.8117 17.1886 15.788 17.2134C15.7763 17.2256 15.7675 17.2352 15.7611 17.2423C15.7546 17.2496 15.7518 17.253 15.7519 17.2529C15.4917 17.574 15.4354 17.6568 15.4019 17.7319C15.3683 17.8069 15.3442 17.9041 15.2786 18.3121C15.2527 18.4732 15.25 18.7491 15.25 19.5V19.5322C15.25 19.972 15.25 20.3514 15.2218 20.6627C15.192 20.9918 15.1259 21.3178 14.9486 21.625C14.7511 21.967 14.467 22.2511 14.125 22.4486C13.8178 22.6259 13.4918 22.692 13.1627 22.7218C12.8514 22.75 12.472 22.75 12.0322 22.75H11.9678C11.528 22.75 11.1486 22.75 10.8374 22.7218C10.5082 22.692 10.1822 22.6259 9.875 22.4486C9.53296 22.2511 9.24892 21.967 9.05144 21.625C8.87407 21.3178 8.80802 20.9918 8.77818 20.6627C8.74997 20.3514 8.74998 19.972 8.75 19.5322L8.75 19.5C8.75 18.7491 8.74735 18.4732 8.72144 18.3121C8.6558 17.9041 8.63166 17.8069 8.59812 17.7319C8.56459 17.6568 8.50828 17.574 8.24812 17.2529C8.24792 17.2527 8.24514 17.2493 8.23888 17.2423C8.23249 17.2352 8.22369 17.2256 8.21199 17.2134C8.18835 17.1886 8.15661 17.1566 8.11513 17.1162C8.03189 17.0351 7.91912 16.9295 7.77161 16.7942C7.4766 16.5238 7.06034 16.151 6.49845 15.6479C4.81263 14.1384 3.75 11.9428 3.75 9.5ZM9.89202 13.3508C10.2506 13.1434 10.7094 13.2659 10.9168 13.6245C11.134 14 11.5383 14.25 12 14.25C12.4617 14.25 12.866 14 13.0832 13.6245C13.2906 13.2659 13.7494 13.1434 14.108 13.3508C14.4665 13.5582 14.589 14.017 14.3816 14.3755C14.0284 14.9862 13.4454 15.4496 12.75 15.6464V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V15.6464C10.5546 15.4496 9.97163 14.9862 9.61836 14.3755C9.41095 14.017 9.53347 13.5582 9.89202 13.3508Z"
                fill="#FFD700"
              ></Path>
            </G>
          </Svg>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  },

  slideUpContainer: {
    position: "absolute",
    bottom: -100,
    left: 0,
    right: 0,
    backgroundColor: colors.grays90,
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 4,
    height: 250,
  },

  rightStyle: {
    color: colors.themeSecondary,
    fontSize: 20,
    width: "80%",
    fontWeight: "700",
  },

  wrongStyle: {
    color: colors.red,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default AnswerResultSlideUp;
