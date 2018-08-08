import React, {Component} from 'react';
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
	Linking,
	Image
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
				navigator.pop();
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

class CardIcon extends Component {
	render(){
	  switch (this.props.icon) {
	  case 'home':
		return(
		  <Image source={require('../../images/ic_home_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'certificate':
		return(
		  <Image source={require('../../images/ic_quality.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'beaker':
		return(
		  <Image source={require('../../images/ic_bottle.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'currency-usd':
		return(
		  <Image source={require('../../images/ic_attach_money_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'file-document':
		return(
		  <Image source={require('../../images/ic_description_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'lock':
		return(
		  <Image source={require('../../images/ic_lock_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'comment-text':
		return(
		  <Image source={require('../../images/ic_speaker_notes_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'book-open':
		return(
		  <Image source={require('../../images/ic_chrome_reader_mode_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  case 'logout-variant':
		return(
		  <Image source={require('../../images/ic_exit_to_app_black_24px.png')} 
		  style={{ height: this.props.size, width: this.props.size, marginTop: this.props.marginTop }} />
		);
	  default:
		return false;
	  }
	}
  }

export const MenuItem = enhance(({name, icon, goTo, activated}) => {
	return (
		<Wrapper>
			<TouchableOpacity onPress={goTo}>
				<WrapperIcon>
					<CardIcon icon={icon} size={24} opacity={0.57} marginTop={0} />
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
