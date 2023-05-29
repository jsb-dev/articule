import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TopicSurvey from '../../../surveys/TopicSurvey';

function SurveyListItem({ topic, survey }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link component="button" variant="body2" onClick={handleClickOpen}>
        {topic}
      </Link>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{topic}</DialogTitle>
        <DialogContent>
          <TopicSurvey survey={survey} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SurveyListItem;
