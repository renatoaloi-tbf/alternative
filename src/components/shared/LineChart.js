import React from 'react';
import styled from 'styled-components/native';
import {compose, withProps, setPropTypes, lifecycle} from 'recompose';
import {LineChart as LineChartNative} from 'react-native-charts-wrapper';
import {array, func} from 'prop-types';
import {processColor} from 'react-native';
import Intl from 'intl';
require( 'intl/locale-data/jsonp/pt' );
// Local

import {EmptyText} from '~/components/shared';

const enhancer = compose(
  setPropTypes({
    values: array,
    valueFormatter: array,
    onSelect: func
  }),
  withProps(({values, valueFormatter, onSelect}) => ({
    data: (() => {
      valuesEmReais = values.map(function(x){ return {y: x.y, marker: 'R$ ' + new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(x.y)}});
      if (!values.length) return {};
      return {
        dataSets: [
          {
            values: valuesEmReais,
            label: 'Qualidade',
            config: {
              drawValues: false,
              lineWidth: 3,
              drawCubicIntensity: 0.4,
              circleRadius: 5,
              drawHighlightIndicators: false,
              color: processColor('#0093FF'),
              highlightColor: processColor('red'),
              drawFilled: true,
              fillColor: processColor('#0093FF'),
              fillAlpha: 45,
              circleColor: processColor('#0093FF'),
              fillGradient: {
                colors: [processColor('#0093FF'), processColor('transparent')],
                positions: [0.2, 0.1],
                orientation: 'RIGHT_LEFT',
              }
            }
          }
        ]
      };
    })(),
    xAxis: (() => {
      valueFormatterUpper = valueFormatter.map(function(x){ return x.toUpperCase() });
      if (!valueFormatter.length) return {};
      return {
        left: {
          enabled: false,
          drawLabels: true,
          drawAxisLine: false,
          drawGridLines: false,
          axisMinimum: 0,
          zeroLine: {
            enabled: true,
            lineWidth: 1.3
          }
        },
        right: {
          enabled: false
        },
        valueFormatter: [...valueFormatterUpper],
        granularityEnabled: true,
        granularity: 1,
        position: 'BOTTOM'
      };
    })(),
    yAxis: (() => {
      valuesEmReais = values.map(function(x){ return new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(x.y)});
      return {
        left: {
          drawLabels: false,
          drawAxisLine: false,
          axisMinimum: 0,
          drawGridLines: true,
          zeroLine: {
            enabled: false,
            lineWidth: 1.3
          }
        },
        right: {
          drawLabels: true,
          drawAxisLine: true,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 1.2
          },
        }
      };
    })(),
    onSelect: e => {
      if (typeof onSelect === 'function') {
        onSelect(e.nativeEvent);
      }
    },
    marker: (() => {
      return {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#c9f3ff'),
        textColor: processColor('black')
      };
    })()
  }))
);

export const LineChart = enhancer(
  ({data, xAxis, yAxis, onSelect, values, marker}) => {
    return (
      <Wrapper>
        <LineChartStyle
          drawBorders={false}
          scaleEnabled={false}
          scaleXEnabled={false}
          scaleYEnabled={false}
          data={data}
          drawBarShadow={false}
          pinchZoom={false}
          legend={{enabled: false}}
          doubleTapToZoomEnabled={false}
          chartDescription={{text: ''}}
          xAxis={xAxis}
          yAxis={yAxis}
          marker={marker}
          onSelect={onSelect.bind(this)}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          borderColor={processColor('teal')}
          keepPositionOnRotation={false}
          borderWidth={1}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: 'EaseInOutQuart'
          }}
          zoom={{
            scaleX: 2,
            scaleY: 0,
            xValue: 0,
            yValue: 2,
            axisDependency: 'RIGHT'
          }}
        />
      </Wrapper>
    );
  }
);

const LineChartStyle = styled(LineChartNative)`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-bottom: 10;
`;
const WrapperSmpty = styled.View``;
