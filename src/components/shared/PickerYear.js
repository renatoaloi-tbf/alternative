import React from 'react';
import styled from 'styled-components/native';
import {compose, withProps, setPropTypes, withState} from 'recompose';
import {string, number} from 'prop-types';
import moment from 'moment';
import {map} from 'lodash';

// Local
import {Text, Button, PickerCustom} from '~/components/shared';
import {padZero} from '~/utils';
// import Picker from 'react-native-wheel-picker';

const enhance = compose(
  setPropTypes({
    buttonText: string,
    title: string,
    value: number
  }),
  withProps(({onPress, month, year}) => ({
    years: (() => {
      let startYear = 2017;
      let years = [];
      const currentYear = moment().year() + 5;
      while (startYear <= currentYear) {
        const year = startYear++;
        years.push(year.toString());
      }
      return years;
    })()
  })),
  withState('year', 'setYear', ({value}) => value),
  withProps(({year, onPress, years}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(year);
      }
    }
  }))
);

export const PickerYear = enhance(
  ({years, setYear, year, onPress, buttonText, title}) => {
    return (
      <Wrapper secondary>
        <WrapperHeader>
          <Text align="center" inverted>
            {title}
          </Text>
        </WrapperHeader>
        <WrapperBody>
          <WrapperPickerYear>
            <PickerCustom
              itemStyle={PickerStyle}
              selectedValue={year}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
              {map(years, (item, index) => (
                <PickerCustom.Item
                  key={item}
                  label={item}
                  value={parseInt(item)}
                />
              ))}
            </PickerCustom>
          </WrapperPickerYear>
        </WrapperBody>
        <WrapperFooter>
          <Button onPress={onPress}>
            <Text>{buttonText}</Text>
          </Button>
        </WrapperFooter>
      </Wrapper>
    );
  }
);

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  height: 300;
  width: 100%;
`;

const WrapperBody = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20;
`;

const PickerStyle = {
  height: 150
};

const WrapperPickerMonth = styled.View`
  padding-right: 10;
`;
const WrapperPickerYear = styled.View`
  padding-left: 10;
`;

const WrapperFooter = styled.View`
  border-top-width: 0.5;
  border-top-color: ${props => props.theme.border};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const WrapperHeader = styled.View`
  background-color: ${props => props.theme.successMenu};
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
  border-top-left-radius: 2.5;
  border-top-right-radius: 2.5;
  justify-content: center;
  align-items: center;
`;
//const Test = styled(Picker)``;
