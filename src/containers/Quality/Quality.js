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
import moment from 'moment';
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
			valor: null
		},
		{
			name: 'Proteína',
			value: 'prot',
			measure: 'g/100',
			selected: false,
			valor: null
		},
		{
			name: 'CBT',
			value: 'cbt',
			measure: 'g/100',
			selected: false,
			valor: null
		},
		{
			name: 'CCS',
			value: 'ccs',
			measure: 'g/100',
			selected: false,
			valor: null
		},
		{
			name: 'EST',
			value: 'est',
			measure: 'g/100',
			selected: false,
			valor: null
		},
		{
			name: 'ESD',
			value: 'esd',
			measure: 'g/100',
			selected: false,
			valor: null
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
	/* withState('groupByYear', 'setGroupByYear', {}), */
	withHandlers({
		handlerComparacao: ({
			setAnoAnterior,
			rangeAnoAnterior,
			setRangeAnoAnterior,
			range,
			setRange,
			changed,
			researched,
			type,
			getSearchQuality,
			quality,
			searchToMonth,
			getDetailsDayQuality,
			getSearchQualityComparacao
		}) => (e) => {
			console.log('CHANGED', changed);
			//
			if (changed.rangeAtual != null && changed.rangeAnoAnterior != null) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(e);
				console.log('OPA 1');
				getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);
				console.log('RESEARCHED NA COMPARAÇÃO', researched.newState);
				//getSearchVolumeAnoAnterior(changed.rangeAtual, volume.all, changed.rangeAnoAnterior, volume.all);
			}
			else {
				setRange(range);
				setRangeAnoAnterior(rangeAnoAnterior);
				setAnoAnterior(e);

				console.log('OPA 2');
				//getSearchVolumeAnoAnterior(range, volume.all, rangeAnoAnterior, volume.all);
			}
			//setCollected(researched.searchVolume.total);
			//console.log('RESEARCHED VOLUME', researched);



			/* if (!searchToMonth) {
				getSearchQuality(changed.rangeAtual, quality.groupByYear, type.value);
			} else {
				if (quality.groupByMonth[searchMonth])
					getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
			} */


		},
		open: ({ setVisible }) => () => {
			setVisible(true);
		},
		close: ({
			closeSearchQuality,
			setRange,
			setSearchToMonth,
			setSearchMonth,
			types,
			quality,
			getSearchQuality,
			setFilter,
			setClose
		}) => () => {
			console.log('fechei 1');
			setRange({});
			setFilter(true);
			setClose(false);
			setSearchMonth('Mais recentes');
			const range = {
				startDate: moment().subtract(1, 'years'),
				endDate: moment()
			};
			setRange({ ...range });

			forEach(types, item => {
				//item.selected = false;
				item.valor = null;
			});

			const type = find(types, item => item.selected);
			getSearchQuality(range, quality.groupByYear, type.value);
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
			searchMonth
		}) => e => {
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
			if (__DEV__) console.log("Quality.js - handlersFilter", range);
			if (!isEmpty(range)) {
				if (!searchToMonth) {
					getSearchQuality(range, quality.groupByYear, type.value);
				} else {
					if (quality.groupByMonth[searchMonth]) {
						getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
					}
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
			setRangeAnoAnterior
		}) => e => {
			console.log('RANGE ONCHANGE', e);


			
			if (size(e) === 2) {
				rangeAnterior = {
					startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
					endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
				}
				setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
				if (anoAnterior) {
					setRangeAnoAnterior(rangeAnterior);
					//aqui em baixo vai a função de comparação
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
			setFilter
		}) => e => {
			console.log('Teste passando aqui 8', quality);
			if (e && !isEmpty(e)) {
				console.log('Teste passando aqui 9');
				const month = researched.searchQuality.byIndex[e.x];
				const type = find(types, item => item.selected);
				if (quality.groupByMonth[month]) {
					console.log('Teste passando aqui 10', quality);
					setClose(true);
					setFilter(false);
					const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
					console.log('DATA PESQUISA', month);
					setSearchMonth(dateFormat);
					setSearchToMonth(true);
					let valoresMes = getDetailsDayQuality(quality.groupByMonth[month], type.value);
					console.log('VALORES MES', valoresMes);
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
						cbt = '0,0000';
						types[2].valor = cbt;
					}
					else {
						cbt = totalCbt / valoresMes.payload.qualities.length;
						types[2].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(cbt);
					}

					fat = totalFat / valoresMes.payload.qualities.length;
					prot = totalProt / valoresMes.payload.qualities.length;

					ccs = totalCcs / valoresMes.payload.qualities.length;
					est = totalEst / valoresMes.payload.qualities.length;
					esd = totalEsd / valoresMes.payload.qualities.length;

					types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(fat);
					types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(prot);

					types[3].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(ccs);
					types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(est);
					types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(esd);
				}
				else {
					console.log('Teste passando aqui 11', type.valor);
					if (type.valor != null) {
						console.log('Teste passando aqui 12');
						if (month) {
							console.log('Teste passando aqui 13', month);
							getDetailsDayQuality(month, type.value);
							types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.fat);
							types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.prot);
							if (month.cbt) {
								types[2].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.cbt);
							}
							else {
								types[2].valor = '0,0000';
							}

							types[3].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.ccs);
							types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.est);
							types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.esd);
						}
						else console.log("erro do fat");
					}

				}
			}
		},
		apply: ({
			setFilter,
			setSearchMonth,
			range,
			setClose,
			setRange,
			changed,
			researched,
			type,
			getSearchQuality,
			quality,
			searchToMonth,
			getDetailsDayQuality,
			searchMonth
		}) => e => {
			setFilter(false);
			setClose(true);
			const range = {
				startDate: moment().subtract(1, 'years'),
				endDate: moment()
			};

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

			const initDateFormat = moment(range.startDate, 'MM/YYYY').format(
				'MMM/YY'
			);
			const endDateFormat = moment(range.endDate, 'MM/YYYY').format('MMM/YY');
			setSearchMonth(`${initDateFormat} - ${endDateFormat}`);

			/* setFilter(false);
			setClose(true);
			const range = {
				startDate: moment().subtract(1, 'years'),
				endDate: moment()
			};
			
			if (changed.rangeAtual) {
				console.log('OPA 1');
				setSearchMonth(
				  `${moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
					changed.rangeAtual.endDate,
					'MM/YYYY'
				  ).format('MMM/YYYY')}`
				);
				console.log('OPA 2');
				getSearchVolume(changed.rangeAtual, volume.all);
				setRange({ ...changed.rangeAtual });
				console.log('OPA 3');
			  }
			  else {
				console.log('OPA 4');
				setSearchMonth(
				  `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
					range.endDate,
					'MM/YYYY'
				  ).format('MMM/YYYY')}`
				);
				console.log('OPA 5');
				getSearchVolume(range, volume.all);
				setRange({ ...range });
				console.log('OPA 6');
			  }



			const initDateFormat = moment(range.startDate, 'MM/YYYY').format(
				'MMM/YY'
			);
			const endDateFormat = moment(range.endDate, 'MM/YYYY').format('MMM/YY');
			setSearchMonth(`${initDateFormat} - ${endDateFormat}`); */
		},
		open: ({ setClose }) => () => {
			setClose(true);
		}
	}),
	lifecycle({
		componentWillMount() {
			console.log('THIS PROPS QUALITY GROUPBYYEAR', this.props.quality.groupByYear);
			const type = find(this.props.types, item => item.selected);
			this.props.setType(type);
			this.props.getSearchQuality(
				this.props.range,
				this.props.quality.groupByYear,
				type.value
			);
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
		anoAnterior
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
							return <ItemQuality onPress={handlersFilter} type={item} />;
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
								media={70}
								tipo={"quality"}
								anoAnterior={anoAnterior}
								valuesAnoAnterior={researched.searchQualityAnoAnterior.items}
							/>
						)}
					</WrapperBar>
				</WrapperBody>
			</Wrapper>
		);
	}
);

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
