import React from "react";
import { Actionsheet, ScrollView } from "native-base";
import CarActionSheetItem from "../CarActionSheetItem";
import { Dimensions } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ActionSheetContainer = ({
  children,
  isOpen,
  onClose,
  maxHeightContent = Dimensions.get('window').height / 3,
  ...props
}) => {
  return (
    <>
      <BottomSheetModal isOpen={isOpen} onClose={onClose}>
          <ScrollView
            maxHeight={maxHeightContent}
            width={'100%'}>
              {children}
          </ScrollView>
      </BottomSheetModal>
    </>
  );
}

export default ActionSheetContainer;