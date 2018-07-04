import React from 'react';
import styled from 'styled-components/native';
import {bool, string, func, number} from 'prop-types';
import {
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  withState
} from 'recompose';
import {isArray} from 'lodash';
import {Text, Button, Modal, Icon} from '~/components/shared';
import {YearPickerModal} from '~/components/YearPickerModal';

const enhance = compose(
  setPropTypes({
    title: string,
    buttonText: string,
    open: func,
    onClose: func,
    onPress: func,
    value: number
  }),
  withState('isVisible', 'setVisible', false),
  withProps(({onClose, setActive, setVisible, onPress}) => ({
    open: e => {
      setVisible(true);
    },
    onPress: e => {
      setVisible(false);
      if (typeof onPress === 'function') {
        onPress(e);
      }
    }
  }))
);

export const FilterPrice = enhance(
  ({title, onPress, open, onClose, isVisible, value}) => {
    return (
      <Wrapper>
        <WrapperView>
          <TextStyle>
            <Text>{value}</Text>
          </TextStyle>
          <IconStyleLeft>
            <Button icon onPress={open}>
              <Icon size={25} name="filter-variant" />
            </Button>
          </IconStyleLeft>
          <YearPickerModal
            close={onPress}
            title="Selecione uma data"
            buttonText="Selecione"
            visible={isVisible}
            value={value}
          />
        </WrapperView>
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  margin-top: 10;
`;

const WrapperView = styled.View`
  background-color: ${props => props.theme.bg};
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${props => props.theme.borderRadius};
`;

const Content = styled.View``;

const TextStyle = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const WrapperSelected = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.bg};
  width: 100%;
  height: 50;
`;

const IconSytleRight = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const IconStyleLeft = styled.View`
  align-items: flex-end;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;
