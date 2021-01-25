import React from 'react';
import styled from 'styled-components';

export function LabelWithInput({label, ...rest}){
    return <Wrap>
        <WrapLabel>
            <Label>{label} :</Label>
        </WrapLabel>
        <WrapInput>
            <Input {...rest}/>
        </WrapInput>
    </Wrap>;
}

const Wrap = styled.div`
  width: 100%;
  text-align: center;
`;
const WrapLabel = styled.div`
  float: left;
  width: 50%;
`;
const Label = styled.label`
  float: right;
  margin: 10px;
`;
const WrapInput = styled.div`
  float: left;
  width: 50%;
`;
const Input = styled.input`
  float: left;
  margin: 10px;
  outline: none;
  text-align: center;
`;
