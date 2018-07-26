import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import {string} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {map} from 'lodash';

// Local
import {Text, Button, PickerCustom} from '~/components/shared';
import {padZero} from '~/utils';
// import Picker from 'react-native-wheel-picker';
moment().locale('pt-br');

const enhance = compose(
  setPropTypes({
    buttonText: string,
    title: string,
    data: string
  }),
  withProps(({onPress, month, year, data}) => ({
    months: moment.monthsShort(),
    years: (() => {
      let datafmt = moment(data ? moment(data, 'MM/YYYY').format('MMM/YYYY')  : moment().format('MMM/YYYY'), 'MMM/YYYY');
      let startYear = datafmt.year() - 5;
      let years = [];
      const currentYear = datafmt.year() + 5;
      while (startYear <= currentYear) {
        const year = startYear++;
        //years.push({ i: year, v: year.toString()});
        //years[year] = year.toString();
        years.push(year); //.toString());
      }
      return years;
    })()
  })),
  withState('month', 'setMonth', ({data}) => { 
    console.log(data);
    return data ? moment(data, 'MM/YYYY').month() : moment().month(); 
  } ),
  withState('year', 'setYear', ({data}) => { return data ? moment(data, 'MM/YYYY').year() : moment().year(); } ),
  withProps(({month, year, onPress, months, years}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        const label = `${months[month]}/${year}`;
        const value = `${padZero(2, month + 1)}/${year}`;
        onPress({label, value});
      }
    }
  })),
  withHandlers({
    handlerPress: ({onChange, month, year, months, years}) => () => {
      onChange(`${months[month]}/${year}`);
    }
  })
);

export const DatePicker = enhance(
  ({
    handlerPress,
    months,
    setMonth,
    month,
    years,
    setYear,
    year,
    onPress,
    buttonText,
    title
  }) => {
    return (
      <Wrapper secondary>
        <WrapperHeader>
          <Text align="center" inverted>
            {title}
          </Text>
        </WrapperHeader>
        <WrapperBody>
          <WrapperPickerMonth>
            <PickerCustom
              itemStyle={PickerStyle}
              selectedValue={month}
              onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
            >
              {map(months, (item, index) => (
                <PickerCustom.Item key={item} label={item} value={index} />
              ))}
            </PickerCustom>
          </WrapperPickerMonth>
          <WrapperPickerYear>
            <PickerCustom
              itemStyle={PickerStyle}
              selectedValue={year}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
              {map(years, (item, index) => (
                <PickerCustom.Item key={item} label={item.toString()} value={item} />
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
