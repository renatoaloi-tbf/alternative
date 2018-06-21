import React from 'react';
import styled from 'styled-components/native';
import {bool, string, func, number} from 'prop-types';
import {compose, withProps, setPropTypes, defaultProps} from 'recompose';
import {isArray} from 'lodash';
import {Text, Button, PickerYear, Modal} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    title: string,
    buttonText: string,
    open: func,
    close: func,
    value: number
  }),
  defaultProps({
    visible: false
  }),
  withProps(({close, setActive}) => ({
    onPress: e => {
      if (typeof close === 'function') {
        close(e);
      }
    }
  }))
);

export const YearPickerModal = enhance(
  ({title, onPress, buttonText, open, close, visible, value}) => {
    return (
      <Modal visible={visible} close={close}>
        <WrapperModal>
          <Content>
            <PickerYear
              onPress={onPress}
              title={title}
              buttonText={buttonText}
              value={value}
            />
          </Content>
        </WrapperModal>
      </Modal>
    );
  }
);

const WrapperModal = styled.View`
  background-color: ${props => props.theme.bg};
  width: 300;
  border-radius: 2.5;
`;

const Content = styled.View``;
