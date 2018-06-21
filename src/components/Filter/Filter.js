import React from 'react';
import {bool, func} from 'prop-types';
import styled from 'styled-components/native';
import {
	compose,
	withHandlers,
	pure,
	setPropTypes,
	withProps,
	defaultProps,
	withState,
	withStateHandlers
} from 'recompose';
import CheckBox from 'react-native-check-box';

// Locals
import {getNavigatorContext} from '~/enhancers';
import {navigatorStyle} from '~/config';
import {IconUri, Icon, Button, Text, Select} from '~/components/shared';
import {ButtonFilter} from '~/components/Filter';
import {Picker} from 'react-native';
export const Filter = compose(
	getNavigatorContext,
	setPropTypes({
		openFilter: bool,
		onChange: func,
		onClose: func,
		notComparison: bool,
		notPeriodEnd: bool
	}),
	defaultProps({
		openFilter: false,
		notComparison: false,
		notPeriodEnd: true
	}),
	withState('openFilter', 'setOpenFilter', false),
	withState('label', 'setLabel', {}),
	withState('compare', 'setCompare', true),
	withState('date', 'setDate', {}),
	withState('isApply', 'setApply', false),
	withProps(
		({
			date,
			onChange,
			setOpenFilter,
			setDate,
			setApply,
			setCompare,
			onClose
		}) => ({
			onChange: e => {
				if (typeof onChange === 'function') {
					onChange(e);
				}
			},
			onClose: e => {
				setOpenFilter(false);
				setCompare(true);
				setApply(false);
				setDate({});
				if (typeof onChange === 'function') {
					onChange({});
				}

				if (typeof onClose === 'function') {
					onClose(e);
				}
			}
		})
	),
	withHandlers({
		open: ({setOpenFilter}) => () => {
			setOpenFilter(true);
		},
		setDateStart: ({setDate, date, onChange, setLabel, label}) => e => {
			setDate({...date, startDate: e.value});
			setLabel({...label, startDate: e.label});
			onChange({...date, startDate: e.value});
		},
		setDateEnd: ({setDate, date, onChange, setLabel, label}) => e => {
			setDate({...date, endDate: e.value});
			setLabel({...label, endDate: e.label});
			onChange({...date, endDate: e.value});
		},
		setDateStartComparation: ({
			setDate,
			date,
			onChange,
			setLabel,
			label
		}) => e => {
			setDate({...date, startDateComparation: e.value});
			setLabel({...label, startDateComparation: e.label});
			onChange({...date, startDateComparation: evalue});
		},
		setDateEndComparation: ({
			setDate,
			date,
			onChange,
			setLabel,
			label
		}) => e => {
			setDate({...date, endDateComparation: e.value});
			setLabel({...label, endDateComparation: e.label});
			onChange({...date, endDateComparation: e.value});
		},
		close: ({setOpenFilter, setDate, onChange, setApply, setCompare}) => () => {
			setOpenFilter(false);
			setCompare(true);
			setApply(false);
			setDate({});
			onChange({});
		},
		apply: ({setApply, date, onChange, setOpenFilter}) => () => {
			onChange(date);
			setOpenFilter(false);
			setApply(true);
		}
	}),
	pure
)(
	({
		open,
		close,
		openFilter,
		compare,
		setCompare,
		endDate,
		icon,
		setDateStart,
		setDateEnd,
		date,
		onChange,
		setDateEndComparation,
		setDateStartComparation,
		apply,
		isApply,
		label,
		onClose,
		notComparison,
		notPeriodEnd
	}) => {
		return (
			<Wrapper>
				{!openFilter && (
					<ButtonFilter
						onPress={open}
						date={label}
						isFilter={isApply}
						close={onClose}
					/>
				)}
				{openFilter && (
					<WrapperSelected>
						<WrapperRangerChange>
							<TextStyle>
								<Text inverted>Selecionar periodo</Text>
							</TextStyle>
							<IconStyle>
								{!(date.startDate && date.endDate) && (
									<Button icon onPress={onClose}>
										<IconClose inverted size={25} name="close" />
									</Button>
								)}
								{date.startDate &&
									date.endDate && (
										<Button icon onPress={apply}>
											<IconClose inverted size={25} name="check" />
										</Button>
									)}
							</IconStyle>
						</WrapperRangerChange>
						<WrapperRange>
							<WrapperRangeText>
								<IconUri size={25} name="dateRange" />
								<RangeText size={14} inverted>
									Periodo
								</RangeText>
							</WrapperRangeText>
							<SelectRanger>
								<Select
									onPress={setDateStart}
									title="Data início"
									buttonText="Selecionar"
								/>

								{notPeriodEnd && (
									<Select
										onPress={setDateEnd}
										title="Data de término"
										buttonText="Pronto"
									/>
								)}
							</SelectRanger>
							{notComparison && (
								<WrapperCompareText>
									<CheckBoxStyle
										checkBoxColor="#fff"
										rightTextView={
											<TextCheckBox inverted>
												Comparar com outro periodo
											</TextCheckBox>
										}
										onClick={() => setCompare(!compare)}
										isChecked={!compare}
									/>
								</WrapperCompareText>
							)}
							{notComparison && (
								<SelectRanger>
									<Select
										onPress={setDateStartComparation}
										title="Data início comparação"
										buttonText="Selecionar"
										disabled={compare}
									/>
									<Select
										onPress={setDateEndComparation}
										title="Data términi da comparação"
										buttonText="Pronto"
										disabled={compare}
									/>
								</SelectRanger>
							)}
						</WrapperRange>
					</WrapperSelected>
				)}
			</Wrapper>
		);
	}
);
// dateRange
const Wrapper = styled.View`
	margin-top: 10;
`;

const WrapperSelected = styled.View`
	background-color: ${props => props.theme.successMenu};
	width: 100%;
	padding-bottom: 40;
`;

const WrapperRangerChange = styled.View`
	height: 50;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom-width: 0.7;
	border-bottom-color: ${props => props.theme.bg};
`;

const TextStyle = styled.View`
	padding-left: 10;
	padding-right: 10;
	padding-bottom: 10;
	padding-top: 10;
`;

const IconStyle = styled.View`
	align-items: flex-end;
	padding-left: 10;
	padding-right: 10;
	padding-bottom: 10;
	padding-top: 10;
`;
const IconClose = Icon.extend`
	padding-right: 5;
`;
const RangeText = Text.extend`
	padding-left: 10;
`;
const WrapperRange = styled.View`
	padding-left: 10;
	padding-right: 10;
`;

const WrapperRangeText = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding-bottom: 17;
	padding-top: 17;
`;
const SelectRanger = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
const WrapperCompareText = styled.View`
	padding-top: 20;
	padding-bottom: 20;
`;

const WrapperCompare = styled.View``;

const CheckBoxStyle = styled(CheckBox)`
	background-color: ${props => props.theme.successMenu};
`;

const TextCheckBox = Text.extend`
	padding-left: 10;
`;
