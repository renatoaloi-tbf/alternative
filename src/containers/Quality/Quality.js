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
import { processColor, TouchableOpacity, Image } from 'react-native';
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
	BarChartLine,
	ScrollWrapper
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
import { DocumentationModal } from '~/components/Documentation/'

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
	withState('isLegenda', 'setIsLegenda', false),
	withState('anoAtualLegenda', 'setAnoAtualLegenda', 2002),
	withState('anoAnteriorLegenda', 'setAnoAnteriorLegenda', 2001),
	withState('isIN62', 'setIsIN62', false),
	withState('modalVisible', 'setModalVisible', false),
	withState('decimalPlaces', 'setDecimalPlaces', 0),
	withState('primeiraExecucao', 'setPrimeiraExecucao', false),
	withState('valoresIN62', 'setValoresIN62', []),
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
			anoAnterior,
			setIsLegenda,
			setAnoAtualLegenda,
			setAnoAnteriorLegenda,
			setPrimeiraExecucao
		}) => (e) => {
			setPrimeiraExecucao(false);
			if (changed.rangeAtual != null && changed.rangeAnoAnterior != null && e) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(e);
				setIsLegenda(e);

				//console.group('COMPARAÇÃO');

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
				//console.groupEnd('COMPARAÇÃO');
			}
			else {
				console.log('TESTE daniel', e);

				setRange(range);
				setRangeAnoAnterior(rangeAnoAnterior);
				setAnoAnterior(e);
				setComparacao(e);
				setIsLegenda(e);
				//const type = find(types, item => item.selected);
				//getSearchQuality(changed.rangeAtual, quality.groupByYear, type.value);

				console.log('researched.searchQuality.mediaPeriodo[]', researched.searchQuality);
				types[0].percentual = null;
				types[1].percentual = null;
				types[2].percentual = null;
				types[3].percentual = null;
				types[4].percentual = null;
				types[5].percentual = null;
				types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['fat']);
				types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['prot']);
				types[2].valor = parseInt(researched.searchQuality.mediaPeriodo['cbt']);
				types[3].valor = parseInt(researched.searchQuality.mediaPeriodo['ccs']);
				types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['est']);
				types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['esd']);
				getSearchQuality(range, quality.groupByYear, 'fat');
			}
		},
		open: ({ setVisible }) => () => {
			setVisible(true);
		},
		openModal: ({ setModalVisible }) => () => {
			setModalVisible(true);
		},
		closeModal: ({ setModalVisible }) => () => {
			setModalVisible(false);
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
			setIsLegenda,
			setComparacao,
			setPrimeiraExecucao
		}) => () => {
			setRange({});
			setFilter(true);
			setClose(false);
			setComparacao(false);

			setSearchMonth('Mais recentes');
			console.log('passei no close do FilterCore 6');
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
			console.log('passei no close do FilterCore 7');
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
			console.log('passei no close do FilterCore 8');
			const type = find(types, item => item.selected);
			setType(type);
			getSearchQuality(range, quality.groupByYear, 'fat');
			setPrimeiraExecucao(true);
			console.log('passei no close do FilterCore 8');
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
			getSearchQualityComparacao,
			setPrimeiraExecucao
		}) => e => {
			setPrimeiraExecucao(false);
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
					//if (__DEV__) console.log("Quality.js - handlersFilter", quality);
					if (!isEmpty(range)) {
						if (!searchToMonth) {
							//console.log('TESTE ENTRE AI');
							getSearchQuality(range, quality.groupByYear, type.value);
						} else {
							//console.log('TESTE ENTRE AI 2');
							let mes = moment(searchMonth, 'MMMM/YYYY').format('MM/YYYY');
							if (quality.groupByMonth[mes]) {
								//console.log('TESTE ENTRE AI 2 2');
								getDetailsDayQuality(quality.groupByMonth[mes], type.value);
							}
						}
					}
				}
				else {
					//console.log('HANDLERS FILTER COMPARATIVO', e);
					forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);
					//console.log('Types quality', type);
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
			setType,
			setTpes,
			getSearchQualityComparacao,
			setPrimeiraExecucao
		}) => e => {
			let rangeAnterior = {
				startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
				endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
			}
			if (size(e) === 2) {
				setPrimeiraExecucao(false);
				
				setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
				if (anoAnterior) {
					setRangeAnoAnterior(rangeAnterior);
					getSearchQualityComparacao(e, quality.groupByYear, 'fat', rangeAnterior);
				}
				else {
					setRange(e);
					const type = find(types, item => item.selected);
					getSearchQuality(e, quality.groupByYear, type.value);
				}

				setClose(false);
			}
			else {
				setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
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
			anoAnterior,
			setIsIN62,
			setDecimalPlaces,
			setPrimeiraExecucao,
			setValoresIN62
		}) => e => {
			setPrimeiraExecucao(false);
			if (!anoAnterior) {
				const ex = Math.round(Math.abs(e.x));
				let month;
				month = researched.searchQuality.byIndex[ex];
				const type = find(types, item => item.selected);
				let fat, prot, cbt, ccs, est, esd;
				if (quality.groupByMonth[researched.searchQuality.byIndex[ex]]) {

					var totalFat = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.fat;
					}, 0);

					var totalProt = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.prot;
					}, 0);

					var totalCbt = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.cbt;
					}, 0);

					var totalCcs = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.ccs;
					}, 0);

					var totalEst = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.est;
					}, 0);

					var totalEsd = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return tot + elemento.esd;
					}, 0);

					if (isNaN(totalCbt) || !totalCbt || totalCbt == 0) {
						//console.log('não existe cbt', totalCbt)
						cbt = '00000';
						types[2].valor = cbt;
					}
					else {
						cbt = totalCbt / quality.groupByMonth[month].length;
						types[2].valor = parseInt(cbt);
					}

					fat = totalFat / quality.groupByMonth[month].length;
					prot = totalProt / quality.groupByMonth[month].length;

					ccs = totalCcs / quality.groupByMonth[month].length;
					est = totalEst / quality.groupByMonth[month].length;
					esd = totalEsd / quality.groupByMonth[month].length;

					if (e && !isEmpty(e)) {
						if (researched.searchQuality.average > e.y) {
							console.log('ENTRA NO IF');
							setValoresIN62([fat, prot, esd, cbt, est, ccs]);
							setIsIN62(true);
						}
						else {
							console.log('ENTRA NO ELSE');
							setIsIN62(false);

							if (quality.groupByMonth[month]) {
								getDetailsDayQuality(quality.groupByMonth[month], type.value);
								const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
								setSearchMonth(dateFormat);
								setClose(true);
								setFilter(false);
								setSearchToMonth(true);
								setDecimalPlaces(1);

								types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(fat);
								types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(prot);

								types[3].valor = parseInt(ccs);
								types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(est);
								types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(esd);
							}
						}
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
			setComparacao,
			setPrimeiraExecucao
		}) => e => {
			setPrimeiraExecucao(false);
			setFilter(false);
			setClose(true);
			//console.log('Changed', changed);

			let initDateFormat = moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMMM/YYYY');
			let endDateFormat = moment(changed.rangeAtual.endDate, 'MM/YYYY').format('MMMM/YYYY');

			const type = find(types, item => item.selected);
			if (comparacao) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(true);
				//console.log('OPA 1');
				//console.log('TYPES', types);
				getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);
				//console.log('RESEARCHED NA COMPARAÇÃO', researched.newState);
				setComparacao(true)

				//console.log('ENTROU NA COMPARAÇÃO', comparacao);
				let initDateFormat = moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YY');
				let endDateFormat = moment(changed.rangeAtual.endDate, 'MM/YYYY').format('MMM/YY');


				let initDateFormatAnterior = moment(changed.rangeAnoAnterior.startDate, 'MM/YYYY').format('MMM/YY');
				let endDateFormatAnterior = moment(changed.rangeAnoAnterior.endDate, 'MM/YYYY').format('MMM/YY');
				let stringData = `${initDateFormat.charAt(0).toUpperCase() + initDateFormat.slice(1)} - ${endDateFormat.charAt(0).toUpperCase() + endDateFormat.slice(1)} (${initDateFormatAnterior.charAt(0).toUpperCase() + initDateFormatAnterior.slice(1)} - ${endDateFormatAnterior.charAt(0).toUpperCase() + endDateFormatAnterior.slice(1)})`;
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
			//console.log('PROPS', this.props);
			const range = {
				startDate: moment().startOf('month').subtract(12, 'month'),
				endDate: moment().startOf('month')
			};
			//console.log('THIS PROPS QUALITY GROUPBYYEAR', this.props.quality.groupByYear);
			const type = find(this.props.types, item => item.selected);

			this.props.setType(type);
			this.props.getSearchQuality(
				range,
				this.props.quality.groupByYear,
				type.value
			);
			this.props.setPrimeiraExecucao(true);
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
		isLegenda,
		anoAtualLegenda,
		anoAnteriorLegenda,
		isIN62,
		modalVisible,
		closeModal,
		openModal,
		decimalPlaces,
		primeiraExecucao,
		valoresIN62
	}) => {
		console.log('ANO ANTERIOR TESTE', anoAnterior);

		if (primeiraExecucao) {
			types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['fat']);
			types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['prot']);
			types[2].valor = parseInt(researched.searchQuality.mediaPeriodo['cbt']);
			types[3].valor = parseInt(researched.searchQuality.mediaPeriodo['ccs']);
			types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['est']);
			types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(researched.searchQuality.mediaPeriodo['esd']);
		}
		return (
			<Wrapper secondary>
				<TopBar
					title="Qualidade"
					leftComponent={<DrawerButton />}
					rightComponent={<Icon inverted name="bell" />}
				/>
				<ScrollWrapperStyle>
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
						<FlatList
							showsHorizontalScrollIndicator={false}
							progressViewOffset={51}
							horizontal={true}
							keyExtractor={types => types.value}
							onEndReachedThreshold={1.5}
							ListEmptyComponent={<EmptyText>Nenhum pedido realizado.</EmptyText>}
							data={types}
							renderItem={({ item }) => {

								return <ItemQuality onPress={handlersFilter} type={item} anoAnterior={anoAnterior} />;
							}}
						/>
					</WrapperFilter>
					<WrapperBar>
						{!researched.searchQuality.items.lenght && (
							<BarChartLine
								values={researched.searchQuality.items}
								valueFormatter={researched.searchQuality.period}
								onSelect={onSelect}
								media={researched.searchQuality.average}
								tipo={"quality"}
								anoAnterior={anoAnterior}
								valuesAnoAnterior={researched.searchQualityAnoAnterior.items}
								detalheDia={detalheDia}
								dia={dadosDia}
								decimalPlaces={decimalPlaces}
							/>
						)}
						{isLegenda && (
							<ViewLegenda>
								<ViewBolinha><BolinhaAnoAnterior></BolinhaAnoAnterior><TextBola>{anoAnteriorLegenda}</TextBola></ViewBolinha>
								<ViewBolinha><BolinhaAnoAtual></BolinhaAnoAtual><TextBola>{anoAtualLegenda}</TextBola></ViewBolinha>
							</ViewLegenda>
						)}
						{isIN62 && (
							<ViewAlertIN62 onPress={openModal}>
								<Image source={require('../../images/ic_warning_white.png')} style={{ height: 70, width: 70, marginTop: 10, marginRight: 10 }} />
								<ViewAlertIN62Inside>
									<Text style={{ color: '#ffffff', marginTop: 23, fontSize: 16 }} >
										Análise de leite fora dos padrões
									</Text>
									<Text style={{ color: '#ffffff', fontSize: 13 }}>
										Preencher checklist de qualidade
									</Text>
								</ViewAlertIN62Inside>
							</ViewAlertIN62>

						)}
					</WrapperBar>
					<DocumentationModal
						close={closeModal}
						title="IN62"
						buttonText="Estou Ciente"
						visible={modalVisible}
						valores={valoresIN62}
					/>
				</ScrollWrapperStyle>
			</Wrapper>
		);
	}
);

const ViewAlertIN62Inside = styled.View`
	flex-direction: column;
`;
const ViewAlertIN62 = styled.TouchableOpacity`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10;
  margin-bottom: 0;
  background-color: #ffbd00
`;
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

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;

const WrapperBar = styled.View`
  height: 350;
  background-color: ${props => props.theme.bg};
  padding-top: 1;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;
`;

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperFilter = styled.View`
	height: 90;
	margin-bottom: 2;
`;