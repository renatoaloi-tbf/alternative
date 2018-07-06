import React from 'react';
import styled from 'styled-components/native';
import { Navigation } from 'react-native-navigation';
import {
	compose,
	withHandlers,
	withProps,
	setPropTypes,
	withState,
	lifecycle
} from 'recompose';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import {
	Wrapper,
	Text,
	TopBar,
	IconUri,
	TextInput,
	Button,
	Image
} from '~/components/shared';
// QuickMenuItem
import { theme, navigatorStyle, ImagesApp, Avatar } from '~/config';
import { withNotifications } from '~/enhancers';
import {apiUrl} from '~/config';

const enhance = compose(
	connect(
		({ user }) => ({ user }),
		null
	),
	withNotifications,
	withState('userName', 'setUserName', ''),
	withState('isLoading', 'setLoading', false),
	withHandlers({
		submit: ({
			setLoading,
            showErrorNotification,
            showSuccessNotification
		}) => async values => {
			if (!values.user) {
				throw new SubmissionError({
					user: 'Campo obrigatório'
				});
			}
            
            setLoading(true);

            if (__DEV__) console.log("Password.js - submit", values.user);
            try {

                const url = `${apiUrl}/auth/recoverPassword?user=${values.user}`;
                //const url = `${apiUrl}`;
                const res = await fetch(url);
                const repo = await res.json();

                if (__DEV__) console.log("Password.js - res", res);
                if (__DEV__) console.log("Password.js - repo", repo);

                if (res.status === 200) {
                    showSuccessNotification('Senha resetada com sucesso! Siga as instruções recebidas no seu e-mail...');
                }
                else 
                {
                    showErrorNotification('Erro processando o seu pedido.');
                }

            } catch (e) {

                if (__DEV__) console.log("Password.js - e", e);

                showErrorNotification('Erro processando o seu pedido.');
            }


			setLoading(false);
		}
	})
);

const renderInputText = ({
	placeholder,
	secureTextEntry,
	input: { onChange, value, onBlur, onFocus, ...restInput },
	meta: { touched, error }
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
				style={{ borderRadius: 5 }}
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

const PasswordForm = enhance(
	({
		isLoading,
		handleSubmit,
		submit,
		navigator
	}) => {
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
						<PasswordText align="center" secondary size={15} >
							Digite o usuário para recuperar a senha:
						</PasswordText>
						<Field
							name="user"
							component={renderInputText}
							placeholder="Usuário"
						/>
						<ButtonLogin info onPress={handleSubmit(submit)} style={{ borderRadius: 5 }}>
							<Text weight="800" inverted>
								RECUPERAR SENHA
							</Text>
						</ButtonLogin>
					</WrapperBody>
				</WrapperLogo>
				<WrapperFooter>
					<Info>
						<Button onPress={() => {
							navigator.push({
								screen: 'UseTerms',
								navigatorStyle: navigatorStyle
							})
						}} icon>
							<Text secondary align="center" size={12}>
								Ao criar seu cadastro você concorda com os Termos de Uso e
							</Text>
						</Button>
						<Button onPress={() => {
							navigator.push({
									screen: 'PrivacyPolicy',
									navigatorStyle: navigatorStyle
							})
						}} icon>
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

export const Password = reduxForm({
	form: 'passwordForm'
})(PasswordForm);

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