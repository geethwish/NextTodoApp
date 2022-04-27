import { Chip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import styles from './Todo.module.scss'

const Todo = ({ todo }) => {

    return (
        <div>
            <Box className={styles.todoCard}>

                <Paper elevation={0} className={styles.todoCardBackground}>

                    <div>

                        <Typography variant="subtitle1"     >
                            {todo.title}
                        </Typography>

                    </div>

                    <div>

                        <Chip
                            label="Chip Filled"
                            size='small'
                            className={todo.status === 'done' ? styles.done : styles.todo}
                        />

                    </div>

                </Paper>

            </Box>
        </div>
    )
}

export default Todo