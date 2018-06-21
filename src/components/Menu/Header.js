import React from 'react';
import styled from 'styled-components/native';
import {compose, setPropTypes} from 'recompose';
import {string} from 'prop-types';
import {connect} from 'react-redux';
import {Platform, Image as ImageNative} from 'react-native';

import {Text, IconUri} from '~/components/shared';

const enhance = compose(
	setPropTypes({
		name: string.isRequired,
		address: string.isRequired
	})
);

export const Header = enhance(({name, address}) => {
	return (
		<Wrapper>
			<AvatarContainer>
				<IconUri size={60} name="avatarYellow" />
			</AvatarContainer>
			<DescriptionUser>
				<Text inverted size={18}>
					{name}
				</Text>
				<CityText inverted size={12}>
					{address}
				</CityText>
			</DescriptionUser>
		</Wrapper>
	);
});

const Wrapper = styled.View`
	height: ${Platform.OS === 'ios' ? 135 : 115};
	background-color: ${props => props.theme.infoMenu};
	flex-direction: row;
	align-items: center;
	padding-left: 25;
	padding-right: 25;
`;

const AvatarContainer = styled.View`
	elevation: 2;
`;

const DescriptionUser = styled.View`
	padding-left: 15;
`;

const CityText = Text.extend`
	opacity: 0.7;
`;
