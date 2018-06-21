// import React from 'react';
// import styled from 'styled-components/native';
// import {
// 	compose,
// 	withHandlers,
// 	withProps,
// 	setPropTypes,
// 	withState,
// 	lifecycle,
// 	withStateHandlers
// } from 'recompose';
// import {func, object, string} from 'prop-types';
// import {connect} from 'react-redux';
// import {Platform} from 'react-native';

// // Local
// import {
// 	Wrapper,
// 	TextInput,
// 	Text,
// 	Button,
// 	DatePicker
// } from '~/components/shared';
// import {FilterTabs} from '~/components/Filter';

// const enhance = compose(
// 	withState('activeTab', 'setActiveTab', 0),
// 	withState('text', 'setText', ''),
// 	setPropTypes({
// 		onChange: func,
// 		titleStart: string,
// 		titleEnd: string,
// 		onChangeEnd: func
// 	}),
// 	withHandlers({
// 		next: ({activeTab, setActiveTab, onChange, monthStart}) => (
// 			monthStart,
// 			yearStart
// 		) => () => {
// 			onChange(`${monthStart}/${yearStart}`);
// 			setActiveTab(1);
// 		},
// 		finish: ({navigator, onChangeEnd}) => (monthEnd, yearEnd) => () => {
// 			navigator.dismissLightBox();
// 			onChangeEnd(`${monthEnd}/${yearEnd}`);
// 		}
// 	}),
// 	withStateHandlers(
// 		{monthStart: ''},
// 		{
// 			handleMonthStart: () => value => {
// 				return {
// 					monthStart: value
// 				};
// 			}
// 		}
// 	),
// 	withStateHandlers(
// 		{yearStart: ''},
// 		{
// 			handleYearStart: () => value => {
// 				return {
// 					yearStart: value
// 				};
// 			}
// 		}
// 	),
// 	withStateHandlers(
// 		{yearEnd: ''},
// 		{
// 			handleYearEnd: () => value => {
// 				return {
// 					yearEnd: value
// 				};
// 			}
// 		}
// 	),
// 	withStateHandlers(
// 		{monthEnd: ''},
// 		{
// 			handleMonthEnd: () => value => {
// 				return {
// 					monthEnd: value
// 				};
// 			}
// 		}
// 	)
// );

// export const Filter = enhance(
// 	({
// 		setText,
// 		handlerSelected,
// 		handleMonthStart,
// 		onChangeYear,
// 		next,
// 		activeTab,
// 		titleStart,
// 		titleEnd,
// 		handleYearStart,
// 		yearStart,
// 		monthStart,
// 		handleYearEnd,
// 		handleMonthEnd,
// 		yearEnd,
// 		monthEnd,
// 		finish
// 	}) => {
// 		return (
// 			<FilterTabs activeTab={activeTab}>
// 				<WrapperModal>
// 					<Header>
// 						<Text align="center" inverted>
// 							{titleStart} - {yearStart}
// 						</Text>
// 					</Header>
// 					<Content>
// 						<DatePicker
// 							onChangeMounth={handleMonthStart}
// 							onChangeYear={handleYearStart}
// 						/>
// 					</Content>
// 					<ButtonFooter onPress={next(monthStart, yearStart)}>
// 						<Text>Selecionar data de término</Text>
// 					</ButtonFooter>
// 				</WrapperModal>
// 				<WrapperModal>
// 					<Header>
// 						<Text align="center" inverted>
// 							{titleEnd}
// 						</Text>
// 					</Header>
// 					<Content>
// 						<DatePicker
// 							onChangeMounth={handleMonthEnd}
// 							onChangeYear={handleYearEnd}
// 						/>
// 					</Content>
// 					<ButtonFooter onPress={finish(monthEnd, yearEnd)}>
// 						<Text>Pronto</Text>
// 					</ButtonFooter>
// 				</WrapperModal>
// 			</FilterTabs>
// 		);
// 	}
// );

// const Header = styled.View`
// 	background-color: ${props => props.theme.successMenu};
// 	padding-left: 20;
// 	padding-right: 20;
// 	padding-top: 20;
// 	padding-bottom: 20;
// 	border-top-left-radius: 2.5;
// 	border-top-right-radius: 2.5;
// 	flex: 1;
// `;

// const WrapperModal = styled.View`
// 	background-color: ${props => props.theme.bg};
// 	width: 300;
// 	border-radius: 2.5;
// `;

// const Footer = styled.View``;

// const Content = styled.View``;

// const ButtonFooter = Button.extend`
// 	width: 100%;
// 	border-top-width: 0.5;
// 	border-top-color: ${props => props.theme.border};
// 	padding-left: 0;
// 	padding-right: 0;
// 	border-radius: 0;
// `;

// const Title = Text.extend`
// 	flex-wrap: wrap;
// `;
