import React from 'react';
import styled from 'styled-components/native';
import {compose, withProps, withState, setPropTypes} from 'recompose';
import {bool} from 'prop-types';
import {Modal as ModalNative} from 'react-native';

const enhance = compose(
  setPropTypes({
    visible: bool.isRequired
  }),
  withProps(({close, open, setVisible}) => ({
    close: e => {
      if (typeof close === 'function') {
        close(e);
      }
    }
  }))
);

export const Modal = enhance(({children, visible, close}) => {
  return (
    <ModalNative
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={close}
    >
      <Content>{children}</Content>
    </ModalNative>
  );
});

const Content = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
