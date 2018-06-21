import React from 'react';
import styled from 'styled-components/native';
import {compose, withProps, setPropTypes, lifecycle} from 'recompose';
import {BarChart as BarChartNative} from 'react-native-charts-wrapper';
import {array, func} from 'prop-types';
import {processColor} from 'react-native';

// Local

import {EmptyText} from '~/components/shared';

const enhancer = compose(
  setPropTypes({
    values: array.isRequired,
    valueFormatter: array.isRequired,
    onSelect: func
  }),
  withProps(({values, valueFormatter, onSelect}) => ({
    data: (() => {
      return {
        dataSets: [
          {
            values: [...values],
            label: 'Qualidade',
            config: {
              barSpacePercent: 100,
              highlightAlpha: 50,
              drawValues: false,
              color: processColor('#0096FF'),
              barShadowColor: processColor('lightgrey'),
              highlightColor: processColor('red')
            }
          }
        ],
        config: {
          barWidth: 0.5
        }
      };
    })(),
    xAxis: (() => {
      return {
        left: {
          enabled: false,
          drawLabels: true,
          drawAxisLine: false,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 1.5
          }
        },
        right: {
          enabled: false
        },
        valueFormatter: [...valueFormatter],
        granularityEnabled: true,
        granularity: 1,
        position: 'BOTTOM'
      };
    })(),
    yAxis: (() => {
      return {
        left: {
          drawLabels: true,
          drawAxisLine: false,
          drawGridLines: true,
          zeroLine: {
            enabled: true,
            lineWidth: 1.5
          }
        },
        right: {
          drawLabels: false,
          drawAxisLine: false,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 1.5
          }
        }
      };
    })(),
    onSelect: e => {
      console.log(e.nativeEvent);
      if (typeof onSelect === 'function') {
        onSelect(e.nativeEvent);
      }
    }
  }))
);

export const BarChart = enhancer(({data, xAxis, yAxis, onSelect}) => {
  return (
    <Wrapper>
      <BarStyle
        data={data}
        drawBarShadow={false}
        pinchZoom={false}
        legend={{enabled: false}}
        doubleTapToZoomEnabled={false}
        chartDescription={{text: ''}}
        xAxis={xAxis}
        yAxis={yAxis}
        onSelect={onSelect.bind(this)}
      />
    </Wrapper>
  );
});

const BarStyle = styled(BarChartNative)`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-bottom: 10;
`;
const WrapperSmpty = styled.View``;
