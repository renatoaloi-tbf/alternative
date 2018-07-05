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
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {processColor} from 'react-native';
import {size, map, forEach, find, isEmpty} from 'lodash';
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
import {DatePickerModal} from '~/components/DatePickerModal';
import {FilterCore} from '~/components/FilterCore';
import {ItemQuality} from '~/components/Quality';
import {Filter} from '~/components/Filter';
import {
	getSearchQuality,
	closeSearchQuality,
	getDetailsDayQuality
} from '~/actions';

import Intl from 'intl';
require( 'intl/locale-data/jsonp/pt' );
const enhance = compose(
	connect(
		({quality, researched}) => ({quality, researched, getDetailsDayQuality}),
		{getSearchQuality, closeSearchQuality, getDetailsDayQuality}
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
	withState('xAxis', 'setXAxis', []),
	withState('isFilter', 'setFilter', true),
	withState('isClose', 'setClose', false),

	withState('searchToMonth', 'setSearchToMonth', false),
	withState('searchMonth', 'setSearchMonth', 'Mais recentes'),
	withHandlers({
		open: ({setVisible}) => () => {
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
			setRange({});
			setFilter(true);
			setClose(false);
			setSearchMonth('Mais recentes');
			const range = {
				startDate: moment().subtract(1, 'years'),
				endDate: moment()
			};
			setRange({...range});
			const type = find(types, item => item.selected);
			getSearchQuality(range, quality.groupByYear, type.value);
		},
		handlersFilter: ({
			types,
			setTpes,
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
			setTpes(types);
			console.log("Quality.js - handlersFilter", range);
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
			setClose
		}) => e => {
			setRange(e);
			if (size(e) === 2) {
				setClose(false);
				const type = find(types, item => item.selected);
				if (!searchToMonth) {
					getSearchQuality(e, quality.groupByYear, type.value);
				} else {
					if (quality.groupByMonth[searchMonth]) {
						getDetailsDayQuality(quality.groupByMonth[searchMonth], type.value);
					}
				}
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
			if (e && !isEmpty(e)) {
				const month = researched.searchQuality.byIndex[e.x];
				const type = find(types, item => item.selected);
				
				if (quality.groupByMonth[month]) {
					setClose(true);
					setFilter(false);
					const dateFormat = moment(month, 'MM/YYYY').format('MMMM/YYYY');
					setSearchMonth(dateFormat);
					setSearchToMonth(true);
					let valoresMes = getDetailsDayQuality(quality.groupByMonth[month], type.value);
					
					let fat, prot, cbt, ccs, est, esd;

					var totalFat = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.fat;
					},0);

					var totalProt = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.prot;
					},0);

					var totalCbt = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.cbt;
					},0);

					var totalCcs = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.ccs;
					},0);

					var totalEst = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.est;
					},0);

					var totalEsd = valoresMes.payload.qualities.reduce(function(tot, elemento) {
						return tot + elemento.esd;
					},0);

					fat = totalFat/valoresMes.payload.qualities.length;
					prot = totalProt/valoresMes.payload.qualities.length;
					cbt = totalCbt/valoresMes.payload.qualities.length;
					ccs = totalCcs/valoresMes.payload.qualities.length;
					est = totalEst/valoresMes.payload.qualities.length;
					esd = totalEsd/valoresMes.payload.qualities.length;
					
					types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(fat);
					types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(prot);
					types[2].valor = '0000';
					types[3].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(ccs);
					types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(est);
					types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(esd);
					
				}
				else {
					getDetailsDayQuality(month, type.value);
					types[0].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.fat);
					types[1].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.prot);
					types[2].valor = '0000';
					types[3].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.ccs);
					types[4].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.est);
					types[5].valor = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(month.esd);
				}
			}
		},
		apply: ({setFilter, setSearchMonth, range, setClose}) => e => {
			setFilter(false);
			setClose(true);
			const initDateFormat = moment(range.startDate, 'MM/YYYY').format(
				'MMM/YY'
			);
			const endDateFormat = moment(range.endDate, 'MM/YYYY').format('MMM/YY');
			setSearchMonth(`${initDateFormat} - ${endDateFormat}`);
		},
		open: ({setClose}) => () => {
			setClose(true);
		}
	}),
	lifecycle({
		componentWillMount() {
			const type = find(this.props.types, item => item.selected);
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
		open
	}) => {
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
						renderItem={({item}) => {
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
