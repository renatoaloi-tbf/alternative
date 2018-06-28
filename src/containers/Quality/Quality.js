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
	EmptyText
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

const enhance = compose(
	connect(
		({quality, researched}) => ({quality, researched, getDetailsDayQuality}),
		{getSearchQuality, closeSearchQuality, getDetailsDayQuality}
	),
	withState('isVisible', 'setVisible', false),
	withState('types', 'setTpes', [
		{
			name: 'CCS',
			value: 'ccs',
			measure: 'g/100',
			selected: true
		},
		{
			name: 'ESD',
			value: 'esd',
			measure: 'g/100',
			selected: false
		},
		{
			name: 'EST',
			value: 'est',
			measure: 'g/100',
			selected: false
		},
		{
			name: 'FAT',
			value: 'fat',
			measure: 'g/100',
			selected: false
		},
		{
			name: 'LACT',
			value: 'lact',
			measure: 'g/100',
			selected: false
		},
		{
			name: 'PROT',
			value: 'prot',
			measure: 'g/100',
			selected: false
		},
		{
			name: 'UFC',
			value: 'ufc',
			measure: 'g/100',
			selected: false
		}
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
			console.log(range);
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
					getDetailsDayQuality(quality.groupByMonth[month], type.value);
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
							<BarChart
								values={researched.searchQuality.items}
								valueFormatter={researched.searchQuality.period}
								onSelect={onSelect}
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
