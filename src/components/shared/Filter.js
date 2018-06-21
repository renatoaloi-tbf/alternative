import React from 'react';
import {bool} from 'prop-types';
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
import {Picker} from 'react-native';
export const Filter = compose(
	getNavigatorContext,
	setPropTypes({
		openFilter: bool
	}),
	defaultProps({
		openFilter: false
	}),
	withState('language', 'setLanguage', ''),
	withState('openFilter', 'setOpenFilter', false),
	withState('compare', 'setCompare', true),
	withProps(({startDate, endDate}) => {
		console.log(startDate, endDate);
		return {
			icon: startDate && endDate ? 'ios-close' : 'ios-checkmark'
		};
	}),
	withHandlers({
		onPress: ({navigator}) => () => {},
		open: ({setOpenFilter}) => () => {
			setOpenFilter(true);
		},
		close: ({setOpenFilter}) => () => {
			setOpenFilter(false);
		},
		isCompare: () => () => {}
	}),
	withStateHandlers(
		{startDate: ''},
		{
			handleStartDate: () => values => {
				console.log(values);
				return {
					startDate: values
				};
			}
		}
	),
	withStateHandlers(
		{endDate: ''},
		{
			handleEndDate: () => values => {
				return {
					endDate: values
				};
			}
		}
	),
	pure
)(
	({
		open,
		close,
		openFilter,
		compare,
		setCompare,
		language,
		setLanguage,
		handleStartDate,
		handleEndDate,
		startDate,
		endDate,
		icon
	}) => {
		return (
			<Wrapper>
				{!openFilter && (
					<WrapperView>
						<TextStyle>
							<Text>Mais recentes</Text>
						</TextStyle>
						<IconStyle>
							<Button icon onPress={open}>
								<IconUri size={25} name="filter" />
							</Button>
						</IconStyle>
					</WrapperView>
				)}
				{openFilter && (
					<WrapperSelected>
						<WrapperRangerChange>
							<TextStyle>
								<Text inverted>Selecionar periodo</Text>
							</TextStyle>
							<IconStyle>
								<Button icon onPress={close}>
									<IconClose inverted size={40} name={icon} />
								</Button>
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
									titleStart="Data início"
									titleEnd="Data Término"
									onChange={handleStartDate}
									onChangeEnd={handleEndDate}
									startDate={startDate}
									endDate={endDate}
								/>
							</SelectRanger>
							<WrapperCompareText>
								<CheckBoxStyle
									checkBoxColor="#fff"
									rightTextView={
										<Text inverted>Comparar com outro periodo</Text>
									}
									onClick={() => setCompare(!compare)}
									isChecked={!compare}
								/>
							</WrapperCompareText>
							<SelectRanger>
								<Select
									titleStart="Data de início da comparação"
									titleEnd="Data Término da comparação"
									disabled={compare}
								/>
							</SelectRanger>
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

const WrapperView = styled.View`
	background-color: ${props => props.theme.bg};
	width: 100%;
	height: 50;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const WrapperSelected = styled.View`
	background-color: ${props => props.theme.successMenu};
	width: 100%;
	padding-bottom: 40;
`;

const WrapperRangerChange = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
	padding-bottom: 10;
	padding-top: 10;
`;
const SelectRanger = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
const WrapperCompareText = styled.View`
	padding-bottom: 10;
	padding-top: 10;
`;

const WrapperCompare = styled.View``;

const CheckBoxStyle = styled(CheckBox)`
	background-color: ${props => props.theme.successMenu};
`;
