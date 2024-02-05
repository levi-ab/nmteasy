import {
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../styles";
import { useEffect, useState } from "react";
import PressableButton from "../common/PressableButton";

const ExplainQuestionModal = (props: {
  showExplainModal: boolean;
  setShowExplainModal: Function;
  questionText: string;
}) => {
  const [answerLoading, setAnswerLoading] = useState(true);
  const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJib2RhbGV2YTUzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InBvaWQiOiJvcmctQlJmQjA3OFhRSTRENHFzREo4UnVaM1M5IiwidXNlcl9pZCI6InVzZXItYnVnN2RLdVBITEFKaDVoY2FtWE85NWhCIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNDg5NDY3Mjk2MTI0OTcyMTI2OCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MDcxMjE5MDEsImV4cCI6MTcwNzk4NTkwMSwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvcmdhbml6YXRpb24ud3JpdGUgb2ZmbGluZV9hY2Nlc3MifQ.0NqWCftHWdQRxL2C5Nkk4L0bjfVvZkZ0BHpgq3QiP0PRso5eHH6BTgC-aa_56K7MbJ8br7Y5zEwSRR_hdeAKQ_y2zj6FojgLdGVsCddvoYfit-Fgs4P3zpi9CeH_s6hoY_Si0JbDejcN4WWSA0QLSVzq_1IUpbwa-36yIpUTczains-PZT150Yq1wX2h9-H5LqkVwwPxm9Zurhh1QzOLEqoVmwvtTPDulZlw4xL0MiwIJy_UUfEKWWEkLc26G6muU0hV6nGqba1eZXKTjARw-vpydiflyKq8oHqFLPit_h91iJWSLTjd2rnu-nLPG9JNYty_6lrB3odfByK8y5G45g`;

  useEffect(() => {
    if(props.showExplainModal){
        setAnswerLoading(true);
        setTimeout(() => {
          setAnswerLoading(false);
        }, 2500);
    }
   
  }, [props.showExplainModal, props.questionText]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.showExplainModal}
    >
      <View
        style={[styles.centeredView]}
        onTouchEnd={() => props.setShowExplainModal(false)}
      >
        <View style={[styles.modalView]}>
          <Text
            style={[
              styles.modalText,
              { color: colors.white, position: "absolute", top: 15 },
            ]}
          >
            Пояснюємо питання
          </Text>
          {answerLoading ? (
            <View
              style={{ width: "100%", height: "90%", justifyContent: "center" }}
            >
              <ActivityIndicator size="large" color={colors.themePrimary} />
            </View>
          ) : (
            <ScrollView style={{ width: "100%", marginVertical: 30 }}>
              <Text style={[styles.explainingText]}>
                флдіовалдфідв афідлвафіваолдфіовафл івадофдіова лдфівдалофі
                вдалофіовлд аофівладфіва флдіовалдфідва фідлва
                фіваолдфіовафлівадофдіовалд івда лофівдало фіовлдаофівла
                дфівафіва фіва фів а фі ав іф ва лфівалфіва іфв афілваоіфва
                іфваоіфвалфівта івафі ва івф а фі ва іфва флдіовалдфідв
                афідлвафіваолдфіовафл івадофдіова лдфівдалофі вдалофіовлд
                аофівладфіва флдіовалдфідва фідлва фіваолдфіовафлівадофдіовалд
                івда лофівдало фіовлдаофівла дфівафіва фіва фів а фі ав іф ва
                лфівалфіва іфв афілваоіфва іфваоіфвалфівта івафі ва івф а фі ва
                іфва флдіовалдфідв афідлвафіваолдфіовафл івадофдіова лдфівдалофі
                вдалофіовлд аофівладфіва флдіовалдфідва фідлва
                фіваолдфіовафлівадофдіовалд івда лофівдало фіовлдаофівла
                дфівафіва фіва фів а фі ав іф ва лфівалфіва іфв афілваоіфва
                іфваоіфвалфівта івафі ва івф а фі ва іфва флдіовалдфідв
                афідлвафіваолдфіовафл івадофдіова лдфівдалофі вдалофіовлд
                аофівладфіва флдіовалдфідва фідлва фіваолдфіовафлівадофдіовалд
                івда лофівдало фіовлдаофівла дфівафіва фіва фів а фі ав іф ва
                лфівалфіва іфв афілваоіфва іфваоіфвалфівта івафі ва івф а фі ва
                іфва флдіовалдфідв афідлвафіваолдфіовафл івадофдіова лдфівдалофі
                вдалофіовлд аофівладфіва флдіовалдфідва фідлва
                фіваолдфіовафлівадофдіовалд івда лофівдало фіовлдаофівла
                дфівафіва фіва фів а фі ав іф ва лфівалфіва іфв афілваоіфва
                іфваоіфвалфівта івафі ва івф а фі ва іфва
              </Text>
            </ScrollView>
          )}
          <PressableButton
            onPress={() => props.setShowExplainModal(false)}
            text="Далі"
            style={{
              backgroundColor: colors.themeSecondary,
              height: 40,
              width: "100%",
              borderRadius: 20,
            }}
            buttonShadow={colors.themePrimary}
            textStyle={{
              color: colors.grays80,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ExplainQuestionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 40,
  },
  modalView: {
    alignItems: "center",
    height: "60%",
    position: "relative",
    flexGrow: 0,
    margin: 20,
    backgroundColor: colors.basicGray,
    borderColor: colors.themeSecondary,
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontWeight: "700",
    paddingBottom: 20,
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },

  explainingText: {
    fontWeight: "600",
    width: "100%",
    fontSize: 16,
    textAlign: "left",
    color: colors.themeSecondary,
  },
});
