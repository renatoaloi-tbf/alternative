import React from 'react';
import styled from 'styled-components/native';
import { compose, withProps, setPropTypes, lifecycle } from 'recompose';
import { LineChart as LineChartNative } from 'react-native-charts-wrapper';
import { array, func, bool, number } from 'prop-types';
import { processColor } from 'react-native';
import Intl from 'intl';
require('intl/locale-data/jsonp/pt');
// Local

import { EmptyText } from '~/components/shared';

const enhancer = compose(
  setPropTypes({
    values: array,
    valueFormatter: array,
    onSelect: func,
    comparacao: bool,
    media: number,
    valuesComparacao: array
  }),
  withProps(({ values, valueFormatter, onSelect, comparacao, media, valuesComparacao }) => ({
    data: (() => {
      
      
      if (!comparacao) {
        valuesEmReais = values.map(function (x) { return { y: x.y, marker: 'R$ ' + new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(x.y) } });
        console.log('VALORES', valuesEmReais)
        if (!values.length) return {};
        return {
          dataSets: [
            {
              values: valuesEmReais,
              label: 'Qualidade',
              config: {
                drawValues: false,
                lineWidth: 3,
                drawCubicIntensity: 0.1,
                circleRadius: 1,
                drawHighlightIndicators: false,
                color: processColor('#0093FF'),
                highlightColor: processColor('red'),
                drawFilled: true,
                fillColor: processColor('#0093FF'),
                fillAlpha: 45,
                circleColor: processColor('#0093FF'),
                fillGradient: {
                  colors: [processColor('#C9E8FF'), processColor('transparent')],
                  positions: [0.2, 0.1],
                  orientation: 'TOP_BOTTOM',
                }
              }
            }
          ]
        };
      }
      else {
        valuesEmReais = values.map(function (x) { return { y: x.y, marker: 'R$ ' + new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(x.y) } });
        console.log('VALORES', valuesEmReais)
        valuesComparacaoEmReais = valuesComparacao.map(function (x) { return { y: x.y, marker: 'R$ ' + new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(x.y) } });
        if (!values.length) return {};
        return {
          dataSets: [
            {
              values: valuesEmReais,
              label: 'Ano atual',
              config: {
                drawValues: false,
                lineWidth: 3,
                drawCubicIntensity: 0.1,
                circleRadius: 1,
                drawHighlightIndicators: false,
                color: processColor('#0093FF'),
                highlightColor: processColor('red'),
                drawFilled: false,
                fillAlpha: 45,
                circleColor: processColor('#0093FF'),
                
              }
            },
            {
              values: valuesComparacaoEmReais,
              label: 'Ano anterior',
              config: {
                drawValues: false,
                lineWidth: 3,
                drawCubicIntensity: 0.1,
                circleRadius: 1,
                drawHighlightIndicators: false,
                color: processColor('#00CDFF'),
                highlightColor: processColor('red'),
                drawFilled: false,
                fillAlpha: 45,
                circleColor: processColor('#00CDFF'),
                
              }
            }
          ]
        };
      }
      
    })(),
    xAxis: (() => {
      valueFormatterUpper = valueFormatter.map(function (x) { return x.toUpperCase() });
      console.log('VALUE FORMARTTER CHECK', valueFormatterUpper.shift())
      if (!valueFormatter.length) return {};
      return {
        valueFormatter: [...valueFormatterUpper],
        granularityEnabled: true,
        granularity: 1,
        drawGridLines: false,
        position: 'BOTTOM',
        axisMinimum: 0,
        axisLineWidth: 0,
      };
    })(),
    yAxis: (() => {
      valuesEmReais = values.map(function (x) { return 'R$ ' + new Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 2 }).format(x.y) });
      return {
        left: {
          drawLabels: false,
          drawAxisLine: true,
          drawGridLines: true,
          axisMinimum: 0,
          labelCount: 4,
          granularityEnabled: true,
          granularity: 0,
          zeroLine: {
            enabled: true,
            lineWidth: 1
          }
        },
        right: {
          valueFormatter: [...valuesEmReais],
          drawLabels: true,
          drawAxisLine: false,
          drawGridLines: false,
          axisMinimum: 0,
          zeroLine: {
            enabled: true,
            lineWidth: 1.5
          },
          limitLines: [{
              limit: media,
              label: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(media),
              lineColor: processColor('#FF8600'),
              lineWidth: 1,
              valueTextColor: processColor('white'),
              labelPosition: 'RIGHT_BOX'
          }],
        },


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
  ({ data, xAxis, yAxis, onSelect, values, marker }) => {
    return (
      <Wrapper>
        <LineChartStyle
          drawBorders={false}
          scaleEnabled={false}
          scaleXEnabled={false}
          scaleYEnabled={false}
          data={data}
          drawBarShadow={false}
          pinchZoom={true}
          legend={{ enabled: false }}
          doubleTapToZoomEnabled={false}
          chartDescription={{ text: '' }}
          xAxis={xAxis}
          yAxis={yAxis}
          marker={marker}
          onSelect={onSelect.bind(this)}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          borderColor={processColor('teal')}
          keepPositionOnRotation={false}
          borderWidth={0}
          animation={{
            durationX: 0,
            durationY: 1500,
            easingY: 'EaseInOutQuart'
          }}
          zoom={{
            scaleX: 2,
            scaleY: 0,
            xValue: 0,
            yValue: 1,
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
