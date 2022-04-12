import Colors from "../Colors"
import React from "react"
import styled from "styled-components"

type PostType = {
    id: string;
    selected: boolean;
    onClick: () => void;
    children?: React.ReactNode
}

const Container = styled.div<{selected:boolean}>`
  border: 1px solid grey;
  padding: 52px 104px;
  background-color: ${p => p.selected? Colors.Blue : Colors.Background};
  border-radius: 6px;
  box-shadow: rgba(50, 50, 93, ${p => 0.25 + (p.selected ? .5 : 0)}) 0px 2px 5px -1px, rgba(0, 0, 0, ${p => 0.3 + (p.selected ? .5 : 0)}) 0px 1px 3px -1px;
`

export const Post = ( {id, selected, onClick, children}: PostType) => {
    return (
        <Container selected={selected} onClick={onClick}>
            {children}
        </Container>
    )
}