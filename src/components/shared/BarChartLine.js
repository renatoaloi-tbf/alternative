import React from 'react';
import styled from 'styled-components/native';
import { compose, withProps, setPropTypes, lifecycle } from 'recompose';
import { CombinedChart as BarChartNative } from 'react-native-charts-wrapper';
import { array, func, number, string, object } from 'prop-types';
import { processColor } from 'react-native';
import moment from 'moment';

// Local

import { EmptyText } from '~/components/shared';

const enhancer = compose(
    setPropTypes({
        values: array.isRequired,
        valueFormatter: array.isRequired,
        valueFormatterIndex: object,
        onSelect: func,
        media: number,
        tipo: string
    }),
    withProps(({ values, valueFormatter, valueFormatterIndex, onSelect, media, tipo }) => ({
        data: (() => {
            if (__DEV__) console.log('valueFormatter[0]', valueFormatter[0]);
            let trataCores = [];
            let arrayMedia = [];
            values.forEach(valor => {
                arrayMedia.push(media);
                if (valor.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                    trataCores.push(processColor('#ffbd00'));
                else
                    trataCores.push(processColor('#0096FF'));

            });
            if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                return {
                    barData: {
                        dataSets: [{
                            values: [...values],
                            label: 'Qualidade',

                            config: {
                                barSpacePercent: 100,
                                highlightAlpha: 50,
                                drawValues: false,
                                axisDependency: 'left',
                                colors: trataCores,
                                barShadowColor: processColor('lightgrey'),
                                highlightColor: processColor('red')
                            }
                        }],
                        config: {
                            barWidth: 0.5
                        }
                    },
                    lineData: {
                        dataSets: [{
                            values: [...arrayMedia],
                            label: 'Média',
                            config: {
                                drawValues: false,
                                valueTextSize: 10,
                                valueTextColor: processColor('#ffbd00'),
                                colors: [processColor('#ffbd00')],
                                mode: "CUBIC_BEZIER",
                                drawCircles: false,
                                circleRadius: 10,
                                lineWidth: 4,
                                axisDependency: "left",
                            }
                        }],
                    }
                };
            }
            else {
                return {
                    barData: {
                        dataSets: [{
                            values: [...values],
                            label: 'Qualidade',

                            config: {
                                barSpacePercent: 100,
                                highlightAlpha: 50,
                                drawValues: false,
                                axisDependency: 'left',
                                colors: trataCores,
                                barShadowColor: processColor('lightgrey'),
                                highlightColor: processColor('red'),

                            }

                        }],
                        config: {
                            barWidth: 0.5
                        }
                    }
                };
            }

        })(),
        xAxis: (() => {
            let novoFormato = [];
            if (tipo != "volume") {
                let count = 0;
                valueFormatter.forEach(element => {
                    if (moment(element, 'MM/YYYY').isValid()) {
                        novoFormato.push(moment(element, 'MM/YYYY').format('MMM').toUpperCase());
                    }
                    else if (moment(element, 'DD/MM/YYYY').isValid()) {
                        count = count + 1;
                        novoFormato.push(moment(element, 'DD/MM/YYYY').format('MMM').toUpperCase() + ' ' + count);
                    }
                });
            }
            else {
                Object.values(valueFormatterIndex).forEach(element => {
                    novoFormato.push(moment(element.searchDate).locale('pt-br').format('DD').toUpperCase());
                });
            }


            return {
                axisMinimum: 0,
                axisLineWidth: 0,
                limitLine: 115,
                drawGridLines: false,
                valueFormatter: [...novoFormato],
                granularityEnabled: true,
                granularity: 1,
                position: 'BOTTOM'
            };
        })(),
        yAxis: (() => {
            return {
                left: {
                    drawLabels: true,
                    drawAxisLine: true,
                    drawGridLines: true,
                    axisMinimum: 0,

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
                },
                axisMinimum: 0
            };
        })(),
        zoom: (() => {
            if (moment(valueFormatter[0], 'MM/YYYY', true).isValid()) {
                return {
                    scaleX: 2,
                    scaleY: 1,
                    xValue: 0,
                    yValue: 1
                };
            }
            else {
                if (tipo == 'volume') {
                    return {
                        scaleX: 2,
                        scaleY: 1,
                        xValue: 0,
                        yValue: 1
                    };
                }
                else {
                    return {
                        scaleX: 4,
                        scaleY: 1,
                        xValue: 0,
                        yValue: 1
                    };
                }
            }
        })(),
        onSelect: e => {
            if (typeof onSelect === 'function') {
                onSelect(e.nativeEvent);
            }
        }
    }))
);

export const BarChartLine = enhancer(({ data, xAxis, yAxis, onSelect, zoom }) => {
    return (
        <Wrapper>
            <BarStyle
                data={data}
                drawBarShadow={false}
                pinchZoom={false}
                legend={{ enabled: false }}
                doubleTapToZoomEnabled={false}
                chartDescription={{ text: '' }}
                xAxis={xAxis}
                yAxis={yAxis}
                zoom={zoom}
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
