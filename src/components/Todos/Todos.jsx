import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Typography } from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useRouter } from 'next/router';

import { apiUrl } from "../../../config/api";

//components
import Todo from "./Todo"
import TodoCreateEditForm from "./TodoCreateEditForm";

// styles
import styles from './Todo.module.scss'
import tokenSetter from "../../../config/tokenSetter";

const Todos = (props) => {

    const router = useRouter()

    const [alignment, setAlignment] = useState('all');
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('new');
    const [todoList, setTodoList] = useState([]);
    const [tempTodo, setTempTodo] = useState({})

    const api = apiUrl;

    const handleFormClose = () => {

        setOpen(false);

        setTempTodo({})

        setMode("new")

    }

    const handleFormOpen = () => {

        setOpen(true);

    }

    // Fet all todo belong to specific user
    const getTodos = (params) => {

        const apiPath = `${api}todo/all`;

        if (params === 'all' || params === '' ||
            params === 'null' || params === undefined) {

            axios.get(apiPath).then((response) => {

                setTodoList(response.data);

            }).catch((err) => {

                router.push('/auth')

            })

        } else {

            axios.get(apiPath, {
                params: {
                    status: params
                }
            }).then((response) => {

                setTodoList(response.data);

            }).catch((err) => {

                console.log(err);

            })

        }

    }

    const handleChange = (event, newAlignment) => {

        setAlignment(newAlignment);

        getTodos(newAlignment)

    };

    // Delete todo
    const deleteTodo = (id) => {

        const apiPath = `${api}todo/${id}`;

        axios.delete(apiPath).then((response) => {

            getTodos();

        }).catch((err) => {

            console.log(err);
        })
    }

    const editTodo = (data) => {

        setTempTodo(data);

        setMode("update");

        setOpen(true);

    }

    // update changed todo
    const saveChangedTodo = (todo) => {
        const apiPath = `${api}todo/${todo._id}`;

        axios.put(apiPath, todo).then((response) => {

            getTodos();

            setTempTodo({})

            setMode("new")

            setOpen(false)

        }).catch((err) => {

            console.log(err);
        })
    }

    // change todo status using check box
    const handleChecked = (todo, status) => {

        const apiPath = `${api}todo/${todo._id}`;

        axios.put(apiPath, { ...todo, status: status })
            .then((response) => {

                getTodos();

            }).catch((err) => {

                console.log(err);

            })

    }

    // add New todo
    const addTodo = (data) => {

        const apiPath = `${api}todo`;

        axios.post(apiPath, data).then((response) => {

            getTodos();

        }).catch((err) => {

            console.log(err);
        })
    }

    const handleSubmit = (formSubmitData) => {

        setOpen(false);

        addTodo(formSubmitData);

    }

    useEffect(() => {

        tokenSetter()

        getTodos()

    }, [])


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
                                            fullWidth
                                        >

                                            <ToggleButton value="all">All</ToggleButton>

                                            <ToggleButton value="todo">Todo</ToggleButton>

                                            <ToggleButton value="inprogress">Inprogress</ToggleButton>

                                            <ToggleButton value="done">Done</ToggleButton>

                                        </ToggleButtonGroup>

                                    </div>

                                    <div className={styles.todoHeaderSectionRight}>

                                        <Button
                                            variant="filled"
                                            color="light0"
                                            startIcon={<AddIcon />}
                                            onClick={handleFormOpen}
                                        >
                                            New Task
                                        </Button>

                                    </div>

                                </div>

                            </Paper>

                        </Box>

                        {
                            todoList && todoList.length > 0 &&
                            todoList.map((todo, index) => <Todo
                                key={index}
                                todo={todo}
                                handleChecked={handleChecked}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                submit={handleSubmit}
                            />)
                        }

                    </Grid>

                </Grid>

                <TodoCreateEditForm
                    mode={mode}
                    open={open}
                    tempTodo={tempTodo}
                    handleFormClose={handleFormClose}
                    save={handleSubmit}
                    update={saveChangedTodo}
                />


            </Container>

        </>
    )
}

export default Todos