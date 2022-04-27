import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Typography } from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import Todo from "./Todo"

import styles from './Todo.module.scss'

import AddIcon from '@mui/icons-material/Add';


const Todos = (props) => {

    const [alignment, setAlignment] = useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const todoList = [
        {
            id: 1,
            title: 'Lorem Ipsum 20 equal tonamoseo101',
            description: 'lorem',
            status: 'todo'
        },
        {
            id: 2,
            title: 'Notatum spenolia korki200 eponil',
            description: 'lorem',
            status: 'done'
        }
    ]

    return (
        <>
            <Container sx={{ marginTop: '50px' }} maxWidth="md" >

                <Grid container spacing={2}>

                    <Grid item xs={12}>

                        <Box className={styles.todoSectionHeader}>

                            <Paper elevation={0} className={styles.todoHeaderBackground} >

                                <div className={styles.todoHeaderWrapper}>

                                    <div className={styles.todoHeaderSectionLeft} >

                                        <Typography
                                            variant="h6"
                                            className={styles.todoHeaderTitle}
                                        >
                                            Todo List
                                        </Typography>

                                        <ToggleButtonGroup
                                            color="light0"
                                            value={alignment}
                                            exclusive
                                            size="small"
                                            sx={{ ml: 2 }}
                                            onChange={handleChange}
                                        >

                                            <ToggleButton value="web">All</ToggleButton>

                                            <ToggleButton value="android">Todo</ToggleButton>

                                            <ToggleButton value="ios">Done</ToggleButton>

                                        </ToggleButtonGroup>

                                    </div>

                                    <div className={styles.todoHeaderSectionRight}>

                                        <Button variant="filled" color="light0" startIcon={<AddIcon />}>
                                            New Task
                                        </Button>

                                    </div>

                                </div>

                            </Paper>

                        </Box>

                        {
                            todoList && todoList.length > 0 &&
                            todoList.map((todo, index) => <Todo key={index} todo={todo} />)
                        }

                    </Grid>

                </Grid>

            </Container>

        </>
    )
}

export default Todos