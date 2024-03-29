import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useContext } from 'react';
import { useUserContext } from '../../../../contexts/UserContext';
import { EditNodeContext } from '../../../../contexts/EditNodeContext';
import { Modal, Button, Typography, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  height: 'auto',
  border: '1px solid #eee',
  padding: '5px',
  borderRadius: '5px',
  background: 'white',
});

function BlankNode({ id, data: initialData }) {
  const { accountData, setAccountData, updateDiagramNode } = useUserContext();
  const { triggerEdit } = useContext(EditNodeContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [inputValue, setInputValue] = useState(initialData.content);

  console.log(data);

  const openModal = () => {
    setInputValue(data.content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const confirmChanges = () => {
    setData({
      ...data,
      content: inputValue,
    });
    updateDiagramNode(id, { ...data, content: inputValue });
    closeModal();
    triggerEdit();
  };

  return (
    <StyledBox>
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {data.content}
      </Typography>
      <Button size="small" sx={{ fontSize: '1rem' }} onClick={openModal}>
        Edit
      </Button>

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
            Edit Content
          </Typography>
          <TextField
            id="modal-modal-description"
            multiline
            rows={4}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
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

export default BlankNode;
