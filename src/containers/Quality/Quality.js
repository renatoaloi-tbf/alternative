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
import { processColor, TouchableOpacity, Image, BackHandler } from 'react-native';
import { navigatorStyle } from '~/config';
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
		({ quality, researched, backend }) => ({ quality, researched, getDetailsDayQuality, backend }),
		{ getSearchQuality, closeSearchQuality, getDetailsDayQuality, getSearchQualityComparacao }
	),
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
	withState('decimalPlaces', 'setDecimalPlaces', 2),
	withState('granularidade', 'setGranularidade', 1),
	withState('primeiraExecucao', 'setPrimeiraExecucao', false),
	withState('valoresIN62', 'setValoresIN62', []),
	withState('relatorioQualidade', 'setRelatorioQualidade', []),
	withState('valoresIN62Status', 'setValoresIN62Status', []),
	withState('valoresIN62Padrao', 'setValoresIN62Padrao', []),
	withState('periodoIn62', 'setPeriodoIn62', moment().format('MM/YYYY')),
	withState('qualityStandards', 'setQualityStandards', null),
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
			setPrimeiraExecucao,
			backend
		}) => (e) => {
			setPrimeiraExecucao(false);
			if (changed.rangeAtual != null && changed.rangeAnoAnterior != null && e) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(e);
				setIsLegenda(e);

				const type = find(types, item => item.selected);

				var groupbyUser = {};
				const keys = Object.keys(quality.groupByYear);
				forEach(keys, item => {
					if (quality.groupByYear[item].code == backend.user)
						groupbyUser[item] = quality.groupByYear[item];
				});

				let valoresMes = getSearchQualityComparacao(changed.rangeAtual, groupbyUser, type.value, changed.rangeAnoAnterior, backend.user);

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
					if (raAnoAtual.contains(moment(key, 'MM/YYYY')) && valoresMes.payload.qualities[key].code == backend.user) {
						valoresAnoAtual.push(valoresMes.payload.qualities[key]);
					}
				}

				for (const key in valoresMes.payload.qualities) {
					if (raAnoAnterior.contains(moment(key, 'MM/YYYY')) && valoresMes.payload.qualities[key].code == backend.user) {
						valoresAnoAnterior.push(valoresMes.payload.qualities[key]);
					}
				}

				var contaFatAtual = 0, contaCcsAtual = 0, contaCbtAtual = 0, contaEsdAtual = 0, contaEstAtual = 0, contaLactAtual = 0, contaProtAtual = 0;
				var totLenAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					if ((elemento.code == backend.user) && elemento.fat) contaFatAtual++;
					if ((elemento.code == backend.user) && elemento.ccs) contaCcsAtual++;
					if ((elemento.code == backend.user) && elemento.cbt) contaCbtAtual++;
					if ((elemento.code == backend.user) && elemento.esd) contaEsdAtual++;
					if ((elemento.code == backend.user) && elemento.est) contaEstAtual++;
					if ((elemento.code == backend.user) && elemento.lact) contaLactAtual++;
					if ((elemento.code == backend.user) && elemento.prot) contaProtAtual++;
					return ((elemento.code == backend.user) ? tot + 1 : tot);
				}, 0);

				var contaFatAnterior = 0, contaCcsAnterior = 0, contaCbtAnterior = 0, contaEsdAnterior = 0, contaEstAnterior = 0, contaLactAnterior = 0, contaProtAnterior = 0;
				var totLenAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					if ((elemento.code == backend.user) && elemento.fat) contaFatAnterior++;
					if ((elemento.code == backend.user) && elemento.ccs) contaCcsAnterior++;
					if ((elemento.code == backend.user) && elemento.cbt) contaCbtAnterior++;
					if ((elemento.code == backend.user) && elemento.esd) contaEsdAnterior++;
					if ((elemento.code == backend.user) && elemento.est) contaEstAnterior++;
					if ((elemento.code == backend.user) && elemento.lact) contaLactAnterior++;
					if ((elemento.code == backend.user) && elemento.prot) contaProtAnterior++;
					return ((elemento.code == backend.user) ? tot + 1 : tot);
				}, 0);

				var totalFatAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.fat ? elemento.fat : 0) : tot;
				}, 0);

				var totalFatAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.fat ? elemento.fat : 0) : tot;
				}, 0);
				let diferencaFat = 0, decimalFat = 0, percentualFat = 0;


				if (contaFatAtual == 0) totalFatAtual = 0;
				else totalFatAtual = (totalFatAtual / contaFatAtual);
				if (contaFatAnterior == 0) totalFatAnterior = 0;
				else totalFatAnterior = (totalFatAnterior / contaFatAnterior);

				diferencaFat = totalFatAtual - totalFatAnterior;
				if (totalFatAnterior == 0) decimalFat = 0;
				else decimalFat = diferencaFat / totalFatAnterior;
				percentualFat = decimalFat * 100;

				types[0].percentual = percentualFat;
				types[0].valor = totalFatAtual.toFixed(2) + " vs " + totalFatAnterior.toFixed(2);

				var totalProtAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.prot ? elemento.prot : 0) : tot;
				}, 0);

				var totalProtAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.prot ? elemento.prot : 0) : tot;
				}, 0);

				let diferencaProt = 0, decimalProt = 0, percentualProt = 0;

				if (contaProtAtual == 0) totalProtAtual = 0;
				else totalProtAtual = (totalProtAtual / contaProtAtual);
				if (contaProtAnterior == 0) totalProtAnterior = 0;
				else totalProtAnterior = (totalProtAnterior / contaProtAnterior);

				diferencaProt = totalProtAtual - totalProtAnterior;
				if (totalProtAnterior == 0) decimalProt = 0;
				else decimalProt = diferencaProt / totalProtAnterior;
				percentualProt = decimalProt * 100;
				types[1].percentual = percentualProt;
				types[1].valor = totalProtAtual.toFixed(2) + " vs " + totalProtAnterior.toFixed(2);

				var totalCbtAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.cbt ? elemento.cbt : 0) : tot;
				}, 0);

				var totalCbtAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.cbt ? elemento.cbt : 0) : tot;
				}, 0);

				let diferencaCbt = 0, decimalCbt = 0, percentualCbt = 0;

				if (contaCbtAtual == 0) totalCbtAtual = 0;
				else totalCbtAtual = (totalCbtAtual / contaCbtAtual);
				if (contaCbtAnterior == 0) totalCbtAnterior = 0;
				else totalCbtAnterior = (totalCbtAnterior / contaCbtAnterior);

				diferencaCbt = totalCbtAtual - totalCbtAnterior;
				if (totalCbtAnterior == 0) decimalCbt = 0;
				else decimalCbt = diferencaCbt / totalCbtAnterior;
				percentualCbt = decimalCbt * 100;
				types[2].percentual = percentualCbt;
				types[2].valor = Math.round(totalCbtAtual) + " vs " + Math.round(totalCbtAnterior);

				var totalCcsAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.ccs ? elemento.ccs : 0) : tot;
				}, 0);

				var totalCcsAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.ccs ? elemento.ccs : 0) : tot;
				}, 0);

				let diferencaCcs = 0, decimalCcs = 0, percentualCcs = 0;

				if (contaCcsAtual == 0) totalCcsAtual = 0;
				else totalCcsAtual = (totalCcsAtual / contaCcsAtual);
				if (contaCcsAnterior == 0) totalCcsAnterior = 0;
				else totalCcsAnterior = (totalCcsAnterior / contaCcsAnterior);

				diferencaCcs = totalCcsAtual - totalCcsAnterior;
				if (totalCcsAnterior == 0) decimalCcs = 0;
				else decimalCcs = diferencaCcs / totalCcsAnterior;
				percentualCcs = decimalCcs * 100;
				types[3].percentual = percentualCcs;
				types[3].valor = Math.round(totalCcsAtual) + " vs " + Math.round(totalCcsAnterior);

				var totalEstAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.est ? elemento.est : 0) : tot;
				}, 0);

				var totalEstAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.est ? elemento.est : 0) : tot;
				}, 0);

				let diferencaEst = 0, decimalEst = 0, percentualEst = 0;

				if (contaEstAtual == 0) totalEstAtual = 0;
				else totalEstAtual = (totalEstAtual / contaEstAtual);
				if (contaEstAnterior == 0) totalEstAnterior = 0;
				else totalEstAnterior = (totalEstAnterior / contaEstAnterior);

				diferencaEst = totalEstAtual - totalEstAnterior;
				if (totalEstAnterior == 0) decimalEst = 0;
				else decimalEst = diferencaEst / totalEstAnterior;
				percentualEst = decimalEst * 100;
				types[4].percentual = percentualEst;
				types[4].valor = totalEstAtual.toFixed(2) + " vs " + totalEstAnterior.toFixed(2);

				var totalEsdAtual = valoresAnoAtual.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.esd ? elemento.esd : 0) : tot;
				}, 0);

				var totalEsdAnterior = valoresAnoAnterior.reduce(function (tot, elemento) {
					return elemento.code == backend.user ? tot + (elemento.esd ? elemento.esd : 0) : tot;
				}, 0);

				let diferencaEsd = 0, decimalEsd = 0, percentualEsd = 0;

				if (contaEsdAtual == 0) totalEsdAtual = 0;
				else totalEsdAtual = (totalEsdAtual / contaEsdAtual);
				if (contaEsdAnterior == 0) totalEsdAnterior = 0;
				else totalEsdAnterior = (totalEsdAnterior / contaEsdAnterior);

				diferencaEsd = totalEsdAtual - totalEsdAnterior;
				if (totalEsdAnterior == 0) decimalEsd = 0;
				else decimalEsd = diferencaEsd / totalEsdAnterior;
				percentualEsd = decimalEsd * 100;
				types[5].percentual = percentualEsd;
				types[5].valor = totalEsdAtual.toFixed(2) + " vs " + totalEsdAnterior.toFixed(2);

				setComparacao(true);
			}
			else {
				setRange(range);
				setRangeAnoAnterior(rangeAnoAnterior);
				setAnoAnterior(e);
				setComparacao(e);
				setIsLegenda(e);

				var groupbyUser = {};
				const keys = Object.keys(quality.groupByYear);
				forEach(keys, item => {
					if (quality.groupByYear[item].code == backend.user)
						groupbyUser[item] = quality.groupByYear[item];
				});
				getSearchQuality(range, groupbyUser, 'fat', backend.user);

				console.log('researched.searchQuality.mediaPeriodo[]', researched.searchQuality);
				types[0].percentual = null;
				types[1].percentual = null;
				types[2].percentual = null;
				types[3].percentual = null;
				types[4].percentual = null;
				types[5].percentual = null;
				types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['fat']);
				types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['prot']);
				types[2].valor = Math.round(researched.searchQuality.mediaPeriodo['cbt']);
				types[3].valor = Math.round(researched.searchQuality.mediaPeriodo['ccs']);
				types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['est']);
				types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['esd']);
			}
		},
		open: ({ setClose }) => () => {
			setClose(false);
		},
		openModal: ({ setModalVisible }) => () => {
			setModalVisible(true);
		},
		closeModal: ({ setModalVisible, setIsIN62 }) => () => {
			setIsIN62(false);
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
			setPrimeiraExecucao,
			backend,
			setSearchToMonth,
			setTpes,
			setGranularidade,
			setIsIN62
		}) => () => {
			setRange({});
			setFilter(true);
			setClose(false);
			setComparacao(false);
			setSearchToMonth(false);
			setIsIN62(false);

			setSearchMonth('Mais recentes');
			console.log('passei no close do FilterCore 6');
			const range = {
				startDate: moment().startOf('month').subtract(11, 'month'),
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
			forEach(types, item => {
				if (item.value === 'fat') {
					item.selected = true;
				} else {
					item.selected = false;
				}
			});
			setTpes(types);
			const type = find(types, item => item.selected);
			setType(type);
			setGranularidade(1.5);
			var groupbyUser = {};
			const keys = Object.keys(quality.groupByYear);
			forEach(keys, item => {
				if (quality.groupByYear[item].code == backend.user)
					groupbyUser[item] = quality.groupByYear[item];
			});
			getSearchQuality(range, groupbyUser, 'fat', backend.user);
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
			setPrimeiraExecucao,
			backend,
			setDecimalPlaces,
			setGranularidade,
			setIsIN62
		}) => e => {
			setPrimeiraExecucao(false);
			setIsIN62(false);
			if (types[0].valor != null) {
				if (!anoAnterior) {
					console.log('PASSA AQUI???!!!');
					forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);

					switch (type.value) {
						case 'ccs':
							setDecimalPlaces(0);
							setGranularidade(250);
							break;
						case 'cbt':
							setDecimalPlaces(0);
							setGranularidade(1);
							break;
						case 'fat':
							setGranularidade(1.5);
							break;
						case 'prot':
							setGranularidade(1.5);
							break;
						case 'esd':
							setGranularidade(3.5);
							break;
						case 'est':
							setGranularidade(3.5);
							break;
						default:
							setDecimalPlaces(2);
							break;
					}
					if (type.value == 'ccs' || type.value == 'cbt') { setDecimalPlaces(0); }
					else { setDecimalPlaces(2); }
					setType(type);
					setTpes(types);
					if (!isEmpty(range)) {
						if (!searchToMonth) {
							console.log('passei aqui viu 1', backend.user);
							var groupbyUser = {};
							const keys = Object.keys(quality.groupByYear);
							console.log('quality.groupByYear', quality.groupByYear);
							forEach(keys, item => {
								if (quality.groupByYear[item].code == backend.user)
									groupbyUser[item] = quality.groupByYear[item];
							});
							getSearchQuality(range, groupbyUser, type.value, backend.user);
						} else {
							console.log('passei aqui viu 2');
							let mes = moment(searchMonth, 'MMMM/YYYY').format('MM/YYYY');
							if (quality.groupByMonth[mes]) {
								getDetailsDayQuality(quality.groupByMonth[mes], type.value, backend.user);
							}
						}
					}
				}
				else {
					forEach(types, item => {
						if (item.value === e.value) {
							item.selected = !e.selected;
						} else {
							item.selected = false;
						}
					});
					const type = find(types, item => item.selected);
					if (type.value == 'ccs' || type.value == 'cbt') { setDecimalPlaces(0); }
					else { setDecimalPlaces(2); }
					setType(type);
					setTpes(types);
					var groupbyUser = {};
					const keys = Object.keys(quality.groupByYear);
					forEach(keys, item => {
						if (quality.groupByYear[item].code == backend.user)
							groupbyUser[item] = quality.groupByYear[item];
					});
					let valoresMes = getSearchQualityComparacao(changed.rangeAtual, groupbyUser, type.value, changed.rangeAnoAnterior, backend.user);
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
			setPrimeiraExecucao,
			backend
		}) => e => {
			let rangeAnterior = {
				startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
				endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
			}
			if (size(e) === 2) {
				setPrimeiraExecucao(true);
				console.log('quality.groupByYear', quality.groupByYear);

				var groupbyUser = {};
				const keys = Object.keys(quality.groupByYear);
				forEach(keys, item => {
					if (quality.groupByYear[item].code == backend.user)
						groupbyUser[item] = quality.groupByYear[item];
				});

				setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
				if (anoAnterior) {
					setRangeAnoAnterior(rangeAnterior);
					getSearchQualityComparacao(e, groupbyUser, 'fat', rangeAnterior, backend.user);
				}
				else {
					setRange(e);
					const type = find(types, item => item.selected);
					console.log('groupbyUser', groupbyUser);
					getSearchQuality(e, groupbyUser, type.value, backend.user);
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
			setValoresIN62,
			backend,
			setValoresIN62Status,
			setValoresIN62Padrao,
			setPeriodoIn62
		}) => e => {
			setPrimeiraExecucao(false);
			if (!anoAnterior) {
				const ex = Math.round(Math.abs(e.x));
				const month = researched.searchQuality.byIndex[ex];
				const type = find(types, item => item.selected);
				let fat, prot, cbt, ccs, est, esd;
				if (quality.groupByMonth[month]) {
					var contaFat = 0, contaCcs = 0, contaCbt = 0, contaEsd = 0, contaEst = 0, contaLact = 0, contaProt = 0;
					var totLen = quality.groupByMonth[month].reduce(function (tot, elemento) {
						if ((elemento.code == backend.user) && elemento.fat) contaFat++;
						if ((elemento.code == backend.user) && elemento.ccs) contaCcs++;
						if ((elemento.code == backend.user) && elemento.cbt) contaCbt++;
						if ((elemento.code == backend.user) && elemento.esd) contaEsd++;
						if ((elemento.code == backend.user) && elemento.est) contaEst++;
						if ((elemento.code == backend.user) && elemento.lact) contaLact++;
						if ((elemento.code == backend.user) && elemento.prot) contaProt++;
						return ((elemento.code == backend.user) ? tot + 1 : tot);
					}, 0);

					var totalFat = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return ((elemento.code == backend.user) ? tot + elemento.fat : tot);
					}, 0);

					var totalProt = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return ((elemento.code == backend.user) ? tot + elemento.prot : tot);
					}, 0);

					var totalCbt = quality.groupByMonth[month].reduce(function (tot, elemento) {
						!elemento.cbt ? elemento.cbt = 0 : elemento.cbt = elemento.cbt;
						return ((elemento.code == backend.user) ? tot + elemento.cbt : tot);
					}, 0);

					var totalCcs = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return ((elemento.code == backend.user) ? tot + elemento.ccs : tot);
					}, 0);

					var totalEst = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return ((elemento.code == backend.user) ? tot + elemento.est : tot);
					}, 0);

					var totalEsd = quality.groupByMonth[month].reduce(function (tot, elemento) {
						return ((elemento.code == backend.user) ? tot + elemento.esd : tot);
					}, 0);

					fat = totalFat / contaFat;
					prot = totalProt / contaProt;
					cbt = totalCbt / contaCbt;
					ccs = totalCcs / contaCcs;
					est = totalEst / contaEst;
					esd = totalEsd / contaEsd;

					if (e && !isEmpty(e)) {

						console.log('ESSE É O E', e);
						const standards = quality.milkQualityStandards;
						setValoresIN62Padrao([standards.fat, standards.prot, standards.esd, standards.cbt, standards.est, standards.ccs]);
						var achei = false;
						var periodoIn62 = moment().format('MM/YYYY');
						var reportExterno = {};

						var sfat, sprot, sesd, scbt, sest, sccs;
						sfat = standards.fat.split(" ");
						sprot = standards.prot.split(" ");
						sesd = standards.esd.split(" ");
						scbt = standards.cbt.split(" ");
						sest = standards.est.split(" ");
						sccs = standards.ccs.split(" ");
						let standardsFormatados = {
							'fat': sfat[1],
							'prot': sprot[1],
							'esd': sesd[1],
							'cbt': scbt[1],
							'est': sest[1],
							'ccs': sccs[1],
						}

						switch (type.value) {
							case 'fat':
								if (e.y < parseFloat(standardsFormatados.fat)) {
									console.log('OOOOOI É MENOR', e);
									achei = true;

								}

								break;
							case 'prot':
								if (e.y < parseFloat(standardsFormatados.prot)) {

									achei = true;

								}
								break;
							case 'esd':
								if (e.y < parseFloat(standardsFormatados.esd)) {

									achei = true;

								}
								break;
							case 'cbt':
								if (e.y > parseFloat(standardsFormatados.cbt)) {

									achei = true;
								}

								break;
							case 'est':
								if (e.y < parseFloat(standardsFormatados.est)) {

									achei = true;

								}

								break;
							case 'ccs':
								if (e.y > parseFloat(standardsFormatados.ccs)) {

									achei = true;

								}

								break;
							default:
								break;
						}

						if (achei) {
							setValoresIN62([reportExterno.fat, reportExterno.prot, reportExterno.esd, reportExterno.cbt, reportExterno.est, reportExterno.ccs]);
							setValoresIN62Status([reportExterno.fatstatus, reportExterno.protstatus, reportExterno.esdstatus, reportExterno.cbtstatus, reportExterno.eststatus, reportExterno.ccsstatus]);
							setIsIN62(true);
							setPeriodoIn62(periodoIn62);
							achei = true;
							if (quality.groupByMonth[month]) {
								getDetailsDayQuality(quality.groupByMonth[month], type.value, backend.user);
								const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
								setSearchMonth(dateFormat);
								setClose(true);
								setFilter(false);
								setSearchToMonth(true);
								if (type.value == 'cbt' || type.value == 'ccs') setDecimalPlaces(0);
								else setDecimalPlaces(2);

								types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(fat);
								types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prot);
								if (totalCbt) types[2].valor = cbt;
								else types[2].valor = 0;
								types[3].valor = Math.round(ccs);
								types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(est);
								types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(esd);
							}
						}
						else {
							setIsIN62(false);
							if (quality.groupByMonth[month]) {
								getDetailsDayQuality(quality.groupByMonth[month], type.value, backend.user);
								const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
								setSearchMonth(dateFormat);
								setClose(true);
								setFilter(false);
								setSearchToMonth(true);
								if (type.value == 'cbt' || type.value == 'ccs') setDecimalPlaces(0);
								else setDecimalPlaces(2);

								types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(fat);
								types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(prot);
								if (totalCbt) types[2].valor = Math.round(cbt);
								else types[2].valor = 0;
								types[3].valor = Math.round(ccs);
								types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(est);
								types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(esd);
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
			setPrimeiraExecucao,
			backend
		}) => e => {
			if (changed.rangeAtual) {
				setFilter(false);
				setClose(true);
				setPrimeiraExecucao(false);

				let initDateFormat = moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMMM/YYYY');
				let endDateFormat = moment(changed.rangeAtual.endDate, 'MM/YYYY').format('MMMM/YYYY');

				var groupbyUser = {};
				const keys = Object.keys(quality.groupByYear);
				forEach(keys, item => {
					if (quality.groupByYear[item].code == backend.user)
						groupbyUser[item] = quality.groupByYear[item];
				});

				const type = find(types, item => item.selected);
				if (comparacao) {
					setRange(changed.rangeAtual);
					setRangeAnoAnterior(changed.rangeAnoAnterior);
					setAnoAnterior(true);
					getSearchQualityComparacao(changed.rangeAtual, groupbyUser, type.value, changed.rangeAnoAnterior, backend.user);
					setComparacao(true);

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
							getSearchQuality(changed.rangeAtual, groupbyUser, type.value, backend.user);
						} else {
							if (quality.groupByMonth[searchMonth])
								getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value, backend.user);
						}
					}
					else {
						if (!searchToMonth) {
							getSearchQuality(range, groupbyUser, type.value, backend.user);
						} else {
							if (quality.groupByMonth[searchMonth])
								getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value, backend.user);
						}
					}
					let stringData = `${initDateFormat.charAt(0).toUpperCase() + initDateFormat.slice(1)} - ${endDateFormat.charAt(0).toUpperCase() + endDateFormat.slice(1)}`;
					setSearchMonth(stringData);
				}
			}

		}
	}),
	lifecycle({
		componentWillMount() {

			console.log('THIS PROPS QUALITY', this.props.quality)
			const range = {
				startDate: moment().startOf('month').subtract(11, 'month'),
				endDate: moment().startOf('month')
			};
			const type = find(this.props.types, item => item.selected);

			var groupbyUser = {};
			const keys = Object.keys(this.props.quality.groupByYear);
			forEach(keys, item => {
				if (this.props.quality.groupByYear[item].code == this.props.backend.user)
					groupbyUser[item] = this.props.quality.groupByYear[item];
			});
			console.log('this.props.quality.milkQualityStandards', this.props.quality.milkQualityStandards);
			const standards = this.props.quality.milkQualityStandards;
			var sfat, sprot, sesd, scbt, sest, sccs;
			sfat = standards.fat.split(" ");
			sprot = standards.prot.split(" ");
			sesd = standards.esd.split(" ");
			scbt = standards.cbt.split(" ");
			sest = standards.est.split(" ");
			sccs = standards.ccs.split(" ");
			let standardsFormatados = {
				'fat': sfat[1],
				'prot': sprot[1],
				'esd': sesd[1],
				'cbt': scbt[1],
				'est': sest[1],
				'ccs': sccs[1],
			}
			console.log('standardsFormatados', standardsFormatados);
			this.props.setQualityStandards(standardsFormatados);
			this.props.setValoresIN62Padrao([standards.fat, standards.prot, standards.esd, standards.cbt, standards.est, standards.ccs]);
			this.props.setRange(range);
			//console.log('MILK QUALITY REPORT', this.props.quality.milkQualityReport);
			//this.props.setRelatorioQualidade(this.props.quality.milkQualityReport);
			this.props.setType(type);
			this.props.setGranularidade(1.5);
			this.props.getSearchQuality(
				range,
				groupbyUser,
				type.value,
				this.props.backend.user
			);
			this.props.setPrimeiraExecucao(true);
		}
	})
);

