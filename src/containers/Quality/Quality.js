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
			name: 'CODE',
			value: 'code',
			measure: 'g/100',
			selected: false
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
			name: 'FACTORY',
			value: 'factory',
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
	withState('range', 'setRange', {}),
	withState('xAxis', 'setXAxis', []),
	withState('searchToMonth', 'setSearchToMonth', false),
	withState('searchMonth', 'setSearchMonth', ''),
	withHandlers({
		open: ({setVisible}) => () => {
			setVisible(true);
		},
		close: ({
			closeSearchQuality,
			setRange,
			setSearchToMonth,
			setSearchMonth
		}) => () => {
			closeSearchQuality();
			setRange({});
			setSearchMonth('');
			setSearchToMonth(false);
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
			searchMonth
		}) => e => {
			if (size(e) === 2) {
				const type = find(types, item => item.selected);
				setRange(e);
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
			setSearchToMonth
		}) => e => {
			if (!isEmpty(e)) {
				const month = researched.searchQuality.byIndex[e.x];
				const type = find(types, item => item.selected);
				if (quality.groupByMonth[month]) {
					setSearchMonth(month);
					setSearchToMonth(true);
					getDetailsDayQuality(quality.groupByMonth[month], type.value);
				}
			}
		}
	})
);

export const Quality = enhance(
	({
		isVisible,
		open,
		onChange,
		data,
		xAxis,
		researched,
		types,
		handlersFilter,
		close,
		onSelect
	}) => {
		console.log(researched);
		return (
			<Wrapper secondary>
				<TopBar
					title="Qualidade"
					leftComponent={<DrawerButton />}
					rightComponent={<Icon inverted name="bell" />}
				/>
				<WrapperHeader>
					<Filter onChange={onChange} onClose={close} />
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
`;

const WrapperFilter = styled.View`
	height: 90;
	padding-right: 8;
	padding-left: 8;
`;
