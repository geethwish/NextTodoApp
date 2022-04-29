import { Checkbox, Chip, FormControlLabel, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import styles from './Todo.module.scss'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = ({ todo, handleChecked, deleteTodo, editTodo }) => {

    return (
        <div>
            <Box className={styles.todoCard}>

                <Paper elevation={0} className={styles.todoCardBackground}>

                    <div className={styles.todoTitleSection}>

                        <FormControlLabel
                            control={<Checkbox
                                defaultChecked={todo.status === 'done' ? true : false}
                                onChange={() => handleChecked(todo, todo.status === 'done' ? 'todo' : 'done')}
                            />}
                        />

                        <Typography variant="subtitle1" className={todo.status === 'done' ? styles.checked : ''}>
                            {todo.title}
                        </Typography>

                    </div>

                    <div>

                        <Chip
                            label={todo.status === 'done' ? 'Done' : todo.status === "inprogress" ? "Inprogress" : 'Todo'}
                            size='small'
                            className={todo.status === 'done' ? styles.done : todo.status === "inprogress" ? styles.inprogress : styles.todo}
                            sx={{ mr: 1 }}
                        />

                        <IconButton
                            aria-label="edit"
                            sx={{ mr: 1 }}
                            onClick={() => editTodo(todo)}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            aria-label="delete"
                            onClick={() => deleteTodo(todo._id)}
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