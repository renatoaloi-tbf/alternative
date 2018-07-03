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
import {reduxForm, Field, SubmissionError} from 'redux-form';
// import {  } from 'redux-form'
import {Linking} from 'react-native';
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
			setLoading(false);
			if (token) {
				loginSuccess();
			} else {
				showErrorNotification('Usuário ou senha incorretos');
			}
		},
		submit: ({
			setLoading,
			loginSuccess,
			showErrorNotification,
			login
		}) => async values => {
			if (!values.user) {
				throw new SubmissionError({
					user: 'Campo obrigatório'
				});
			}
			if (!values.password) {
				throw new SubmissionError({
					password: 'Campo obrigatório'
				});
			}
			setLoading(true);
			const {token} = await login(values.user, values.password);
			setLoading(false);
			if (token) {
				loginSuccess();
			} else {
				showErrorNotification('Usuário ou senha incorretos');
			}

		}
	})
);

const renderInputText = ({
	placeholder,
	secureTextEntry,
	input: {onChange, value, onBlur, onFocus, ...restInput},
	meta: {touched, error}
}) => {
	return (
		<WrapperField>
			<TextInput
				secureTextEntry={secureTextEntry || false}
				onBlur={onBlur}
				placeholder={placeholder}
				onChangeText={onChange}
				onFocus={onFocus}
				value={value}
				{...restInput}
			/>
			<WrapperFieldError>
				{touched && error ? (
					<Text size={11} danger>
						{error}
					</Text>
				) : null}
			</WrapperFieldError>
		</WrapperField>
	);
};

const LoginForm = enhance(
	({
		loginIn,
		userName,
		setUserName,
		password,
		setPassword,
		isLoading,
		handleSubmit,
		submit
	}) => {
		console.log("Login.js - enhance", handleSubmit);
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
						<Field
							name="user"
							component={renderInputText}
							placeholder="Usuário"
						/>

						<Field
							secureTextEntry={true}
							name="password"
							placeholder="Senha"
							component={renderInputText}
						/>

						<ButtonLogin info onPress={handleSubmit(submit)}>
							<Text weight="800" inverted>
								ENTRAR
							</Text>
						</ButtonLogin>
					</WrapperBody>
				</WrapperLogo>
				<WrapperFooter>
					<Password>
						<Button icon onPress={() => Linking.openURL('http://www.google.com.br')}>
							<Text secondary align="center" size={12}>
								Esqueceu sua senha?
							</Text>
						</Button>
					</Password>
					<Info>
						<Button onPress={() => {
							Navigation.startSingleScreenApp({
								screen: {
									screen: 'UseTerms',
									navigatorStyle: navigatorStyle
								}
							})}} icon>
							<Text secondary align="center" size={12}>
								Ao criar seu cadastro você concorda com os Termos de Uso e
							</Text>
						</Button>
						<Button onPress={() => {
							Navigation.startSingleScreenApp({
								screen: {
									screen: 'PrivacyPolicy',
									navigatorStyle: navigatorStyle
								}
							})}} icon>
							<Text secondary align="center" size={12}>
							Política de Privacidade da Nestlé
							</Text>
						</Button>
					</Info>
					
				</WrapperFooter>
			</WrapperLogin>
		);
	}
);

export const Login = reduxForm({
	form: 'loginForm'
})(LoginForm);

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

const WrapperField = styled.View`
	padding-bottom: 10;
`;
const WrapperFieldError = styled.View``;

const WrapperFooterPrivacy = styled.View``;
