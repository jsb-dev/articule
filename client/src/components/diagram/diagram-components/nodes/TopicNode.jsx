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

function TopicNode({ data: initialData }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [data, setData] = useState(initialData);

  const openModal = (key) => {
    setEditingKey(key);
    setTempValue(data.results[key]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmChanges = () => {
    setData({
      ...data,
      results: {
        ...data.results,
        [editingKey]: tempValue,
      },
    });
    closeModal();
  };

  const ListItem = ({ keyName }) => (
    <ListItemText
      primary={data.results[keyName]}
      secondary={
        <Button
          size="small"
          sx={{ fontSize: '1rem' }}
          onClick={() => openModal(keyName)}
        >
          Edit
        </Button>
      }
    />
  );

  const resultKeys = Object.keys(data.results);

  return (
    <StyledBox>
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {data.topic}
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none' }}>
        {data.questions.map((question, index) => (
          <React.Fragment key={question}>
            <Typography
              variant="h5"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <li>{question}</li>
            </Typography>
            <ListItem keyName={resultKeys[index]} />
          </React.Fragment>
        ))}
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
