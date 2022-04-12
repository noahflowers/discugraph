import { Post } from './Post'
import React from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'


const Container = styled.div`
  display:flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  margin-bottom: 36px;
  
`

export const MessageBoard:(() => JSX.Element) = () => {
    // Access the client
    const queryClient2 = useQueryClient()

    const data = useQuery(["data"], async () => {
        return (await fetch('/discugraph/api/get_posts')).json()
    })
    const [selected, setSelected] = React.useState("");

    
// set parent/child border css from child ??
    if (data.isLoading) {
        return(
            <div>loading...</div>
        )
    }
    if (data.isError) {
        return(
            <div>Error</div>
        )
    }
    console.log(data.data)
    return(
        <div>
            {data.data.map((row) => {
                console.log(row)
                return (
                    <Container>
                        {row.map((value) => {
                            return (
                            <Post id={value.id} selected={selected===value.id} onClick={() => setSelected(value.id)}>
                                {value.text} 
                            </Post>)
                        })}
                    </Container>
                )
            })}
        </div>
        )
}