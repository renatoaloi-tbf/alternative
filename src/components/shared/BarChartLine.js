import React from 'react';
import styled from 'styled-components/native';
import { compose, withProps, setPropTypes, lifecycle, withState } from 'recompose';
import { CombinedChart as BarChartNative } from 'react-native-charts-wrapper';
import { array, func, number, string, object, bool } from 'prop-types';
import { processColor } from 'react-native';
import moment from 'moment';

// Local

import { EmptyText } from '~/components/shared';

import Intl from 'intl';

require( 'intl/locale-data/jsonp/pt' );

const enhancer = compose(
    setPropTypes({
        values: array.isRequired,
        valueFormatter: array.isRequired,
        valueFormatterIndex: object,
        onSelect: func,
        media: number,
        tipo: string,
        anoAnterior: bool,
        valuesAnoAnterior: array,
        detalheDia: bool,
        dia: string
    }),
    withProps(({ values, valueFormatter, valueFormatterIndex, onSelect, media, tipo, anoAnterior, valuesAnoAnterior, detalheDia, dia }) => ({
        
        data: (() => {
            let arrayTeste = [{y:0}];
            if (__DEV__) console.log('valueFormatter[0]', valueFormatter[0]);
            if (__DEV__) console.log('anoAnterior', anoAnterior);
            values = arrayTeste.concat(values);
            values = values.concat(arrayTeste);
            console.log('values 1', values);
            console.log('trataCores 1', trataCores);

            let trataCores = [], trataCoresAnoAnterior = [], arrayMedia = [];

            if (values.length > 0) {
                console.log('Teste passando aqui 1');
                if (anoAnterior) {
                    if (valuesAnoAnterior.length > 0) {
                        valuesAnoAnterior.forEach(vaa => {
                            values.push({ y: 0 });
                            if (vaa.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                                trataCoresAnoAnterior.push(processColor('#ffbd00'));
                            else
                                trataCoresAnoAnterior.push(processColor('#00cdff'));
                        });

                        values.forEach(valor => {
                            arrayMedia.push(media);
                            if (valor.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                                trataCores.push(processColor('#ffbd00'));
                            else
                                trataCores.push(processColor('#0096FF'));
                        })
                    }
                    else {
                        for (let index = 0; index < 15; index++) {
                            valuesAnoAnterior.push({ y: 0 });
                            values.push({ y: 0 });
                            trataCores.push(processColor('#0096FF'));
                            trataCoresAnoAnterior.push(processColor('#00cdff'));
                            arrayMedia.push(media);
                        }
                    }
                }
                else {
                    console.log('TÁ ENTRANDO AQUI BIXO', values);
                    values.forEach(valor => {
                        arrayMedia.push(media);
                        if (valor.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                            trataCores.push(processColor('#ffbd00'));
                        else
                            trataCores.push(processColor('#0096FF'));
                    });
                }
            }
            else {
                console.log('Teste passando aqui 2');
                //QUANDO NÃO EXISTIR VALOR PARA O RANGE ATUAL
                if (anoAnterior) {
                    if (valuesAnoAnterior.length > 0) {
                        valuesAnoAnterior.forEach(vaa => {
                            values.push({ y: 0 });
                            if (vaa.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                                trataCoresAnoAnterior.push(processColor('#ffbd00'));
                            else
                                trataCoresAnoAnterior.push(processColor('#00cdff'));
                        });

                        values.forEach(valor => {
                            arrayMedia.push(media);
                            if (valor.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                                trataCores.push(processColor('#ffbd00'));
                            else
                                trataCores.push(processColor('#0096FF'));
                        })
                    }
                    else {
                        for (let index = 0; index < 15; index++) {
                            valuesAnoAnterior.push({ y: 0 });
                            values.push({ y: 0 });
                            trataCores.push(processColor('#0096FF'));
                            arrayMedia.push(media);
                            trataCoresAnoAnterior.push(processColor('#00cdff'));
                        }
                    }
                }
                else {
                    for (let index = 0; index < 15; index++) {
                        arrayMedia.push(media);
                        values.push({ y: 0 });
                        trataCores.push(processColor('#0096FF'));
                        arrayMedia.push(media);
                    }
                }
            }
            console.log('Teste passando aqui 3 ');
            if (anoAnterior) {
                console.log('Teste passando aqui 4');

                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    return {
                        barData: {
                            dataSets: [
                                {
                                    values: [...valuesAnoAnterior],
                                    label: 'Qualidade Ano anterior',

                                    config: {
                                        barSpacePercent: 100,
                                        highlightAlpha: 50,
                                        drawValues: false,
                                        axisDependency: 'left',
                                        colors: trataCoresAnoAnterior,
                                        barShadowColor: processColor('lightgrey'),
                                        highlightColor: processColor('red')
                                    }
                                },
                                {
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
                                }

                            ],
                            config: {
                                barWidth: 0.5,
                                group: {
                                    fromX: 0,
                                    groupSpace: 0.2,
                                    barSpace: 0,
                                }
                            }
                        },
                        /* lineData: {
                            dataSets: [
                                {
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
                        } */
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
            }
            else {
                console.log('Teste passando aqui 5');
                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    console.log('Teste passando aqui 6');
                    console.log('values 6', values);
                    console.log('trataCores 6', trataCores);
                    console.log('trataCores 6 media', arrayMedia);
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
                        /* lineData: {
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
                        } */
                    };
                }
                else {
                    console.log('Teste passando aqui 7');
                    console.log('values', values);
                    console.log('trataCores', trataCores);
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
            }
        })(),
        xAxis: (() => {
            let novoFormato = [];
            if (tipo != "volume") {
                let count = 0;
                valueFormatter.forEach(element => {
                    if (moment(element, 'MM/YYYY', true).isValid()) {
                        novoFormato.push(moment(element, 'MM/YYYY').format('MMM').toUpperCase());
                    }
                    else if (moment(element, 'DD/MM/YY', true).isValid()) {
                        if (detalheDia) {
                            count = count + 1;
                            novoFormato.push(moment(element, 'DD/MM/YYYY').format('MMM').toUpperCase() + ' ' + dia);
                        }
                        else {
                            count = count + 1;
                            novoFormato.push(moment(element, 'DD/MM/YYYY').format('MMM').toUpperCase() + ' ' + count);
                        }
                        
                    }
                });
            }
            else {
                if (anoAnterior) {
                    Object.values(valueFormatterIndex).forEach(element => {
                        novoFormato.push(moment(element.searchDate).locale('pt-br').format('MMM').toUpperCase());
                    });    
                }
                else {
                    Object.values(valueFormatterIndex).forEach(element => {
                        novoFormato.push(moment(element.searchDate).locale('pt-br').format('DD').toUpperCase());
                    });
                } 
            }
            let arrayTesteAxis = [""];
            novoFormato = arrayTesteAxis.concat(novoFormato);
            novoFormato = novoFormato.concat(arrayTesteAxis);
            console.log('TRATACORES NOVO', novoFormato);
            return {
                axisMinimum: 0,
                axisLineWidth: 0,
                zeroLine: {
                    enabled: true,
                    lineWidth: 1.5
                },
                limitLine: 115,
                drawGridLines: false,
                valueFormatter: [...novoFormato],
                granularityEnabled: true,
                granularity: 1,
                position: 'BOTTOM'
            };
        })(),
        yAxis: (() => {
            console.log('TRATACORES NOVO asdasdsadasd')
            return {
                left: {
                    drawLabels: true,
                    drawAxisLine: true,
                    drawGridLines: true,
                    axisMinimum: 0,
                    limitLines: [{
                        limit: media,
                        label: new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(media),
                        lineColor: processColor('#FF8600'),
                        lineWidth: 1,
                        valueTextColor: processColor('white'),
                        labelPosition: 'LEFT_BOX'
                    }],
                    zeroLine: {
                        enabled: false,
                        lineWidth: 1.5
                    }
                },
                right: {
                    drawLabels: false,
                    drawAxisLine: false,
                    drawGridLines: false,
                    zeroLine: {
                        enabled: false,
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
