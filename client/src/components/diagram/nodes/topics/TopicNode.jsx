import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TopicNode({ data, isConnectable }) {
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
    <li>
      {data[keyName]}{' '}
      <button onClick={() => openModal(keyName)} style={{ fontSize: '1rem' }}>
        Edit
      </button>
    </li>
  );

  return (
    <div
      style={{
        height: 'auto',
        border: '1px solid #eee',
        padding: '5px',
        borderRadius: '5px',
        background: 'white',
      }}
    >
      <h1>{data.topic}</h1>
      <ul
        style={{
          listStyleType: 'none',
        }}
      >
        <strong>
          <li>{data.q1}</li>
        </strong>
        <ListItem keyName="a1" />
        <br />
        <strong>
          <li>{data.q2}</li>
        </strong>
        <ListItem keyName="a2" />
        <br />
        <strong>
          <li>{data.q3}</li>
        </strong>
        <ListItem keyName="a3" />
        <br />
      </ul>
      <div>
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Handle
          id="right"
          type="target"
          position={Position.Right}
          isConnectable={isConnectable}
        />
        <Handle
          id="bottom"
          type="target"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
        <Handle
          id="left"
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Edit Item</h2>
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          style={{ width: '100%', height: '100px' }}
        />
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <button onClick={closeModal} style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button onClick={confirmChanges}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}

export default TopicNode;
