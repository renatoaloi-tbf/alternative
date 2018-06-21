import React from 'react';
import styled from 'styled-components/native';
import {Navigation} from 'react-native-navigation';
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
import {reduxForm, Field} from 'redux-form';
// import {Image} from 'react-native';
import {
	Wrapper,
	Text,
	TopBar,
	IconUri,
	TextInput,
	Button,
	Image
} from '~/components/shared';
import {HomeRedirect} from '~/containers/Home';
import {login} from '~/actions';
// QuickMenuItem
import {theme, navigatorStyle, ImagesApp, Avatar} from '~/config';
import {withNotifications} from '~/enhancers';

const enhance = compose(
	connect(
		({user}) => ({user}),
		{login}
	),
	withNotifications,
	withState('userName', 'setUserName', ''),
	withState('password', 'setPassword', ''),
	withState('isLoading', 'setLoading', false),
	withHandlers({
		loginSuccess: () => () => {
			Navigation.startSingleScreenApp({
				screen: {
					screen: 'Home',
					navigatorStyle: navigatorStyle
				},
				drawer: {
					left: {
						screen: 'Menu'
					},
					style: {
						drawerShadow: false,
						contentOverlayColor: 'rgba(0,0,0,0.20)'
					},
					type: 'MMDrawer',
					animationType: 'parallax'
				}
			});
		}
	}),
	withHandlers({
		loginIn: ({
			navigator,
			userName,
			password,
			login,
			setLoading,
			user,
			loginSuccess,
			showErrorNotification
		}) => async () => {
			setLoading(true);
			const {token} = await login(userName, password);
			console.log(token);
			setLoading(false);
			if (token) {
				loginSuccess();
			} else {
				showErrorNotification('Usuário ou senha incorretos');
			}
		}
	})
);

export const Login = enhance(
	({loginIn, userName, setUserName, password, setPassword, isLoading}) => {
		return (
			<WrapperLogin loading={isLoading}>
				<LogoNestleWrapper>
					<Logo source={ImagesApp['nestle']} />
				</LogoNestleWrapper>
				<LogoAppWrapper>
					<LogoApp source={ImagesApp['logoHorizontal']} />
				</LogoAppWrapper>
				<WrapperLogo>
					<WrapperBody>
						<PasswordText align="center" secondary size={15}>
							Entre com seu usuário e senha:
						</PasswordText>
						<TextInputLogin
							placeholder="Usuário"
							valeu={userName}
							onChangeText={text => setUserName(text)}
						/>

						<TextInputLogin
							secureTextEntry
							placeholder="Senha"
							value={password}
							onChangeText={text => setPassword(text)}
						/>

						<ButtonLogin info onPress={loginIn}>
							<Text weight="800" inverted>
								ENTRAR
							</Text>
						</ButtonLogin>
					</WrapperBody>
				</WrapperLogo>
				<WrapperFooter>
					<Password>
						<Text secondary align="center" size={12}>
							Esqueceu sua senha?
						</Text>
					</Password>
					<Info>
						<Text secondary align="center" size={12}>
							Ao criar seu cadastro você concorda com os Termos de Uso e
							Política de Privacidade da Nestlé
						</Text>
					</Info>
				</WrapperFooter>
			</WrapperLogin>
		);
	}
);

const LogoNestleWrapper = styled.View`
	align-items: center;
	padding-top: 40;
`;
const LogoAppWrapper = styled.View`
	padding-top: 30;
	padding-bottom: 50;
	align-items: center;
`;
const WrapperLogo = styled.View``;

const WrapperLogin = Wrapper.extend`
	padding-left: 30;
	padding-right: 30;
`;
const TextInputLogin = TextInput.extend`
	margin-top: 10;
`;

const ButtonLogin = Button.extend`
	margin-top: 10;
`;

const WrapperBody = styled.View``;

const WrapperFooter = styled.View`
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	flex: 1;
`;

const Password = styled.View``;
const Info = styled.View``;

const Logo = Image.extend`
	height: 55;
	width: 55;
`;

const LogoApp = Image.extend`
	height: 60;
	width: 200;
`;
const PasswordText = Text.extend`
	padding-bottom: 10;
`;
