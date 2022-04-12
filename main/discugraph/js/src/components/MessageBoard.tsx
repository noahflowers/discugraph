import {Post} from './Post'
import React from 'react'
import styled from 'styled-components'
import {QueryClient, QueryClientProvider, useQuery, useQueryClient, useMutation} from 'react-query'
import {Button} from "react-query/types/devtools/styledComponents";
// import TextField from "@material-ui/core/TextField";

const Container = styled.div`
  display:flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  margin-bottom: 36px;
  
`

export const MessageBoard: (() => JSX.Element) = () => {
    // Access the client
    const queryClient2 = useQueryClient()

    const data = useQuery(["data"], async () => {
        return (await fetch('/discugraph/api/get_posts')).json()
    })
    const newPost = useMutation(async (post_data) => {
                                return (await fetch('/discugraph/api/new_post/', {method: 'POST',
                                headers: {},
                                body: JSON.stringify(post_data)}))

                            }, {onSuccess: () => {
                                queryClient2.invalidateQueries("data")
        }})
    const [selected, setSelected] = React.useState([]);
    const [mode, setMode] = React.useState("viewing");
    const [input, setInput] = React.useState("")

// set parent/child border css from child ??
    if (data.isLoading) {
        return (
            <div>loading...</div>
        )
    }
    if (data.isError) {
        return (
            <div>Error</div>
        )
    }
    // console.log(data.data)
    return (
        <div>
            {mode === "viewing" ?
                <button onClick={() => {
                    setMode("selecting");
                    setSelected([]);
                }}>
                    Select posts to respond to
                </button> : (mode === "selecting") ? (
                <>
                    <button onClick={()=>{setMode("writing")}}>Reply to selected</button>
                    <button onClick={()=>{setMode("viewing"); setSelected([]);}}>Cancel</button>
                </> ) : (
                   <>
                    <button onClick={
                        ()=>{
                            setMode("viewing");
                            setSelected([]);
                            const post_data = {"text": input, "user":1, "topic":1}
                            newPost.mutate(post_data)

                    }}>Post Reply</button>
                    <button onClick={()=>{setMode("viewing"); setSelected([]);}}>Cancel</button>
                </>
                )

            }

            {data.data.map((row) => {
                // console.log(row)
                return (
                    <Container>
                        {row.map((value) => {
                            return (
                                <Post id={value.id} selected={selected.includes(value.id)} onClick={() => {

                                    if (mode === "viewing") {
                                        setSelected([value.id])
                                    } else {
                                        if (selected.includes(value.id)) {
                                            setSelected(selected.filter(item => item !== value.id))
                                        } else {
                                            setSelected(selected.concat([value.id]))
                                        }
                                    }
                                    // console.log(selected)
                                }}>
                                    {value.text}
                                </Post>)
                        })}


                    </Container>
                )
            })}
            {(mode==="writing") && (<input id="outlined-basic" label="Outlined" variant="outlined" value={input} onChange={(event) => setInput(event.target.value)} />)}

        </div>
    )
}