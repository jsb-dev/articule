import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Modal,
  Button,
  Typography,
  TextField,
  Box,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  height: 'auto',
  border: '1px solid #eee',
  padding: '5px',
  borderRadius: '5px',
  background: 'white',
});

function TopicNode({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const openModal = (key) => {
    setEditingKey(key);
    setTempValue(data[key]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmChanges = () => {
    data[editingKey] = tempValue;
    closeModal();
  };

  const ListItem = ({ keyName }) => (
    <ListItemText
      primary={data[keyName]}
      secondary={
        <Button size="small" onClick={() => openModal(keyName)}>
          Edit
        </Button>
      }
    />
  );

  return (
    <StyledBox>
      <Typography variant="h1">{data.topic}</Typography>
      <Box component="ul" sx={{ listStyleType: 'none' }}>
        <Typography variant="h5">
          <li>{data.q1}</li>
        </Typography>
        <ListItem keyName="a1" />
        <Typography variant="h5">
          <li>{data.q2}</li>
        </Typography>
        <ListItem keyName="a2" />
        <Typography variant="h5">
          <li>{data.q3}</li>
        </Typography>
        <ListItem keyName="a3" />
      </Box>

      <Box>
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          isConnectable={true}
        />
        <Handle
          id="right"
          type="target"
          position={Position.Right}
          isConnectable={true}
        />
        <Handle
          id="bottom"
          type="target"
          position={Position.Bottom}
          isConnectable={true}
        />
        <Handle
          id="left"
          type="target"
          position={Position.Left}
          isConnectable={true}
        />
      </Box>

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ width: '80%', bgcolor: 'background.paper', p: 2 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Item
          </Typography>
          <TextField
            id="modal-modal-description"
            multiline
            rows={4}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            fullWidth
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={closeModal} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={confirmChanges}
              color="primary"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </StyledBox>
  );
}

export default TopicNode;
