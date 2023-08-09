import React from 'react';
import {Toast} from 'native-base';
import ToastAlert from '../components/atoms/Alert';

export const openToast = ({
  title,
  variant = 'left-accent',
  description,
  status = 'info',
  isClosable = false,
  placement = 'top',
}) => {
  return Toast.show(
      {
        placement: 'top-left',
        render: ({id}) => {
          return (
            <ToastAlert
              id={id}
              {
                ...{
                  title,
                  status,
                  variant,
                  description,
                  isClosable,
                  placement,
                }
              } />
          );
        },
      });
};
