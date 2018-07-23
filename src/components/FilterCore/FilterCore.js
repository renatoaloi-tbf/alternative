import React from "react";
import styled, { css } from "styled-components/native";
import { bool, string, func, number, oneOfType } from "prop-types";
import { Alert } from "react-native";
import {
  compose,
  withProps,
  setPropTypes,
  defaultProps,
  withState,
  pure,
  withHandlers
} from "recompose";
import { isArray } from "lodash";
import CheckBox from "react-native-check-box";
import moment from "moment";
import { Text, Button, Modal, Icon, Select } from "~/components/shared";

const enhance = compose(
  setPropTypes({
    isFilter: bool.isRequired,
    value: oneOfType([string, number]).isRequired,
    close: func,
    onChange: func,
    apply: func,
    isClose: bool,
    inverted: bool,
    comparacao: func
  }),
  defaultProps({
    inverted: true
  }),
  withState("isVisible", "setVisible", false),
  withState("compare", "setCompare", false),
  withState("range", "setRange", {}),
  withState("valueComparacao", "setValueComparacao", ""),
  withProps(({ setVisible, onChange, apply, close, open, comparacao, setValueComparacao, setCompare }) => ({
    open: e => {
      setVisible(true);
      if (typeof open === "function") {
        open();
      }
    },
    onChange: e => {
      if (__DEV__) console.log("FilterCore.js - onChange", e);
      if (typeof onChange === "function") {
        onChange(e);
      }
    },
    onPress: e => {},
    close: e => {
      if (typeof close === "function") {
        setVisible(false);
        setValueComparacao("");
        setCompare(false);
        close();
      }
    },
    apply: e => {
      setVisible(false);
      if (typeof apply === "function") {
        apply(e);
      }
    },
    comparacao: e => {
      console.log('COMPARACAO', comparacao);
      if (typeof comparacao === "function") {
        comparacao(e);
      }
    }
  })),
  withHandlers({
    onChangeInit: ({ range, setRange, onChange }) => e => {
      if (__DEV__) console.log("FilterCore.js - onChangeInit", e);
      if (__DEV__) console.log("FilterCore.js - onChangeInit range", range);
      setRange({ ...range, startDate: e.value });
      onChange({ ...range, startDate: e.value });
    },
    onChangeEnd: ({ range, setRange, onChange }) => e => {
      if (__DEV__) console.log("FilterCore.js - onChangeEnd range", range);
      setRange({ ...range, endDate: e.value });
      onChange({ ...range, endDate: e.value });
    },
    setComparacao: ({
      compare,
      comparacao,
      setCompare,
      range,
      setValueComparacao
    }) => e => {
      console.log("acao comparar", e);
      console.log("RANGE Filter core", range);
      if (!range.startDate) {
        Alert.alert(
          "Atenção",
          "Por favor, selecione uma data antes de comparar",
          [
            {
              text: "Ok",
              onPress: () => {
                setCompare(!e);
              }
            }
          ]
        );
      } else {
        console.log('OPA ENTROU AQUI!');
        let comparacaoStart = moment(range.startDate, "MM/YYYY")
          .subtract(1, "year")
          .format("MMM/YYYY");
        let comparacaoEnd = moment(range.endDate, "MM/YYYY")
          .subtract(1, "year")
          .format("MMM/YYYY");
      
        console.log('e o que meu', e);
        setCompare(e);
        if (compare)
        {
          setValueComparacao("(" + comparacaoStart + " - " + comparacaoEnd + ")");
        }
        else
        {
          setValueComparacao("");
        }
        
        comparacao(e);
      }
    }
  })
);

export const FilterCore = enhance(
  ({
    open,
    isFilter,
    value,
    isVisible,
    close,
    compare,
    setComparacao,
    onChangeInit,
    onChangeEnd,
    range,
    apply,
    isClose,
    inverted,
    valueComparacao
  }) => {
    if (__DEV__) console.log("FilterCore.js - enhance", range);
    return (
      <Wrapper>
        {!isVisible && (
          <WrapperView selected={!isFilter}>
            <TextStyle>
              <WrapperLeft>
                {!isFilter && <Icon name="calendar-range" inverted size={25} />}
                {isFilter && (
                  <Text>
                    {value} {valueComparacao}
                  </Text>
                )}
                {!isFilter && <TextSelect inverted>{value}</TextSelect>}
              </WrapperLeft>
            </TextStyle>
            <IconStyleLeft>
              {!isClose && (
                <Button icon onPress={open}>
                  <Icon size={25} name="filter-variant" opacity={0.57} />
                </Button>
              )}
              {isClose && (
                <Button icon onPress={close}>
                  <Icon size={25} name="close" inverted={inverted} />
                </Button>
              )}
            </IconStyleLeft>
          </WrapperView>
        )}
        {isVisible && (
          <DetailsCalender selected={isVisible}>
            <WrapperView selected={isVisible}>
              <TextStyle>
                <WrapperLeft>
                  <Text inverted>Selecionar periodo</Text>
                </WrapperLeft>
              </TextStyle>
              <IconStyleLeft>
                {isClose && (
                  <Button icon onPress={close}>
                    <Icon size={25} name="close" inverted />
                  </Button>
                )}
                {!isClose && (
                  <Button icon onPress={apply}>
                    <Icon inverted size={25} name="check" />
                  </Button>
                )}
              </IconStyleLeft>
            </WrapperView>
            <WrapperSelect>
              <WrapperRangeText>
                <Icon name="calendar-range" inverted size={25} />
                <RangeText size={14} inverted>
                  Periodo
                </RangeText>
              </WrapperRangeText>
            </WrapperSelect>
            <SelectRanger>
              <Select
                onPress={onChangeInit}
                title="Data início"
                buttonText="Selecionar"
              />
              <Select
                onPress={onChangeEnd}
                title="Data de término"
                buttonText="Pronto"
              />
            </SelectRanger>
            <WrapperCompareText>
              <CheckBoxStyle
                checkBoxColor="#fff"
                rightTextView={
                  <TextCheckBox inverted>
                    Comparar com ano anterior
                  </TextCheckBox>
                }
                onClick={() => setComparacao(!compare)}
                isChecked={compare}
              />
            </WrapperCompareText>
          </DetailsCalender>
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  margin-top: 10;
`;

const WrapperView = styled.View`
  background-color: ${props => props.theme.bg};
  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.successMenu};
    `};
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${props => props.theme.borderRadius};
`;

const IconStyleLeft = styled.View`
  align-items: flex-end;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const TextStyle = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-top: 10;
`;

const WrapperSelect = styled.View`
  padding-left: 10;
  padding-right: 10;

  border-top-width: 0.5;
  border-top-color: #ffffff;
`;

const TextSelect = Text.extend`
  padding-left: 5;
`;

const WrapperLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DetailsCalender = styled.View`
  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.successMenu};
    `};
  border-radius: ${props => props.theme.borderRadius};
`;

const RangeText = Text.extend`
  padding-left: 10;
`;

const WrapperRangeText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 17;
  padding-top: 17;
`;
const SelectRanger = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
`;

const WrapperCompareText = styled.View`
  padding-top: 18;
  padding-bottom: 18;
  padding-left: 8;
  padding-right: 8;
`;

const CheckBoxStyle = styled(CheckBox)`
  background-color: ${props => props.theme.successMenu};
`;

const TextCheckBox = Text.extend`
  padding-left: 10;
`;
