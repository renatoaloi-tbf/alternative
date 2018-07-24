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
	withState('comparacao', 'setComparacao', false),
	withState('detalheDia', 'setDetalheDia', false),
	withState('dadosDia', 'setDadosDia', null),
	withState('media', 'setMedia', null),
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

			getSearchQuality,
			quality,
			searchToMonth,
			getDetailsDayQuality,
			getSearchQualityComparacao,
			setComparacao,
			types
		}) => (e) => {
			console.log('CHANGED', changed);
			//
			if (changed.rangeAtual != null && changed.rangeAnoAnterior != null) {
				setRange(changed.rangeAtual);
				setRangeAnoAnterior(changed.rangeAnoAnterior);
				setAnoAnterior(e);
				console.log('OPA 1');
				const type = find(types, item => item.selected);
				console.log('TYPES', types);
				getSearchQualityComparacao(changed.rangeAtual, quality.groupByYear, type.value, changed.rangeAnoAnterior);
				console.log('RESEARCHED NA COMPARAÇÃO', researched.newState);
				setComparacao(true)
				//getSearchVolumeAnoAnterior(changed.rangeAtual, volume.all, changed.rangeAnoAnterior, volume.all);
			}
			else {
				setRange(range);
				setRangeAnoAnterior(rangeAnoAnterior);
				setAnoAnterior(e);
				setComparacao(false)
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
			setClose,
			setDetalheDia,
			setDadosDia,
			setType
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
				//item.selected = false;
				item.valor = null;
			});
			setDetalheDia(false);
			setDadosDia(null);
			const type = find(types, item => item.selected);
			setType(type);
			getSearchQuality(range, quality.groupByYear, 'fat');

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
			if (types[0].valor != null) {
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
			setMedia
		}) => e => {
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
						console.log('OI', researched.searchQuality.items);

						const totalPesquisa = reduce(
							map(researched.searchQuality.items, item => item.y),
							(prev, next) => prev + next
						);
						let media = totalPesquisa / researched.searchQuality.items.length;
						setMedia(media);
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
			setMedia
		}) => e => {
			console.log('Teste passando aqui 8', quality);
			if (e && !isEmpty(e)) {
				console.log('Teste passando aqui 9', types);
				let month;
				if (comparacao)
					month = researched.searchQuality.byIndex[parseInt(e.x)];
				else
					month = researched.searchQuality.byIndex[e.x];
				const type = find(types, item => item.selected);
				console.log('MONTH', month);
				if (quality.groupByMonth[month]) {
					console.log('Teste passando aqui 10', quality);
					setClose(true);
					setFilter(false);
					const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
					console.log('DATA PESQUISA', month);
					setSearchMonth(dateFormat);
					setSearchToMonth(true);
					console.log('TESTE DOS VALORES DO MES', quality.groupByMonth[month]);
					let valoresMes = getDetailsDayQuality(quality.groupByMonth[month], type.value);
					console.log('VALORES MES', valoresMes);
					console.log('TYPE ATUAL', type.value);











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
				/* else {
					console.log('Teste passando aqui 11', type);
					if (type.valor != null) {
						console.log('Teste passando aqui 12');
						if (month) {
							console.log('Teste passando aqui 13', month);
							getDetailsDayQuality(month, type.value);
							setDetalheDia(true);
							setDadosDia(month.period.substr(0,2));
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

				} */
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
			const range = {
				startDate: moment().subtract(1, 'years'),
				endDate: moment()
			};

			const initDateFormat = moment(range.startDate, 'MM/YYYY').format('MMM/YY');
			const endDateFormat = moment(range.endDate, 'MM/YYYY').format('MMM/YY');

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
				const initDateFormatAnterior = moment(changed.rangeAnoAnterior.startDate, 'MM/YYYY').format('MMM/YY');
				const endDateFormatAnterior = moment(changed.rangeAnoAnterior.endDate, 'MM/YYYY').format('MMM/YY');
				setSearchMonth(`(${initDateFormat} - ${endDateFormat}) / (${initDateFormatAnterior} - ${endDateFormatAnterior}) `);
			}
			else {
				console.log('OPA 2');
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

				setSearchMonth(`${initDateFormat} - ${endDateFormat}`);
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
		media
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
								media={media}
								tipo={"quality"}
								anoAnterior={anoAnterior}
								valuesAnoAnterior={researched.searchQualityAnoAnterior.items}
								detalheDia={detalheDia}
								dia={dadosDia}
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
