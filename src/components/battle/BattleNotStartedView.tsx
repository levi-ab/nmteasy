import { ActivityIndicator, Text, View } from "react-native";
import PressableButton from "../common/PressableButton";
import {
  getThemePrimaryColor,
  getThemeSecondaryColor,
} from "../../utils/themes";
import { colors } from "../../styles";
import { G, Path, Svg } from "react-native-svg";

const BattleNotStartedView = ({
  lessonType,
  isBattleLoading,
  handleFindBattlePressed,
}: {
  lessonType: string;
  isBattleLoading: boolean;
  handleFindBattlePressed: () => void;
}) => (
  <>
    <Svg
      fill="#b6b6b6"
      viewBox="0 0 256 256"
      id="Flat"
      width={200}
      height={200}
      style={{marginLeft: 20, marginBottom: 20}}
    >
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></G>
      <G id="SVGRepo_iconCarrier">
        <Path d="M218.82812,37.17188A3.99843,3.99843,0,0,0,216,36h-.0127l-63.79882.20117a4.00014,4.00014,0,0,0-3.07129,1.45215L75.919,126.26172l-11.4336-11.4336a12.0157,12.0157,0,0,0-16.9707,0L34.8291,127.51465a11.998,11.998,0,0,0,0,16.9707l20.88672,20.88721a4.00445,4.00445,0,0,1,0,5.65674L25.77441,200.9707a12.01393,12.01393,0,0,0,0,16.97071l12.28516,12.28418a11.99918,11.99918,0,0,0,16.96973,0l29.9414-29.94141a3.99971,3.99971,0,0,1,5.65723,0l20.88672,20.8877a12.0157,12.0157,0,0,0,16.9707,0l12.68555-12.68653a11.998,11.998,0,0,0,0-16.9707l-11.43311-11.43311,88.60889-73.19873a4.001,4.001,0,0,0,1.45215-3.07129L220,40.0127A3.9979,3.9979,0,0,0,218.82812,37.17188ZM136.68652,200a3.97264,3.97264,0,0,1-1.17187,2.82812L122.8291,215.51465a4.00621,4.00621,0,0,1-5.6582,0L96.28418,194.62744a11.998,11.998,0,0,0-16.96973,0l-29.9414,29.94092a3.99974,3.99974,0,0,1-5.65723,0L31.43066,212.28418a4.00445,4.00445,0,0,1,0-5.65674l29.94141-29.94092a12.01392,12.01392,0,0,0,0-16.9707l-20.88672-20.8877a3.99854,3.99854,0,0,1,0-5.65624L53.1709,120.48535a4.00681,4.00681,0,0,1,5.6582,0l76.68555,76.68653A3.97264,3.97264,0,0,1,136.68652,200Zm75.11817-98.08984-87.74951,72.48877L105.65662,156l57.1715-57.17188a3.99957,3.99957,0,1,0-5.65624-5.65624l-57.17176,57.17138L81.60156,131.94434l72.48828-87.749,57.89746-.18261Z"></Path>
      </G>
    </Svg>
    <Text
      style={{
        color: getThemePrimaryColor(lessonType),
        fontSize: 24,
        marginBottom: 30,
        fontFamily: "Inter-Black",
        textAlign: "center",
      }}
    >
      Знайти Баттл
    </Text>
    <Text
      style={{
        color: getThemePrimaryColor(lessonType),
        fontSize: 16,
        marginBottom: 30,
        fontFamily: "Inter-Black",
        textAlign: "center",
      }}
    >
      Отримуй х2 очок за кожне питання!
    </Text>
    {isBattleLoading ? (
      <ActivityIndicator
        size="large"
        color={getThemePrimaryColor(lessonType)}
        style={{ height: 150 }}
      />
    ) : null}
    <PressableButton
      onPress={handleFindBattlePressed}
      text={isBattleLoading ? "Скасувати" : "Баттл"}
      style={{
        backgroundColor: isBattleLoading
          ? colors.red
          : getThemePrimaryColor(lessonType),
        height: 60,
        width: "60%",
        borderRadius: 20,
      }}
      buttonShadow={
        isBattleLoading ? colors.redShadow : getThemeSecondaryColor(lessonType)
      }
      textStyle={{
        color: colors.grays80,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
      }}
    />
  </>
);

export default BattleNotStartedView;
