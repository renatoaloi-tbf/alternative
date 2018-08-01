import React from 'react';
import styled from 'styled-components/native';
import { compose, withProps, setPropTypes, lifecycle, withState, pure, onlyUpdateForKeys } from 'recompose';
import { BarChart as BarChartNative } from 'react-native-charts-wrapper';
import { array, func, number, string, object, bool } from 'prop-types';
import { processColor, Text } from 'react-native';
import moment from 'moment';

// Local

import { EmptyText } from '~/components/shared';

import Intl from 'intl';

require('intl/locale-data/jsonp/pt');

const enhance = compose(
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
        dia: string,
        update: bool,
        decimalPlaces: number
    }),
    withProps(({ values, valueFormatter, valueFormatterIndex, onSelect, media, 
        tipo, anoAnterior, valuesAnoAnterior, detalheDia, dia, 
        formatterMeses, testeUnique, decimalPlaces
    }) => ({
        data: (() => {
            let arrayTeste = [{ y: 0, searchDate: '' }];
            console.log('passei aqui 1, viu?', values);
            if (anoAnterior) {
                if (tipo == "volume") {
                    let arrayMesesAtual = [], arrayMesesAnoAnterior = [];

                    values.forEach(function(item, i)  {
                        if (item.searchDate != "")
                            if ((arrayMesesAtual.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1)) 
                                arrayMesesAtual[moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()] = { y : 0 };
                    });
                    for (var key in arrayMesesAtual) {
                        values.forEach(itemFI => {
                            if (itemFI.searchDate != "") {
                                if (key == moment(itemFI.searchDate).locale('pt-br').format('MMM').toUpperCase()) {
                                    arrayMesesAtual[key].y = arrayMesesAtual[key].y + itemFI.y;
                                }
                            }
                        });    
                    }
                    
                    valuesAnoAnterior.forEach(function(item, i)  {
                        if (item.searchDate != "")
                            if ((arrayMesesAnoAnterior.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1)) 
                                arrayMesesAnoAnterior[moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()] = { y : 0 };
                    });

                    for (var key in arrayMesesAnoAnterior) {
                        valuesAnoAnterior.forEach(itemFI => {
                            if (itemFI.searchDate != "") {
                                if (key == moment(itemFI.searchDate).locale('pt-br').format('MMM').toUpperCase()) {
                                    arrayMesesAnoAnterior[key].y = arrayMesesAnoAnterior[key].y + itemFI.y;
                                }
                            }
                            
                        });    
                    }
                    values = [], valuesAnoAnterior = [];
                    for(var key in arrayMesesAtual) {
                        if (key != 'unique')
                            values.push(arrayMesesAtual[key]);
                    }
                    for(var keyAnterior in arrayMesesAnoAnterior) {
                        if (keyAnterior != 'unique')
                            valuesAnoAnterior.push(arrayMesesAnoAnterior[keyAnterior]);
                    }
                    formatterMeses = Object.keys(arrayMesesAtual);
                    formatterMesesAnoAnterior = Object.keys(arrayMesesAnoAnterior);
                    Array.prototype.unique = function() {
                        var a = this.concat();
                        for(var i=0; i<a.length; ++i) {
                            for(var j=i+1; j<a.length; ++j) {
                                if(a[i] === a[j])
                                    a.splice(j--, 1);
                            }
                        }
                        return a;
                    };
                    testeUnique = formatterMeses.concat(formatterMesesAnoAnterior).unique();
                }
            }
            else
            {
                if (tipo == "volume") 
                {
                    var arrayCount = [];
                    var countMes = 0;
                    values.forEach((item, i) => { 
                        var mesValues = moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase();
                        if (arrayCount.indexOf(mesValues) == -1)
                        {
                            countMes++;
                            arrayCount.push(mesValues);
                        }
                    });
                    if (countMes > 1)
                    {
                        console.log('passei aqui 2, viu?');
                        let arrayMesesAtual = [];

                        values.forEach(function(item, i)  {
                            if (item.searchDate != "")
                            {
                                if ((arrayMesesAtual.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1)) 
                                {
                                    arrayMesesAtual[moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()] = { y : 0 };
                                }
                            }
                        });
                        for (var key in arrayMesesAtual) {
                            values.forEach(itemFI => {
                                if (itemFI.searchDate != "") {
                                    if (key == moment(itemFI.searchDate).locale('pt-br').format('MMM').toUpperCase()) {
                                        arrayMesesAtual[key].y = arrayMesesAtual[key].y + itemFI.y;
                                    }
                                }
                            });    
                        }
                        values = [];
                        for(var key in arrayMesesAtual) {
                            if (key != 'unique')
                                values.push(arrayMesesAtual[key]);
                        }
                    }
                }
            }
            let trataCores = [], trataCoresAnoAnterior = [], arrayMedia = [];
            if (values.length > 0) {
                if (anoAnterior) {
                    if (tipo == "volume") {
                        if (valuesAnoAnterior.length > 0) {
                            valuesAnoAnterior.forEach(vaa => {
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
                            values = [];
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
                        console.log('É AQUI QUE ENTRA');
                        if (valuesAnoAnterior.length > 0) {
                            valuesAnoAnterior.forEach(vaa => {                                
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
                            values = [];
                            for (let index = 0; index < 15; index++) {
                                valuesAnoAnterior.push({ y: 0 });
                                values.push({ y: 0 });
                                trataCores.push(processColor('#0096FF'));
                                trataCoresAnoAnterior.push(processColor('#00cdff'));
                                arrayMedia.push(media);
                            }
                        }
                    }
                }
                else {
                    console.log('passei aqui 3, viu?', values);
                    values.forEach(valor => {
                        arrayMedia.push(media);
                        if (valor.y < media && moment(valueFormatter[0], 'MM/YYYY', true).isValid())
                            trataCores.push(processColor('#ffbd00'));
                            //trataCores.push(processColor('#ff0000'));
                        else
                            trataCores.push(processColor('#0096FF'));
                    });
                }
            }
            else {
                if (anoAnterior) {
                    if (valuesAnoAnterior.length > 0) {
                        values = [];
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
                        values = [];
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
                    console.log('passei aqui 4, viu?');
                    /* values = [];
                    for (let index = 0; index < 15; index++) {
                        arrayMedia.push(media);
                        values.push({ y: 0 });
                        trataCores.push(processColor('#0096FF'));
                        arrayMedia.push(media);
                    } */
                }
            }
            if (anoAnterior) {
                console.log('TÁ ENTRANDO NO ANO ANTERIOR', anoAnterior);
                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    return {
                        dataSets: [
                            {
                                values: [...valuesAnoAnterior],
                                label: 'Qualidade Ano anterior',

                                config: {
                                    barSpacePercent: 100,
                                    highlightAlpha: 0,
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
                                    highlightAlpha: 0,
                                    drawValues: false,
                                    axisDependency: 'left',
                                    colors: trataCores,
                                    barShadowColor: processColor('lightgrey'),
                                    highlightColor: processColor('red')
                                }
                            }

                        ],
                        config: {
                            barWidth: 0.4,
                            group: {
                                fromX: -0.5,
                                groupSpace: 0.2,
                                barSpace: 0,
                            }
                        }
                    }
                }
                else {
                    return {
                        dataSets: [{
                            values: [...values],
                            label: 'Qualidade',
                            config: {
                                barSpacePercent: 100,
                                highlightAlpha: 0,
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
                }
            }
            else {
                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    console.log('passei aqui 5, viu?', values);
                    return {
                        dataSets: [{
                            values: [...values],
                            label: 'Volume',
                            config: {
                                barSpacePercent: 100,
                                highlightAlpha: 0,
                                drawValues: false,
                                axisDependency: 'left',
                                colors: [...trataCores],
                                barShadowColor: processColor('lightgrey'),
                                highlightColor: processColor('red')
                            }
                        }],
                    };
                }
                else {
                    return {
                        dataSets: [{
                            values: [...values],
                            label: 'Qualidade',
                            config: {
                                barSpacePercent: 100,
                                highlightAlpha: 0,
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
                }
            }
        })(),
        xAxis: (() => {
            let novoFormato = [];
            if (tipo != "volume") {
                var count = 0;
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
                        if (element.searchDate == "") {
                            novoFormato.push(moment(element.searchDate).locale('pt-br').format('MMM').toUpperCase());
                        }
                        else {
                            novoFormato.push("");
                        }
                    });
                }
                else {
                    var arrayCount = [];
                    var countMes = 0;
                    console.log('passei aqui 6, viu?');
                    Object.values(valueFormatterIndex).forEach((item, i) => { 
                        var mesValues = moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase();
                        if (arrayCount.indexOf(mesValues) == -1)
                        {
                            countMes++;
                            arrayCount.push(mesValues);
                        }
                    });
                    Object.values(valueFormatterIndex).forEach(element => {
                        if (countMes > 1)
                        {
                            if (novoFormato.indexOf(moment(element.searchDate, 'YYYY-MM-DD').locale('pt-br').format('MMM').toUpperCase()) == -1) {
                                novoFormato.push(moment(element.searchDate, 'YYYY-MM-DD').locale('pt-br').format('MMM').toUpperCase());
                            }
                        }
                        else 
                        {
                            console.log('element.searchDate', element.searchDate);
                            novoFormato.push(moment(element.searchDate, 'YYYY-MM-DD').format('DD'));
                        }
                    });
                }
            }
            let arrayTesteAxis = [""];
            console.log('passei aqui 7, viu?', testeUnique);
            console.log('passei aqui 8, viu?', novoFormato);
            return {
                axisMinimum: -0.5,
                centerAxisLabels: testeUnique ? false : false,
                drawGridLines: false,
                valueFormatter: [...testeUnique ? testeUnique : novoFormato],
                granularityEnabled: true,
                granularity: 1,
                position: 'BOTTOM',
                avoidFirstLastClipping: false
            };
        })(),
        yAxis: (() => {
            console.log('MEDIAAAAAAAAAAAS', values);
            if (media) {
                console.log('decimalPlaces', decimalPlaces);
                return {
                    left: {
                        valueFormatter: [ 'F|' + (decimalPlaces ? decimalPlaces : 0), '||' ],
                        drawLabels: true,
                        drawAxisLine: false,
                        drawGridLines: true,
                        axisMinimum: 0,
                        limitLines: [{
                            limit: media,
                            label: parseFloat(media).toFixed(decimalPlaces ? decimalPlaces : 0),
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
            }
            else {
                return {
                    left: {
                        valueFormatter: [ 'F|' + (decimalPlaces ? decimalPlaces : 0), '||' ],
                        drawLabels: true,
                        drawAxisLine: false,
                        drawGridLines: true,
                        axisMinimum: 0,
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
            }
            
        })(),
        zoom: (() => {
            return {
                scaleX: 0.1145833 * values.length,
                scaleY: 1,
                xValue: 1,
                yValue: 1
            };
        })(),
        onSelect: e => {
            if (typeof onSelect === 'function') {
                onSelect(e.nativeEvent);
            }
        }
    }))
);

const BarChartLinePure = enhance(({ data, xAxis, yAxis, onSelect, zoom, media, decimalPlaces }) => {
    return (
        <Wrapper>
            <BarStyle
                data={data}
                legend={{
                    enabled: true,
                    textSize: 14,
                    form: "SQUARE",
                    formSize: 14,
                    xEntrySpace: 10,
                    yEntrySpace: 5,
                    wordWrapEnabled: true, position: 2
                  }}
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

export const BarChartLine = onlyUpdateForKeys(['values', 'anoAnterior'])(BarChartLinePure);


const BarStyle = styled(BarChartNative)`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-bottom: 10;
`;
const WrapperSmpty = styled.View``;
