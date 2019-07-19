import React from 'react';
import { Card, Image, Button, Grid, Segment, List, Icon } from 'semantic-ui-react';

const Recipe = (props) => {
    console.log(props.recipe.ingredients[0])

    return (

        <Card>

            <Card.Content>
                <Card.Header>{props.recipe.name} <Icon name='food' size='large'/></Card.Header>
                <Card.Meta>{props.recipe.technique}</Card.Meta>
                
                <Card.Description> This is typcially served as the {props.recipe.course} course.</Card.Description>
                <Segment>
                    {props.recipe.ingredients.map((ingred,i) => {
                        return <List bulleted key={i}> <List.Item>{ingred}</List.Item> </List>
                    })}
                </Segment>
            </Card.Content>

        </Card>

    );
};

export default Recipe;