import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const StatisticsModal = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Estatísticas do Time
        </Typography>
        
        {data?.response && (
          <div>
            <Typography sx={{ mt: 2 }}>
              Jogos: {data.response.fixtures.played.total}
            </Typography>
            <Typography>
              Vitórias: {data.response.fixtures.wins.total}
            </Typography>
            <Typography>
              Gols: {data.response.goals.for.total.total}
            </Typography>
          </div>
        )}

        {!data && <Typography sx={{ mt: 2 }}>Carregando dados...</Typography>}

        <Button 
          onClick={onClose} 
          sx={{ mt: 3 }}
          variant="contained"
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};