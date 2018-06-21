import React from 'react';
import styled, {css} from 'styled-components';

export const Text = styled.Text.attrs({
	color: props => props.color || props.theme.text,
  size: props => props.size || '15',
  weight: props => props.weight || 'normal',
  align: props => props.align || 'left'
})`
	color: ${props => props.color};
	font-size: ${props => props.size};
	font-weight: ${props => props.weight};
	text-align: ${props => props.align};

  ${props =>
    props.secondary &&
    css`
    color: ${props => props.theme.textSecondary};
  `}

  ${props =>
    props.inverted &&
    css`
    color: ${props => props.theme.textInverted};
  `}

  ${props =>
    props.danger &&
    css`
    color: ${props => props.theme.danger};
  `}

  ${props =>
    props.success &&
    css`
    color: ${props => props.theme.success};
  `}

  ${props =>
    props.warning &&
    css`
    color: ${props => props.theme.warning};
  `}

  ${props =>
    props.info &&
    css`
    color: ${props => props.theme.info};
  `}

  ${props =>
    props.disabled &&
    css`
    color: ${props => props.theme.textSecondary};
    text-decoration-line: line-through;
  `}
`