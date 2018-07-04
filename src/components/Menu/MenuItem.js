import React from 'react';
import styled from 'styled-components/native';
import {
	compose,
	setPropTypes,
	withHandlers,
	lifecycle,
	pure,
	withState,
	withProps,
	onlyUpdateForKeys
} from 'recompose';
import {string, bool} from 'prop-types';
import {connect} from 'react-redux';
import {
	Platform,
	Image as ImageNative,
	TouchableOpacity as TouchableOpacityNative,
	Linking
} from 'react-native';

// Local
import {Text, IconUri, Icon} from '~/components/shared';
import {getNavigatorContext, withNavigations} from '~/enhancers';
import {navigatorStyle} from '~/config';
import {push} from '~/actions';

const enhance = compose(
	connect(
		({menu}) => ({menu}),
		{push}
	),
	getNavigatorContext,
	setPropTypes({
		icon: string.isRequired,
		name: string.isRequired,
		route: string.isRequired,
		logout: bool,
		link: bool
	}),
	withProps(({menu, route}) => ({
		activated: menu.currentScreen === route
	})),
	withHandlers({
		goTo: ({
			navigator,
			route,
			logout,
			setActivated,
			push,
			name,
			menu,
			link
		}) => () => {
			navigator.toggleDrawer({
				to: 'closed',
				side: 'left',
				animated: true
			});
			if(!link) {
				navigator.push({
					screen: route,
					payload: {
						logout: logout
					},
					navigatorStyle
				});	
			} else {
				Linking.openURL(route)
			}
			
		}
	}),
	onlyUpdateForKeys('activated'),
	pure
);

export const MenuItem = enhance(({name, icon, goTo, activated}) => {
	return (
		<Wrapper>
			<TouchableOpacity onPress={goTo}>
				<WrapperIcon>
					<Icon secondary size={24} name={icon} opacity={0.57} />
				</WrapperIcon>
				<WrapperText>
					<Text size={15} weight="600">
						{name}
					</Text>
				</WrapperText>
			</TouchableOpacity>
		</Wrapper>
	);
});

const Wrapper = styled.View`
	padding-left: 25;
	padding-top: 4%;
	padding-bottom: 4%;
`;
const TouchableOpacity = styled(TouchableOpacityNative)`
	flex-direction: row;
	align-items: center;
`;
const WrapperIcon = styled.View`
	padding-right: 20;
`;
const WrapperText = styled.View``;
