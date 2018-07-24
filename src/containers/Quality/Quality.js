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
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { processColor } from 'react-native';
import { size, map, forEach, find, isEmpty } from 'lodash';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

import {
	Wrapper,
	TopBar,
	Icon,
	Text,
	DrawerButton,
	BarChart,
	FlatList,
	EmptyText,
	BarChartLine
} from '~/components/shared';
import { DatePickerModal } from '~/components/DatePickerModal';
import { FilterCore } from '~/components/FilterCore';
import { ItemQuality } from '~/components/Quality';
import { Filter } from '~/components/Filter';
import {
	getSearchQuality,
	closeSearchQuality,
	getDetailsDayQuality,
	getSearchQualityComparacao
} from '~/actions';

import Intl from 'intl';
require('intl/locale-data/jsonp/pt');
import { reduce } from 'lodash';
const enhance = compose(
	connect(
		({ quality, researched }) => ({ quality, researched, getDetailsDayQuality }),
		{ getSearchQuality, closeSearchQuality, getDetailsDayQuality, getSearchQualityComparacao }
	),
	withState('isVisible', 'setVisible', false),
	withState('types', 'setTpes', [
		{
			name: 'Gordura',
			value: 'fat',
			measure: 'g/100',
			selected: true,
			valor: null,
			percentual: null
		},
		{
			name: 'Proteína',
			value: 'prot',
			measure: 'g/100',
			selected: false,
			valor: null,
			percentual: null
		},
		{
			name: 'CBT',
			value: 'cbt',
			measure: 'g/100',
			selected: false,
			valor: null,
			percentual: null
		},
		{
			name: 'CCS',
			value: 'ccs',
			measure: 'g/100',
			selected: false,
			valor: null,
			percentual: null
		},
		{
			name: 'EST',
			value: 'est',
			measure: 'g/100',
			selected: false,
			valor: null,
			percentual: null
		},
		{
			name: 'ESD',
			value: 'esd',
			measure: 'g/100',
			selected: false,
			valor: null,
			percentual: null
		},
	]),
	withState('range', 'setRange', {
		startDate: moment().subtract(1, 'years'),
		endDate: moment()
	}),
	withState('rangeAnoAnterior', 'setRangeAnoAnterior', {
		startDate: moment().subtract(1, 'month').subtract(1, 'year'),
		endDate: moment().subtract(1, 'year')
	}),
	withState('type', 'setType', null),
	withState('xAxis', 'setXAxis', []),
	withState('isFilter', 'setFilter', true),
	withState('isClose', 'setClose', false),
	withState('changed', 'setChanged', { rangeAtual: null, rangeAnoAnterior: null }),
	withState('searchToMonth', 'setSearchToMonth', false),
	withState('anoAnterior', 'setAnoAnterior', false),
	withState('searchMonth', 'setSearchMonth', 'Mais recentes'),
	withState('comparacao', 'setComparacao', false),
	withState('detalheDia', 'setDetalheDia', false),
	withState('dadosDia', 'setDadosDia', null),
	withState('media', 'setMedia', null),
	withState('isLegenda', 'setIsLegenda', false),
	withState('anoAtualLegenda', 'setAnoAtualLegenda', 2002),
	withState('anoAnteriorLegenda', 'setAnoAnteriorLegenda', 2001),
	withHandlers({
		handlerComparacao: ({
			setAnoAnterior,
			rangeAnoAnterior,
			setRangeAnoAnterior,
			range,
			setRange,
			changed,
			researched,
			quality,
			getSearchQualityComparacao,
			setComparacao,
			types,
			setMedia,
			anoAnterior,
			setIsLegenda,
			setAnoAtualLegenda,
			setAnoAnteriorLegenda
		}) => (e) => {


			if (changed.rangeAtual != null && changed.rangeAnoAnterior != null && e) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(e);
				setIsLegenda(e);

				console.group('COMPARAÇÃO');

				const type = find(types, item => item.selected);
				let valoresMes = getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);

				const startAnoAtual = moment(changed.rangeAtual.startDate, 'MM/YYYY').startOf('month');
				setAnoAtualLegenda(moment(startAnoAtual, "MM/YYYY").format('YYYY'));
				const endAnoAtual = moment(changed.rangeAtual.endDate, 'MM/YYYY').endOf('month');
				const raAnoAtual = moment.range(startAnoAtual, endAnoAtual);

				const startAnoAnterior = moment(changed.rangeAnoAnterior.startDate, 'MM/YYYY').startOf('month');
				setAnoAnteriorLegenda(moment(startAnoAnterior, "MM/YYYY").format('YYYY'));
				const endAnoAnterior = moment(changed.rangeAnoAnterior.endDate, 'MM/YYYY').endOf('month');
				const raAnoAnterior = moment.range(startAnoAnterior, endAnoAnterior);


				let valoresAnoAtual = [], valoresAnoAnterior = [];
				for (const key in valoresMes.payload.qualities) {
					if (raAnoAtual.contains(moment(key, 'MM/YYYY'))) {
						valoresAnoAtual.push(valoresMes.payload.qualities[key]);
					}
				}

				for (const key in valoresMes.payload.qualities) {
					if (raAnoAnterior.contains(moment(key, 'MM/YYYY'))) {
						valoresAnoAnterior.push(valoresMes.payload.qualities[key]);
					}
				}

				var totalFatAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.fat;
				}, 0);

				var totalFatAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.fat;
				}, 0);
				let diferencaFat = 0, decimalFat = 0, percentualFat = 0;
				diferencaFat = totalFatAtual - totalFatAnterior;
				decimalFat = diferencaFat / totalFatAnterior;
				percentualFat = decimalFat * 100;
				types[0].percentual = percentualFat;
				types[0].valor = totalFatAtual.toFixed(2) + " vs " + totalFatAnterior.toFixed(2);

				var totalProtAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.prot;
				}, 0);

				var totalProtAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.prot;
				}, 0);

				let diferencaProt = 0, decimalProt = 0, percentualProt = 0;
				diferencaProt = totalProtAtual - totalProtAnterior;
				decimalProt = diferencaProt / totalProtAnterior;
				percentualProt = decimalProt * 100;
				types[1].percentual = percentualProt;
				types[1].valor = totalProtAtual.toFixed(2) + " vs " + totalProtAnterior.toFixed(2);

				var totalCbtAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.cbt;
				}, 0);

				var totalCbtAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.cbt;
				}, 0);

				let diferencaCbt = 0, decimalCbt = 0, percentualCbt = 0;
				diferencaCbt = totalCbtAtual - totalCbtAnterior;
				decimalCbt = diferencaCbt / totalCbtAnterior;
				percentualCbt = decimalCbt * 100;
				types[2].percentual = percentualCbt;
				types[2].valor = parseInt(totalCbtAtual) + " vs " + parseInt(totalCbtAnterior);

				var totalCcsAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.ccs;
				}, 0);

				var totalCcsAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.ccs;
				}, 0);

				let diferencaCcs = 0, decimalCcs = 0, percentualCcs = 0;
				diferencaCcs = totalCcsAtual - totalCcsAnterior;
				decimalCcs = diferencaCcs / totalCcsAnterior;
				percentualCcs = decimalCcs * 100;
				types[3].percentual = percentualCcs;
				types[3].valor = parseInt(totalCcsAtual) + " vs " + parseInt(totalCcsAnterior);

				var totalEstAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.est;
				}, 0);

				var totalEstAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.est;
				}, 0);

				let diferencaEst = 0, decimalEst = 0, percentualEst = 0;
				diferencaEst = totalEstAtual - totalEstAnterior;
				decimalEst = diferencaEst / totalEstAnterior;
				percentualEst = decimalEst * 100;
				types[4].percentual = percentualEst;
				types[4].valor = totalEstAtual.toFixed(2) + " vs " + totalEstAnterior.toFixed(2);

				var totalEsdAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return tot + elemento.esd;
				}, 0);

				var totalEsdAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return tot + elemento.esd;
				}, 0);

				let diferencaEsd = 0, decimalEsd = 0, percentualEsd = 0;
				diferencaEsd = totalEsdAtual - totalEsdAnterior;
				decimalEsd = diferencaEsd / totalEsdAnterior;
				percentualEsd = decimalEsd * 100;
				types[5].percentual = percentualEsd;
				types[5].valor = totalEsdAtual.toFixed(2) + " vs " + totalEsdAnterior.toFixed(2);


				setComparacao(true);
				setMedia(null);
				console.groupEnd('COMPARAÇÃO');
			}
			else {
				types[0].percentual = null;
				types[0].valor = 0;
				types[1].percentual = null;
				types[1].valor = 0;
				types[2].percentual = null;
				types[2].valor = 0;
				types[3].percentual = null;
				types[3].valor = 0;
				types[4].percentual = null;
				types[4].valor = 0;
				types[5].percentual = null;
				types[5].valor = 0;
				setRange(range);
				setRangeAnoAnterior(rangeAnoAnterior);
				setAnoAnterior(e);
				setComparacao(false)
			}
		},
		open: ({ setVisible }) => () => {
			setVisible(true);
		},
		close: ({
			setRange,
			setSearchMonth,
			types,
			quality,
			getSearchQuality,
			setFilter,
			setClose,
			setDetalheDia,
			setDadosDia,
			setType,
			anoAnterior,
			setAnoAnterior,
			setIsLegenda
		}) => () => {
			console.log('fechei 1', quality);
			setRange({});
			setFilter(true);
			setClose(false);
			setSearchMonth('Mais recentes');
			const range = {
				startDate: moment().startOf('month').subtract(12, 'month'),
				endDate: moment().startOf('month')
			};
			setRange({ ...range });
			forEach(types, item => {
				item.valor = null;
			});
			setDetalheDia(false);
			setDadosDia(null);

			if (anoAnterior) {
				setAnoAnterior(false);
				types[0].percentual = null;
				types[0].valor = 0;
				types[1].percentual = null;
				types[1].valor = 0;
				types[2].percentual = null;
				types[2].valor = 0;
				types[3].percentual = null;
				types[3].valor = 0;
				types[4].percentual = null;
				types[4].valor = 0;
				types[5].percentual = null;
				types[5].valor = 0;
			}
			const type = find(types, item => item.selected);
			setType(type);
			getSearchQuality(range, quality.groupByYear, 'fat');
			setIsLegenda(false);

		},
		handlersFilter: ({
			types,
			setTpes,
			setType,
			getSearchQuality,
			range,
			quality,
			searchToMonth,
			getDetailsDayQuality,
			searchMonth,
			anoAnterior,
			changed,
			getSearchQualityComparacao
		}) => e => {


			if (types[0].valor != null) {
				if (!anoAnterior) {
					forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);
					setType(type);
					setTpes(types);
					if (__DEV__) console.log("Quality.js - handlersFilter", quality);
					if (!isEmpty(range)) {
						if (!searchToMonth) {
							getSearchQuality(range, quality.groupByYear, type.value);
						} else {
							let mes = moment(searchMonth, 'MMMM/YYYY').format('MM/YYYY');
							if (quality.groupByMonth[mes]) {
								getDetailsDayQuality(quality.groupByMonth[mes], type.value);
							}
						}
					}
					
				}
				else {
					console.log('HANDLERS FILTER COMPARATIVO', e);
					forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);
					console.log('Types quality', type);
					setType(type);
					setTpes(types);
					let valoresMes = getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);

				}
				
			}

		},
		onChange: ({
			quality,
			getSearchQuality,
			researched,
			types,
			setRange,
			searchToMonth,
			getDetailsDayQuality,
			searchMonth,
			setClose,
			setChanged,
			anoAnterior,
			setRangeAnoAnterior,
			setMedia,
			setType,
			setTpes,
			getSearchQualityComparacao
		}) => e => {
			if (size(e) === 2) {
				rangeAnterior = {
					startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
					endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
				}
				setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
				if (anoAnterior) {
					console.log('ENTRANDO NO CHANGE DO ANO ANTERIOR');
					setRangeAnoAnterior(rangeAnterior);
					/* forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);
					setType(type);
					setTpes(types); */
					let valoresMes = getSearchQualityComparacao(e, quality.groupByYear, 'fat', rangeAnterior);
				}
				else {
					setRange(e);
					const type = find(types, item => item.selected);
					if (!searchToMonth) {
						getSearchQuality(e, quality.groupByYear, type.value);
					} else {
						if (quality.groupByMonth[searchMonth]) {
							getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
						}
					}
				}

				setClose(false);
			}

		},
		onSelect: ({
			researched,
			quality,
			getDetailsDayQuality,
			types,
			setSearchMonth,
			setSearchToMonth,
			setClose,
			setFilter,
			comparacao,
			setDetalheDia,
			setDadosDia,
			setMedia,
			anoAnterior
		}) => e => {

			if (!anoAnterior) {
				const ex = Math.round(Math.abs(e.x));

				if (e && !isEmpty(e)) {

					let month;
					/* if (comparacao)
						month = researched.searchQuality.byIndex[ex];
					else */
					month = researched.searchQuality.byIndex[ex];
					const type = find(types, item => item.selected);
					if (quality.groupByMonth[month]) {
						setClose(true);
						setFilter(false);
						const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
						setSearchMonth(dateFormat);
						setSearchToMonth(true);
						console.log('TESTE DOS VALORES DO MES', quality.groupByMonth[month]);
						let valoresMes = getDetailsDayQuality(quality.groupByMonth[month], type.value);
						console.log('VALORES MES', valoresMes);
						console.log('TYPE ATUAL', type.value);


						console.log('VALORES MES 2', researched.searchQuality.items);


						let fat, prot, cbt, ccs, est, esd;

						var totalFat = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.fat;
						}, 0);

						var totalProt = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.prot;
						}, 0);

						var totalCbt = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.cbt;
						}, 0);

						var totalCcs = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.ccs;
						}, 0);

						var totalEst = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.est;
						}, 0);

						var totalEsd = valoresMes.payload.qualities.reduce(function (tot, elemento) {
							return tot + elemento.esd;
						}, 0);

						console.log('TOTAL CBT', totalCbt);
						console.log('TOTAL CBT QUANTIDADE MES', valoresMes.payload.qualities.length);
						if (isNaN(totalCbt) || !totalCbt || totalCbt == 0) {
							console.log('não existe cbt', totalCbt)
							cbt = '00000';
							types[2].valor = cbt;
						}
						else {
							cbt = totalCbt / valoresMes.payload.qualities.length;
							types[2].valor = parseInt(cbt);
						}

						fat = totalFat / valoresMes.payload.qualities.length;
						prot = totalProt / valoresMes.payload.qualities.length;

						ccs = totalCcs / valoresMes.payload.qualities.length;
						est = totalEst / valoresMes.payload.qualities.length;
						esd = totalEsd / valoresMes.payload.qualities.length;

						types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(fat);
						types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(prot);

						types[3].valor = parseInt(ccs);
						types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(est);
						types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(esd);
					}
				}
			}

		},
		apply: ({
			setFilter,
			setSearchMonth,
			setClose,
			setRange,
			changed,
			researched,
			getSearchQuality,
			quality,
			searchToMonth,
			getDetailsDayQuality,
			searchMonth,
			comparacao,
			setRangeAnoAnterior,
			setAnoAnterior,
			types,
			getSearchQualityComparacao,
			setComparacao
		}) => e => {
			setFilter(false);
			setClose(true);
			console.log('Changed', changed);

			let initDateFormat = moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMMM/YYYY');
			let endDateFormat = moment(changed.rangeAtual.endDate, 'MM/YYYY').format('MMMM/YYYY');

			const type = find(types, item => item.selected);
			if (comparacao) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(true);
				console.log('OPA 1');
				console.log('TYPES', types);
				getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);
				console.log('RESEARCHED NA COMPARAÇÃO', researched.newState);
				setComparacao(true)

				console.log('ENTROU NA COMPARAÇÃO', comparacao);
				let initDateFormat = moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YYYY');
				let endDateFormat = moment(changed.rangeAtual.endDate, 'MM/YYYY').format('MMM/YYYY');


				let initDateFormatAnterior = moment(changed.rangeAnoAnterior.startDate, 'MM/YYYY').format('MMM/YY');
				let endDateFormatAnterior = moment(changed.rangeAnoAnterior.endDate, 'MM/YYYY').format('MMM/YY');
				let stringData = `(${initDateFormat.charAt(0).toUpperCase() + initDateFormat.slice(1)} - ${endDateFormat.charAt(0).toUpperCase() + endDateFormat.slice(1)}) / (${initDateFormatAnterior.charAt(0).toUpperCase() + initDateFormatAnterior.slice(1)} - ${endDateFormatAnterior.charAt(0).toUpperCase() + endDateFormatAnterior.slice(1)})`;
				setSearchMonth(stringData);
			}
			else {
				if (changed.rangeAtual) {
					if (!searchToMonth) {
						getSearchQuality(changed.rangeAtual, quality.groupByYear, type.value);
					} else {
						if (quality.groupByMonth[searchMonth])
							getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
					}
				}
				else {
					if (!searchToMonth) {
						getSearchQuality(range, quality.groupByYear, type.value);
					} else {
						if (quality.groupByMonth[searchMonth])
							getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
					}
				}
				let stringData = `${initDateFormat.charAt(0).toUpperCase() + initDateFormat.slice(1)} - ${endDateFormat.charAt(0).toUpperCase() + endDateFormat.slice(1)}`;
				setSearchMonth(stringData);
			}

		},
		open: ({ setClose }) => () => {
			setClose(true);
		}
	}),
	lifecycle({
		componentWillMount() {
			console.log('PROPS', this.props);
			const range = {
				startDate: moment().startOf('month').subtract(12, 'month'),
				endDate: moment().startOf('month')
			};
			console.log('THIS PROPS QUALITY GROUPBYYEAR', this.props.quality.groupByYear);
			const type = find(this.props.types, item => item.selected);

			this.props.setType(type);
			this.props.getSearchQuality(
				range,
				this.props.quality.groupByYear,
				type.value
			);

			const totalPesquisa = reduce(
				map(this.props.researched.searchQuality.items, item => item.y),
				(prev, next) => prev + next
			);
			let media = totalPesquisa / this.props.researched.searchQuality.items.length
			this.props.setMedia(media);
		}
	})
);

