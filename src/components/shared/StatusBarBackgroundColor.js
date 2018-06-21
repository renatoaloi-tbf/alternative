import React from 'react';
import {View, Platform} from 'react-native';
import styled from 'styled-components/native';


export const StatusBarBackgroundColor =  styled.View.attrs({
	color: props => props.color || props.theme.statusBarColor
})`
	background-color: ${props => props.color};
	z-index: 1;
	height: ${Platform.OS === 'ios' ? 20 : 0};
`;