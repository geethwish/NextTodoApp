import { Checkbox, Chip, FormControlLabel, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import styles from './Todo.module.scss'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = ({ todo, handleChecked, deleteTodo, editTodo }) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <Box className={styles.todoCard}>

                <Paper elevation={0} className={styles.todoCardBackground}>

                    <div className={styles.todoTitleSection}>
                        <FormControlLabel
                            control={<Checkbox
                                defaultChecked={todo.status === 'done' ? true : false}
                                onChange={() => handleChecked(todo.id)}
                            />}
                        />

                        <Typography variant="subtitle1" className={todo.status === 'done' ? styles.checked : ''}>
                            {todo.title}
                        </Typography>

                    </div>

                    <div>

                        <Chip
                            label={todo.status === 'done' ? 'Done' : 'Todo'}
                            size='small'
                            className={todo.status === 'done' ? styles.done : styles.todo}
                            sx={{ mr: 1 }}
                        />

                        <IconButton
                            aria-label="edit"
                            sx={{ mr: 1 }}
                            onClick={() => editTodo(todo.id)}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            aria-label="delete"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </div>

                </Paper>

            </Box>
        </div>
    )
}

export default Todo