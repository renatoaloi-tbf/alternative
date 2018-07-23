import React from 'react';
import styled from 'styled-components/native';
import { compose, withProps, setPropTypes, lifecycle, withState } from 'recompose';
import { BarChart as BarChartNative } from 'react-native-charts-wrapper';
import { array, func, number, string, object, bool } from 'prop-types';
import { processColor } from 'react-native';
import moment from 'moment';

// Local

import { EmptyText } from '~/components/shared';

import Intl from 'intl';

require('intl/locale-data/jsonp/pt');

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
        dia: string,
    }),
    withProps(({ values, valueFormatter, valueFormatterIndex, onSelect, media, tipo, anoAnterior, valuesAnoAnterior, detalheDia, dia, formatterMeses, testeUnique}) => ({

        data: (() => {
            let arrayTeste = [{ y: 0, searchDate: '' }];
            //if (__DEV__) console.log('valueFormatter[0]', valueFormatter);
            //if (__DEV__) console.log('anoAnterior', anoAnterior);
            //if (__DEV__) console.log('value Formatter by index', valueFormatterIndex);
            
            //console.log('values 1', values);
            if (anoAnterior) {
                if (tipo == "volume") {
                    let arrayMesesAtual = [], arrayMesesAnoAnterior = [];

                    values.forEach(function(item, i)  {
                        if ((arrayMesesAtual.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1) && item.searchDate != "") 
                            arrayMesesAtual[moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()] = { y : 0 };
                    });

                    //console.log('arrayMesesAtual 1', arrayMesesAtual);
                    
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
                        if ((arrayMesesAnoAnterior.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1) && item.searchDate != "") 
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

                    //console.log('TESTE NOVO VALUES DO ANO ANTERIOR',arrayMesesAnoAnterior);
                    //console.log('TESTE NOVO VALUES',arrayMesesAtual);
                       
                    values = [], valuesAnoAnterior = [];
                    for(var key in arrayMesesAtual) {
                        //console.log('TESTE NOVO VALUES KEY', key);
                        if (key != 'unique')
                            values.push(arrayMesesAtual[key]);
                    }
                    for(var keyAnterior in arrayMesesAnoAnterior) {
                        if (keyAnterior != 'unique')
                            valuesAnoAnterior.push(arrayMesesAnoAnterior[keyAnterior]);
                    }

                    //console.log('TESTE NOVO VALUES DO ANO ANTERIOR 2', values);
                    //console.log('TESTE NOVO VALUES 2', valuesAnoAnterior);
                    
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
                    //console.log('TESTE ARRAY SEM REPETIÇOES', testeUnique); 
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
                    //console.log('count++', countMes);

                    if (countMes > 1)
                    {
                        let arrayMesesAtual = [];

                        values.forEach(function(item, i)  {
                            if ((arrayMesesAtual.indexOf(moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1) && item.searchDate != "") 
                            {
                                arrayMesesAtual[moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase()] = { y : 0 };
                            }
                        });

                        //console.log('arrayMesesAtual 2', arrayMesesAtual);
                        
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
            //console.log('values ano anterior 1', valuesAnoAnterior);
            //console.log('trataCores 1', trataCores);

            let trataCores = [], trataCoresAnoAnterior = [], arrayMedia = [];

            //console.log('values.length', values.length);

            if (values.length > 0) {
                //console.log('Teste passando aqui 1', valuesAnoAnterior.length);
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
                                trataCoresAnoAnterior.push(processColor('#00cdff'));
                                arrayMedia.push(media);
                            }
                        }
                    }
                    
                }
                else {
                    //console.log('TÁ ENTRANDO AQUI BIXO', values);
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
                //console.log('Teste passando aqui 2');
                //QUANDO NÃO EXISTIR VALOR PARA O RANGE ATUAL
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
                    values = [];
                    for (let index = 0; index < 15; index++) {
                        arrayMedia.push(media);
                        values.push({ y: 0 });
                        trataCores.push(processColor('#0096FF'));
                        arrayMedia.push(media);
                    }
                }
            }
            //console.log('Teste passando aqui 3 ', valuesAnoAnterior);
            if (anoAnterior) {
                //console.log('Teste passando aqui 4', values);

                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    return {
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
                }
            }
            else {
                //console.log('Teste passando aqui 5');
                if (moment(valueFormatter[0], 'MM/YYYY', true).isValid() || tipo == 'volume') {
                    //console.log('Teste passando aqui 6');
                    //console.log('values 6', values);
                    //console.log('trataCores 6', trataCores);
                    //console.log('trataCores 6 media', arrayMedia);
                    return {
                        
                            dataSets: [{
                                values: [...values],
                                label: 'Volume',
                                config: {
                                    barSpacePercent: 100,
                                    highlightAlpha: 50,
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
                    //console.log('Teste passando aqui 7');
                    //console.log('values', values);
                    //console.log('trataCores', trataCores);
                    return {
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
                    //console.log('valueFormatterIndex', valueFormatterIndex);
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
                    Object.values(valueFormatterIndex).forEach((item, i) => { 
                        var mesValues = moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase();
                        if (arrayCount.indexOf(mesValues) == -1)
                        {
                            countMes++;
                            arrayCount.push(mesValues);
                        }
                    });
                    //console.log('valueFormatterIndex count++', countMes);

                    Object.values(valueFormatterIndex).forEach(element => {
                        if (countMes > 1)
                        {
                            if (novoFormato.indexOf(moment(element.searchDate).locale('pt-br').format('MMM').toUpperCase()) == -1) {
                                novoFormato.push(moment(element.searchDate).locale('pt-br').format('MMM').toUpperCase());
                            }
                        }
                        else 
                        {
                            novoFormato.push(moment(element.searchDate).locale('pt-br').format('DD').toUpperCase());
                        }
                    });
                }
            }
            let arrayTesteAxis = [""];
            /* novoFormato = arrayTesteAxis.concat(novoFormato);
            novoFormato = novoFormato.concat(arrayTesteAxis); */
            //console.log('TRATACORES NOVO', novoFormato);
            return {
                axisMinimum: -0.5,
                limitLine: 115,
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
            //console.log('TRATACORES NOVO asdasdsadasd')
            return {
                left: {
                    drawLabels: true,
                    drawAxisLine: false,
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
                //console.log('Entrou no zoom 1', 0.1145833 * values.length);
                return {
                    scaleX: 0.1145833 * values.length,
                    scaleY: 1,
                    xValue: 0,
                    yValue: 1
                };
            }
            else {
                if (tipo == 'volume') {
                    //console.log('Entrou no zoom 2', 0.1145833 * values.length);
                    if (anoAnterior) {
                        //console.log('Entrou no zoom 2 com Comparação');
                        return {
                            scaleX: 0.1145833 * values.length,
                            scaleY: 1,
                            xValue: 0,
                            yValue: 1
                        };
                    }
                    else {
                        //console.log('Entrou no zoom 2 sem Comparação');
                        return {
                            scaleX: 0.1145833 * values.length,
                            scaleY: 1,
                            xValue: 2,
                            yValue: 1
                        };
                    }

                }
                else {
                    //console.log('VALUE FORMARTER ZOOM', valueFormatter);
                    if (valueFormatter.length == 1) {
                        //console.log('Entrou no zoom 3', 0.1145833 * values.length);
                        return {
                            scaleX: 0.1145833 * values.length,
                            scaleY: 0,
                            xValue: 0,
                            yValue: 0
                        };
                    }
                    else {
                        //console.log('Entrou no zoom 4', 0.1145833 * values.length);
                        return {
                            scaleX: 0.1145833 * values.length,
                            scaleY: 1,
                            xValue: 0,
                            yValue: 1
                        };
                    }
                    
                    
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
