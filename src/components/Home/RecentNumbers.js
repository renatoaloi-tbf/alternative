import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  setPropTypes
} from 'recompose';
import {string} from 'prop-types';

import {Text} from '../shared';


const enhance = compose(
	setPropTypes({
		result: string.isRequired,
		description: string.isRequired,
		route: string
	})
);

export const RecentNumbers = enhance(({
	result,
	description
}) => {
	return (
	   	<Wrapper>
	   		<Text info size={20}>{result}</Text>
			<Bottom>
				<Text secondary size={13}>{description}</Text>	
			</Bottom>
		</Wrapper>
  );
});

const Wrapper = styled.View`
	align-items: center;
`;

const Bottom = styled.View`
	padding-top: 10;
	padding-bottom: 10;
`;