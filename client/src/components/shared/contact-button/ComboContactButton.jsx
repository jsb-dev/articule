import { useUserContext } from '../../../contexts/UserContext';
import ContactButton from './contact-button-components/ContactButton';
import GetHelpButton from './contact-button-components/GetHelpButton';

function ComboContactButton() {
  const { accountData } = useUserContext();

  if (accountData) {
    return <GetHelpButton />;
  }

  return <ContactButton />;
}

export default ComboContactButton;