export const Quality = enhance(
	({
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
		valoresIN62,
		granularidade,
		relatorioQualidade,
		valoresIN62Status,
		valoresIN62Padrao,
		periodoIn62,
		qualityStandards,
		type
	}) => {
		console.log('MEDIA PERIODO', types);
		console.log('VALORES QUALIDADE', researched.searchQuality);
		if (primeiraExecucao) {
			if (researched.searchQuality.mediaPeriodo['fat']) {
				types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['fat']);
				types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['prot']);
				types[2].valor = researched.searchQuality.mediaPeriodo['cbt'];
				types[3].valor = Math.round(researched.searchQuality.mediaPeriodo['ccs']);
				types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['est']);
				types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(researched.searchQuality.mediaPeriodo['esd']);
			}
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
								granularidade={granularidade}
								qualityStandards={qualityStandards}
								parametroLeite={type}
							/>
						)}
						{isLegenda && (
							<ViewLegenda>
								<ViewBolinha><BolinhaAnoAnterior></BolinhaAnoAnterior><TextBola>{anoAnteriorLegenda}</TextBola></ViewBolinha>
								<ViewBolinha><BolinhaAnoAtual></BolinhaAnoAtual><TextBola>{anoAtualLegenda}</TextBola></ViewBolinha>
							</ViewLegenda>
						)}
						{isIN62 && (
							<ViewAlertIN62 >
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
						valoresStatus={valoresIN62Status}
						valoresPadrao={valoresIN62Padrao}
						periodoIn62={periodoIn62}
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