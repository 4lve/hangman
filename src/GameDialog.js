import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material';

export default function GameDialog({ dialogOpen, resetGame, dialogText, img }) {
    return (
        <Dialog
            open={dialogOpen}
            onClose={resetGame}
        >
            <DialogTitle color="black" >
              {dialogText[0]}
            </DialogTitle>
            <DialogContent>
            <DialogContentText color="black" >
              <img src={img} />
              <br />
              {dialogText[1]}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={resetGame} autoFocus color="success">
                  Play Again
              </Button>
            </DialogActions>
        </Dialog>
    )
}