export const Quality = enhance(
	({
		isVisible,
		onChange,
		data,
		xAxis,
		researched,
		types,
		handlersFilter,
		close,
		onSelect,
		isFilter,
		apply,
		searchMonth,
		isClose,
		open,
		handlerComparacao,
		anoAnterior,
		detalheDia,
		dadosDia,
		media,
		isLegenda,
		anoAtualLegenda,
		anoAnteriorLegenda
	}) => {
		console.log('VALUES TESTE', researched);
		return (
			<Wrapper secondary>
				<TopBar
					title="Qualidade"
					leftComponent={<DrawerButton />}
					rightComponent={<Icon inverted name="bell" />}
				/>
				<WrapperHeader>
					<FilterCore
						isFilter={isFilter}
						onChange={onChange}
						apply={apply}
						value={searchMonth}
						close={close}
						isClose={isClose}
						open={open}
						comparacao={handlerComparacao}
					/>
				</WrapperHeader>
				<WrapperFilter>
					<FlatListStyle
						showsHorizontalScrollIndicator={false}
						progressViewOffset={51}
						horizontal={true}
						keyExtractor={types => types.value}
						onEndReachedThreshold={1.5}
						ListEmptyComponent={<EmptyText>Nenhum pedido realizado.</EmptyText>}
						data={types}
						renderItem={({ item }) => {
							console.log('ITEM DO RENDER ITEM', item);
							return <ItemQuality onPress={handlersFilter} type={item} anoAnterior={anoAnterior} />;
						}}
					/>
				</WrapperFilter>
				<WrapperBody>
					<WrapperBar>
						{!researched.searchQuality.items.lenght && (
							<BarChartLine
								values={researched.searchQuality.items}
								valueFormatter={researched.searchQuality.period}
								onSelect={onSelect}
								media={media}
								tipo={"quality"}
								anoAnterior={anoAnterior}
								valuesAnoAnterior={researched.searchQualityAnoAnterior.items}
								detalheDia={detalheDia}
								dia={dadosDia}
							/>

						)}
						{isLegenda && (
							<ViewLegenda>
								<ViewBolinha><BolinhaAnoAnterior></BolinhaAnoAnterior><TextBola>{anoAnteriorLegenda}</TextBola></ViewBolinha>
								<ViewBolinha><BolinhaAnoAtual></BolinhaAnoAtual><TextBola>{anoAtualLegenda}</TextBola></ViewBolinha>
							</ViewLegenda>
						)}
					</WrapperBar>
				</WrapperBody>
			</Wrapper>
		);
	}
);
const ViewBolinha = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  /* border: 1px solid green; */
  margin-left: 10;
  margin-right: 10;
`;

const ViewLegenda = styled.View`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10;
  margin-bottom: 10;
`;

const TextBola = styled.Text`
  margin-left: 5;
  font-size: 10;
`;

const BolinhaAnoAnterior = styled.View`
  border-radius: 8;
  height: 15;
  width: 15;
  background-color: #00cdff;
`;

const BolinhaAnoAtual = styled.View`
  border-radius: 8;
  height: 15;
  width: 15;
  background-color: #0093ff;
`;
const WrapperBody = styled.View`
	flex: 3;
	padding-left: 8;
	padding-right: 8;
	padding-bottom: 8;
`;

const WrapperBar = styled.View`
	flex: 1;
	background-color: ${props => props.theme.bg};
	border-radius: ${props => props.theme.borderRadius};
	box-shadow: 1px 0px 3px #0f0f0f;
  	elevation: 3;
`;
const WrapperHeader = styled.View`
	padding-right: 8;
	padding-left: 8;
`;
const WrapperFooter = styled.View``;

const FlatListStyle = styled(FlatList)`
	margin-top: 2;
	margin-bottom: 2;
	elevation: 1;
`;

const WrapperFilter = styled.View`
	height: 90;
	padding-right: 8;
	padding-left: 8;
`;
