import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utilities/axiosWithAuth'
import { Dimmer, Loader, Header, Message, Grid, Card, Button } from 'semantic-ui-react';
import Recipe from './Recipe'
import { useLocalStorage } from '../hooks/useLocalStorage'

const List = (props) => {

    const[recipeList, setRecipeList] = useState(null)
    // const[removeToken, SetRemoveToken] = useLocalStorage('token')

    useEffect(() => {
        axiosWithAuth()
            .get('/data')
            .then(res => {
                console.log(res)
                setTimeout(() => {
                    setRecipeList(res.data)
                }, 1500)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    if(recipeList === null) {
        return (
         <Dimmer active>
             <Loader size='massive'>Loading</Loader>
         </Dimmer>
        )
     }
 
     if (recipeList) {
 
         return (
             <>
                <Message>
                    <Header textAlign='center' color='teal' size='huge'> List of Recipes 
                        <Button 
                            floated='right' 
                            onClick={() => {
                                localStorage.removeItem("token");
                                props.history.push("/");
                            }}
                        >Logout
                        </Button> 
                    </Header>                    
                </Message>
                {console.log(recipeList)}

                <Grid>
                    <Grid.Column>
                        <Card.Group centered>

                            {recipeList.map(recipe => <Recipe key={recipe.name} recipe={recipe}/>)}

                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </>
         );
     }
};

export default List;