import React from "react";
import { Actionsheet, ScrollView, Text } from "native-base";
import CarActionSheetItem from "../CarActionSheetItem";
import { Dimensions } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ActionSheetContainer = ({
  children,
  isOpen,
  onClose,
  maxHeightContent = Dimensions.get('window').height / 3,
  title,
  ...props
}) => {
  return (
    <>
      <BottomSheetModal isOpen={isOpen} onClose={onClose}>
        <ScrollView
          maxHeight={maxHeightContent}
          width={'100%'}>
          <Text
            fontWeight={'bold'}
            size={'lg'}
          >
            Selecione o veículo principal
          </Text>
          {children}
        </ScrollView>
      </BottomSheetModal>
    </>
  );
}

export default ActionSheetContainer;