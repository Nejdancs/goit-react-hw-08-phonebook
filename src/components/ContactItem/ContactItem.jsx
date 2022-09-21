import PropTypes from 'prop-types';
import {
  Contact,
  ContactWrapper,
  ContentWrapper,
  SelectedText,
} from './ContactItem.styled';
import { memo } from 'react';
import { Paper } from '@mui/material';
import ContactMenu from 'components/ContactMenu/ContactMenu';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BasicAvatar from 'components/BasicAvatar/BasicAvatar';
import { useFilter } from 'hooks/useFilter';

const ContactItem = ({ id, name, number }) => {
  const { filter } = useFilter();

  const getSelectedName = name => {
    if (!filter) {
      return name;
    }

    const normalizedName = name.toLowerCase();
    const normalizedFilter = filter.toLowerCase();

    const preHighlighted = name.slice(
      0,
      normalizedName.indexOf(normalizedFilter)
    );
    const postHighlighted = name.slice(
      normalizedName.indexOf(normalizedFilter) + normalizedFilter.length
    );
    const highlighted = name.slice(
      name.indexOf(normalizedFilter),
      name.indexOf(normalizedFilter) + normalizedFilter.length
    );

    return (
      <span>
        {preHighlighted}
        <SelectedText>{highlighted}</SelectedText>
        {postHighlighted}
      </span>
    );
  };
  return (
    <li>
      <Paper
        sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
        elevation={3}
      >
        <ContactWrapper>
          <BasicAvatar
            name={name}
            alt={name}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 56, height: 56 }}
          />

          <ContentWrapper>
            <Contact>
              <AccountBoxIcon color="primary" />
              {getSelectedName(name)}
            </Contact>
            <Contact>
              <PhoneIcon color="primary" />
              {number}
            </Contact>
          </ContentWrapper>
        </ContactWrapper>
        <ContactMenu id={id} number={number} />
      </Paper>
    </li>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
